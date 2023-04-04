const models = require("../models")
const { Op } = require("sequelize")

const homePage = async (req, res) => {
    const user = req.oidc.user.nickname
    const imageURL = req.oidc.user.picture

    res.render("index", { user: user, image: imageURL })
}

const projectsLanding = async (req, res) => {
    const projects = await models.Project.findAll({})

    const paresedProjects = projects.map((project) => project.dataValues)

    res.render("projectsLanding", { projects: paresedProjects })
}

const createProjectPage = async (req, res) => {
    res.render("createProject")
}

const createProject = async (req, res) => {
    const currentUser = await models.User.findOne({
        where: {
            username: req.oidc.user.nickname,
        },
    })

    const userId = currentUser.dataValues.id

    const newProject = await models.Project.build({
        user_id: userId,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        imageURL: req.body.imageURL,
    })

    const details = await newProject.save()

    console.log(details)

    console.log(`new project "${details.title}" saved`)

    res.redirect(`project/${details.id}`)
}

const renderProject = async (req, res) => {
    const id = req.params.project_id
    console.log(id)
    const project = await models.Project.findByPk(id)

    const projectInfo = project.dataValues
    res.render("project", projectInfo)
}

module.exports = {
    homePage,
    projectsLanding,
    createProjectPage,
    createProject,
    renderProject,
}
