const {
	resolve
} = require('path');
const HtmlPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const { VueLoaderPlugin } = require('vue-loader'); // eslint-disable-line

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: process.env.NODE_ENV,
	name: 'setting',
	entry: [
		'./src/setting/setting.js',
		'./src/setting/setting.css',
	],
	output: {
		path: resolve(__dirname, '../dist/'),
		filename: 'setting/index.js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.vue', '.scss', '.css'],
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
				options: {
					appendTsSuffixTo: [/\.vue$/]
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader',
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
					},
				},
			},
			{
				test: /\.css$/,
				use: [{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
			},
			{
				test: /\.(png|jpg|svg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]?[hash]',
				},
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),

		new MiniCssExtractPlugin({
			filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
			chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
			ignoreOrder: false,
		}),

		new HtmlPlugin({
			template: resolve(__dirname, '../src/setting/setting.html'),
			filename: 'setting/index.html',
		}),
	],
};
