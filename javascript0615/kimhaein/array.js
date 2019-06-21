// 과제1
// 1 연속 된 수가 제시 될 경우, 가장 마지막 수의 다음 값 반환 ex) [1,2,3,4] => 5
// 2 연속 되지 않는 수가 제시 될 경우,마지막 수의 이전 값 반환 ex) [3,6,9] => 8
// 3 부분 연속된 수 일 경우,마지막의 연속 된 수 중 작은 수의 이전 값 반환 ex) [1,2,6,7] => 5
// 4 빈 배열 혹은 같은 수 일 경우, 0 반환 ex) [] => 0 / ex) [2,2,2,2] => 0

const findNum = arr => {
  if (!Array.isArray(arr) || !arr) {
    throw "invaild parms";
  }

  const arrLen = arr.length;
  if (arrLen == 0) return 0; // 빈 배열인 경우 처리

  const arr2 = [];
  arr.forEach((v, i) => {
    const next = arr[i + 1];
    if (arr[i] + 1 !== next) {
      if (arr[i] + 1 > next) {
        // 4. 예외처리
        arr2.push(-1);
      } else if (next) {
        arr2.push(next);
      }
    }
  });

  if (arr2[0] == -1) return 0; // 4. 예외처리
  const arr2Len = arr2.length;
  switch (arr2Len) {
    case 0:
      return arr[arrLen - 1] + 1;
    case 1:
      return arr2[0] - 1;
    default:
      return arr2[arr2Len - 1] - 1;
  }
};

findNum([1, 2, 3, 4]); // 5
findNum([3, 6, 9]); // 8
findNum([1, 2, 6, 7]); // 5
findNum([]); // 0
findNum([2, 2, 2, 2]); // 0

// 과제2
// 2. 결과값은 양수의 자연수
// 4. 빈숫자란, 0부터 배열의 가장 큰 수 사이의 빠져있는 수를 의미함.

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

  const arr3 = [];
  for (let index = arr2[arr2.length - 1]; index >= 1; index--) {
    if (!setData.has(index)) {
      // 3. 숫자를 오름차순으로 나열해서 빈 숫자중 가장 큰 수를 출력한다.
      return index;
    }
  }
  // 6. 빈 숫자가 없을 경우 가장 큰수에 +1한 결과값을 출력한다.
  return arr2.pop() + 1;
};

console.log(findNum2([-1, -2, -3, 1, 2, 3, 6])); // 5
console.log(findNum2([5, 4, 3, 2, 1])); // 6
console.log(findNum2([-1, -2, -3])); // 0
console.log(findNum2([1, 2, 3, 4])); // 5
console.log(findNum2([3, 6, 9])); // 8
console.log(findNum2([1, 2, 6, 7])); // 5
console.log(findNum2([])); // 0
console.log(findNum2([3, 4, 3, 3])); // 2
console.log(findNum2([2, 2, 2, 2])); // 1
console.log(findNum2([0, 0, 0, 0])); // 0
