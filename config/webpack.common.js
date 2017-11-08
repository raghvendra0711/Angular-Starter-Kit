const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const helpers = require('./helpers');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = require('./metadata-config');

module.exports = function (ENV) {
	return {

		entry: {
			'polyfills': './src/polyfills.ts',
			'main': './src/main.ts',
		},

		output: {
			path: helpers.root('dist'),
			filename: 'js/[name].[hash].bundle.js',
			sourceMapFilename: '[file].map',
			chunkFilename: '[name].[chunkhash].chunk.js',
			publicPath: '/',
		},

		performance: {
			hints: false,
		},

		stats: {
			children: false,
		},

		resolve: {
			extensions: ['*', '.ts', '.js', '.json', '.css', '.sass', '.scss', '.html'],
			modules: [
				'node_modules',
			],
		},

		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'ng-router-loader',
							options: {
								loader: 'async-import',
								genDir: 'compiled',
							}
						},
						{
							loader: 'awesome-typescript-loader',
							options: {
								configFileName: 'tsconfig.webpack.json',
							}
						},
						{
							loader: 'angular2-template-loader'
						}
					],
					exclude: [/\.(spec|e2e)\.ts$/]
				},
				{
					test: /\.(sass|scss|css)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'postcss-loader', 'sass-loader'],
					}),
					exclude: /node_modules/,
				},
				{
					test: /\.html$/,
					use: 'html-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(jpg|jpeg|gif|png|svg)$/,
					exclude: /node_modules/,
					use: 'url-loader?limit=100&name=img/[name].[ext]'
				},
				{
					test: /\.(woff|woff2|eot|ttf|svg)$/,
					exclude: /node_modules/,
					use: 'url-loader?limit=1024&name=fonts/[name].[ext]'
				},
			]
		},

		plugins: [

			/**
			 * @link https://github.com/kossnocorp/assets-webpack-plugin
			 */
			new AssetsPlugin({
				publicPath: '/',
				path: './dist',
				filename: 'webpack-assets.json',
				prettyPrint: true
			}),

			/**
			 * @link https://github.com/webpack/extract-text-webpack-plugin
			 */
			new ExtractTextPlugin({
				filename: 'css/style.[hash].css'
			}),

			/**
			 * @link https://github.com/ampedandwired/html-webpack-plugin
			 */
			new HtmlWebpackPlugin({
				title: METADATA.title,
				env: ENV,
				metadata: METADATA,
				template: './src/index.html.ejs',
				chunksSortMode: 'dependency',
				inject: 'body',
				description: METADATA.description,
				baseUrl: METADATA.baseUrl,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				},
			}),

			/**
			 * @link https://github.com/AngularClass/angular2-webpack-starter/tree/master/config/html-elements-plugin
			 */
			new HtmlElementsWebpackPlugin({
				headTags: require('./head-config'),
			}),

			/**
			 * @link https://www.npmjs.com/package/copy-webpack-plugin
			 */
			new CopyWebpackPlugin([
				{ from: 'src/img', to: 'img' },
				{ from: 'src/assets', to: 'assets' },
				{ from: 'src/meta' },
			]),

			/**
			 * Fix Angular 2 compile warning.
			 * @link https://github.com/angular/angular/issues/11580
			 */
			new ContextReplacementPlugin(
				/(.+)?angular(\\|\/)core(.+)?/,
				helpers.root('src'),
				{}
			),

			/**
			 * Fix for moment.js, just remove other localizations.
			 * @link https://iamakulov.com/notes/webpack-front-end-size-caching/#minification
			 */
			new ContextReplacementPlugin(
				/moment[\/\\]locale/,
				/ru\.js/
			),

			/**
			 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
			 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
			 */
			new CommonsChunkPlugin({
				name: 'polyfills',
				chunks: ['polyfills']
			}),

			/**
			 * https://github.com/szrenwei/inline-manifest-webpack-plugin
			 */
			new InlineManifestWebpackPlugin(),

			/**
			 * @link https://webpack.github.io/docs/list-of-plugins.html#defineplugin
			 */
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'process.env': {
					'ENV': JSON.stringify(ENV),
				}
			}),
		]
	}
};
