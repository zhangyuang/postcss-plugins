# Installing PostCSS Focus Visible

[PostCSS Focus Visible] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Focus Visible] to your project:

```bash
npm install postcss postcss-focus-visible --save-dev
```

Use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssFocusVisible = require('postcss-focus-visible');

postcss([
	postcssFocusVisible(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli postcss-focus-visible --save-dev
```

Use [PostCSS Focus Visible] in your `postcss.config.js` configuration file:

```js
const postcssFocusVisible = require('postcss-focus-visible');

module.exports = {
	plugins: [
		postcssFocusVisible(/* pluginOptions */)
	]
}
```

## Webpack

_Webpack version 5_

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader postcss-focus-visible --save-dev
```

Use [PostCSS Focus Visible] in your Webpack configuration:

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { importLoaders: 1 },
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-focus-visible",
										{
											// Options
										},
									],
								],
							},
						},
					},
				],
			},
		],
	},
};
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss postcss-focus-visible --save-dev
```

Use [React App Rewire PostCSS] and [PostCSS Focus Visible] in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssFocusVisible = require('postcss-focus-visible');

module.exports = config => reactAppRewirePostcss(config, {
	plugins: () => [
		postcssFocusVisible(/* pluginOptions */)
	]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss postcss-focus-visible --save-dev
```

Use [PostCSS Focus Visible] in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssFocusVisible = require('postcss-focus-visible');

gulp.task('css', function () {
	var plugins = [
		postcssFocusVisible(/* pluginOptions */)
	];

	return gulp.src('./src/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('.'));
});
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss postcss-focus-visible --save-dev
```

Use [PostCSS Focus Visible] in your Gruntfile:

```js
const postcssFocusVisible = require('postcss-focus-visible');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
			postcssFocusVisible(/* pluginOptions */)
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Focus Visible]: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-focus-visible
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
