export const test = ()=>{

}
// 초기화 모듈 생성
const init = (function(){
    
    const doc     = document;
    let keys      = [];

    return {
        getById(id) {
            return doc.getElementById(id);
        },
        addEvent(target, type, callback) {
            var isElement = (target.constructor.toString().indexOf('HTML') > -1 || 'Window');
            if(!isElement) {
                alert('강승윤을 등록할 수 없습니다.');
                return;
            }
            target.addEventListener(type, callback);
        },
        doInit(canvas) {
            init.addEvent(window, 'resize', function(e) {
                canvas.width  = this.innerWidth/2 + 100;
                canvas.height = this.innerHeight * (2/3) + 80;
            
                curYPoint = (canvas.height - rectHeight) - 10;
                ctx.fillRect(curXPoint, curYPoint, rectWidth, rectHeight);
            });
            
            init.addEvent(init.getById('left'), 'touchstart', function(e){
                keys[37] = true;
            });
            init.addEvent(init.getById('right'), 'touchstart', function(e){
                keys[39] = true;
            });
            init.addEvent(init.getById('up'), 'touchstart', function(e){
                keys[38] = true;
            });
            init.addEvent(init.getById('down'), 'touchstart', function(e){
                keys[40] = true;
            });
            
            init.addEvent(init.getById('left'), 'touchend', function(e){
                delete keys[37];
            });
            init.addEvent(init.getById('right'), 'touchend', function(e){
                delete keys[39];
            });
            init.addEvent(init.getById('up'), 'touchend', function(e){
                delete keys[38];
            });
            init.addEvent(init.getById('down'), 'touchend', function(e){
                delete keys[40];
            });
            
            init.addEvent(document, 'keydown', function(e){
                keys[e.keyCode] = true; 
            });
            init.addEvent(document, 'keyup', function(e){
                delete keys[e.keyCode];
            });

            return keys;
        },

    }

})(); //IIFE?

// 모듈 익스포팅..
export { init };

