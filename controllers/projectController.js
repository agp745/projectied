const models = require("../models")
const { Op } = require("sequelize")

const addTodo = async (req, res) => {
    const id = req.body.id

    const day = new Date().getDate()
    let month = new Date().getMonth()
    const date = `${(month += 1)}/${day}`

    const userPhoto = req.oidc.user.picture

    const item = await models.Todo.build({
        project_id: id,
        todo_text: req.body.text,
        date: date,
        picture: userPhoto,
    })

    await item.save()

    console.log(`new todo item created`)
    res.redirect(`/project/${id}`)
}

const sendTodo = async (req, res) => {
    const id = req.params.project_id

    const todos = await models.Todo.findAll({
        where: {
            project_id: id,
        },
    })

    const todosInfo = todos.map((item) => item.dataValues)

    // const todosInfo = todos.map((item) => {
    //     return {
    //         info: item.dataValues,
    //         image: userPhoto,
    //     }
    // })

    res.json(todosInfo)
}

const deleteTodo = async (req, res) => {
    const id = req.params.todo_id
    const project_id = req.params.project_id

    await models.Todo.destroy({
        where: {
            id: id,
        },
    })
    console.log("deleted item")

    res.redirect(`/project/${project_id}`)
}

const activate = async (req, res) => {
    const project_id = req.params.project_id
    const todo_id = req.params.todo_id
    const text = req.body.text

    const day = new Date().getDate()
    let month = new Date().getMonth()
    const date = `${(month += 1)}/${day}`

    const todo = await models.Todo.findByPk(todo_id)
    const picture = todo.dataValues.picture

    const activeItem = await models.Active.build({
        project_id: project_id,
        active_text: text,
        date: date,
        picture: picture,
    })

    await activeItem.save()
    console.log("item became Active")

    await models.Todo.destroy({
        where: {
            id: todo_id,
        },
    })
    console.log("...")

    res.redirect(`/project/${project_id}`)
}

const addActive = async (req, res) => {
    const id = req.body.id

    const day = new Date().getDate()
    let month = new Date().getMonth()
    const date = `${(month += 1)}/${day}`

    const userPhoto = req.oidc.user.picture

    const item = await models.Active.build({
        project_id: id,
        active_text: req.body.text,
        date: date,
        picture: userPhoto,
    })

    await item.save()

    console.log(`new active item created`)
    res.redirect(`/project/${id}`)
}

const sendActives = async (req, res) => {
    const id = req.params.project_id

    const actives = await models.Active.findAll({
        where: {
            project_id: id,
        },
    })

    const activesInfo = actives.map((item) => item.dataValues)

    res.json(activesInfo)
}

const deleteActive = async (req, res) => {
    const id = req.params.active_id
    const project_id = req.params.project_id

    await models.Active.destroy({
        where: {
            id: id,
        },
    })

    console.log("item deleted")

    res.redirect(`/project/${project_id}`)
}

const complete = async (req, res) => {
    const project_id = req.params.project_id
    const active_id = req.params.active_id
    const text = req.body.text

    const day = new Date().getDate()
    let month = new Date().getMonth()
    const date = `${(month += 1)}/${day}`

    const active = await models.Active.findByPk(active_id)
    const picture = active.dataValues.picture

    const completedItem = await models.Complete.build({
        project_id: project_id,
        complete_text: text,
        date: date,
        picture: picture,
    })

    await completedItem.save()
    console.log("item completed")

    await models.Active.destroy({
        where: {
            id: active_id,
        },
    })
    console.log("...")

    res.redirect(`/project/${project_id}`)
}

const addCompleted = async (req, res) => {
    const id = req.body.id

    const day = new Date().getDate()
    let month = new Date().getMonth()
    const date = `${(month += 1)}/${day}`

    const userPhoto = req.oidc.user.picture

    const item = await models.Complete.build({
        project_id: id,
        complete_text: req.body.text,
        date: date,
        picture: userPhoto,
    })

    await item.save()

    console.log(`new completed item created`)
    res.redirect(`/project/${id}`)
}

const sendCompleted = async (req, res) => {
    const id = req.params.project_id

    const completed = await models.Complete.findAll({
        where: {
            project_id: id,
        },
    })

    const completedInfo = completed.map((item) => item.dataValues)

    res.json(completedInfo)
}

const deleteCompleted = async (req, res) => {
    const id = req.params.completed_id
    const project_id = req.params.project_id

    await models.Complete.destroy({
        where: {
            id: id,
        },
    })
    console.log("item deleted")

    res.redirect(`/project/${project_id}`)
}

module.exports = {
    addTodo,
    sendTodo,
    deleteTodo,
    activate,
    addActive,
    sendActives,
    deleteActive,
    complete,
    addCompleted,
    sendCompleted,
    deleteCompleted,
}
