"use strict"

const arr = [];
const obj = {
	history:[],
	formula: '',
	args:{}
};

function exitReturn(){
	return obj;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

calculate ()
function calculate (){
	let name = prompt('Выбери формулу: 1(y = kx + b) или 2(y = x^2)');
	obj.history.push(name);
	if (name === '1'){
		obj.formula = 'y = kx + b';
		return argk();
	} else if (name === '2'){
		obj.formula = 'y = x^2';
		return formula2();
	} else if (name == 'exit') {
		exitReturn();
		return;
	} else {
		return calculate();
	}
}
 
function formula1(){
	let k = +arr[0];
	let x = +arr[1];
	let b = +arr[2];
	let y = k * x + b;

	alert (y);
	return calculate();
};


function argk(){
	let boxk = prompt('введите значение для k (y = kx + b)');
	obj.args = {};
	obj.history.push(boxk);
	if (boxk === 'exit'){
		exitReturn();
		return;
	} else if (isNumeric(boxk)){
		obj.args.k = +boxk;
		arr.splice(0, 3, boxk);
		return argx();
	} else {
		return argk();
	}
}
function argx(){
	let boxx = prompt('введите значение для x (y = kx + b)');
	obj.history.push(boxx);
	if (boxx === 'exit'){
		exitReturn();
		return;
	} else if (isNumeric(boxx)){
		obj.args.x = +boxx;
		arr.push(boxx);
		return argb();
	} else {
		return argx();
	}
}
function argb(){
	let boxb = prompt('введите значение для b (y = kx + b)');
	obj.history.push(boxb);
	if (boxb === 'exit'){
		exitReturn();
		return;
	} else if (isNumeric(boxb)){
		obj.args.b = +boxb;
		arr.push(boxb);
		return formula1();
	} else {
		return argb();
	}
}

function formula2(){
	let form2 = prompt('введите значение для x (y = x^2)');
	obj.history.push(form2);
	obj.args = {};
	if (form2 === 'exit'){
		exitReturn();
		return;
	} else if (isNumeric(form2)){
		obj.args.x = form2;
		let y = form2 * form2;
		alert(y);
		return calculate();
	} else {
		return formula2();
	}
}
