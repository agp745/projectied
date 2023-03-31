const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const session = require("express-session")
const path = require("path")
const VIEWS_PATH = path.join(__dirname, "/views")
const PARTIALS_PATH = path.join(VIEWS_PATH, "/partials")
require("dotenv").config()
const { auth } = require("express-openid-connect")

app.engine("mustache", mustacheExpress(PARTIALS_PATH, ".mustache"))

app.set("views", VIEWS_PATH)
app.set("view engine", "mustache")

const PORT = process.env.PORT
const authRouter = require("./routes/auth")
const appRouter = require("./routes/app")

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
}
const routes = {
    login: false,
}

app.use(auth(config, routes))
app.use(express.urlencoded())
app.use(express.static("static"))
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
