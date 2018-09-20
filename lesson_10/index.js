'use strict'

const myAge = 21;

let txt;
let count = myAge % 100;
	if (count >= 5 && count <= 20) {
		txt = ' лет';
		} else {
			count = count % 10;
      		if (count == 1) {
          		 txt = ' год';
       		} else if (count >= 2 && count <= 4) {
           		txt = ' года';
      		} else {
         		 txt = ' лет';
      		}
    }

console.log( 'Мой возраст ' + myAge + txt );


const arr1 = [1, 13, -3, 0, 'sdfsd', -989, 23, 434, undefined, 654];

let obj = { max: 0,
 min: 0,
 avg: 0, 
 negative: 0, 
 'not a number': 0};


let arr1Filtered = [];
for (let i = 0; i < arr1.length; i += 1) {
  if (arr1[i] < 0) {
    arr1Filtered[arr1Filtered.length] = arr1[i];
  }; 
  if (arr1[i] >= 0) {
    arr1Filtered[arr1Filtered.length] = arr1[i];
  };
};

let min = arr1Filtered[0];
let max = min;

for (let i = 0; i < arr1Filtered.length; ++i) {
      if (arr1Filtered[i] > max) max = arr1Filtered[i];
      if (arr1Filtered[i] < min) min = arr1Filtered[i];
  };

obj.max = max;
obj.min = min;

let sum = 0;
let count2 = 0;
for (let i = 0; i < arr1Filtered.length; i += 1) {
	if (arr1Filtered[i] && arr1Filtered.length > 0);
	sum += arr1Filtered[i];
	count2 +=1;
   };

obj.avg = sum / arr1Filtered.length;

let negative = [];
for (let i = 0; i < arr1.length; i += 1) {
  if (arr1[i] < 0) {
    negative[negative.length] = arr1[i];
  }; 
};
obj.negative = (negative.length);

let NotANumber = (arr1.length - arr1Filtered.length);
obj['not a number'] = NotANumber;

console.log(obj);