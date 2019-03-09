var BLOCK_OBJ = {
    INTERVAL : 150,
    BLOCK_SIZE : 30,
    BOARD_WIDTH : 600,
    BOARD_HEIGHT : 600,
    T_BLOCK : {
        points : [
            [
                {x: 1, y: 1},  // 왼쪽
                {x: 2,  y: 1}, // 중앙
                {x: 3,  y: 1}, // 오른쪽
                {x: 2,  y: 2}, // 밑
            ],
            [
                {x: 2,  y: 0},  // 왼쪽 겸 위
                {x: 2,  y: 1},  // 중앙
                {x: 3,  y: 1},  // 오른쪽
                {x: 2, y: 2},   // 및
            ],
            [
                {x: 1,  y: 1},  // 왼쪽
                {x: 2,  y: 0},  // 위
                {x: 3, y: 1},   // 오른쪽
                {x: 2,  y: 1},  // 중앙 겸 밑
            ],
            [
                {x: 1,  y: 1},  // 왼쪽
                {x: 2,  y: 1},  // 중앙
                {x: 2, y: 0},   // 오른쪽 겸 위
                {x: 2,  y: 2},  // 밑
            ]
        ],
        bases : [0,1,2,3]
    },
    CUR_BLOCK() {
        return this.T_BLOCK;
    }
};

window.onload = function() {
    var canvas = document.getElementById('board');

    canvas.width = BLOCK_OBJ.BOARD_WIDTH;
    canvas.height = BLOCK_OBJ.BOARD_HEIGHT;
    canvas.style.border = '1px solid gray';

    var ctx = canvas.getContext('2d');
    
    var curPosX = 0;
    var curPosY = 0;
    var blockSize = BLOCK_OBJ.BLOCK_SIZE;
    var tBlock = BLOCK_OBJ.CUR_BLOCK();
    
    document.addEventListener('keydown', function(e){
        if(e.keyCode == 32) {
            var curBlock = BLOCK_OBJ.CUR_BLOCK();
            var bases = curBlock.bases;
            var rotate = bases.shift();
            bases.push(rotate);
        }else if(e.keyCode == 39) {
            var curBlock = tBlock.points[tBlock.bases[0]][2];
            if(curBlock.x * blockSize + curPosX < BLOCK_OBJ.BOARD_WIDTH - blockSize) {
                curPosX += blockSize;
            }
        }else if(e.keyCode == 37) {
            var curBlock = tBlock.points[tBlock.bases[0]][0];
            if(curBlock.x * blockSize + curPosX > 0) {
                curPosX -= blockSize;
            }
        }else if(e.keyCode == 40) {
            //curPosY += blockSize;
        }
        
    });
    
    var job = setInterval(doUpdate, BLOCK_OBJ.INTERVAL);
    
    function doUpdate() {
        curPosY+=20;
        
        ctx.clearRect(0, 0, 600, 600);
        var curBlock = tBlock.points[tBlock.bases[0]];
        for(var i=0; i<curBlock.length; i++) {
            var obj = curBlock[i];
            ctx.fillRect(obj.x * blockSize + curPosX, obj.y * blockSize + curPosY, blockSize, blockSize);
        }
        if(curBlock[3].y * blockSize + curPosY >= 600 - blockSize) {
            clearInterval(job);
            curPosY = 0;
            setTimeout(function(){
                //alert('Game Over.. (미구현)');
            }, 100);
        }
    }
};


