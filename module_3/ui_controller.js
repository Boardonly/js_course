'use strict';
export class UIController{
    constructor(){
        this.inputName = document.getElementById('name');
        this.inputCard = document.getElementById('card');
        this.inputClear = document.getElementById('clear');
        this.button = document.getElementById('submit');
        this.divResult = document.getElementById('result');
        this.tabResult = document.getElementById('table_result');
        this.preloader = document.getElementById('preloader');
        }
        maska(){
            if(this.inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
                this.validInput(this.inputCard);
            } else {
                this.invalidInput(this.inputCard);
            }
                this.validation()
        }
        showResult(value){
            if(value){
                this.preloader.className = 'hide';
                this.divResult.className = 'result';
                this.resetInput();
            } else {
                this.preloader.className = 'preloader';
                this.divResult.className = 'hide';
            }
        }
        removeTable() {
            let last;
            while (last = this.tabResult.lastChild){
                this.tabResult.removeChild(last);
            };
            localStorage.clear();
        }
        resetInput(){
            this.inputName.reset();
            this.inputCard.reset();
        }
        toTable(data) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const table = document.getElementById('table_result');
            for (let i = 0; i < keys.length; i += 1) {
                const tr = document.createElement('tr');
                const td_key = document.createElement('td');
                td_key.innerText = `${keys[i]}`;
                tr.append(td_key);
                const td_value = document.createElement('td');
                if (values[i] !== "") {
                    td_value.innerText = `${values[i]}`;
                } else {
                    td_value.innerText = `Unknown`;
                } 
                tr.append(td_value);
                table.append(tr);
            }
        };
        validInput(name){
            name.className = "green";  
            name.valid = true;
        }
        invalidInput(name){
            name.className = "red";
            name.valid = false;
        }
        
        validation(){
            if(this.inputName.valid && this.inputCard.valid){
                    this.button.disabled = false;
                } else {
                    this.button.disabled = true;
            }
        }
        listInput(){
            this.inputName.addEventListener('change', ()=>{
                if (this.inputName.value.trim().length > 2){
                    this.validInput(this.inputName);
                } else {
                    this.invalidInput(this.inputName);
                }
                this.validation();
            })
        }
        listButton(){
           return this.inputCard.value.split('-').join('');
        }

}













// const inputName = document.getElementById('name');
// const inputCard = document.getElementById('card');
// const button = document.getElementById('submit');
// const divResult = document.getElementById('result');
// const tabResult = document.getElementById('table_result');
// const preloader = document.getElementById('preloader');

// function toTable(data) {
// 	const keys = Object.keys(data);
// 	const values = Object.values(data);
// 	const table = document.getElementById('table_result');
// 	for (let i = 0; i < keys.length; i += 1) {
// 		const tr = document.createElement('tr');
// 		const td_key = document.createElement('td');
// 		td_key.innerText = `${keys[i]}`;
// 		tr.append(td_key);
// 		const td_value = document.createElement('td');
// 		td_value.innerText = `${values[i]}`;
// 		tr.append(td_value);
// 		table.append(tr);
// 	}
// };