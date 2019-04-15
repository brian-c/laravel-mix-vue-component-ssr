const config = require('laravel-mix/setup/webpack.config');
const styleLoader = require('style-loader');

const STYLE_LOADERS = ['style-loader', styleLoader];
const VUE_STYLE_LOADER = 'vue-style-loader';

// Replace references to "style-loader" with "vue-style-loader".
// https://github.com/vuejs/vue/issues/5721#issuecomment-303051852

config.module.rules.forEach(rule => {
    if (rule.loader && STYLE_LOADERS.includes(rule.loader)) {
        rule.loader = VUE_STYLE_LOADER;
    }

    if (rule.loaders) {
        rule.loaders.forEach((loader, i) => {
            if (loader.loader && STYLE_LOADERS.includes(loader.loader)) {
                loader.loader = VUE_STYLE_LOADER;
            } else if (STYLE_LOADERS.includes(loader)) {
                rule.loaders[i] = VUE_STYLE_LOADER;
            }
        });
    }
});

module.exports = config;
