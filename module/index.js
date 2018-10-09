'use strict';

function itsMe(a = 'Boardonly'){
	console.log('It’s me, ' + a);
	return a;
};



function compare(a, b){
let string = '';
if (typeof a !== 'number' || typeof b !== 'number'){
	 string = 'НЕ ЧИСЛО';
	 return string;
} else	if (a > b){
		string ='' + a + ' > ' + b;
		return string;
	} else if (a < b){
		string ='' + a + ' < ' + b;
		return string;
	} else if (a == b){
		string ='' + a + ' == ' + b;
		return string;
	}
};


function row(a, b, c, d){
 let arr = [a, b, c];
 let string = '';
 let sortArr = [];
 let reversed = [];
 if (d == '<'){
 	let sortArr = arr.sort(function(a, b) {
  return a - b;});
 	string = sortArr.join(' < ');
 } else if (d == '>') {
 		arr.sort(function(a, b) {
  return a - b;});
 	string = '' + arr[2] + ' > ' + arr[1] + ' > ' + arr[0];
 }
 return string;
}


function fact(n) {
  return n ? n * fact(n - 1) : 1;
}


function matrixDiff(a1, a2){
	let math = 0;
	for (let i=0; i<a1.length; i += 1){
		for (let j=0; j<a1[i].length; j += 1){
			if (a1[i].length !== a2[i].length){
				return NaN;
			} else {math = math + (Math.abs(a1[i][j] - a2[i][j]))};
			
		}
	}return math;
};