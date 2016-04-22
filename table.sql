select
    table_name, table_comment
from
    information_schema.tables
where
    table_schema = ?
        and table_type = 'BASE TABLE'
order by table_name
