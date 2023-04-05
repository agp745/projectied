const express = require("express")
const router = express.Router()
const appController = require("../controllers/appController")
// const {
//     staticImages,
//     randomImage,
//     replaceImage,
// } = require("../static/js/imageGenerator")

router.get("/home", appController.listProjects)

router.get("/create-project", appController.createProjectPage)

router.post("/create-project", appController.createProject)

router.get("/project/:project_id", appController.renderProject)

module.exports = router
