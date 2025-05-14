import {SvgPath} from '../SvgPath_Class.js'
import {ParallelFigure} from '../../../ParallelFigure/ParallelFigure_Class.js'
import {measureSvgPathFunction} from '../../../../DocumentSvg_functions/measureSvgPath_NEW.js'
import {addEndPointFunction} from '../../../../DocumentSvg_functions/endPoint_functions/endPointHandler_NEW.js'
import {saveFigureData} from '../../../../DocumentSvg_functions/saveFigureData_NEW.js'
// import {drawParallelPathFunction_NEW} from '../../../../DocumentSvg_functions/drawParallelPath_NEW/drawParallelPath_NEW.js'

// Child class using "Inheritance"
function SvgPathSecondary(thisFigure, parentElement, actionStates, index) {
    // Call the constructor of the parent class
    // SvgPath.call(this, thisFigure, parentElement, actionStates, index)
    this.PATH_CLASS = 'secondaryPath'
    SvgPath.call(this, thisFigure, parentElement, index)
    this.actionStates = actionStates
}

// Inherit methods from the parent class
SvgPathSecondary.prototype = Object.create(SvgPath.prototype)
SvgPathSecondary.prototype.constructor = SvgPathSecondary

// Override the createSvgPath method
SvgPathSecondary.prototype.createSvgPath = function(index) {
    let newPathSecondary = SvgPath.prototype.createSvgPath.call(this, index) // Call parent method
        .on("click", (event) => this.elementClick(event, this.actionStates))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.thisFigure, this.actionStates)))
        newPathSecondary.node().classList.add(this.PATH_CLASS)
    return newPathSecondary
}

SvgPathSecondary.prototype.elementClick = function(event, actionStates) {
    let clickedIndex = this.thisFigure.svgPaths.secondaryPaths.indexOf(this)
    if(
        actionStates.addEndPointActive === false &&
        actionStates.addEndPointActive_curve === false &&
        actionStates.drawParallelPathAcive === false &&
        actionStates.measurePathActive === false &&
        actionStates.saveFigureDataActive === false
    ) {
        console.log('Secondary path clicked, all secondary path click functions off.')
        console.log(this.thisFigure.svgPaths.secondaryPaths.indexOf(this))
    } else if(actionStates.addEndPointActive === true) {
        console.log('Add Path EndPoint = true')
        addEndPointFunction(event, this, false)
        actionStates.addEndPointActive = false
    } else if(actionStates.addEndPointActive_curve === true) {
        console.log('Add Path Arc = true')
        addEndPointFunction(event, this, true)
        actionStates.addEndPointActive_curve = false
    } else if(actionStates.drawParallelPathAcive === true) {
        console.log('Add Parallel = true')
        let newParallelFigure = new ParallelFigure(this.thisFigure, clickedIndex)
        newParallelFigure.parallelFigure_updateSvg()
        newParallelFigure.initiateFigure()
        this.thisFigure.parallelFigure = this
        actionStates.drawParallelPathAcive = false
    } else if(actionStates.measurePathActive === true) {
        // console.log('Measure Path = true')
        measureSvgPathFunction(this)
        actionStates.measurePathActive = false
    } else if(actionStates.saveFigureDataActive === true) {
        console.log('Save Figure Data = true')
        saveFigureData(this.thisFigure)
        actionStates.saveFigureDataActive = false
    }
}

SvgPathSecondary.prototype.elementDrag = function(event, thisFigure, actionStates) {
    console.log('Secondary path dragging.')
}

export {
    SvgPathSecondary
}