'use strict';

import LocationApi from './location_api.js'
import Dom from './dom.js'

let a = new LocationApi();
let b = new Dom();
b.showPreloader();
a.getMyIp();

new Promise ((resolve, reject) => {
    setTimeout(resolve, 1000);
})
    .then(() => b.hidePreloader())
    .then(() => b.setCoordinates(a.getMyLocation()))
