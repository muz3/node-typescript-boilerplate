const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const baseConfig = require('./webpack.base.config')

const port = process.env.PORT || 3011
module.exports = merge.smart(baseConfig, {
  mode: 'development',

  entry: {
    main: [
      `webpack-dev-server/client?http://localhost:${port}/`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/index.tsx'),
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({ before: [createStyledComponentsTransformer()] }),
        },
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        data: {
          test: /data\/.+\.json$/,
          name: 'data',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      MapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  devServer: {
    port,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
})
