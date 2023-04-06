const models = require("../models")
const { Op } = require("sequelize")
const e = require("express")

const addCollaborator = async (req, res) => {
    const project_id = req.params.project_id
    const input = req.body.addedUser

    const user = await models.User.findOne({
        where: {
            [Op.or]: [{ username: input }, { email: input }],
        },
    })

    if (user) {
        const userInfo = user.dataValues

        const existingCollaborator = await models.Share.findOne({
            where: {
                project_id: project_id,
                user_id: userInfo.id,
            },
        })

        if (existingCollaborator) {
            console.log(
                `${userInfo.username} is already a collaborator on this project`
            )
            res.redirect(`/project/${project_id}`)
        } else {
            const newCollaborator = await models.Share.build({
                project_id: project_id,
                user_id: userInfo.id,
            })

            await newCollaborator.save()
            console.log("new collaborator added to your project!")

            res.redirect(`/project/${project_id}`)
        }
    } else {
        res.send("user dont exist bud")
    }
}

const showCollaborators = async (req, res) => {
    const project_id = req.params.project_id

    const collabs = await models.Share.findAll({
        where: {
            project_id: project_id,
        },
    })

    if (collabs[0]) {
        const userIds = collabs.map((collab) => collab.dataValues.user_id)

        const usersInfo = await Promise.all(
            userIds.map(async (id) => {
                const user = await models.User.findByPk(id)

                const data = {
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    email: user.dataValues.email,
                    picture: user.dataValues.picture,
                }

                return data
            })
        )

        res.json(usersInfo)
    } else {
        res.json({ message: "no collaborators yet" })
    }
}

module.exports = {
    addCollaborator,
    showCollaborators,
}
