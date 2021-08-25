// ./`rollup.config.js`

import typescript from 'rollup-plugin-typescript';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
// import nodeResolve from 'rollup-plugin-node-resolve'; // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import replace from 'rollup-plugin-replace'; // 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import commonjs from 'rollup-plugin-commonjs'; // 将非ES6语法的包转为ES6可用
const env = process.env.NODE_ENV;
export default {
	input: './src/index.ts',
	plugins: [
		typescript({
			exclude: 'node_modules/**',
			typescript: require('typescript'),
		}),
		sourceMaps(),
		// terser(),
		// nodeResolve(),
		babel({
			exclude: '**/node_modules/**',
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(env),
		}),
		commonjs(),
	],
	output: [
		{
			format: 'cjs',
			file: 'lib/bundle.js',
			// sourcemap: true,
		},
		// {
		// 	format: 'es',
		// 	file: 'lib/bundle.js',
		// 	// sourcemap: true
		// },
	],
};
