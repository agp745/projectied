const models = require("../models")
const bcrypt = require("bcryptjs")
const { Op } = require("sequelize")

const signup = async (req, res) => {
    const user = req.body.username
    const email = req.body.email

    const users = await models.User.findAll({
        where: {
            [Op.or]: [{ username: user }, { email: email }],
        },
    })
    console.log(users)
    const existingUserErr = "username &/or email is already registered"

    if (users === []) {
        res.render("signup", { existingErr: existingUserErr })
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await models.User.build({
            username: user,
            email: email,
            password: hashedPassword,
        })

        if (req.session) {
            req.session.user = req.body.username
        }

        await newUser.save()
        console.log("new user added")

        res.redirect("/home")
    }
}

const login = async (req, res) => {
    const user = await models.User.findOne({
        where: {
            username: req.body.username,
        },
    })

    const password = req.body.password
    const hash = user.dataValues.password

    if (user) {
        const result = await bcrypt.compare(password, hash)

        if (result) {
            if (req.session) {
                req.session.user = req.body.username
            }
            res.redirect("/home")
        }
    } else {
        res.render("login", { err: "invalid username" })
    }
}

const signout = async (req, res) => {
    const user = req.session.user
    req.session.user = null
    res.render("login", { message: `successfully signed out as ${user}` })
}

module.exports = { signup, login, signout }
