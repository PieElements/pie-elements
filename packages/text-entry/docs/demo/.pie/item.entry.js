
/** Auto generated by /Users/edeustace/dev/github/PieLabs/pie-cli/lib/apps/item/entry.js */

//pie controllers
let controllers = {};
controllers['text-entry'] = require('@pie-elements/text-entry-controller');

//pie declarations
import TextEntry from '@pie-elements/text-entry';
customElements.define('text-entry', TextEntry);

// the catalog ui
import CatalogDemo from 'pie-catalog-client/src/catalog-demo';
customElements.define('catalog-demo', CatalogDemo);

import DemoPane from 'pie-catalog-client/src/catalog-demo/demo-pane';
customElements.define('demo-pane', DemoPane);

import ItemPreview from 'pie-catalog-client/src/catalog-demo/item-preview';
customElements.define('item-preview', ItemPreview);
import ControlPanel from 'pie-catalog-client/src/catalog-demo/control-panel';
customElements.define('control-panel', ControlPanel);

require('pie-catalog-client/src/common.less');
require('material-elements/src/select-field');

let initSock = 
function (sockPath){

  let sock = new SockJS(sockPath);

  sock.onopen = function() {
    console.log('sock is open');
  };

  function tryToParse(d){
    try {
     return JSON.parse(d);
    } catch(e){
      return null;
    }
  }

  sock.onmessage = function(e) {
    console.log('sock message', e.data);
    let dataObj = tryToParse(e.data);
    if(dataObj.type === 'reload'){
      window.location.reload(false);
    } else if(dataObj.type == 'error'){
      //TODO - render the errors in the UI?
      alert('webpack errors have occured - check the logs');
    }
  };

  sock.onclose = function() {
    console.log('sock is closed');
  };
}


let init = () => {

  let allPromises = [
    customElements.whenDefined('catalog-demo')
  ];

  Promise.all(allPromises)
    .then(() => {
      let demo = document.querySelector('catalog-demo');
      demo.config = window.demo.config;
      demo.controllers = controllers;
      demo.markup = window.demo.markup;
    });

    initSock('/sock');
}

document.addEventListener('DOMContentLoaded', () => {
  init();
}); 