const models = require("../models")
const { Op } = require("sequelize")

const addTodo = async (req, res) => {
    const id = req.body.id

    const item = await models.Todo.build({
        project_id: id,
        todo_text: req.body.text,
    })

    await item.save()

    console.log(`new item created`)
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

    const activeItem = await models.Active.build({
        project_id: project_id,
        active_text: text,
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

    const completedItem = await models.Complete.build({
        project_id: project_id,
        complete_text: text,
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
    sendActives,
    deleteActive,
    complete,
    sendCompleted,
    deleteCompleted,
}
