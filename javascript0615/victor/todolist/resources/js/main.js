window.onload = function(){
    const list = document.getElementById('divTable');

    for(let i =0; i < localStorage.length; i++){
        const todoJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const check = document.createElement('div');
        const checkInput = document.createElement("input");
        checkInput.setAttribute("type", "checkbox");
        check.appendChild(checkInput);
        const todo = document.createElement('div');
        todo.appendChild(document.createTextNode(todoJson.todo));
        const fromDate = document.createElement('div');
        fromDate.appendChild(document.createTextNode(todoJson.fromDate));
        const toDate = document.createElement('div');
        toDate.appendChild(document.createTextNode(todoJson.toDate));

        const tr = document.createElement('div');
        tr.classList.add('tr');
        tr.appendChild(check);
        tr.appendChild(todo);
        tr.appendChild(fromDate);
        tr.appendChild(toDate);

        list.appendChild(tr);
    }

    document.getElementById('insert').addEventListener('click',() => {
        if(!isValid()){ return; }

        const todoList = new Object();
        let key = 0;

        if(localStorage.length > 0){
            const keyString = localStorage.key(localStorage.length - 1);
            key = keyString.charAt(keyString.length - 1);
        }

        todoList.todo = document.getElementById('todo').value;
        todoList.fromDate = document.getElementById('fromDate').value;
        todoList.toDate = document.getElementById('toDate').value;

        localStorage.setItem('todo_'+(Number(key)+1), JSON.stringify(todoList));

        location.reload();
    });

    document.getElementById('udpate').addEventListener('click',() => {
        return;
    });

    document.getElementById('delete').addEventListener('click',() => {
        return;
    });

    document.getElementById('complete').addEventListener('click',() => {
        return;
    });

    document.getElementById('clear').addEventListener('click',() => {
        localStorage.clear();
        console.log(localStorage);
    });
};

function isValid(){
    if(document.getElementById('todo').value == ''){
        alert('할일을 입력하세요');
        return false;
    }
    if(document.getElementById('fromDate').value == ''){
        alert('시작일을 입력하세요');
        return false;
    }
    if(document.getElementById('toDate').value == ''){
        alert('종료일을 입력하세요');
        return false;
    }
    if(document.getElementById('fromDate').value > document.getElementById('toDate').value){
        alert('시작일이 종료일보다 클 수 없습니다');
        return false;
    }
    if(new Date(document.getElementById('fromDate').value) < new Date()){
        alert('시작일은 오늘보다 미래여야합니다.');
        return false;
    }
    return true;
}