const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Workonika survey')
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - не найдено')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - ошибка сервера')
})

app.listen(port, () => console.log(`Express запущен на http://localhost:${port}; нажмите Ctrl + C для завершения`))
