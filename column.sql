select
    col.ordinal_position,
    col.column_name,
    col.column_type,
    if(key_col.constraint_name = 'PRIMARY',
        'YES',
        'NO') is_primary,
    col.is_nullable,
    col.column_comment
from
    information_schema.columns col
        left join
    information_schema.key_column_usage key_col on key_col.table_schema = col.table_schema
        and key_col.table_name = col.table_name
        and key_col.column_name = col.column_name
where
    col.table_schema = ?
        and col.table_name = ?
order by col.ordinal_position
