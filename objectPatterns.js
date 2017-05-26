

// Arguments design patterns

function sum() {
    var total = 0;
    for(var i = 0; i< arguments.length; i++){
        total += arguments[i];
    }
    return total;
}

console.log( sum(1, 2, 3, 4));

//Chaining

function Calc(initial){
    var vm = this;

    this.add = function (x) {
        initial += x;
        return vm;
    };

    this.multiply = function (x) {
        initial *= x;
        return vm;
    };

    this.equals = function (callback) {
        callback(initial);
        return vm;
    }
}

new Calc(0).
    add(3).
    multiply(5).
    equals(function(value){
        console.log(value)
    });

//Observable properties

function Product(name, price){

    var priceChanging =[],
        priceChanged = [];

    this.name = function (val) {
        return name;
    };

    this.price = function (val) {
        if(val){
            for(var i = 0; i < priceChanging.length; i++){
                if(!priceChanging[i](this, val)){
                    return price
                }
            }

            price = val;
            for(var j = 0; j < priceChanged.length; j++){
                priceChanged[j](this);
            }

        }

        return price;
    };

    this.onPriceChanging = function (callback) {
        priceChanging.push(callback);
    };

    this.onPriceChanged = function (callback) {
        priceChanged.push(callback);
    }

}

var salam = new Product('salam', 5.20 );

console.log('The name is ' + salam.name());
console.log('the price is ' + salam.price());

salam.onPriceChanging(function(that, price){
    if (price > 100){
        console.log('System error, price has gone unexpectedly high');
        return false
    }

    return true;
});

salam.onPriceChanged(function (that) {
    console.log('The salam price has changed to $' + salam.price());
});

console.log('Incoming price change:');
salam.price(40);

console.log('Incoming price change:');
salam.price(101);
