class TodoList {
  constructor(props) {
    this.target = props;
    this.list = JSON.parse(localStorage.getItem(this.target.todoList)) || {};
    this.totalCnt = Object.keys(this.list).length || 0;
    this.currId = Number(Object.keys(this.list)[this.totalCnt - 1]) || 0;
  }

  // 초기화
  setInit() {
    this.setDate();
    this.setTotalCnt();
    if (this.totalCnt > 0) this.renderList();
  }

  // 오늘 날짜 설정
  setDate() {
    const date = new Date().toISOString().substring(0, 10);
    document.querySelectorAll("h1")[0].innerHTML = date;
  }

  // 리스트 총 갯수 설정
  setTotalCnt() {
    document.getElementById(this.target.total).innerHTML = Object.keys(this.list).length + " Tasks";
  }

  // 리스트 조회 및 랜더
  renderList() {
    const htmls = Object.keys(this.list).map((v, i) => {
      const value = this.list[v];
      return `
        <div class="list" id="list_${value.id}">
          <div class="checkbox_wrap">
            <input type="checkbox" name="check" 
            data-id="${value.id}" 
            id="checkbox_${value.id}" ${value.checked ? "checked" : ""}
            onchange="onCheck(event)"
        />
            <label for="checkbox_${value.id}"></label>
          </div>
          <div class="task_wrap">
            <span class="task_contents ${value.checked ? "line" : ""}">
            ${value.task}
            </span>
          </div>
          <div class="btn_wrap">
            <span class="modify" data-id="${value.id}" onclick="onEditMode(event)"></span>
            <span class="trash" data-id="${value.id}" onclick="onDelete(event)"></span>
          </div>
        </div>`.trim();
    });

    const target = document.getElementById(this.target.list);
    target.innerHTML = htmls.join("");
    this.setTotalCnt();
  }

  // 리스트 등록
  onSubmit() {
    // 배열을 업데이트 할 일 있다면,keyed-by-id 객체 사용(일반 배열보다 약 11배 빠름)
    // https://jsperf.com/array-vs-byid
    this.list = {
      ...this.list,
      [++this.currId]: {
        id: this.currId,
        task: document.getElementById(this.target.input).value,
        checked: false
      }
    };
    this.utilSetStore(this.target.todoList, this.list);
    this.renderList();
  }

  // 리스트 삭제
  onListDelete(id) {
    delete this.list[id];
    this.utilSetStore(this.target.todoList, this.list);
    this.renderList();
  }

  //수정 모드 전환
  onEditMode(id) {
    const target = document.getElementById("list_" + id);
    target.querySelector(".task_wrap").innerHTML = `<input type="text" class="task_contents" value="${this.list[id].task}"/>`;
    target.querySelector(".btn_wrap").innerHTML = `<span class="completed" data-id="${id}" onclick="onEdit(event)"></span>`;
    target.querySelector(".task_contents").focus();
  }

  // 리스트 수정
  onEdit(id) {
    this.list[id].task = document.getElementById("list_" + id).querySelector(".task_contents").value;
    this.utilSetStore(this.target.todoList, this.list);
    this.renderList();
  }

  // 리스트 Check 상태 변경
  onChangeCheck(id, checked = false) {
    this.list[id].checked = checked;
    this.utilSetStore(this.target.todoList, this.list);
    this.renderList();
  }

  // util method
  // localStorage 저장
  utilSetStore(target, data) {
    localStorage.setItem(target, JSON.stringify(data));
  }
  // 이벤트
  utilEvt(target, callback) {
    const id = target.dataset["id"]; //IE 11 이상만 지원
    const checked = target.checked;
    callback.call(this, id, checked);
  }
}

class TodoEvent extends TodoList {
  constructor(props) {
    super(props);
    console.log(props);
  }

  test() {
    console.log(1);
  }
}

const target = {
  header: "title",
  todoList: "todoList",
  total: "total_tasks",
  list: "list_wrap",
  input: "task"
};

const todolist = new TodoEvent(target);
todolist.setInit();
todolist.test();

// 리스트 등록
const todoForm = document.getElementById("todoForm");
todoForm.onsubmit = event => {
  event.preventDefault();
  todolist.onSubmit();
  todoForm.reset();
};

// check 저장
const onCheck = ({ currentTarget }) => {
  todolist.utilEvt(currentTarget, todolist.onChangeCheck);
};

// 리스트 삭제
const onDelete = ({ currentTarget }) => {
  todolist.utilEvt(currentTarget, todolist.onListDelete);
};

//리스트 수정모드
const onEditMode = ({ currentTarget }) => {
  todolist.utilEvt(currentTarget, todolist.onEditMode);
};

// 리스트 수정완료
const onEdit = ({ currentTarget }) => {
  todolist.utilEvt(currentTarget, todolist.onEdit);
};
