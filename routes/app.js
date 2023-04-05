const express = require("express")
const router = express.Router()
const appController = require("../controllers/appController")

router.get("/home", appController.listProjects)

router.get("/create-project", appController.createProjectPage)

router.post("/create-project", appController.createProject)

router.get("/project/:project_id", appController.renderProject)

router.post("/project/todo/:project_id")

router.post("/project/active/:project_id")

router.post("/project/completed/:project_id")

module.exports = router
