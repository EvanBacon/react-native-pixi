import { Image, Dimensions } from 'react-native';
import EventEmitter from 'EventEmitter';

 /*
   I took this from @IDE BubbleBounce
   https://github.com/ide/bubblebounce/blob/master/src/FakeBrowser.js
*/

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
  }

  insertBefore = () => {

  }
  
  getContext(contextType) {
    if (global.canvasContext) {
      return global.canvasContext;
    }
    return {
      fillRect: (_ => { }),
      drawImage: (_ => { }),
      getImageData: (_ => { }),
      getContextAttributes: (_ => ({
        stencil: true
      })),
      getExtension: (_ => ({
        loseContext: (_ => {

        })
      })),
    }
  }

  get tagName() {
    return this.nodeName;
  }
  addEventListener(eventName, listener) {
    console.log("add listener", this.tagName, eventName, listener);
    this.emitter.addListener(eventName, listener)
  }
  removeEventListener(eventName, listener) {
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
  
  console.log("add listener", "WINDOW", eventName, listener);
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
window.location = "file://"; // <- Not sure about this... or anything for that matter ¯\_(ツ)_/¯
navigator.userAgent = "iPhone"; // <- This could be made better, but I'm not sure if it'll matter for PIXI
global.performance = null; 

/// I'm just guessing now
class CustomImage extends Image {
  constructor(width, height) {
    super();
  }
  set src(val) {
    this.source = val;
    if (typeof val === 'string') {  
      Image.prefetch(val);
      this.source = {uri: val};
    } else {
      let asset = Expo.Asset.fromModule(val);

      if (!asset.localUri) {
        (async () => {
          await asset.downloadAsync();
        })()
      }
    }
  }
}
global.Image = CustomImage;

/// Old version

// global.Image = (width = 0, height = 0) => {
//   let img = new DOMElement('IMG');;
//   img.width = width
//   img.height = height
//   // img.src = "";
//   if (!asset.localUri) {
//     await asset.downloadAsync();
//   }
//   set src = () => {
//   }
//   return img;
// };


