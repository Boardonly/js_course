'use strict';

import {LocationApi} from "./weather_api";
import {Dom} from "./dom";


let a = new LocationApi();
let b = new Dom();
b.showPreloader();
// let q = {"coord":{"lon":30.52,"lat":50.45},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":8,"pressure":1034,"humidity":87,"temp_min":8,"temp_max":8},"visibility":9000,"wind":{"speed":4,"deg":170},"clouds":{"all":90},"dt":1541097000,"sys":{"type":1,"id":7348,"message":0.0026,"country":"UA","sunrise":1541047775,"sunset":1541082756},"id":696050,"name":"Pushcha-Voditsa","cod":200};
// b.setgetMyWeather(q)
a.getMyIp()
    .then(res => a.getMyLocation(res))
    .then(res => a.getMyWeather(res))
    .then(res => b.setgetMyWeather(res))

 