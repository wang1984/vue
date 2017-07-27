var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'vue-html'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000, //表示小于10kb时会将图片生成一个base64串打包到编译后的js文件中
        //如果大于10kb 就会使用 utils.assetsPath 方法单独生成一个文件
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}