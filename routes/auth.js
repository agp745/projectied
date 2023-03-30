const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", authController.login)

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup", authController.signup)

module.exports = router
