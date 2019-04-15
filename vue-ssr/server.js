const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json;
const fs = require('fs');
const renderComponent = require('./render-component');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(jsonParser());
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
    try {
        const rawHtml = fs.readFileSync('./src/index.html').toString();

        const componentData = [];

        let renderedHtml = rawHtml.replace(/~~~({[\s\S]*?})~~~/gm, (_, json) => {
            const data = JSON.parse(json);
            componentData.push(data);
            const index = componentData.length - 1;
            return `~~~${index}~~~`;
        });

        await Promise.all(componentData.map(async (data, index) => {
            const placeholder = new RegExp(`~~~${index}~~~`);
            const { component, props } = data;
            const componentMarkup = await renderComponent(component, props);
            renderedHtml = renderedHtml.replace(placeholder, componentMarkup);
        }));

        res.send(renderedHtml);
    } catch (error) {
        next(error);
    }
});

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
