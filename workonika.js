const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

console.log('bodyParser', bodyParser)

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.get('/send', (req, res) => {
    res.type('text/plain')
    console.log('req.xhr', req.xhr)
    res.send('req:xhr')
})
const tours = [
    { id: 0, name: 'Худ-Ривер', price: 99.99 },
    { id: 1, name: 'Орегон Коуст', price: 149.95 },
]
app.get('/api/tours', (req, res) => res.json(tours))

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`Express запущен на http://localhost:${port}; нажмите Ctrl + C для завершения`))
