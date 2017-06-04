const rollup = require('rollup').rollup,
nodeResolve = require('rollup-plugin-node-resolve'),
commonjs = require('rollup-plugin-commonjs'),
uglify = require('rollup-plugin-uglify');

module.exports = {
    entry: 'src/main-aot.js',
    dest: '../src/main/resources/static/build.js',
    sourceMap: false,
    format: 'iife',
    onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        console.warn(warning.message);
    },
    plugins: [
        nodeResolve({ jsnext: true, module: true }),
        commonjs({ include: 'node_modules/**' }),
        uglify()
    ]
};