const models = require("../models")
const { Op } = require("sequelize")
require("dotenv").config()

const addOrGetUser = async (req, res) => {
    res.oidc.login({
        returnTo: "/auth/get-user",
    })
}

const getUser = async (req, res) => {
    console.log(req.oidc.isAuthenticated())
    console.log(req.oidc.user)
    const username = req.oidc.user.nickname
    const email = req.oidc.user.email
    const picture = req.oidc.user.picture

    const user = await models.User.findOne({
        where: {
            username: username,
            email: email,
        },
    })

    if (user.dataValues.picture === null) {
        await models.User.update(
            { picture: picture },
            {
                where: {
                    id: user.dataValues.id,
                },
            }
        )
    }

    if (user) {
        res.redirect("/home")
    } else {
        const newUser = await models.User.build({
            username: username,
            email: email,
            picture: picture,
        })

        await newUser.save()
        console.log(`New user "${username}" added`)
        res.redirect("/home")
    }
}

module.exports = { addOrGetUser, getUser }
