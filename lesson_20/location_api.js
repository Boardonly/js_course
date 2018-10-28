'use strict';

export default class LocationApi{
    constructor(){
    }
    getMyIp (){
        return fetch('https://api.ipify.org?format=json')   
        .then(res => this.your_ip = res.json())
        .then(your_ip => {this.ip = your_ip.ip;
            return this.ip}) 
    }
    getMyLocation (){
        return fetch(`http://api.ipstack.com/${this.ip}?access_key=96763510c44b455e93003cd889ba82df`)
       .then((res) => res.json())
       .then ((res) => console.log(res))
    }
}



// class LocationApi{
//     constructor(){
//     }
//     getMyIp (){
//         return fetch('https://api.ipify.org?format=json')   
//         .then(res => your_ip = JSON.parse(res))
//         .then((your_ip) => this.ip = your_ip.ip)
//         .then((res) => return (res)) 
//     }
//     getMyLocation (ip){
//         return fetch(`http://api.ipstack.com/${this.ip}?access_key=96763510c44b455e93003cd889ba82df`)
//         .then ((res) => JSON.parse(res))
//         .then ((res) => console.log(res))
//     }
// }