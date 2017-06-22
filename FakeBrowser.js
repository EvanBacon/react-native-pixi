import { Dimensions } from 'react-native';
import EventEmitter from 'EventEmitter';

class DOMNode {
  constructor(nodeName) {
    this.nodeName = nodeName;
  }

  get ownerDocument() {
    return window.document;
  }

  appendChild(element) {
    // unimplemented
  }
}

class DOMElement extends DOMNode {
  style = {};
  emitter = new EventEmitter();
  constructor(tagName) {
    super(tagName.toUpperCase());

    if (this.nodeName == 'CANVAS') {

    }
  }

  getContext(contextType) {
    return {
      fillRect: (_=> {}),
      drawImage: (_=> {}),
      getImageData: (_=> {}),
      getContextAttributes: (_=> ({
        stencil: true
      })),
      getExtension:  (_=> ({
        loseContext: (_=> {

        })
      })),
    }
  }

  get tagName() {
    return this.nodeName;
  }


  addEventListener(eventName, listener) {
    // unimplemented
    console.log("VOXEL:: add listener",this.tagName, eventName, listener);
    this.emitter.addListener(eventName, listener)
  }

  removeEventListener(eventName, listener) {
    // unimplemented
    this.emitter.removeListener(eventName, listener)
  }
}

class DOMDocument extends DOMElement {
  body = new DOMElement('BODY');

  constructor() {
    super('#document');
  }

  createElement(tagName) {
    return new DOMElement(tagName);
  }

  getElementById(id) {
    return new DOMElement('div');
  }
}

process.browser = true

window.emitter = new EventEmitter();
window.addEventListener = (eventName, listener) => {
  // unimplemented
  console.log("VOXEL:: add listener","WINDOW", eventName, listener);
  window.emitter.addListener(eventName, listener)
}
window.removeEventListener = (eventName, listener) => {
  // unimplemented
  window.emitter.removeListener(eventName, listener)
}

let { width, height } = Dimensions.get('window');
window.innerWidth = window.clientWidth = width;
window.innerHeight = window.clientHeight = height;
window.document = new DOMDocument();
navigator.userAgent = "iPhone";

global.Image = (width = 0, height = 0) => {
  let img = new DOMElement('IMG');;
  img.width = width
  img.height = height
  img.src = "";
  return img;
};
global.performance = null;
