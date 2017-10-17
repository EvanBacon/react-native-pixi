import React from 'react';
import Expo from 'expo';
import { Dimensions, Image, StyleSheet, Platform } from 'react-native'
import Touches from '../window/Touches';
import Files from '../Files';
import { PixiView } from './index';
import * as PIXI from 'pixi.js';
// var PixiGL = require('pixi-gl-core');

export const createTextureAsync = async ({ asset }) => {
  if (!asset.localUri) {
    await asset.downloadAsync();
  }
  return ({
    data: asset,
    width: asset.width,
    height: asset.height,
  });
};

const textStyle = { fill: 0xffffff };
function createSprite(texture, text) {
  const sprite = new PIXI.Sprite(texture);
  // sprite.addChild(new PIXI.Text(text, textStyle));
  sprite.anchor.set(0.5, 1);
  // sprite.children[0].anchor.set(0.5, 0);
  sprite.interactive = true;
  // sprite.on('click', function() { this.alpha = 1.7 - this.alpha; } );
  return sprite;
}

class Scene extends React.Component {
  static defaultProps = {
    onFinishedLoading: (() => { })
  }
  shouldComponentUpdate = () => false;

  render = () => (
    <PixiView
      style={StyleSheet.flatten([{ flex: 1 }, this.props.style])}
      onContextCreate={this.onContextCreateAsync}
      render={this.animate}
    />
  );

  onContextCreateAsync = async (gl) => {
    const { width, height, scale } = Dimensions.get("window");

    /*
      Setup Pixi Application
      Pass through our EXGL context
    */

    const app = new PIXI.Application({
      width, 
      height,
      context: gl,
      resolution: scale,
      backgroundColor: 0x1099bb,
      powerPreference: "high-performance",
      legacy: true,
      forceCanvas: false,
    });

    /*
      TODO:
      Textures aren't working
      when they do we should see Nik
    */
    
    // create a new Sprite from an image path
    const asset = Expo.Asset.fromModule(Files.sprites.nik);
    const texture = new PIXI.BaseTexture.from(asset.localUri);
    const benny = PIXI.Sprite.from(texture);
    // const benny = PIXI.Sprite.fromImage(asset.localUri)
    benny.backgroundColor = 0xfff000;
    // center the sprite's anchor point
    benny.anchor.set(0.5);
    // move the sprite to the center of the screen
    benny.x = width / 2;
    benny.y = height / 2;

    console.warn("", benny.getLocalBounds(), benny.texture.orig);

    
    this.benny = benny;
    // /*
    //   Draw some random Graphics
    // */
    const graphics = new PIXI.Graphics();
    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0xFF700B, 1);
    graphics.drawRect(0, 0, width, height);
    graphics.endFill();
    this.graphics = graphics;
    
    benny.addChild(graphics);
    
    app.stage.addChild(benny);

    window.addEventListener('resize', this.onWindowResize, false);

    this.props.onFinishedLoading && this.props.onFinishedLoading();
  };

  animate = (delta) => {
    this.benny.rotation += 0.1 * delta;
  }

  onWindowResize = () => {
    const { width, height, scale } = Dimensions.get("window");
  }

}

export default Touches(Scene);