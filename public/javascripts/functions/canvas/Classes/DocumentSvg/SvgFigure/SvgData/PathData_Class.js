function PathData() {
    this.coords = {
        x: null,
        y: null
    },
    this.arc = {
        exist: false,
        radius: 0,
        rotation: 0,
        arcFlag: 0,
        sweepFlag: 0,
        side: undefined,
        center: {
            x: 0,
            y: 0
        },

        startAngle: null,

        joiner: false,
        joinerSide: undefined,
    }
}

PathData.prototype.test = function() {
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
