import React from "react";
import { Dimensions, StatusBar, Platform } from "react-native";
import { GLView } from "expo";

export default class HTMLCanvasElement {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        ctx.canvas = this;

        Object.defineProperty(this, "width", {
            set: val => {
                try {
                    throw new Exception();
                } catch (ex) {
                    //console.log(ex.stack);
                }
                console.log("width", val);
                this._width = val;
            },
            get: () => {
                return this._width;
            }
        });

        this.width = width;
        this.height = height;

        this.style = {
            display: "block",
            width,
            height
        };
        this.parentNode = {
            insertBefore: function () {
                /* NOP */
            },
            currentStyle: {
                "padding-top": 10,
                "padding-bottom": 10,
                "padding-left": 10,
                "padding-right": 10
            },
            clientWidth: width,
            clientHeight: height
        };

        global.document.defaultView = {
            getComputedStyle: function (node) {
                return { "max-width": width, "max-height": height };
            }
        };

    }

    getContext() {
        return this.ctx;
    }

    getAttribute(name) {
        return this[name];
    }

    insertBefore() {
        // ignore this
    }
}

// export default class ChartView extends React.Component {
//     render() {
//         return (
//             <GLView
//                 style={{ flex: 1, top: 24 }}
//                 onContextCreate={this._onContextCreate}
//             />
//         );
//     }

//     _onContextCreate = gl => {
//         StatusBar.setHidden(false);

//         const { width, height, scale } = Dimensions.get("window");
//         console.log({ width, height, scale });

//         // gl.enableLogging = true;

//         const isAndroid = Platform.OS === 'android';

//         var ctx = new CanvasRenderingContext2D(gl, width, height, isAndroid ? scale : 1),
//             // Mockup of canvas class to bypass sanity checks inside chartjs
//             canvas = new HTMLCanvasElement(ctx, width, height);

//         // Global in RN is like window in browser
//         global.HTMLCanvasElement = HTMLCanvasElement;
//         global.CanvasRenderingContext2D = CanvasRenderingContext2D;

//         // TODO: Not the greatest idea to link to github. Currently an XHR request to get the file, figure out RN way.
//         const fontUrl =
//             "https://github.com/joshmarinacci/node-pureimage/blob/master/tests/fonts/SourceSansPro-Regular.ttf?raw=true";

//         ctx.loadFontAsync(fontUrl).then(() => {
//             var myChart = new Chart(ctx, {
//                 type: "bar",
//                 data: {
//                     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//                     datasets: [
//                         {
//                             label: "# of Votes",
//                             data: [12, 19, 3, 5, 2, 3],
//                             backgroundColor: [
//                                 "rgba(255, 99, 132, 0.2)",
//                                 "rgba(54, 162, 235, 0.2)",
//                                 "rgba(255, 206, 86, 0.2)",
//                                 "rgba(75, 192, 192, 0.2)",
//                                 "rgba(153, 102, 255, 0.2)",
//                                 "rgba(255, 159, 64, 0.2)"
//                             ],
//                             borderColor: [
//                                 "rgba(255,99,132,1)",
//                                 "rgba(54, 162, 235, 1)",
//                                 "rgba(255, 206, 86, 1)",
//                                 "rgba(75, 192, 192, 1)",
//                                 "rgba(153, 102, 255, 1)",
//                                 "rgba(255, 159, 64, 1)"
//                             ],
//                             borderWidth: 1
//                         }
//                     ]
//                 },
//                 options: {
//                     scales: {
//                         yAxes: [
//                             {
//                                 ticks: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             });
//         });
//     };
// // }