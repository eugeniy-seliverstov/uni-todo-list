// Ширинов Р.Р. (D9RS) - Сдано
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const url = require('url');
const { filename, siteUrl, parseUrl, stepSize, storagePath } = require('./config');

const { promises: fsp } = fs;

const Selectors = {
    product: '.n-catalog-product',
    productName: '.price-item-title',
    price: '.current-price-value',
    description: '.price-item-description > p',
    link: '.product-info__title-link > a',
    productCode: '.price-item-code > span',
    paramsRows: '.table-params tbody tr',
    tablePart: '.table-part',
    paramName: '.dots > span',
    paramValue: '> td:last-child'
};

async function parseItem(pathname) {
    try {
        const response = await fetch(url.resolve(siteUrl, pathname));
        const body = await response.text();
        const $ = cheerio.load(body);
        const price = parseFloat($(Selectors.price).eq(0).text().replace(/\s/g, ''));
        const code = parseInt($(Selectors.productCode).text());
        const name = $(Selectors.productName).text();
        const description = $(Selectors.description).text();
        const rows = $(Selectors.paramsRows);
 
        const properties = {};
        let currentPart = 'none';
        rows.each((i, row) => {
            const part = $(row).find(Selectors.tablePart).eq(0);
 
            if (part.length > 0) {
                currentPart = part.text();
                properties[currentPart] = {};
            } else {
                const property = $(row).find(Selectors.paramName).text().trim();
                const value = $(row).find(Selectors.paramValue).text().trim();
                properties[currentPart][property] = value;
            }
        });
 
        return { name, price, code, description, properties };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function parsePage(page = 1, items = []) {
    try {
        const response = await fetch(`${parseUrl}?p=${page}`);
        const body = await response.text();
        const $ = cheerio.load(body);
        const products = $(Selectors.product).toArray();

        if (!products.length) {
            return items;
        }

        console.log('Обрабатываю страницу:', page);

        const parseItemQueries = products.map(item => {
            const link = $(item).find(Selectors.link).attr('href');
            return parseItem(link);
        });

        const parsedItems = await Promise.all(parseItemQueries);
        const nextItems = items.concat(parsedItems);

        return parsePage(page + stepSize, nextItems);
    } catch (error) {
        console.error('Парсинг не удался.', error);
    }
}

async function main() {
    try {
        const parsers = new Array(stepSize).fill(null).map((_, i) => parsePage(i + 1));
        const results = await Promise.all(parsers);
        const items = results.flat();

        console.log('Кол-во собранных товаров:', items.length);
        if (!fs.existsSync(storagePath)) {
            await fsp.mkdir(storagePath, { recursive: true });
        }

        const fileDestination = path.resolve(storagePath, filename);
        fs.writeFileSync(fileDestination, JSON.stringify(items));
        
        console.log(`Успешно записали результат в файл ${filename}!`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();