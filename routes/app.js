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

router.post(
    "/project/todo/delete/:project_id/:todo_id",
    projectController.deleteTodo
)

router.get("/project/active/:project_id", projectController.sendActives)

router.post("/project/active/:project_id", projectController.addActive)

router.post("/project/active/:project_id/:todo_id/", projectController.activate)

router.post(
    "/project/active/delete/:project_id/:active_id",
    projectController.deleteActive
)

router.get("/project/completed/:project_id", projectController.sendCompleted)

router.post("/project/completed/:project_id", projectController.addCompleted)

router.post(
    "/project/completed/:project_id/:active_id",
    projectController.complete
)

router.post(
    "/project/completed/delete/:project_id/:completed_id",
    projectController.deleteCompleted
)

//----------------------------------------------------

router.post("/delete-project/:project_id", appController.deleteProject)

module.exports = router
