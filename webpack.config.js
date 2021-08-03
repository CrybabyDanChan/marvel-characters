const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const tsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.tsx'],
  mode: 'development',
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    port: 3000,
    hot: isDev,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: tsLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, 'src/favicon.ico'),
    //             to: path.resolve(__dirname, 'dist/assets'),
    //         },
    //     ],
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
};
