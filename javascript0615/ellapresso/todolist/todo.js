const formToDo = document.querySelector(".formTodo"),
    inputToDo = document.querySelector(".inputTodo"),
    listBox = document.querySelector(".listBox");

let toDoList = [];

function saveToDo(form) {
    const toDo = {
        contents: form.inputTD.value
    };
    toDoList.push(toDo);
    console.log(JSON.stringify(toDoList));
    saveToDos();
}

function saveToDos() {
    localStorage.setItem("list", JSON.stringify(toDoList)); //localstorage에 저장할 때, String으로 저장해주어야 함.
}
