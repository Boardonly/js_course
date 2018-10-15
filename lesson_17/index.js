'use strict';

const createInput = document.createElement('input');
createInput.setAttribute('type', 'text')
createInput.setAttribute('id', 'dateInput')
const createText = document.createElement('span');
createText.setAttribute('id', 'text');
document.body.prepend(createInput, createText) ;

let today = Date.now();
let input = document.getElementById('dateInput');
input.addEventListener('change', () => {
    let inputDate = document.getElementById('dateInput').value.split('-');
    let dayx = Date.parse(inputDate);
    let diff = 0;
    if (dayx <= today){
        let diff = Math.floor((today - dayx) / 1000 / 60 / 60 / 24);
        document.getElementById('text').innerText = `
            Дней с этой даты: ${diff}`;
    } else {
        let diff = Math.floor((dayx - today) / 1000 / 60 / 60 / 24);
        document.getElementById('text').innerText = `
            Дней до этой даты: ${diff}`;
    }
});

