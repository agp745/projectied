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

    const user = await models.User.findOne({
        where: {
            username: username,
            email: email,
        },
    })

    if (user) {
        res.redirect("/home")
    } else {
        const newUser = await models.User.build({
            username: username,
            email: email,
        })

        await newUser.save()
        console.log(`New user "${username}" added`)
        res.redirect("/home")
    }
}

module.exports = { addOrGetUser, getUser }
