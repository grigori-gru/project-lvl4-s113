import path from 'path';
// import webpack from 'webpack';

export default () => ({
  entry: './client',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader',
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
});
