import {SvgPath} from '../SvgPath_Class.js'
import {measureSvgPathFunction} from '../../../../DocumentSvg_functions/measureSvgPath_NEW.js'
import {addEndPointFunction, addEndPointFunction_curve} from '../../../../DocumentSvg_functions/endPoint_functions/addEndPoint_NEW.js'

// Child class using "Inheritance"
function SvgPathSecondary(thisFigure, parentElement, actionStates, index) {
    // Call the constructor of the parent class
    SvgPath.call(this, thisFigure, parentElement, actionStates, index)
}

// Inherit methods from the parent class
SvgPathSecondary.prototype = Object.create(SvgPath.prototype)
SvgPathSecondary.prototype.constructor = SvgPathSecondary

// Override the createSvgPath method
SvgPathSecondary.prototype.createSvgPath = function(index) {
    let newPathSecondary = SvgPath.prototype.createSvgPath.call(this, index) // Call parent method
        .on("click", (event) => this.elementClick(event, this.actionStates))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.thisFigure, this.actionStates)))
        newPathSecondary.node().classList.add('secondaryPath')
    return newPathSecondary
}

SvgPathSecondary.prototype.elementClick = function(event, actionStates) {
    if(actionStates.addEndPointActive === false && actionStates.addEndPointActive_curve === false && actionStates.drawParallelPathAcive === false && actionStates.measurePathActive === false) {
        console.log('Secondary path clicked, all secondary path click functions off.')
        console.log(this.thisFigure.svgPaths.secondaryPaths.indexOf(this))
    } else if(actionStates.addEndPointActive === true) {
        console.log('Add Path EndPoint = true')
        addEndPointFunction(event, this)
        actionStates.addEndPointActive = false
    } else if(actionStates.addEndPointActive_curve === true) {
        console.log('Add Path Arc = true')
        addEndPointFunction_curve(event, this)
        actionStates.addEndPointActive_curve = false
    } else if(actionStates.drawParallelPathAcive === true) {
        console.log('Add Parallel = true')
        actionStates.drawParallelPathAcive = false
    } else if(actionStates.measurePathActive === true) {
        // console.log('Measure Path = true')
        measureSvgPathFunction(this)
        actionStates.measurePathActive = false
    }
}

SvgPathSecondary.prototype.elementDrag = function(event, thisFigure, actionStates) {
    console.log('Secondary path dragging.')
}

// this.actionStates = {
//     drawPathActive: false,
//     addEndPointActive_curve: false,
//     drawParallelPathAcive: false,
//     measurePathActive: false
// }

export {
    SvgPathSecondary
}