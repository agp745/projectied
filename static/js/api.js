const todoList = document.querySelector("#todoList")
const activeList = document.querySelector("#activeList")
const completedList = document.querySelector("#completedList")

const project_id = document.querySelector("#projectId")

// const url = "http://localhost:8080"
const url = "https://projectied.onrender.com"

const id = project_id.innerText

const getTodos = async (id) => {
    const request = await fetch(`${url}/project/todo/${id}`).then((response) =>
        response.json()
    )

    console.log(request)
    const items = request.map((todo) => {
        return `
        <div class="taskCard">
            <form method="post" action="/project/todo/delete/${todo.project_id}/${todo.id}">
                <div>${todo.todo_text}</div>
                <div class="dateStyle">${todo.date}</div>
                <br>
                <img src="${todo.picture}">
                <input type="hidden" name="id" value="${todo.id}">
                <button class="trashButton"><i class='bx bx-trash' ></i></button>
            </form>

            <form method="post" action="/project/active/${todo.project_id}/${todo.id}">
                <input type="hidden" name="text" value="${todo.todo_text}">
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
            <form method="post" action="/project/active/delete/${active.project_id}/${active.id}">
                <div>${active.active_text}</div>
                <div class="dateStyle">${active.date}</div>
                <br>
                <img src="${active.picture}">
                <input type="hidden" name="id" value="${active.id}">
                <button class="trashButton"><i class='bx bx-trash' ></i></button>
            </form>

            <form method="post" action="/project/completed/${active.project_id}/${active.id}">
                <input type="hidden" name="text" value="${active.active_text}">
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
        <div class="completeTaskCard">
            <form method="post" action="/project/completed/delete/${completed.project_id}/${completed.id}">
                <div>${completed.complete_text}</div>
                <div class="dateStyle">${completed.date}</div>
                <br>
                <img src="${completed.picture}">
                <input type="hidden" name="id" value="${completed.id}">
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
