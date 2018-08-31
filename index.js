'use strict';

const fs = require('fs');
const url = require('url');

const args = process.argv.slice(2);
let uri = new url.URL(args[0]);
let output = args[1] || 'a.md';

const metadata = getMetadata(uri);
const markdown = fs.createWriteStream(output);

let timestamp = new Date();
markdown.once('open', () => {
    metadata.connect();
    generate(metadata, markdown).then(() => {
        metadata.disconnect();
        markdown.end();
        console.log(`OK ${(new Date().getTime() - timestamp.getTime()) / 1000}s`);
    }, (e) => {
        metadata.disconnect();
        markdown.end();
        console.error(e);
        process.exit(1);
    });
});

function getMetadata(uri) {
    switch (uri.protocol) {
        case 'mysql:': {
            const MySQLMetadata = require('./mysql');
            return new MySQLMetadata(uri);
        }
        default: {
            console.error(`unsupported database: ${uri}`);
            process.exit(1);
        }
    }
}

async function generate(metadata, markdown) {
    markdown.write(`# \n`);

    let tables = await metadata.tables();
    return Promise.all(tables.map(async (table, i) => {
        let columns = await metadata.columns(table.table_name);

        markdown.write(`## ${i + 1}、 ${table.table_name}\n`);
        markdown.write(`${table.table_comment}\n\n`);
        markdown.write(`| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |  \n`);
        markdown.write(`| - | - | - | - | - | - |  \n`);
        columns.forEach((column) => {
            markdown.write(`| ${column.ordinal_position} `);
            markdown.write(`| ${column.column_name} `);
            markdown.write(`| ${column.column_type} `);
            markdown.write(`| ${column.is_primary} `);
            markdown.write(`| ${column.is_nullable} `);
            markdown.write(`| ${column.column_comment} `);
            markdown.write(`|  \n`);
        });
        markdown.write(`\n\n`);
    }));
}