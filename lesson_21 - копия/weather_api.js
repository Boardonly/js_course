'use stricts';

export class LocationApi{
    constructor(){
    }
    getMyIp (){
        return fetch('https://api.ipify.org?format=json')   
        .then(res => res.json())
        .then(res => res.ip)
    }
    getMyLocation (ip){
        return fetch(`http://api.ipstack.com/${ip}?access_key=96763510c44b455e93003cd889ba82df`)
            .then(res => res.json())
    }
    getMyWeather (obj){
         if (obj.city == null){
            return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${obj.latitude}&lon=${obj.longitude}&units=metric&appid=d25993535f24d06edd3f8545b0e6b69d`)
                .then(res => res.json())
          
        } else {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&units=metric&appid=d25993535f24d06edd3f8545b0e6b69d`)
                .then(res => res.json())
        }
    }
}
