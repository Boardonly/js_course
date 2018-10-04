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

function init (obj, n){
		const newUl = document.createElement('ul');
		newUl.id = 'list'
		document.body.prepend(newUl);
		for (let i = 0; i < n; i += 1) {
		const newLi = document.createElement('li');
		newLi.className = obj[i].className;
		newLi.innerHTML = obj[i].content;
		for (let key of Object.keys(obj[i].attributes)){
			newLi.setAttribute(key, obj[i].attributes[key])
		}
		list.append(newLi);
	}
}
function listen (){
	if (list) {
		console.log(true);
		list.remove();
	} else {
		console.log(false);
	}
};	

del.addEventListener('click', listen());


