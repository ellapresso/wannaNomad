const formToDo = document.querySelector('.formTodo'),
    inputToDo = document.querySelector('.inputTodo'),
    listBox = document.querySelector('.listBox');

let toDoList = [];
const localList = 'localList';

//input에서 가져온 값 저장하기
function saveToDo(form) {
    let num = toDoList.length + 1;
    const toDo = {
        num,
        contents: form.inputTD.value
    };
    toDoList.push(toDo);
    saveLocal();
}

//로컬에 저장 !
function saveLocal() {
    localStorage.setItem(localList, JSON.stringify(toDoList));
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
    let num = toDoList.length + 1;
    const li = document.createElement('li');
    li.id = num;
    li.className = 'collection-item';
    li.innerHTML =
        `<label>
<input type="checkbox" />
<span>` +
        text +
        `</span>
<input type="button" class="btn-small purple darken-4" onClick="deleteList(this)" value="del" />
<input type="button" class="btn-small purple darken-4" onClick="editList(this)" value="edit" />
</label>`;
    listBox.appendChild(li);
    const toDo = {
        num,
        contents: text
    };
    toDoList.push(toDo);
}

function deleteList(v) {
    const del = v.parentNode.parentNode;
    listBox.removeChild(del);
    const cleanToDo = toDoList.filter(function (toDo) {
        return toDo.num !== parseInt(del.id);
    });
    toDoList = cleanToDo;
    saveLocal();
}

function editList(v) {
    const id = v.parentNode.parentNode.id;
    console.log(document.getElementById(id).innerHTML)
    document.getElementById(id).innerHTML = `<form id="` + id + `"onsubmit="return editToDo(this);">
<div class="input-field col s10">
<input class="inputTodo" name="inputTD" type="text" value="` + toDoList[id - 1].contents + `"placeholder="INPUT TO DO" />
</div></form>
`
}

function editToDo(form) {
    const id = form.id - 1;
    toDoList[id].contents = form.inputTD.value;
    saveLocal()
}

loadToDo();
