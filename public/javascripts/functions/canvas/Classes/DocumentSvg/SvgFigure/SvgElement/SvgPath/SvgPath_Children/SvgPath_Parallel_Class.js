// Child class using "Inheritance"
import {SvgPath} from '../SvgPath_Class.js'

// function SvgPathParallel(thisFigure, parentElement, actionStates, index) {
function SvgPathParallel(thisFigure, parentElement, index, joinerFlag) {
    // Call the constructor of the parent class
    // SvgPath.call(this, thisFigure, parentElement, actionStates, index)
    this.joinerFlag = joinerFlag
    SvgPath.call(this, thisFigure, parentElement, index)
}

// Inherit methods from the parent class
SvgPathParallel.prototype = Object.create(SvgPath.prototype)
SvgPathParallel.prototype.constructor = SvgPathParallel

// Override the createSvgPath method
SvgPathParallel.prototype.createSvgPath = function(index) {
    let newPathParallel = SvgPath.prototype.createSvgPath.call(this, index) // Call parent method
        // .on("click", (event) => this.elementClick(event, this.actionStates))
        // .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.thisFigure, this.actionStates)))
        newPathParallel.node().classList.add('parallelPath')
        if(this.joinerFlag === true) {
            newPathParallel.node().classList.add('joiner_')
        }
    return newPathParallel
}

export {
    SvgPathParallel
}