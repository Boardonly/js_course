'use strict';

import LocationApi from './location_api.js'
import Dom from './dom.js'

let local = new LocationApi();
let text = new Dom();
text.showPreloader();

local.getMyIp()
    .then(ip => local.getMyLocation(ip))
    .then(res => {
        text.setCoordinates(res);
    })

