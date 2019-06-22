//승재

const getNum = arr =>{

    let result;
    //배열이 아닐경우
    if (!Array.isArray(arr)) { 
        return -1; 
    }
  
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
        result = 0;
        return result;
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
            result = sortArr[len-1] - 1;
        }else{
            for(let i = len-1; i>0;i--){
                if (sortArr[i] - sortArr[i - 1] != 1 ){
                    result = sortArr[i] - 1;
                    break;
                }else{
                    result = sortArr[i-1]-1;
                }
            }
        }
    }else{
        for(let i = len-1; i>0;i--){
            if (sortArr[i] - sortArr[i - 1] != 1 ){
                result = sortArr[i] - 1;
                break;
            }else{
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






//윤지
// [0,0,0] : 일때 0 나와야함

const chkArrNum = arr => {
    if (arr.isArray) { //배열체크
      return -1;
    }
    const realArr = arr.filter(attr => !isNaN(attr) && attr >= 0); //양수의 숫자만 필터링
    realArr.sort(function realArr(a, b) { //정렬
      return a - b
    });
    const len = realArr.length; //배열길이
    const max = realArr[len-1]; //배열의 가장 큰 수
    for (let i = len - 1; i > 0; i--) {
      const res = realArr[i] - realArr[i - 1];
      if (res > 1) { // 뒤에서부터 체크했을때 첫번째 빈숫자발견! 더 체크할필요없으니 return.
        return realArr[i] - 1;
      } else { // 같은숫자이거나 연속된 숫자일떄
        if (i==1&&realArr[i - 1] != 1) { //마지막숫자가 1이 아니면 가장 작은 수에 -1한다.
          return realArr[i-1]-1;
        } else if (i == 1 && realArr[i - 1] == 1 ){ //마지막 숫자가 1이면 배열의 제일 큰 수에 +1한다.
          return max+1;
        }
      }
    }
    return 0; // 모든 조건에 해당하지 않으면 빈배열이므로 0을 출력한다.
  }








//혜인

  const findNum2 = arr => {
    // 0. 배열은 숫자로만 이루어져있고, 배열이 아닐경우 -1을 출력
    if (!Array.isArray(arr)) return -1;
  
    // 7. 빈배열은 0출력.
    // 1. 배열에 마이너스가 들어갈 경우 무시한다. (없는취급한다. ex:[-1,-2]의 경우 빈배열과 같음)
    const arr2 = arr.filter((v, i) => v > 0);
    if (!arr2.length) return 0;
  
    // 3. 숫자를 오름차순으로 나열
    arr2.sort();
    // 5. 같은수의 경우 하나의 수로 취급. ([2,2,2,2]의 경우 [2]와 동일
    const setData = new Set(arr2);
  
    for (let index = arr2[arr2.length - 1]; index >= 1; index--) {
      if (!setData.has(index)) {
        // 3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.
        return index;
      }
    }
    // 6. 빈 숫자가 없을 경우 가장 큰수에 +1한 결과값을 출력한다.
    return arr2.pop() + 1;
  };




//승윤

const result = (function(arr){
    if(!Array.isArray) return -1;
    if(arr.length == 0) return 0;

    arr = arr.filter(n => n > 0)
            .sort((a, b) => a-b);

    if(arr.reduce((a, b) => a + b) == arr[0] * arr.length) return arr[0] + 1;
    const isAsc = arr.every((e,i,a) => i > 0 ? e-1 == a[i-1] : true);
    console.log(isAsc, arr);
    if(isAsc) {
        return arr[arr.length-1] + 1;
    }else{
        const result = -1;
        arr.sort((a, b) => b-a).some((item, idx) => {
            if(idx < arr.length-1 && item - arr[idx+1] > 1) {
                result = item - 1;
                return result;
            }    
        })
        return result;
    }

})(testArray);




//재영

function main(arr){
    let count = 0 ;
    let samecount = 0;
    let chkarr = 0;
    let max = false;

    if (!Array.isArray(arr)) return -1;
    if(arr.length === 0){
        return 0;
    }

    if(arr.length >=2 ){
        arr = arr.filter(n => n > 0)
            .sort((a, b) => a-b);
    }

    if(arr.length < 2){
        if(arr[0] > 0)
            return arr[0];
        else
            return 0;
    }

    arr.forEach(function(element,index) {
        if(index+1 <= arr.length){
                if(element +1 == arr[index+1]){
                    if(chkarr == 0){
                        chkarr = index;
                    }else if(chkarr+1 != index){
                        chkarr = index;
                    }
                    count++;
                }
                else if(element +1 < arr[index+1]){
                    max = true;
                }else if(element == arr[index+1]){
                    samecount++;
                }
        }
    });

    if(count+1 === arr.length){
        return arr[count] +1;
    }else if(samecount+1 === arr.length){
        return arr[0]-1;
    }else{
        if(chkarr != 0){
            return arr[chkarr]-1;
        }else if(max){
            return arr[arr.length-1]-1;
        }else{
            return 0;
        }
    }
}