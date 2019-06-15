function main(arr){
    let count = 0 ;
    let chkarr = 0;
    let max = false;

    if(arr.length === 0){
        return 0;
    }

    arr.forEach(function(element,index) {

        if(index+1 <= arr.length){
            if(element +1 == arr[index+1]){
                chkarr = index;
                count++;
            }
            else if(element +1 < arr[index+1]){
                max = true;
            }
        }
    });

    if(count+1 === arr.length){
        return arr[count] +1;
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

let arr = [1,2,3,4,5];
let arr1 = [3,6,9];
let arr2 = [1,2,6,7];
let arr3 = [2,2,2,2];
// let arr2 = [];


console.log(main(arr));
console.log(main(arr1));
console.log(main(arr2));
console.log(main(arr3));
// main(arr2);