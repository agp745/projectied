const models = require("../models")
const { Op } = require("sequelize")

const homePage = async (req, res) => {
    const user = req.oidc.user.nickname
    const imageURL = req.oidc.user.picture

    res.render("index", { user: user, image: imageURL })
}

module.exports = { homePage }
