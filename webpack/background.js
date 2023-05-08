const {
	resolve
} = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

const pkg = require('../package.json');
const manifestTemplate = require('../templates/manifest.json');

module.exports = {
	mode: process.env.NODE_ENV,
	name: 'background-scripts',
	entry: [
		'./src/background/main.js',
	],

	output: {
		path: resolve(__dirname, '../dist'),
		filename: 'background/main.js',
	},

	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'@': resolve(__dirname, '../src'),
		},
	},

	module: {
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{
					from: './templates/manifest.json',
					to: '/dist/manifest.json',
					transform: () => {
						manifestTemplate.version = pkg.version;

						return Buffer.from(JSON.stringify(manifestTemplate, null, 2));
					},
				},
				{
					from: resolve(__dirname, '../src/assets/'),
					to: resolve(__dirname, '../dist/assets/'),
				}
			]
		}, ),
	],
};