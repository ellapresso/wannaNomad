console.log('Js 시작');
/*
    Canvas Context 생성
*/
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d'); // 2d 그래픽의 경우, 2d라고 지정
console.log(context);

const INTERVAL = 100;

let startX, startY = 30;
let radius = 10;
let circleStart = 0;
let circleEnd = Math.PI*2;

// 캔버스 속성 셋팅 
canvas.width  = 600;
canvas.height = 600;
canvas.style.border = '1px solid gray';

/*
    원그리기
    arc(x, y, 반지름, angle시작점, angle종료점, 시계/반시계)

    context.beginPath();
    context.arc(startX,startY,radius,circleStart,circleEnd);
    context.stroke();
*/

// 키보드 이벤트 등록
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;

    //오른쪽 방향키
    if(keyCode == 39) {
        startX += 10;
    }
    //왼쪽 방향키
    else if(keyCode == 37) {
        startX -= 10;
    }
    //위쪽 방향키
    else if(keyCode == 38) {
        startX += 10;
    }
    //아래쪽 방향키
    else if(keyCode == 40) {
        startX += 10;
    }
});

// 화면 갱신 처리 (0.1초 주기)
setInterval(() => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(startX,startY,radius,circleStart,circleEnd);
    context.stroke();

}, INTERVAL);