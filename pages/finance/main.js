const path = require('path');
const data = require('./data.json')
const util = require('util')

function requestPrice(type){
    return 1
}

class User {
    constructor(name){
      this.name = name  
    }
    
    investments = []
    
    addInvestment(obj){
        this.investments.push(obj)
    }

    update(){
        this.sum = 0
        this.investments.forEach((inv) => {
            this.sum += inv.update() 
        }) 
    }    
}

class Investment {
    constructor(type, amount, spent){
        this.type = type
        this.amount = amount
        this.spent = spent
        this.update()
    }

    update(){
        this.result = this.amount*requestPrice(this.type) - this.spent
        return this.result
    }
}

//==========================================

class Users {
    constructor() {
        Object.keys(data).forEach((key) => {
            this[key] = new User(key);
            data[key].forEach((inv) => {
                this[key].addInvestment(new Investment(inv[0], inv[1], inv[2]));
            });
            this[key].update()
        });
    }
}


let use = new Users()
console.log(util.inspect(use, {showHidden: false, depth: null, colors: true}))

//console.log(users)

//console.log(util.inspect(users, {showHidden: false, depth: null, colors: true}))

// alternative shortcut
//console.log(util.inspect(users, false, null, true /* enable colors */))