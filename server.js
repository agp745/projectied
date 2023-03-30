const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')
const path = require('path')
const VIEWS_PATH = path.join(__dirname, '/views')
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')
app.use(express.urlencoded())
require('dotenv').config()
app.use(express.static('static'))
const PORT = process.env.PORT

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    res.render('index')
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})