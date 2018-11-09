
import MaskInput from 'mask-input';
import controller from './ui_controller';

const inputName = document.getElementById('name');
const inputCard = document.getElementById('card');
const button = document.getElementById('submit');
const divResult = document.getElementById('result');
const tabResult = document.getElementById('table_result');
const preloader = document.getElementById('preloader');
// const controller = new UIController();
const maskInput = new MaskInput(document.querySelector('.js-input-selector'), {
  mask: '0000-0000-0000-0000',
  alwaysShowMask: true,
  maskChar: '_',
  onChange(){
	  if(inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
		    validInput(inputCard);
		} else {
			invalidInput(inputCard);
		}
		validation()
	}
});

inputName.addEventListener('change', ()=>{
	if (inputName.value.trim().length > 2){
		validInput(inputName);
	} else {
		invalidInput(inputName);
	}
	validation();
})


button.addEventListener('click', ()=>{
	let cardNumber = inputCard.value.split('-').join('');
	console.log(cardNumber);
    getCardInfo(cardNumber);
})

function validInput(name){
    name.className = "green";  
    name.valid = true;
}
function invalidInput(name){
    name.className = "red";
    name.valid = false;
}

function validation(){
	if(inputName.valid && inputCard.valid){
			button.disabled = false;
		} else {
			button.disabled = true;
	}
}

function toTable(data) {
	const keys = Object.keys(data);
	const values = Object.values(data);
	const table = document.getElementById('table_result');
	for (let i = 0; i < keys.length; i += 1) {
		const tr = document.createElement('tr');
		const td_key = document.createElement('td');
		td_key.innerText = `${keys[i]}`;
		tr.append(td_key);
		const td_value = document.createElement('td');
		td_value.innerText = `${values[i]}`;
		tr.append(td_value);
		table.append(tr);
	}
};
toTable();


function getCardInfo(card){
    preloader.className = 'preloader';
    divResult.className = 'hide';
    return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${card}`)
		.then(res => res.json())
		.then(res => console.log(res))
        .then(res => toTable(res))
        .then(() =>{
            preloader.className = 'hide';
            divResult.className = 'result';
            resetInput();
        })
 };

