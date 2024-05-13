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

PathData.prototype.setAllData = function(data) {
    const { coords, arc } = data
    this.coords = { ...coords }
    this.arc = { ...arc }
    // if (arc.center) {
    //     this.arc.center = { ...arc.center }
    // }
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