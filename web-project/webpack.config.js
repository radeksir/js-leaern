const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, args) => {
	const isProduction = args.mode === 'production';
	return {
		devtool: isProduction ? 'hidden-source-map' : 'eval-source-map', //pro source mapy
		entry: {
			app: './www/index.js',
		},
		output: {
			filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
			path: path.resolve(__dirname, 'www'),
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
				},
				{
					test: /\.less$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',//výsledné css pomocí javascriptu vloží do stránky, abych mohl snadněji vyvíjet css (na produkci, místo něho vygenerovaný minifikovaný css)
						{
							loader: 'css-loader', //import nebo include prožene přes webpack, tzn například pokud mám načítání obrázků v background, tak to nastaví správnou cestu, případně obrázek přesune do dist složky
							options: {
								importLoaders: 1
							},
						},
						'postcss-loader',
						'less-loader',//kompiluje less do css
					],
				},
				{
					test: /\.jpe?g$/,
					loader: 'file-loader',
					options: {//oby se mi negeneroval nový název obrázku, ale byl původní (v tomto případě se přepisuje obrázek)
						name: '[name].[ext]',
					}
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: isProduction ? '[name].[contenthash].css' : '[name].css',
			})
		],
		devServer: {
			port: 3333,
			contentBase: path.resolve(__dirname, 'www'),
		}
	};
};
