'use strict';

export class UIController{
    constructor(data){
        this.data = data;
        this.inputName = document.getElementById('name');
        this.inputCard = document.getElementById('card');
        this.button = document.getElementById('submit');
        this.divResult = document.getElementById('result');
        this.tabResult = document.getElementById('table_result');
        this.preloader = document.getElementById('preloader');
    }
        toTable() {
            const keys = Object.keys(this.data);
            const values = Object.values(this.data);
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
