const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { ProvidePlugin } = require('webpack')
const { DefinePlugin } = require('webpack')

module.exports = (env) => {
  const apiEndpoint = env.environment === 'prod' ? 'https://weworkoutbackend.herokuapp.com/' : 'http://127.0.0.1:8000'
  return {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    devtool: 'eval',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        path: 'path-browserify'
      },
      fallback: {
        fs: false,
        crypto: false
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            }

          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                  getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                    return loaderContext.resourcePath.includes('third-party')
                      ? localName
                      : null
                  }
                },
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', {}]
                  ]
                }
              }
            }

          ]
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'url-loader?limit=10000' }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      new DefinePlugin({
        APIENDPOINT: JSON.stringify(apiEndpoint)
      }),
      new MiniCssExtractPlugin(),
      new ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
}
