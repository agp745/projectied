const express = require("express")
const router = express.Router()
const appController = require("../controllers/appController")

router.get("/home", appController.homePage)

module.exports = router
