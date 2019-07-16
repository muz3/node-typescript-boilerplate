const devConfig = require('../webpack.dev.config');

module.exports = async ({ config }) => {
  config.module.rules = devConfig.module.rules;
  config.resolve = devConfig.resolve;

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  return config;
};
