'use strict';
const createHello = document.createElement('span');
createHello.innerText = `Привет) Введите дату в формате: ММ-ДД-ГГГГ.`
const createInput = document.createElement('input');
createInput.setAttribute('type', 'text')
createInput.setAttribute('id', 'dateInput')
const createText = document.createElement('span');
createText.setAttribute('id', 'text');
document.body.prepend(createHello,createInput, createText) ;

let today = Date.now();
console.log(today);
let input = document.getElementById('dateInput');
input.addEventListener('change', () => {
    let inputDate = document.getElementById('dateInput').value;
    console.log(inputDate);
    let dayx = Date.parse(inputDate);
    console.log(dayx);
    let diff = 0;
    if (dayx <= today){
        let diff = Math.floor((today - dayx) / 1000 / 60 / 60 / 24);
        document.getElementById('text').innerText = `
            Дней с этой даты: ${diff}`;
    } else {
        let diff = 1 + Math.floor((dayx - today) / 1000 / 60 / 60 / 24);
        document.getElementById('text').innerText = `
            Дней до этой даты: ${diff}`;
    }
});

