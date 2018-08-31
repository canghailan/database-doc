
const mysql = require('mysql');

class MySQLMetadata {
    constructor(uri) {
        this.uri = uri;
    }

    connect() {
        this.connection = mysql.createConnection({
            host: this.uri.hostname,
            port: this.uri.port,
            user: this.uri.username,
            password: this.uri.password
        });
    }

    disconnect() {
        this.connection.end();
    }

    schema() {
        return this.uri.pathname.substring(1);
    }

    async query(sql, parameters) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, parameters, (e, result) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(result || []);
                }
            });
        });
    }

    async tables() {
        return this.query(`SELECT
            table_name AS 'table_name',
            table_comment AS 'table_comment'
        FROM
            information_schema. TABLES
        WHERE
            table_schema = ?
        AND table_type = 'BASE TABLE'
        ORDER BY
            table_name`, [this.schema()]);
    }

    async columns(table) {
        let columns = await this.query(`SELECT
            col.ordinal_position AS 'ordinal_position',
            col.column_name AS 'column_name',
            col.column_type AS 'column_type',
            col.is_nullable AS 'is_nullable',
            col.column_comment AS 'column_comment'
        FROM
            information_schema.COLUMNS col
        WHERE
            col.table_schema = ?
        AND col.table_name = ?`, [this.schema(), table]);

        let columnKeys = await this.query(`SELECT
            key_col.column_name AS 'column_name',
        IF (
            key_col.constraint_name = 'PRIMARY',
            'YES',
            'NO'
        ) AS 'is_primary'
        FROM
            information_schema.key_column_usage key_col
        WHERE
            key_col.table_schema = ?
        AND key_col.table_name = ?`, [this.schema(), table]);

        let columnKeyIndex = {};
        columnKeys.forEach(e => {
            columnKeyIndex[e.column_name] = e;
        });
        return columns.map(e => {
            let r = Object.assign({}, e, columnKeyIndex[e.column_name]);
            r.is_primary = r.is_primary || 'NO';
            return r;
        });
    }
}

module.exports = MySQLMetadata;