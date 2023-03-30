const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const session = require("express-session")
require("dotenv").config()

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
