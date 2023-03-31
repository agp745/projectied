const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get("/login", authController.addOrGetUser)

router.get("/get-user", authController.getUser)

module.exports = router
