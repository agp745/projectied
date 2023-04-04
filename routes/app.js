const express = require("express")
const router = express.Router()
const appController = require("../controllers/appController")

router.get("/home", appController.homePage)

router.get("/projects", appController.projectsLanding)

router.get("/create-project", appController.createProjectPage)

router.post("/create-project", appController.createProject)

router.get("/project/:project_id", appController.renderProject)

module.exports = router
