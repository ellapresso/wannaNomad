// 0. 배열은 숫자로만 이루어져있고, 배열이 아닐경우에만 -1을 출력(2번조건무시)
// 1. 배열에 마이너스가 들어갈 경우 무시한다. (없는취급한다. ex:[-1,-2]의 경우 빈배열과 같음)
// 2. 결과값은 양수의 자연수
// 3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.
// 4. 빈숫자란, 0부터 배열의 가장 큰 수 사이의 빠져있는 수를 의미함.
// 5. 같은수의 경우 하나의 수로 취급. ([2,2,2,2]의 경우 [2]와 동일
// 6. 빈 숫자가 없을 경우 가장 큰수에 +1한 결과값을 출력한다.
// 7. 빈배열은 0출력.


const chkArray = arr => { // 배열판단
    return arr.isArray ? arr : -1;
}

const chkNum = arr => { // 양수의 숫자 필터
    return arr.filter(attr => !isNaN(attr) && attr >= 0);
}


// 본 함수
const chkArrNum = arr => {
    if (arr.isArray) {
        return -1;
    }

    const realArr = arr.filter(attr => !isNaN(attr) && attr >= 0);
    realArr.sort(function realArr(a, b) {
        return a - b
    });

    const len = realArr.length;
    const max = realArr[len - 1];

    for (let i = len - 1; i > 0; i--) {
        const res = realArr[i] - realArr[i - 1];
        if (res > 1) { // 뒤에서부터 체크했을때 첫번째 빈숫자
            return realArr[i] - 1;
        } else {
            if (i == 1 && realArr[i - 1] != 1) {
                return realArr[i - 1] - 1;
            } else if (i == 1 && realArr[i - 1] == 1) {
                return max + 1;
            }
        }
    }
    return 0; //빈배열
}
