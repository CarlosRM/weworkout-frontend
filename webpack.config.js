const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminSvgo = require('imagemin-svgo')
const imageminWebp = require('imagemin-webp')
const ESLintPlugin = require('eslint-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const { DefinePlugin } = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env) => {
  const apiEndpoint = env.environment === 'prod' ? 'https://weworkoutbackend.herokuapp.com/' : 'http://127.0.0.1:8000/'
  return {
    mode: 'production',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              }
            },
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
                sourceMap: true
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
            { loader: 'url-loader?limit=10000&name=img/[name].[ext]' }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i
        })
      ]
    },
    plugins: [
      new ESLintPlugin({
        cache: false
      }),
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
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/images/',
            to: path.resolve(__dirname, 'dist/src/assets/images')
          }
        ]

      }),
      new ImageminPlugin({
        plugins: [
          imageminMozjpeg({
            quality: 100
          }),
          imageminSvgo({
            plugins: [
              {
                removeViewBox: false
              }
            ]
          }),
          imageminWebp({
            quality: 100
          })
        ]
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })

    ]
  }
}
