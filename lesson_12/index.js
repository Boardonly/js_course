"use strict"
 
function add(emojii){
	if (!emojii) {
    emojii = '❤️🇺🇦';
};
	let summ = 0;
	let container = undefined;
	 container = emojii.split('')
  for (let element of container) {
    summ += element.charCodeAt(0) + element.charCodeAt(1) || element.charCodeAt(0);
   };
  return summ / (container.length / 2);    
}




function revers (){
	const args = Array.from(arguments);
	let str = args.join(', ')
	let names = str.split('').reverse().join(''); //<===переводит строки в масисив и меняет строки местами
	let arr = names.split(' ,');
	
	return arr;
}


function clearNumbers(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++){
            if (typeof arr[j][i] !== 'number') {
                  arr[i].splice(j, 1);
                  j -= 1;
              }
          }
      }
  return arr;
}


function splitArray (arr, len) {
  let chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

Array.splitArray  = splitArray ;
