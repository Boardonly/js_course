"use strict"

function removeKeys1(obj, arr) {
    let keys = Object.keys(obj);
    for ( let key of keys) {
        for ( let element of arr){
            if (key === element){
                delete obj[key]
            };
        };
    };
    return obj;
}


function removeKeys2(obj, arr){
  let newObj = {...obj};
  let keys = Object.keys(newObj);
    for ( let key of keys) {
        for ( let element of arr){
            if (key == element){
                 delete newObj[key];
            };
        };
    };
    return newObj;
};

console.log(removeKeys2({ a: 1, b: [], c: '', d: 123 }, ['a', 'c']));

function absDiff(a){
    function inside(b){
    return Math.abs (b - a);   
    }
    return inside;
}
