
var Animal = class animal {

    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get getName() {
        return this.name;
    }

    set setName(name) {
        this.name = name;
    }

    static defaultName(){
        console.log('unnamed');
    }
} 