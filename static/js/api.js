const todoList = document.querySelector("#todoList")
const activeList = document.querySelector("#activeList")
const completedList = document.querySelector("#completedList")

const project_id = document.querySelector("#projectId")

const url = "http://localhost:8080"

const id = project_id.innerText

const getTodos = async (id) => {
    const request = await fetch(`${url}/project/todo/${id}`).then((response) =>
        response.json()
    )

    const items = request.map((todo) => {
        return `
        <form method="post" action="/project/todo/delete/${todo.project_id}/${todo.id}">
            <div>${todo.todo_text}</div>
            <div>${todo.createdAt}
            <input type="hidden" name="id" value="${todo.id}">
            <button>delete task</button>
        </form>

        <form method="post" action="/project/active/${todo.project_id}/${todo.id}">
            <input type="hidden" name="text" value="${todo.todo_text}">
            <button>Start</button>
        </form>
        `
    })
    todoList.innerHTML += items.join(" ")
}

const getActives = async (id) => {
    const request = await fetch(`${url}/project/active/${id}`).then(
        (response) => response.json()
    )

    console.log(request)
    const items = request.map((active) => {
        return `
        <form method="post" action="/project/active/delete/${active.project_id}/${active.id}">
            <div>${active.active_text}</div>
            <div>${active.createdAt}
            <input type="hidden" name="id" value="${active.id}">
            <button>delete task</button>
        </form>

        <form method="post" action="/project/completed/${active.project_id}/${active.id}">
            <input type="hidden" name="text" value="${active.active_text}">
            <button>Complete</button>
        </form>
        `
    })
    activeList.innerHTML += items.join(" ")
}

const getCompleted = async (id) => {
    const request = await fetch(`${url}/project/completed/${id}`).then(
        (response) => response.json()
    )

    const items = request.map((completed) => {
        return `
        <form method="post" action="/project/completed/delete/${completed.project_id}/${completed.id}">
            <div>${completed.complete_text}</div>
            <div>${completed.createdAt}
            <input type="hidden" name="id" value="${completed.id}">
            <button>delete task</button>
        </form>
        `
    })
    completedList.innerHTML += items.join(" ")
}

getTodos(id)
getActives(id)
getCompleted(id)
