
/*
       stroke() :: 현재까지 설정한 그림들을 그리는 함수
    beginPath() :: 선을 그릴때 시작하는 함수
    closePath() :: 선을 그릴때 닫아서 시작점과 잇는 함수
     fillRect() :: 채워진 사각형을 그리는 함수
         rect() :: 윤곽선만 있는 사각형을 그리는 함수
    clearRect() :: 사각형의 범위를 지우는 함수
 */

var canvas = document.getElementById('worldMap');
// 2D rendering context를 ctx 변수에 저장
var ctx = canvas.getContext('2d');

// 사각형만들기
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.closePath();