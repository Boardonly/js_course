'use stricts';
const Mark = function(){
    let a = this.marks;
    let summ = 0;
    let aMark = 0;
    for (i = 0; i < a.length; i += 1)
        summ += a[i];
        aMark = (summ/a.length);
        return aMark;
};

function Human(name, age) {
    if (typeof name === 'string' && typeof age === 'number'){
        this.name = name;
        this.age = age;  
    };
};
Human.prototype.sayHello = function() {console.log(`Hello, my name is ${this.name}, and i am ${this.age} years old`)};

function AlevelStudent(name, age, marks) {
        Human.call(this, name, age);
        this.marks = marks;  
};
AlevelStudent.prototype = Object.create(Human.prototype);
AlevelStudent.prototype.averageMark = Mark;


// function averageMark(){
//     let a = this.marks;
//     let summ = 0;
//     let aMark = 0;
//     for (i = 0; i < a.length; i += 1)
//         summ += a[i];
//         aMark = (summ/a.length);
//         return aMark;
// };
