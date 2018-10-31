'use strict';

export default class LocationApi{
    constructor(){
    }
    getMyIp (){
        return fetch('https://api.ipify.org?format=json')   
        .then((res) => res.json())
        }
    getMyLocation (ip){
        return fetch(`http://api.ipstack.com/${ip}?access_key=96763510c44b455e93003cd889ba82df`)
        .then(res => res.json())
    }
}
