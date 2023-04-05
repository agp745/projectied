const express = require("express")
const router = express.Router()
const appController = require("../controllers/appController")
const projectController = require("../controllers/projectController")

router.get("/home", appController.listProjects)

router.get("/create-project", appController.createProjectPage)

router.post("/create-project", appController.createProject)

router.get("/project/:project_id", appController.renderProject)

//----------------------------------------------------

router.get("/project/todo/:project_id", projectController.sendTodo)

router.post("/project/todo/:project_id", projectController.addTodo)

router.get("/project/active/:project_id", projectController.sendActives)

router.post("/project/active/:project_id/:todo_id", projectController.activate)

router.get("/project/completed/:project_id", projectController.sendCompleted)

router.post(
    "/project/completed/:project_id/:active_id",
    projectController.complete
)

module.exports = router
