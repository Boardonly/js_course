'use strict'
// Создать форму “Синонимы”, сделать ее доступной для просмотра на gh-pages вашего репозитория
resetInput();

const text = document.getElementById('word');
const inpHeight = document.getElementById('height');
const inpWidth = document.getElementById('width');
const button = document.getElementById('submit');
const divResult = document.getElementById('result');
const preloader = document.getElementById('preloader');

inpHeight.addEventListener('change', ()=>{
    if(inpHeight.value < 50 || inpHeight.value > 500){
        invalidInput(inpHeight);
    } else {
        validInput(inpHeight);
    }
    validation()
})

inpWidth.addEventListener('change', ()=>{
    if(inpWidth.value < 50 || inpWidth.value > 500){
        invalidInput(inpWidth);
    } else {
        validInput(inpWidth);
    }
    validation()
})

text.addEventListener('change', ()=>{
    if (text.value.trim().length < 2){
        invalidInput(text);
    } else {
        validInput(text);
    }
    validation();
})

button.addEventListener('click', ()=>{
    datamuse(text.value);
})

function validInput(name){
    name.className = "green";  
    name.valid = true;
}
function invalidInput(name){
    name.value = null;
    name.className = "red";
    name.valid = false;
}
function validation(){
if(text.valid && inpHeight.valid && inpWidth.valid){
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}
function resetInput(){
    text.value = null;
    inpHeight.value = null;
    inpWidth.value = null;
    button.disabled = true;
    text.valid = false;
    inpHeight.valid = false;
    inpWidth.valid = false;
}
function datamuse (value){
    preloader.className = 'preloader';
    divResult.className = 'hide';
    return fetch(`https://api.datamuse.com/words?ml=${value}`)
        .then(res => res.json())
        .then(res => toimg(res))
        .then(() =>{
            preloader.className = 'hide';
            divResult.className = 'result';
            resetInput();
        })
 };

function toimg(words) {
        for(let i = 0; i < 10; i += 1){
        let img = document.createElement('img');
        img.src = `https://dummyimage.com/${inpHeight.value}x${inpWidth.value}/ffffff/000000&text=${words[i].word}`;
        divResult.appendChild(img);
    }   
}

