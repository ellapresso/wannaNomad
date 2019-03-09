var superObj = {
    name : 'kang',
    getName() {
        return this.name
    },
    ['prop_' + (() => Math.ceil(Math.random() * 10))() ] : 'Dynamic Prop!'
};

var subObj = {
    __proto__ : superObj,
    getName() {
        return 'Hi! My name is ' + super.getName();
    }
};