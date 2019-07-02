const formToDo = document.querySelector(".formTodo"),
    inputToDo = document.querySelector(".inputTodo"),
    listBox = document.querySelector(".listBox");

let toDoList = [];
const localList = "localList";

//input에서 가져온 값 저장하기
function saveToDo(form) {
    loadToDo(); //저장전 기존 데이터 불러오기
    let num = toDoList.length + 1
    const toDo = {
        num,
        contents: form.inputTD.value
    };
    toDoList.push(toDo);
    saveLocal();
}

//로컬에 저장 !
function saveLocal() {
    localStorage.setItem(localList, JSON.stringify(toDoList)); //localstorage에 저장할 때, String으로 저장해주어야 함.
}

//기존데이터 불러와서 
function loadToDo() {
    const localData = localStorage.getItem(localList);
    if (localData != null) {
        const savedToDo = JSON.parse(localData);
        savedToDo.forEach(function (toDo) {
            //리스트에저장
            savedlist(toDo.contents);
        });
    }
}

//기존 데이터 리스트에 저장
function savedlist(text) {
    let num = toDoList.length + 1
    const toDo = {
        num,
        contents: text
    };
    toDoList.push(toDo);
}
