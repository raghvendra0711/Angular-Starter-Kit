/**
 * Used to merge webpack configs
*/
const webpackMerge = require('webpack-merge');
/**
 * The settings that are common to prod and dev
*/
const commonConfig = require('./webpack.common.js');
/**
 * Webpack Plugins
 */
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * Webpack Constants
 */
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = function () {

	return webpackMerge(commonConfig(ENV), {

		devtool: 'source-map',

		plugins: [

			new ModuleConcatenationPlugin(),

			/**
			 * @link http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			 */
			new UglifyJsPlugin({
				parallel: true,
				uglifyOptions: {
					ie8: false,
					ecma: 6,
					warnings: true,
					mangle: true,
					output: {
						comments: false,
						beautify: false,
					},
				},
				warnings: true,
			}),

			/**
			 * @link https://github.com/NMFR/optimize-css-assets-webpack-plugin
			 */
			new OptimizeCssAssetsPlugin(),
		]
	});
};
