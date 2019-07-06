import { Board } from './board.js';


window.onload = function() {
    const board = new Board();

    document.getElementById('submit_todo').addEventListener('click', function(e){
        let todoObj = {
            todoItem : {}
        };

        document.querySelectorAll('form input').forEach((input, index) => {
            todoObj.todoItem[input.name] = input.value || '';
        });

        let action = e.target.className;
        board.add(todoObj, action);
    });
};
