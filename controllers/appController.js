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

    const collaboratorsArr = await models.Share.findAll({
        where: {
            project_id: id,
        },
    })

    const collaborators = await Promise.all(
        collaboratorsArr.map(async (person) => {
            const id = person.dataValues.user_id
            const user = await models.User.findOne({
                where: {
                    id: id,
                },
            })

            const collabInfo = {
                user: user.dataValues.username,
                image: user.dataValues.picture,
            }
            return collabInfo
        })
    )

    const metaData = {
        user: username,
        image: imageURL,
        project_id: id,
        title: projectInfo.title,
        description: projectInfo.description,
        admin: user.dataValues.username,
        imageURL: projectInfo.imageURL,
        collaborators: collaborators,
    }

    console.log(collaborators)

    res.render("project", metaData)
}

const deleteProject = async (req, res) => {
    const project_id = req.params.project_id

    await models.Todo.destroy({
        where: {
            project_id: project_id,
        },
    })

    await models.Active.destroy({
        where: {
            project_id: project_id,
        },
    })

    await models.Complete.destroy({
        where: {
            project_id: project_id,
        },
    })

    await models.Share.destroy({
        where: {
            project_id: project_id,
        },
    })

    await models.Project.destroy({
        where: {
            id: project_id,
        },
    })

    console.log("Project Deleted")
    res.redirect("/home")
}

module.exports = {
    listProjects,
    createProjectPage,
    createProject,
    renderProject,
    deleteProject,
}
