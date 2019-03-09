
function solution(s) {
    
    var len = (s.length % 2 == 0) ? 2 : 1;
    var half = s.length / 2;

    if(len == 1) {
        return s.charAt(Math.floor(half));
    }else {
        var idx = half - 1;
        return s.slice(idx, idx + len);
    }

}


var s = 'kangkrk';

console.log(solution(s));