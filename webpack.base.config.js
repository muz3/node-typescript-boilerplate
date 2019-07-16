require('dotenv').config()
const path = require('path')

module.exports = {
  context: __dirname,
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'source-map',
}
