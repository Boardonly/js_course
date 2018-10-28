'use strict';

export default class Dom {
    constructor(){}
    showPreloader(){
        let span = document.createElement('span');
        span.setAttribute('id', 'ipInput');
        document.body.prepend(span);
        span.innerText = 'Загрузка...';
    }
    hidePreloader(){
        let span = document.getElementById('ipInput');
        span.innerText = '';
    }
    setCoordinates(coordinates){
        this.coordinates = coordinates;
        console.log(coordinates);
        let span = document.getElementById('ipInput');
        span.innerText = `ваши координаты: ${coordinates.latitude}, ${coordinates.longitude}`
    }
}
