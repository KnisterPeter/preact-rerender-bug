const path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  plugins: [
    new BabiliPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/index.html', to: 'index.html' },
      { from: 'src/server.js', to: 'server.js' } 
    ])
  ],
  devtool: "source-map"
};
