"use strict"

/* Домашнее задание:
В репозитории создать папку lesson_14, В ней файлы index.html с 
подключенным файлом index.js, В нем нужно написать:
В index.html внутри body, создать кнопку с тегом button и текстом “Удалить”.
Функцию “init“ которая принимает два аргумента - массив объектов такой структуры:
[{ className: 'class', attributes: { 'data-name': 'Anatoliy' }, 
content: 'Some Text' }], и число n.
Функция должна создать элемент ul внутри body, и для каждого 
элемента входного массива, необходимо создать n элементов li внутри ul, 
задав им класс из obj.className, атрибуты из obj.attributes где ключи -
 названия атрибутов, значения ключей - значения атрибутов, и внутренний 
 контент элементов li взять из obj.content.
Функцию “listen“ которая начнет слушать событие нажатия на кнопку “Удалить”,
 и по этому событию удалять созданный список ul, и возвращать true в случае 
 успеха, и false, если списка ul нет.
*/
let arr = [
{ className: 'class', attributes: { 'data-name': 'Anatoliy' }, content: 'Some Text' },
{ className: 'class', attributes: { 'data-name': 'Vasiliy' }, content: 'One more Some Text' },
{ className: 'class', attributes: { 'data-name': 'Anakoliy' }, content: 'very Some Text' },
{ className: 'class', attributes: { 'data-name': 'Kanatoliy' }, content: 'some-Some Text' },
{ className: 'class', attributes: { 'data-name': 'Piter' }, content: 'NoSome Text' },
]


function init(obj, n) {
    let newUl = document.createElement('ul');
    document.body.append(newUl);
    for (let i = 0; i < obj.length; i += 1) {
        for (let j = 0; j < n; j += 1) {
            let newLi = document.createElement('li');
            let attributesKeys = Object.keys(obj[i].attributes);
            newLi.classList.add(obj[i].className);
            for (let key of attributesKeys) {
                newLi.setAttribute(key, obj[i].attributes[key])
            }
            newLi.innerText = obj[i].content;
            newUl.appendChild(newLi);
        }
    }
}

function listen (){
	let list = document.querySelector('ul')
	if (list) {
		console.log(true);
		list.remove()
	} else {
		console.log(false);
	}
};	

let listener = document.querySelector('button');
listener.addEventListener('click', listen);


