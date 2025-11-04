const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
    chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
    publicPath: isProduction ? './' : 'http://localhost:8080/',
    clean: true,
    assetModuleFilename: 'assets/[name].[hash:6][ext]',
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:6][ext]'
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
      } : false,
      // 关键：强制同步 publicPath
      publicPath: isProduction ? './' : 'http://localhost:8080/',
      // 自动注入资源（需删除 public/index.html 中手动引入的 script）
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
  ],
  devServer: !isProduction ? {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    headers: {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:8080 ws:;"
    }
  } : undefined,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  // ✅ 把 devtool 提到顶层
  devtool: isProduction ? false : 'eval-source-map',

  // ✅ optimization 只保留生产环境优化
  optimization: isProduction ? {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  } : undefined,

  // ✅ performance 也提到顶层
  performance: isProduction ? {
    hints: 'warning',
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000,
  } : undefined,
};