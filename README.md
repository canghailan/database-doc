# MySQL数据库文档生成工具

```shell
node index.js "mysql://user:password@host/database" a.md
pandoc -f markdown_github -t html a.md | pandoc -f html -t docx -o a.docx
```

需要NodeJS 8+
