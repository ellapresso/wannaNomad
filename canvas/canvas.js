

let posX = 175;
let posY = 175;

window.onload = function () {
    console.log('로딩 완료');


    /**
     * canvas 크기 조정
     */
    document.getElementById('changeRange').addEventListener('click', function (event) {
        const canvas = document.querySelector('.tutorial');

        if ((canvas.width == 600) && (canvas.height = 600)) {
            canvas.width = 350;
            canvas.height = 350;
        } else {
            canvas.width = 600;
            canvas.height = 600;
        }

    });

    /**
     * canvas context 얻기
     * 표시된 내용을 만들고 조작하는데 사용.
     */

    document.getElementById('getContext').addEventListener('click', function (event) {
        const canvas = document.querySelector('.tutorial');
        const canvasContext = canvas.getContext('2d'); // 2d 그래픽의 경우, 2d라고 지정
        console.log(canvasContext);
    });

    /**
     * 도형 그리기
     * 캔버스 좌표는 x 가로축 y 세로축, 왼쪽 위 모서리에 좌표 (0,0) -> (x, y)에 배치
     */

    document.getElementById('setDraw').addEventListener('click', function (event) {
        const canvas = document.querySelector('.tutorial');
        const canvasContext = canvas.getContext('2d'); // 2d 그래픽의 경우, 2d라고 지정\

        // 직사각형
        canvasContext.fillRect(2, 2, 50, 50);  // fillRect(x, y, width, height)
        canvasContext.strokeRect(60, 60, 50, 50); // strokeRect(x, y, width, height)

        canvasContext.strokeRect(100, 100, 50, 50); // strokeRect(x, y, width, height)
        setTimeout(function () {
            //지정된 영역을 clear
            canvasContext.clearRect(100, 100, 50, 50); // clearRect(x, y, width, height)
        }, 2000);


        //삼각형
        canvasContext.beginPath(); // 새로운 선을 그리겠다고 선언
        canvasContext.moveTo(400, 400); //시작좌표(시작점)
        canvasContext.lineTo(450, 350); // 끝나는 좌표
        canvasContext.lineTo(450, 450);
        canvasContext.fill();

        // Stroked triangle
        canvasContext.beginPath();
        canvasContext.moveTo(300, 300);
        canvasContext.lineTo(300, 345);
        canvasContext.lineTo(345, 300);
        canvasContext.closePath();
        canvasContext.stroke();


        //선
        canvasContext.beginPath();
        canvasContext.strokeStyle = 'green';
        canvasContext.moveTo(600, 600);
        canvasContext.lineTo(500, 500);
        canvasContext.stroke();

    });


    // 사각형을 그린다.
    const canvas2 = document.querySelector('.tutorial2');
    const ctx = canvas2.getContext('2d');
    ctx.fillRect(posX, posY, 3,3);

    document.querySelector('body').addEventListener('keydown', initDraw);
};

function initDraw(event) {
    const canvas2 = document.querySelector('.tutorial2');
    const ctx = canvas2.getContext('2d');

    switch (event.keyCode) {
        case 40:
            //down
            if(posY < canvas2.height - 5){
                draw(ctx, posX, posY+2, posX, posY);
            } else {
                gameOver(posX, posY);
            }
            break;
        case 38:
            //up
            if(posY > 3){
                draw(ctx, posX, posY-2, posX, posY);
            } else {
                gameOver(posX, posY);
            }

            break;
        case 37:
            //left
            if(posX > 3){
                draw(ctx, posX-2, posY, posX, posY);
            } else {
                gameOver(posX, posY);
            }

            break;
        case 39:
            //right
            if(posX < canvas2.width - 5){
                draw(ctx, posX+2, posY, posX, posY);
            } else {
                gameOver(posX, posY);
            }

            break;
    }
}

function draw(ctx, changeX, changeY, originPosX, originPosY) {

    // 이전에 그렸던 사각형만 지운다.
    ctx.clearRect(originPosX, originPosY, 3,3);

    // 사각형을 그린다.
    ctx.fillRect(changeX, changeY, 3,3);

    //선을 그린다.
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(originPosX, originPosY);
    ctx.lineTo(changeX, changeY);
    ctx.stroke();

    posX = changeX;
    posY = changeY;
}


function gameOver(originPosX, originPosY) {
    alert('벽에 닿았습니다. 게임 종료!');
    document.querySelector('body').removeEventListener('keydown', initDraw);
    const canvas2 = document.querySelector('.tutorial2');
    const ctx = canvas2.getContext('2d');

    // 이전에 그렸던 사각형만 지운다.
    ctx.clearRect(originPosX, originPosY, 3,3);

}