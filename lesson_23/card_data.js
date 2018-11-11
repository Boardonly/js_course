

export default class CardData{
    constructor(card){
        this.card = card;
    }
    getCardInfo(card){
        preloader.className = 'preloader';
        divResult.className = 'hide';
        return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${this.card}`)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => toTable(res))
            .then(() =>{
                preloader.className = 'hide';
                divResult.className = 'result';
                resetInput();
            })
    };
}




// getCardInfo(card){
//     preloader.className = 'preloader';
//     divResult.className = 'hide';
//     return fetch(`https://api.bincodes.com/cc/?format=json&api_key=d96ca493f5be297f8c304a87edcdf6a8&cc=${this.card}`)
//         .then(res => res.json())
//         .then(res => console.log(res))
//         .then(res => toTable(res))
//         .then(() =>{
//             preloader.className = 'hide';
//             divResult.className = 'result';
//             resetInput();
//         })
// };