

let todoList = [];

let listTemplate = `
            <div class="list">
              <div class="checkbox_wrap">
                <input type="checkbox" name="check" id="checkbox01" />
                <label for="checkbox01"></label>
              </div>
              <div class="task_wrap" >
                <span class="task_contents">{todo}</span>
              </div>
              <div class="btn_wrap">
                <span class="modify"></span>
                <span class="trash"></span>
              </div>
               </div>
`;



const addTodo = ()=>{
    const taskInput = document.getElementById("task");

    let count = todoList.sort(function(a, b){
        return b.id - a.id;
    })[0];

    if(isNaN(count)){
        count = 0;
    }else{
        count++;
    }

    todoList.push({
        id : count,
        todo :  taskInput.value
    });

    localStorage.setItem('todoList', JSON.stringify(todoList));

    view();

    // localStorage.setItem('todoList', JSON.stringify(todoList));
};


const view = () =>{
    const list = document.getElementById("list");

    // todoList= localStorage.getItem('todoList');
    const retrievedObject = localStorage.getItem('todoList');
    todoList = JSON.parse(retrievedObject);

    if(todoList){
        todoList.forEach((e)=>{
            templateInit();
            listTemplate = listTemplate.replace('{todo}',e.todo );
            list.innerHTML += listTemplate;
        });
    }
};

function templateInit() {
    listTemplate = `   
            <div class="list">
              <div class="checkbox_wrap">
                <input type="checkbox" name="check" id="checkbox01" />
                <label for="checkbox01"></label>
              </div>
              <div class="task_wrap" id="todoList">
                <span class="task_contents"> {todo} </span>
              </div>
              <div class="btn_wrap">
                <span class="modify"></span>
                <span class="trash"></span>
              </div>
           </div>
 
`;
}

view();

