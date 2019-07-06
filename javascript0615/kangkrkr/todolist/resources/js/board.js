// 게시판 클래스 (ROOT)
export class Board {

    // 게시판 생성자.
    // When this constructor called,
    // Then init the parsedList with JSON Object in localStorage.
    // After, paint the all todo list.
    // We can expect lazy loading effection..(?)
    constructor() {
        this.parsedList = [];
        this.editFlag = false;

        let storageList = localStorage.getItem('todoList');
        if(storageList) {
            this.parsedList = JSON.parse(storageList);
        }
        
        this.paint();
    }

    // TODO 항목 추가
    add(todoItem, action) {
        const validObj = this.isValid(todoItem);

        if(validObj.check) {
            if(action == 'add') {
                this.parsedList.push(todoItem);
            }else if(action == 'edit' && this.editIdx >= 0) {
                this.parsedList[this.editIdx] = todoItem;
                todoItem = undefined;
            }
            
            localStorage.setItem('todoList', JSON.stringify(this.parsedList));
            this.paint(todoItem);
        }else {
            alert(validObj.message);
            return;
        }
    }

    // This is under plan..
    edit(target, index) {
        if(!this.editFlag) {
            document.getElementById('submit_todo').className = 'edit';

            let childIdx = target.dataset.index;
            let cont = document.querySelectorAll('#item_' + childIdx + ' td');
            let submitCont = document.getElementById('submit_cont');
            let submitBtn = document.getElementById('submit_todo');

            this.editIdx = index;
            document.querySelectorAll('[name=todo_form] input').forEach((item, index) => {
                item.value = cont[index].innerText;
            });
            submitBtn.innerText = '수정';

            let cancelBtn = document.createElement('BUTTON');
            cancelBtn.style.width = '40px';
            cancelBtn.innerText = '취소';
            
            cancelBtn.addEventListener('click', (e) => {
                submitBtn.innerText = '입력';
                submitCont.removeChild(cancelBtn);
                this.editFlag = false;
                this.editIdx  = undefined;

                document.getElementById('submit_todo').className = 'add';
            });

            submitCont.append(cancelBtn);
            this.editFlag = true;
        }
    }
    remove(target, index) {
        let cont = document.getElementById('todo_container');
        let childIdx = target.dataset.index;
        let child = document.getElementById('item_' + childIdx);
        
        cont.removeChild(child);
        // splice(index, deleteCnt)
        this.parsedList.splice(childIdx, 1);
        localStorage.setItem('todoList', JSON.stringify(this.parsedList));
    }

    // 유효성 체크
    isValid(target) {
        let attrs = Object.keys(target.todoItem);

        // 
        let validObj = {
            check : true,
            message : '',
        };

        let start = parseInt(target.todoItem['start'].replace(/\-/ig, ''));
        let end = parseInt(target.todoItem['end'].replace(/\-/ig, ''));
        
        // 모든 필드의 데이터입력 유무 체크
        attrs.forEach((v, i) => {
            validObj.check &= (target.todoItem[v] ? true : false);
        });

        // 시작일과 종료일 체크
        if(validObj.check) {
            // 시작일이 종료일보다 앞선 경우, swap 처리.
            if(start > end) {
                this.replaceDate(target);
            }
        }
        // 필드 중 하나라도 입력이 되지 않은 경우
        else {
            validObj.message = '모든 항목을 입력해주세요.';
        }

        return validObj;
    }

    replaceDate(target) {
        document.todo_form.start.value = target.todoItem['end'];
        document.todo_form.end.value = target.todoItem['start'];

        let temp = target.todoItem['start'];
        target.todoItem['start'] = target.todoItem['end'];
        target.todoItem['end'] = temp;
    }

    // 실제 TODO 항목 그리기
    paint(todoItem) {
        if(this.parsedList){
            if(todoItem) {
                let seq = this.parsedList.length - 1;
                this.appendItem(todoItem, seq);
            }
            else {
                document.querySelectorAll('.item').forEach(function(e, i) {
                    e.remove();
                });

                this.parsedList.forEach((e,i) => {
                    this.appendItem(e, i);
                });
            }
        }
    }

    appendItem(item, index) {
        let tr = document.createElement('TR');
        tr.className = 'item';
        tr.id = 'item_' + index;

        let mapper = {0 : item.todoItem.todo, 1 : item.todoItem.start, 2 : item.todoItem.end};
        for(let i=0; i<5; i++) {
            let td = document.createElement('TD');
            if(i < 3) {
                td.innerText = mapper[i];
            }else {
                let btn = document.createElement('BUTTON');

                btn.dataset.index = index;
                btn.style.width = '40px';
                if(i == 3) {
                    btn.innerText = '수정';
                    btn.className = 'edit';
                }
                if(i == 4) {
                    btn.innerText = '삭제';
                    btn.className = 'remove';
                }

                btn.addEventListener('click', (e) => {
                    let action = e.target.className;
                    if(action == 'edit')        this.edit(e.target, index);
                    else if(action == 'remove') this.remove(e.target, index);
                });

                td.append(btn);
            }
            
            tr.append(td);
        }

        document.getElementById('todo_container').append(tr);
    }
}