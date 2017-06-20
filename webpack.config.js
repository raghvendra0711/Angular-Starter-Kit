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

const config = {

	entry: {
		'polyfills': './src/scripts/polyfills.ts',
		'main': './src/scripts/main.ts',
	},

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js'
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		extensions: ['.ts', '.js', '.sass', '.scss', '.html'],
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
		]
	},

	plugins: [

		new ExtractTextPlugin({
			filename: 'css/style.[hash].css'
		}),

		new HtmlWebpackPlugin({
			title: 'My Angular Title !!!!',
			description: 'My Angular description !!!!',
			baseUrl: '/',
			template: './src/index.html.ejs',
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
		 * @link https://www.npmjs.com/package/copy-webpack-plugin
		 */
		new CopyWebpackPlugin([
			{ from: 'src/img', to: 'img' }
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
