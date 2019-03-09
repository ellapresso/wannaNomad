


//const canvas = document.getElementById('canvas');
const canvas = document.querySelector('#canvas');
const ctx    = canvas.getContext('2d');

const INTERVAL = 50;

// 캔버스 속성 셋팅 
canvas.width  = 600;
canvas.height = 600;
canvas.style.border = '1px solid gray';


// 사각형(케릭터) 지정 및 그리기
// 시작지점 X, Y
let curX = 25, curY = 25;

// 사각형의 넓이
const rectWidth = 50, rectHeight = 50;
//  초기 사각형 drawing.
ctx.fillRect(curX, curY, rectWidth, rectHeight);


// 키보드 이벤트 등록
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;

    if(keyCode == 39) {
        curX += 10;
    }
});

// 화면 갱신 처리 (0.1초 주기)
setInterval(() => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(curX, curY, rectWidth, rectHeight);

}, INTERVAL);
