const mix = require('laravel-mix');
const path = require('path');
const webpack = require('webpack');

const VUE_SSR = process.env.VUE_SSR;

const relativePath = path.resolve.bind(path, __dirname);

mix.options({
    clearConsole: false,
    extractVueStyles: 'components.css',
});

mix.disableNotifications();

mix.webpackConfig({
    output: {
        path: VUE_SSR ? relativePath('vue-ssr') : relativePath('public', 'build'),
        publicPath: 'build/',
        chunkFilename: 'chunks/[id].js',
        libraryTarget: VUE_SSR ? 'commonjs2' : undefined,
    },
});

if (VUE_SSR) {
    mix.webpackConfig({
        target: 'node',

        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    });

    mix.js('./src/components', 'components-build.js');
} else {
    mix.js('./src/main.js', 'main.js');
}
