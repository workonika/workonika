const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const handlers = require('./handlers')

const app = express()
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))

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

app.get('/survey', handlers.survey)

app.post('/survey/process', handlers.surveyProcess)

app.get('/survey/thank-you', handlers.surveyThankYou)

const tours = [
    { id: 0, name: 'Худ-Ривер', price: 99.99 },
    { id: 1, name: 'Орегон Коуст', price: 149.95 },
    { id: 2, name: 'Мисиссипи баунт', price: 40.99 },
    { id: 3, name: 'Нью-Йорк стрит сити', price: 249.95 },
]

app.get('/api/tours', (req, res) => res.json(tours))

app.put('/api/tour/:id', (req, res) => {
    const p = tours.find(p => p.id === parseInt(req.params.id))
    if (!p) {return res.status}
    if(!p) return res.status(404).json({ error: 'No such tour exists' })
    if(req.body.name) p.name = req.body.name
    if(req.body.price) p.price = req.body.price
    res.json({ success: true })
})

app.delete('/api/tour/:id', (req, res) => {

    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))

    if(idx < 0)
        return res.json({ error: 'Такого тура не существует.' })

    tours.splice(idx, 1)
    res.json({ success: true })
})

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
