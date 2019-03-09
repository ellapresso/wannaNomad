// 초기화 모듈 로딩..
import { init } from './init.js';



const BOARD_OPT = {
    rectWidth   : 40,
    rectHeight  : 40,
    wInWidth    : window.innerWidth,
    wInHeight   : window.innerHeight,
    CANVAS_DATA  : {
        canvas : init.getById('board'),
        width  : window.innerWidth/2 + 100,
        height : window.innerHeight * (2/3) + 80,
        style  : {
            attr : 'border',
            value : '1px solid gray'
        }
    },
};

let BOARD_DATA = {
    curXPoint : 0,
    curYPoint : BOARD_OPT.CANVAS_DATA.height - BOARD_OPT.rectHeight,
    boards    : [],
    keys      : init.doInit(BOARD_OPT)
};

const canvas     = BOARD_OPT.CANVAS_DATA.canvas;
const ctx        = canvas.getContext('2d');

canvas.width     = BOARD_OPT.CANVAS_DATA.width;
canvas.height    = BOARD_OPT.CANVAS_DATA.height;
canvas.style[BOARD_OPT.CANVAS_DATA.style.attr] = BOARD_OPT.CANVAS_DATA.style.value;

ctx.fillRect(BOARD_DATA.curXPoint, BOARD_DATA.curYPoint, BOARD_OPT.rectWidth, BOARD_OPT.rectHeight);

setInterval(function(){
    let color = [
        Math.ceil(Math.random() * 255 + 1),
        Math.ceil(Math.random() * 255 + 1),
        Math.ceil(Math.random() * 255 + 1),
        Math.random().toFixed(1),
    ].join(',');
    ctx.fillStyle = 'rgba('+color+')';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(BOARD_DATA.keys[37]){
        BOARD_DATA.curXPoint = 
            (BOARD_DATA.curXPoint <= 0) ? 0 : BOARD_DATA.curXPoint - 10;
    }
    if(BOARD_DATA.keys[39]) {
        BOARD_DATA.curXPoint = 
            (BOARD_DATA.curXPoint + BOARD_OPT.rectWidth >= canvas.width) ? BOARD_DATA.curXPoint : BOARD_DATA.curXPoint + 10;
    }
    if(BOARD_DATA.keys[38]) {
        BOARD_DATA.curYPoint =
            (BOARD_DATA.curYPoint <= 0) ? 0 : BOARD_DATA.curYPoint - 10;
    }
    if(BOARD_DATA.keys[40]) {
        BOARD_DATA.curYPoint =
            (BOARD_DATA.curYPoint + BOARD_OPT.rectHeight >= canvas.height) ? BOARD_DATA.curYPoint : BOARD_DATA.curYPoint + 10;
    }
    if(!BOARD_DATA.keys[16]) {
        BOARD_DATA.boards = BOARD_DATA.boards.filter((v, i) => {
            const x = v.x;
            const y = v.y;
    
            if(BOARD_DATA.curXPoint != x || BOARD_DATA.curYPoint != y) return v;
        });
        BOARD_DATA.boards.push({x: BOARD_DATA.curXPoint, y: BOARD_DATA.curYPoint});
    }
    BOARD_DATA.boards.map((v, i) => {
        ctx.fillRect(v.x + BOARD_OPT.rectWidth/2 - 5, v.y + BOARD_OPT.rectHeight/2 - 3, 10, 10);    
    });
    ctx.fillRect(BOARD_DATA.curXPoint, BOARD_DATA.curYPoint, BOARD_OPT.rectWidth, BOARD_OPT.rectHeight);
}, 20);