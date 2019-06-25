/*
1. 배열에 마이너스가 들어갈 경우 무시한다. (없는취급한다. ex:[-1,-2]의 경우 빈배열과 같음)   
2. 결과값은 양수의 자연수   
3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.   
4. 빈숫자란, 0부터 배열의 가장 큰 수 사이의 빠져있는 수를 의미함.   
5. 같은수의 경우 하나의 수로 취급. ([2,2,2,2]의 경우 [2]와 동일   
6. 빈 숫자가 없을 경우 가장 큰수에 +1한 결과값을 출력한다.   
7. 빈배열은 0출력.   
*/

const getNum = arr =>{
    let result;

    //배열이 아닐경우
    if (!Array.isArray(arr)) { return -1 }

    //1. 배열에 마이너스가 들어갈 경우 무시한다. (없는취급한다. ex:[-1,-2]의 경우 빈배열과 같음)
    arr.forEach((v, i) => {
        if(arr[i] < 0 || isNaN(arr[i])){
            delete arr[i];
        }
    });

    const RNArr = arr.filter((n) => {
        return n != 'undefinded';
    });
    
    //7. 빈배열은 0출력.   
    if(RNArr.length == 0){
        return 0;
    }

    //5. 같은수의 경우 하나의 수로 취급. ([2,2,2,2]의 경우 [2]와 동일
    const setArr = Array.from(new Set(RNArr));
    
    //3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.
    const sortArr = setArr.sort(sortNumber);

    //3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.
    //4. 빈숫자란, 0부터 배열의 가장 큰 수 사이의 빠져있는 수를 의미함.
    //6. 빈 숫자가 없을 경우 가장 큰수에 +1한 결과값을 출력한다.

    let len = sortArr.length;

    if(sortArr[0] !== 0){
        if(len == 1){
            //[2] => 1
            result = sortArr[len-1] - 1;
        }else{
            for(let i = len-1; i>0;i--){
                if (sortArr[i] - sortArr[i-1] != 1 ){
                    //[2,3,5,7,8] => 6
                    result = sortArr[i] - 1;
                    break;
                }else{
                    //[2,3,4,5,6] => 1
                    result = sortArr[i-1]-1;
                }
            }
        }
    }else{
        for(let i = len-1; i>0;i--){
            if (sortArr[i] - sortArr[i-1] != 1 ){
                //[0,1,2,4,5] => 3
                result = sortArr[i] - 1;
                break;
            }else{
                //[0,1,2,3,4] => 5
                result = sortArr[len-1]+1;
            }
        }
    }

    //2. 결과값은 양수의 자연수
    return result;
}

// 숫자오름차순 정렬
function sortNumber(a, b) {
    return a - b;
}