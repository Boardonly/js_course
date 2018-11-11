
import MaskInput from 'mask-input';
import {UIController} from './ui_controller';

const uiController = new UIController;
const maskInput = new MaskInput(document.querySelector('.js-input-selector'), {
  mask: '0000-0000-0000-0000',
  alwaysShowMask: true,
  maskChar: '_',
  onChange(){
	  if(this.inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
			UIController.validInput(this.inputCard);
		} else {
			UIController.invalidInput(this.inputCard);
		}
		UIController.validation()
	}
});

this.inputName.addEventListener('change', ()=>{
	if (this.inputName.value.trim().length > 2){
		UIController.validInput(this.inputName);
	} else {
		UIController.invalidInput(this.inputName);
	}
	UIController.validation();
})

this.button.addEventListener('click', ()=>{
	let cardNumber = this.inputCard.value.split('-').join('');
	console.log(cardNumber);
    UIController.getCardInfo(cardNumber);
})


// class CardData{
//     constructor(card){
//         this.card = card;
//     }
//     getCardInfo(card){
//         preloader.className = 'preloader';
//         divResult.className = 'hide';
//         return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${this.card}`)
//             .then(res => res.json())
//             .then(res => console.log(res))
//             .then(res => toTable(res))
//             .then(() =>{
//                 preloader.className = 'hide';
//                 divResult.className = 'result';
//                 resetInput();
//             })
//     };
// }



// class UIController{
//     constructor(data){
//         this.data = data;
//         this.inputName = document.getElementById('name');
//         this.inputCard = document.getElementById('card');
//         this.button = document.getElementById('submit');
//         this.divResult = document.getElementById('result');
//         this.tabResult = document.getElementById('table_result');
//         this.preloader = document.getElementById('preloader');
//     }
//         toTable() {
//             const keys = Object.keys(this.data);
//             const values = Object.values(this.data);
//             const table = document.getElementById('table_result');
//             for (let i = 0; i < keys.length; i += 1) {
// 				const tr = document.createElement('tr');
				
//                 const td_key = document.createElement('td');
//                 td_key.innerText = `${keys[i]}`;
//                 tr.append(td_key);
//                 const td_value = document.createElement('td');
//                 td_value.innerText = `${values[i]}`;
//                 tr.append(td_value);
//                 table.append(tr);
//             }
//         };
//         onChange(){
//             if(inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
//                   validInput(inputCard);
//               } else {
//                   invalidInput(inputCard);
//               }
//               validation()
//           }
//         validInput(name){
//             name.className = "green";  
//             name.valid = true;
//         }
//         invalidInput(name){
//             name.className = "red";
//             name.valid = false;
//         }
        
//         validation(){
//             if(inputName.valid && inputCard.valid){
//                     button.disabled = false;
//                 } else {
//                     button.disabled = true;
//             }
//         }  

// }





































































































 
// // const inputName = document.getElementById('name');
// // const inputCard = document.getElementById('card');
// // const button = document.getElementById('submit');
// // const divResult = document.getElementById('result');
// // const tabResult = document.getElementById('table_result');
// // const preloader = document.getElementById('preloader');
// // const controller = new UIController();
// // const maskInput = new MaskInput(document.querySelector('.js-input-selector'), {
// // 	mask: '0000-0000-0000-0000',
// // 	alwaysShowMask: true,
// // 	maskChar: '_',
// // 	onChange(){
// // 		if(inputCard.value.match(/^(\d{4}-){3}\d{4}/)){
// // 			  validInput(inputCard);
// // 		  } else {
// // 			  invalidInput(inputCard);
// // 		  }
// // 		  validation()
// // 	  }
// //   });
  
// //   inputName.addEventListener('change', ()=>{
// // 	  if (inputName.value.trim().length > 2){
// // 		  validInput(inputName);
// // 	  } else {
// // 		  invalidInput(inputName);
// // 	  }
// // 	  validation();
// //   })
  
// //   button.addEventListener('click', ()=>{
// // 	  let cardNumber = inputCard.value.split('-').join('');
// // 	  console.log(cardNumber);
// // 	  getCardInfo(cardNumber);
// //   })
  
// //   function validInput(name){
// // 	  name.className = "green";  
// // 	  name.valid = true;
// //   }
// //   function invalidInput(name){
// // 	  name.className = "red";
// // 	  name.valid = false;
// //   }
  
// //   function validation(){
// // 	  if(inputName.valid && inputCard.valid){
// // 			  button.disabled = false;
// // 		  } else {
// // 			  button.disabled = true;
// // 	  }
// //   }
  
  
  
  
// //   function getCardInfo(card){
// // 	  preloader.className = 'preloader';
// // 	  divResult.className = 'hide';
// // 	  return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${card}`)
// // 		  .then(res => res.json())
// // 		  .then(res => console.log(res))
// // 		  .then(res => toTable(res))
// // 		  .then(() =>{
// // 			  preloader.className = 'hide';
// // 			  divResult.className = 'result';
// // 			  resetInput();
// // 		  })
// //    };
  
  
