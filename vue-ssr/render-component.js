const components = require('./components-build').default;
const Vue = require('vue');
const vueServerRenderer = require('vue-server-renderer').createRenderer();

async function renderComponent(componentName, givenProps) {
    const vueInstance = new Vue({
        components,

        data: {
            componentName,
            givenProps,
        },

        template: `
            <component
                :is="componentName"
                v-bind="givenProps"
                :data-component="componentName"
                :data-props="JSON.stringify(givenProps)"
            ></component>
        `,
    });

    return await vueServerRenderer.renderToString(vueInstance);
}

module.exports = renderComponent;
