import React from 'react';
import Expo, { GLView } from 'expo';
import {Dimensions} from 'react-native'
import './FakeBrowser'
const vertSrc = `
attribute vec2 position;
varying vec2 uv;
void main() {
  gl_Position = vec4(position.x, -position.y, 0.0, 1.0);
  uv = vec2(0.5, 0.5) * (position+vec2(1.0, 1.0));
}`;

const fragSrc = `
precision highp float;
varying vec2 uv;
void main () {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`;

export const createTextureAsync = async ({ asset }) => {
  if (!asset.localUri) {
    await asset.downloadAsync();
  }
  // const texture = new PIXI.Texture.fromImage(asset.localUri)
  // texture.image = {
  //   data: asset,
  //   width: asset.width,
  //   height: asset.height,
  // };
  // texture.needsUpdate = true;
  // texture.isDataTexture = true; // Forces passing to `gl.texImage2D(...)` verbatim
  // texture.minFilter = THREE.LinearFilter; // Pass-through non-power-of-two
  // return texture;
  return ({
    data: asset,
    width: asset.width,
    height: asset.height,
  });
};

var textStyle = { fill: 0xffffff };
function createSprite(texture, text) {
	var sprite = new PIXI.Sprite(texture);
	// sprite.addChild(new PIXI.Text(text, textStyle));
	sprite.anchor.set(0.5, 1);
	// sprite.children[0].anchor.set(0.5, 0);
	sprite.interactive=true;
	// sprite.on('click', function() { this.alpha = 1.7 - this.alpha; } );
	return sprite;
}


var PIXI = require('pixi.js');
// import phaser from 'phaser-ce'
export default class GLScene extends React.Component {


  render() {
    return (
      <GLView
        style={this.props.style}
        onContextCreate={this._onContextCreate}
      />
    );
  }

  _onContextCreate = async gl => {
    //   let texture = await createTextureAsync({
    //   asset: Expo.Asset.fromModule(require('./assets/icons/app.png')),
    // })

    if (!gl.getContextAttributes) {
      
    } else {

    }

gl.getContextAttributes = (() => {
        return {
          stencil: true
        }
      });

    window.WebGLRenderingContext = gl;

    const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;
    // const {width, height} = Dimensions.get('window')
    var app = new PIXI.Application(width, height, {
      context: gl,
      backgroundColor : 0x1099bb
    });
    


  
// 'https://usefulstooges.files.wordpress.com/2016/10/affleck.jpg'


// create a new Sprite from an image path
// console.warn(texture.data.type, texture.data.localUri)
var bunny = PIXI.Sprite.from('https://usefulstooges.files.wordpress.com/2016/10/affleck.jpg')

// center the sprite's anchor point
bunny.anchor.set(0.5);


bunny.width = 300;
bunny.height = 300;
// move the sprite to the center of the screen
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;





    // let sprite = createSprite(texture, "Evan");
    // app.stage.addChild(sprite);

  var graphics = new PIXI.Graphics();

// // set a fill and line style
// graphics.beginFill(0xFF3300);
// graphics.lineStyle(4, 0xffd900, 1);

// // draw a shape
// graphics.moveTo(50,50);
// graphics.lineTo(250, 50);
// graphics.lineTo(100, 100);
// graphics.lineTo(50, 50);
// graphics.endFill();

// set a fill and a line style again and draw a rectangle
graphics.lineStyle(2, 0x0000FF, 1);
graphics.beginFill(0xFF700B, 1);
graphics.drawRect(bunny.x, bunny.y, bunny.width, bunny.height);
graphics.endFill();

// // draw a rounded rectangle
// graphics.lineStyle(2, 0xFF00FF, 1);
// graphics.beginFill(0xFF00BB, 0.25);
// graphics.drawRoundedRect(150, 450, 300, 100, 15);
// graphics.endFill();

// // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
// graphics.lineStyle(0);
// graphics.beginFill(0xFFFF0B, 0.5);
// graphics.drawCircle(470, 90,60);
// graphics.endFill();

app.stage.addChild(graphics);

app.stage.addChild(bunny);


    app.ticker.add(function(delta) {
      gl.flush();
            gl.endFrameEXP();
  //  bunny.rotation += 0.1 * delta;
    });

    // // Compile vertex and fragment shader
    // const vert = gl.createShader(gl.VERTEX_SHADER);
    // gl.shaderSource(vert, vertSrc);
    // gl.compileShader(vert);
    // const frag = gl.createShader(gl.FRAGMENT_SHADER);
    // gl.shaderSource(frag, fragSrc);
    // gl.compileShader(frag);

    // // Link together into a program
    // const program = gl.createProgram();
    // gl.attachShader(program, vert);
    // gl.attachShader(program, frag);
    // gl.linkProgram(program);

    // // Save position attribute
    // const positionAttrib = gl.getAttribLocation(program, 'position');

    // // Create buffer
    // const buffer = gl.createBuffer();

    // // Animate!
    // let skip = false;
    // const animate = () => {
    //   try {
    //     if (skip) {
    //       // return;
    //     }

    //     // Clear
    //     gl.clearColor(0, 0, 1, 1);
    //     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //     // Bind buffer, program and position attribute for use
    //     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //     gl.useProgram(program);
    //     gl.enableVertexAttribArray(positionAttrib);
    //     gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    //     // Buffer data and draw!
    //     const speed = this.props.speed || 1;
    //     const a = 0.48 * Math.sin(0.001 * speed * Date.now()) + 0.5;
    //     const verts = new Float32Array([
    //       -a,
    //       -a,
    //       a,
    //       -a,
    //       -a,
    //       a,
    //       -a,
    //       a,
    //       a,
    //       -a,
    //       a,
    //       a,
    //     ]);
    //     gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    //     gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);

    //     // Submit frame
    //     gl.flush();
    //     gl.endFrameEXP();
    //   } finally {
    //     skip = !skip;
    //     gl.enableLogging = false;
    //     requestAnimationFrame(animate);
    //   }
    // };
    // animate();
  };
}