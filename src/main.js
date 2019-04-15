import Vue from 'vue';
import components from'./components';

async function sleep(delay) {
    return await new Promise(resolve => setTimeout(resolve, delay));
}

async function hydrateComponent(renderedElement) {
    const componentKey = renderedElement.dataset.component;
    const propsData = JSON.parse(renderedElement.dataset.props);

    const component = (await components[componentKey]()).default;
    const ComponentClass = Vue.extend(component);

    const instance = new ComponentClass({
        propsData,
    });

    instance.$mount(renderedElement);

    return instance;
}

async function main() {
    await sleep(2000); // Simulate a slower page load.
    const renderedElements = document.querySelectorAll('[data-component][data-props]');
    window.VUE_INSTANCES = await Promise.all([...renderedElements].map(hydrateComponent));
    console.info('Hydrated Vue components', window.VUE_INSTANCES);
}

main();
