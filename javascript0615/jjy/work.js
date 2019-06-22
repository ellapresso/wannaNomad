function main(arr){
    let count = 0 ;
    let samecount = 0;
    let chkarr = 0;
    let max = false;


    if (!Array.isArray(arr)) return -1;
    if(arr.length === 0){
        return 0;
    }

    if(arr.length >= 2 ){
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

let arr = [1,2,3,4,5];
let arr1 = [3,6,9];
let arr2 = [1,2,6,7];
let arr3 = [3,3,3,3];
let arr4 = [8,1,2,6,7];
// let arr2 = [];


// console.log(main(arr));
// console.log(main(arr1));
// console.log(main(arr2));
console.log(main(arr3));
// console.log(main(arr4));
// main(arr2);
