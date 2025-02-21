// Child class using "Inheritance"
import {SvgPath} from '../SvgPath_Class.js'

// function SvgPathParallel(thisFigure, parentElement, actionStates, index) {
function SvgPathParallel(thisFigure, parentElement, index, joinerFlag) {
    // Call the constructor of the parent class
    // SvgPath.call(this, thisFigure, parentElement, actionStates, index)
    this.PATH_CLASS = 'parallelPath'
    this.PATH_JOINER_CLASS = 'joiner_path'
    this.joinerFlag = joinerFlag
    SvgPath.call(this, thisFigure, parentElement, index)
}

// Inherit methods from the parent class
SvgPathParallel.prototype = Object.create(SvgPath.prototype)
SvgPathParallel.prototype.constructor = SvgPathParallel

// Override the createSvgPath method
SvgPathParallel.prototype.createSvgPath = function(index) {
    let newPathParallel = SvgPath.prototype.createSvgPath.call(this, index) // Call parent method
        .on("click", (event) => this.elementClick(event, this.actionStates, newPathParallel))
        // .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.thisFigure, this.actionStates)))
        newPathParallel.node().classList.add(this.PATH_CLASS)
        if(this.joinerFlag === true) {
            newPathParallel.node().classList.add(this.PATH_JOINER_CLASS)
        }
    return newPathParallel
}

SvgPathParallel.prototype.elementClick = function(event, actionStates, path) {
    console.log('parallelPath_clicked')
    console.log(this)
    // path.node().classList.add("displayNone")
}

export {
    SvgPathParallel
}