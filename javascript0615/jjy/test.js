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

findNum2([-1, -2, -3, 1, 2, 3, 6]); // 5
findNum2([5, 4, 3, 2, 1]); // 6
findNum2([-1, -2, -3]); // 0
findNum2([1, 2, 3, 4]); // 5
findNum2([3, 6, 9]); // 8
findNum2([1, 2, 6, 7]); // 5
findNum2([]); // 0