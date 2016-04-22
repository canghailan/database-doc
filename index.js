'use strict';

const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const mysql = require('mysql');

const args = process.argv.slice(2);
let uri = url.parse(args.pop());
let qs = querystring.parse(uri.query);
let host = uri.host;
let user = qs.user;
let password = qs.password;
let schema = uri.pathname.substring(1);
let output = args.pop() || 'a.md';

const tableQuery = fs.readFileSync('table.sql', 'utf-8');
const columnQuery = fs.readFileSync('column.sql', 'utf-8');

const markdown = fs.createWriteStream(output);
const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password
});

markdown.once('open', () => {
    markdown.write(`# \n`);

    connection.connect();
    connection.query(tableQuery, [schema], (e, tables) => {
        if (e) throw e;

        tables.forEach((table, i) => {
            let tableName = table.table_name;

            connection.query(columnQuery, [schema, tableName], (e, columns) => {
                if (e) throw e;

                markdown.write(`## ${i + 1}、 ${tableName}\n`);
                markdown.write(`${table.table_comment}\n\n`);
                markdown.write(`| 序号 | 列名 | 类型 | 是否主键 | 是否可为空 | 说明 |\n`);
                markdown.write(`| ---- | ---- | ---- | ---- | ---- |\n`);
                columns.forEach((column, ii) => {
                    markdown.write(`| ${ii + 1} `);
                    markdown.write(`| ${column.column_name} `);
                    markdown.write(`| ${column.column_type} `);
                    markdown.write(`| ${column.is_primary} `);
                    markdown.write(`| ${column.is_nullable} `);
                    markdown.write(`| ${column.column_comment} `);
                    markdown.write(`|\n`);
                });
                markdown.write(`\n\n`);

                if (i == tables.length - 1) {
                    connection.end();
                    markdown.end();
                }
            });
        });
    });
});
