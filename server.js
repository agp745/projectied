const express = require("express")
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const path = require('path')
const VIEWS_PATH = path.join(__dirname, '/views')
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')
app.use(express.urlencoded())
require('dotenv').config()
app.use(express.static('static'))
const PORT = process.env.PORT
const authRouter = require("./routes/auth")
const appRouter = require("./routes/app")

app.engine("mustache", mustacheExpress())

app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.urlencoded())
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        saveUninitialized: false,
    })
)
app.use("/auth", authRouter)
app.use(appRouter)

app.get("/", (req, res) => {
    res.redirect("/auth/login")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
