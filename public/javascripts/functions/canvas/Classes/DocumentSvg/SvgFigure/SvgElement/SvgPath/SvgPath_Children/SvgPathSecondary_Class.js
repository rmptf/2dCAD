import {SvgPath} from '../SvgPath_Class.js'

// Child class using "Inheritance"
function SvgPathSecondary(parentElement, actionStates) {
    // Call the constructor of the parent class
    SvgPath.call(this, parentElement, actionStates)
}

// Inherit methods from the parent class
SvgPathSecondary.prototype = Object.create(SvgPath.prototype)
SvgPathSecondary.prototype.constructor = SvgPathSecondary

// Override the createSvgPath method
SvgPathSecondary.prototype.createSvgPath = function() {
    let newPathSecondary = SvgPath.prototype.createSvgPath.call(this) // Call parent method
        .on("click", (event) => this.elementClick(event, this.actionStates))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.actionStates)))
        newPathSecondary.node().classList.add('secondaryPath')
    return newPathSecondary
}

SvgPathSecondary.prototype.elementClick = function(event, actionStates) {
    if(actionStates.addCurvePointActive === false && actionStates.drawParallelPathAcive === false && actionStates.measurePathActive === false) {
        console.log('Secondary path clicked, all secondary path click functions off.')
    } else if(actionStates.addCurvePointActive === true) {
        console.log('Add Path Arc = true')
        actionStates.addCurvePointActive = false
    } else if(actionStates.drawParallelPathAcive === true) {
        console.log('Add Parallel = true')
        actionStates.drawParallelPathAcive = false
    } else if(actionStates.measurePathActive === true) {
        console.log('Measure Path = true')
        actionStates.measurePathActive = false
    }
}

SvgPathSecondary.prototype.elementDrag = function(event, actionStates) {
    console.log('Secondary path dragging.')
}

// this.actionStates = {
//     drawPathActive: false,
//     addCurvePointActive: false,
//     drawParallelPathAcive: false,
//     measurePathActive: false
// }

// SvgPathSecondary.prototype.setCoordinateData = function() {
//     this.svgElementObject.attr('cx', this.pathData.coords.x).attr('cy', this.pathData.coords.y)
// }

export {
    SvgPathSecondary
}