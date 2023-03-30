const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.urlencoded())
app.engine('mustache', mustacheExpress())
require('dotenv').config()
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