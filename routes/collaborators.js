const express = require("express")
const router = express.Router()
const collabController = require("../controllers/collabController")

router.post(
    "/collab/add-collaborator/:project_id",
    collabController.addCollaborator
)

router.get(
    "/collab/show-collaborators/:project_id",
    collabController.showCollaborators
)

module.exports = router
