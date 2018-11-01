'use strict';

export class Dom {
    constructor(){
        this.img = document.getElementById('icon');
        this.city_name = document.getElementById('city_name');
        this.temperature = document.getElementById('temperature');
        this.humidity = document.getElementById('humidity');
        this.wind = document.getElementById('wind');
        this.wthr = document.getElementById('wthr');
    }
    showPreloader(){
        // let div = document.createElement('div');
        // div.setAttribute('id', 'ipInput');
        // document.body.prepend(div);
        // div.innerText = 'Загрузка...';
    }
    hidePreloader(){
        let div = document.getElementById('ipInput');
        div.innerText = '';
    }
    setgetMyWeather(weather){
        this.img.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        this.city_name.innerText = `${weather.name}`;
        this.wthr.innerText = `${weather.weather[0].description}`;
        this.temperature.innerText = `Celsius ${weather.main.temp} degree`;
        this.humidity.innerText = `humidity:${weather.main.humidity}% |`;
        this.wind.innerText = `wind:🌬️ ${weather.wind.speed}km/h`;
    }
}