class event {
    constructor(document, list){
        this.list = list;
        this.document = document;
    }

    createTodo(document, localStorage){
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

        this.readTodo();
    }

    readTodo(list){

    }

    updateTodo(list){

    }

    deleteTodo(list){

    }

    setTodo(data){

    }
}

class util {
    constructor(document){
        this.document = document;
    }

    isValid(document){
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
}

export default {event,util};