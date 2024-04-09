function PathData() {
    this.coords = {
        x: null,
        y: null
    },
    // could create arc as child element of PathData?
    this.arc = {
        exist: false,
        radius: null,
        rotation: null,
        arcFlag: null,
        sweepFlag: null,
        side: undefined,
        center: {
            x: null,
            y: null
        },

        startAngle: null,

        joiner: null,
        joinerSide: undefined,
    }
}

PathData.prototype.setCoordinateData = function(xCoord, yCoord) {
    this.coords.x = xCoord
    this.coords.y = yCoord
}

export {
    PathData
}







// let allDATA = {
//     coords: {
//         x: m1[0],
//         y: m1[1]
//     }, 
//     arc: {
//         exist: true,
//         radius: 0,
//         rotation: 0,
//         arcFlag: 0,
//         sweepFlag: 0,
//         side: 'east',
//         center: {x: 0, y: 0},

//         startAngle: 1.4478215111125212,

//         joiner: true,
//         joinerSide: "AAA",
//     }
// }
































// let data = {
//     "coords":{
//         "x":148.24996948242188,
//         "y":90.49999237060547
//     },
//     "arc":{
//         "exist":true,
//         "radius":446.5020880924565,
//         "rotation":0,
//         "arcFlag":0,
//         "sweepFlag":0,
//         "side":"east",
//         "center":{
//             "x":310.6562893929397,
//             "y":-325.4186317904753
//         },
//         "startAngle":0.14914627473343187
//     }
// }
