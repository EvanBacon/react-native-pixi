import React from "react";
import Expo from "expo";
import { Dimensions, View, Image, StyleSheet, Platform } from "react-native";
import Touches from "../window/Touches";
import Files from "../Files";
import { PixiView } from "./index";
import * as PIXI from "pixi.js";
// var PixiGL = require('pixi-gl-core');
import Context2D from "../expo_2d_context";

export default class Scene extends React.Component {
  static defaultProps = {
    onFinishedLoading: () => {}
  };
  shouldComponentUpdate = () => false;

  render = () => (
    <PixiView
      onContextCreate={this.onContextCreateAsync}
      render={this.animate}
    />
  );

  onContextCreateAsync = async gl => {
    const { width, height, scale } = Dimensions.get("window");

    // gl.enableLogging = true;

    /*
      Setup Pixi Application
      Pass through our EXGL context
    */
    const app = new PIXI.Application({
      width: width * 2,
      height: height * 2,
      context: gl,
      resolution: scale * 2,
      backgroundColor: 0x1099bb,
      forceCanvas: false
    });
    global.canvasContext = new Context2D(gl);

    // /*
    //   TODO:
    //   Textures aren't working
    //   when they do we should see Nik
    // */

    // create a new Sprite from an image path
    const asset = Expo.Asset.fromModule(Files.sprites.nik);
    if (!asset.localUri) await asset.downloadAsync();

    //new HTMLImageElement(asset)
    const benny = PIXI.Sprite.from(new HTMLImageElement(asset));

    // setTimeout(() => {
    // app.stage.addChild(benny);
    // }, 10000);

    // window.addEventListener("resize", this.onWindowResize, false);

    this.props.onFinishedLoading && this.props.onFinishedLoading();
  };

  animate = delta => {};

  onWindowResize = () => {
    const { width, height, scale } = Dimensions.get("window");
  };
}
//
// export default Touches(Scene);
