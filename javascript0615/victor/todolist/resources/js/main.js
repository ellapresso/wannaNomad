window.onload = function(){
    printList();

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

        printList();
    });

    document.getElementById('update').addEventListener('click',() => {
        let isChecked = false;
        for(let i=0; i < localStorage.length; i++){
            if(document.getElementById(localStorage.key(i)).checked){
                isChecked = true;
                if(!isValid()){ return; }

                const confirm = window.confirm("수정하시겠습니까?");

                if (confirm) {
                    const todoList = new Object();
                    todoList.todo = document.getElementById('todo').value;
                    todoList.fromDate = document.getElementById('fromDate').value;
                    todoList.toDate = document.getElementById('toDate').value;
    
                    localStorage.setItem(localStorage.key(i), JSON.stringify(todoList));
    
                    printList();
                }
                
            }
        }

        if(!isChecked){
            alert('선택된 항목이 없습니다');
            return;
        }
    });

    document.getElementById('delete').addEventListener('click',() => {
        let isChecked = false;
        for(let i=0; i < localStorage.length; i++){
            if(document.getElementById(localStorage.key(i)).checked){
                isChecked = true;

                const confirm = window.confirm("삭제하시겠습니까?");

                if (confirm) {
                    localStorage.removeItem(localStorage.key(i));

                    printList();
                }
            }
        }

        if(!isChecked){
            alert('선택된 항목이 없습니다');
            return;
        }

        printList();
    });

    document.getElementById('complete').addEventListener('click',() => {
        printList();
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

function printList(){
    const list = document.getElementById('todoList');

    if(list.hasChildNodes()){
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
    
    for(let i =0; i < localStorage.length; i++){
        const todoJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const check = document.createElement('div');
        const checkInput = document.createElement("input");
        checkInput.setAttribute('type', 'checkbox');
        checkInput.setAttribute('id', localStorage.key(i));
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
}