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
        <div class="taskCard">
            <form method="post" action="/project/todo/delete/${todo.info.project_id}/${todo.info.id}">
                <div>${todo.info.todo_text}</div>
                <div class="dateStyle">${todo.info.date}</div>
                <br>
                <img src="${todo.image}">
                <input type="hidden" name="id" value="${todo.info.id}">
                <button class="trashButton"><i class='bx bx-trash' ></i></button>
            </form>

            <form method="post" action="/project/active/${todo.info.project_id}/${todo.info.id}">
                <input type="hidden" name="text" value="${todo.info.todo_text}">
                <button class="startButton"><i class='bx bx-right-arrow-alt'></i></button>
            </form>
        </div>
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
        <div class="taskCard">
            <form method="post" action="/project/active/delete/${active.info.project_id}/${active.info.id}">
                <div>${active.info.active_text}</div>
                <div class="dateStyle">${active.info.date}</div>
                <br>
                <img src="${active.image}">
                <input type="hidden" name="id" value="${active.info.id}">
                <button class="trashButton"><i class='bx bx-trash' ></i></button>
            </form>

            <form method="post" action="/project/completed/${active.info.project_id}/${active.info.id}">
                <input type="hidden" name="text" value="${active.info.active_text}">
                <button class="startButton"><i class='bx bx-right-arrow-alt'></i></button>
            </form>
        </div>
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
        <div class="taskCard">
            <form method="post" action="/project/completed/delete/${completed.info.project_id}/${completed.info.id}">
                <div>${completed.info.complete_text}</div>
                <div class="dateStyle">${completed.info.date}</div>
                <br>
                <img src="${completed.image}">
                <input type="hidden" name="id" value="${completed.info.id}">
                <button class="trashButton"><i class='bx bx-trash' ></i></button>
            </form>
        </div>
        `
    })
    completedList.innerHTML += items.join(" ")
}

getTodos(id)
getActives(id)
getCompleted(id)
