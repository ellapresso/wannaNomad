console.log('스크립트 시작.');

let posX = 0;
let posY = 0;

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


    document.querySelector('body').addEventListener('keydown', function (event) {
        const canvas2 = document.querySelector('.tutorial2');
        const ctx = canvas2.getContext('2d');
        ctx.strokeStyle = "green";

        // ctx.beginPath();
        // ctx.moveTo(posX, posY);
        // ctx.lineTo(posX, posY + lineLength);
        // ctx.stroke();

        switch (event.keyCode) {
            case 40:
                //down
                if(posY < canvas2.height){
                    // posY++;
                    // console.log(posY);
                    draw(ctx, posX, posY+1);
                }
                break;
            case 38:
                //up
                if(posY > 0){
                    // posY--;
                    // console.log(posY);
                    draw(ctx, posX, posY-1);
                }

                break;
            case 37:
                //left
                if(posX > 0){
                    // posX--;
                    draw(ctx, posX-1, posY);
                }

                break;
            case 39:
                //right
                if(posX < canvas2.width){
                    // posX++;
                    draw(ctx, posX+1, posY);
                }

                break;
        }

        // console.log(event);
    });

};

function draw(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(x, y);
    ctx.stroke();

    posX = x;
    posY = y;
}