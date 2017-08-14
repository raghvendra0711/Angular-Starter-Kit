const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Ngtools = require('@ngtools/webpack');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const METADATA = require('./configs/metadata-config');

const config = {

	entry: {
		'main': './src/app/main.ts',
	},

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash].js'
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		extensions: ['.ts', '.js', '.css','.sass', '.scss', '.html'],
		modules: [
			'node_modules',
		],
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		inline: true,
		open: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
		}
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						query: {
							sourceMap: false,
							inlineSourceMap: false,
							compilerOptions: {
								removeComments: false
							}
						},
					},
					{
						loader: 'angular2-template-loader'
					}
				],
				exclude: [/\.e2e\.ts$/]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.html$/,
				use: 'html-loader'
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
			description: METADATA.description,
			baseUrl: METADATA.baseUrl,
			template: 'src/index.html.ejs',
			chunksSortMode: 'dependency',
			inject: 'body',
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

		new webpack.HotModuleReplacementPlugin(),

		/**
		 * @link http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		 */
		// new UglifyJSPlugin({
		// 	beautify: false,
		// 	output: {
		// 		comments: false
		// 	},
		// 	mangle: {
		// 		screw_ie8: true
		// 	},
		// 	compress: {
		// 		screw_ie8: true,
		// 		warnings: false,
		// 		conditionals: true,
		// 		unused: true,
		// 		comparisons: true,
		// 		sequences: true,
		// 		dead_code: true,
		// 		evaluate: true,
		// 		if_return: true,
		// 		join_vars: true,
		// 		negate_iife: false
		// 	},
		// }),

		/**
		 * @link https://github.com/AngularClass/angular2-webpack-starter/tree/master/config/html-elements-plugin
		 */
		new HtmlElementsWebpackPlugin({
			headTags: require('./configs/head-config'),
		}),

		/**
		 * @link https://www.npmjs.com/package/copy-webpack-plugin
		 */
		new CopyWebpackPlugin([
			{ from: 'src/img', to: 'img'},
			{ from: 'src/assets', to: 'assets'},
		]),

		/**
		 * Fix Angular 2 compile warning.
		 * @link https://github.com/angular/angular/issues/11580
		 */
		new ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(__dirname, './src'),
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
	]

};

module.exports = config;
