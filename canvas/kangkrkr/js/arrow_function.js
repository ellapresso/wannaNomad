var func1 = {
    arr : [1, 2, 3],
    getArr() {
        this.arr.map(function(v, n){
            // dynamic this
            // 자신을 호출하는 객체를 가리킨다.
            console.log(this);
        });

        // 아래의 arrolw function과 같이
        // lexical this 기능을 가지려면 bind 함수를 사용한다.
        //this.arr.map(function(v, n){
        //    // dynamic this
        //    // 자신을 호출하는 객체를 가리킨다.
        //    console.log(this);
        //});
    }
}

var func2 = {
    arr : [1, 2, 3],
    getArr() {
        // lexical this
        // 코드의 상위 스코프를 가리킨다.
        this.arr.map((v, n) => {
            console.log(this);
        });    
    },
    innerFunc : {
        innerArr : [4, 5, 6],
        innerGetArr() {
            this.innerArr.map((v, n) => {
                console.log(this);
            });
        }
    }

}


// window에서 호출
func1.getArr();

func2.getArr();

func2.innerFunc.innerGetArr();