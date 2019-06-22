window.onload = function(){
    document.getElementById('insert').addEventListener('click',() => {
        const todoList = new Object();
        let key = 0;

        if(localStorage.length > 0){
            const keyString = localStorage.key(localStorage.length - 1);
            key = keyString.charAt(keyString.length-1);
        }

        todoList.todo = document.getElementById('todo').value;
        todoList.fromDate = document.getElementById('fromDate').value;
        todoList.toDate = document.getElementById('toDate').value;

        localStorage.setItem('todo_'+(Number(key)+1), JSON.stringify(todoList));

        location.reload();
    });

    document.getElementById('clear').addEventListener('click',() => {
        localStorage.clear();
        console.log(localStorage);
    });
    
    const list = document.getElementById('divTable');

    for(let i =0; i < localStorage.length; i++){
        const check = document.createElement('div');
        const todo = document.createElement('div');
        todo.appendChild(document.createTextNode(localStorage.getItem(localStorage.key(i)).todo));
        const fromDate = document.createElement('div');
        fromDate.appendChild(document.createTextNode(localStorage.getItem(localStorage.key(i)).fromDate));
        const toDate = document.createElement('div');
        toDate.appendChild(document.createTextNode(localStorage.getItem(localStorage.key(i)).toDate));

        const tr = document.createElement('div');
        tr.appendChild(check);
        tr.appendChild(todo);
        tr.appendChild(fromDate);
        tr.appendChild(toDate);

        console.log(tr);
        //console.log(localStorage.getItem(localStorage.key(i)));

        list.appendChild(tr);
    }
};

