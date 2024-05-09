// import {describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'
import {calculateArcAndDescribePath, describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'

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

    // this.svgElement_secondaryPath_descriptionAttr = undefined
    // this.svgElement_secondaryPath_descriptionAttr = undefined
}

PathData.prototype.setCoordinateData = function(xCoord, yCoord) {
    this.coords.x = xCoord
    this.coords.y = yCoord
}

PathData.prototype.initiateCurvePoint = function(side) {
    this.arc = {
        exist: true,
        radius: 0,
        rotation: 0,
        arcFlag: 0,
        sweepFlag: 0,
        side: side,
        center: {
            x: 0,
            y: 0
        },

        startAngle: 0,

        joiner: false,
        joinerSide: undefined,
    }
}

PathData.prototype.terminateCurvePoint = function() {
    this.arc = {
        exist: false,
        radius: "null",
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

PathData.prototype.passDataFromClassRepresentation = function(objectSourceCode) {
    function deepCopy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj
        }
        
        let copy = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key])
            }
        }
        return copy
    }
    
    this = deepCopy(objectSourceCode)
}

// PathData.prototype.describeSvgAttribute_primaryPath = function () {
//     // let svgElementAttr_d = calculateArcAndDescribePath()
//     // this.
// }

// PathData.prototype.describeSvgAttribute_secondaryPath = function(prevPathData, thisPathData) {
//     let svgElementAttr_d = describeComplexPath([prevPathData, thisPathData])
//     this.svgElement_secondaryPath_descriptionAttr = svgElementAttr_d
//     return svgElementAttr_d
// }

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
