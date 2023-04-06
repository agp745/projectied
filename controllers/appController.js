const models = require("../models")
const { Op } = require("sequelize")
const randomImage = require("../static/js/imageGenerator")

const listProjects = async (req, res) => {
    const currentUser = await models.User.findOne({
        where: {
            username: req.oidc.user.nickname,
        },
    })
    const userId = currentUser.dataValues.id
    const user = req.oidc.user.nickname
    const imageURL = req.oidc.user.picture

    const projects = await models.Project.findAll({
        where: {
            user_id: userId,
        },
    })
    const paresedProjects = projects.map((project) => project.dataValues)

    //-----

    const collabProjects = await models.Share.findAll({
        where: {
            user_id: userId,
        },
    })

    const parsedCollabs = await Promise.all(
        collabProjects.map(async (project) => {
            const id = project.dataValues.project_id
            const list = await models.Project.findByPk(id)
            return list.dataValues
        })
    )

    res.render("index", {
        projects: paresedProjects,
        collabs: parsedCollabs,
        user: user,
        image: imageURL,
    })
}

const createProjectPage = async (req, res) => {
    const user = await models.User.findOne({
        where: {
            username: req.oidc.user.nickname,
        },
    })

    const picture = user.dataValues.picture
    const userInfo = {
        image: picture,
        user: req.oidc.user.nickname,
    }

    res.render("createProject", userInfo)
}

const createProject = async (req, res) => {
    const currentUser = await models.User.findOne({
        where: {
            username: req.oidc.user.nickname,
        },
    })
    const userId = currentUser.dataValues.id

    const url = randomImage.replaceImage(
        randomImage.staticImages,
        req.body.imageURL
    )

    const newProject = await models.Project.build({
        user_id: userId,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        imageURL: url,
    })

    const details = await newProject.save()

    console.log(`new project "${details.title}" saved`)

    res.redirect(`project/${details.id}`)
}

const renderProject = async (req, res) => {
    const id = req.params.project_id
    const project = await models.Project.findByPk(id)

    const projectInfo = project.dataValues

    const user = await models.User.findByPk(projectInfo.admin)

    const username = req.oidc.user.nickname
    const imageURL = req.oidc.user.picture

    const metaData = {
        user: username,
        image: imageURL,
        project_id: id,
        title: projectInfo.title,
        description: projectInfo.description,
        admin: user.dataValues.username,
        imageURL: projectInfo.imageURL,
    }

    res.render("project", metaData)
}

module.exports = {
    listProjects,
    createProjectPage,
    createProject,
    renderProject,
}
