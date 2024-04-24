import {SvgPath} from '../SvgPath_Class.js'

// Child class using "Inheritance"
function SvgPathPrimary(parentElement, actionStates) {
    // Call the constructor of the parent class
    SvgPath.call(this, parentElement, actionStates)
}

// Inherit methods from the parent class
SvgPathPrimary.prototype = Object.create(SvgPath.prototype)
SvgPathPrimary.prototype.constructor = SvgPathPrimary

// Override the createSvgPath method
SvgPathPrimary.prototype.createSvgPath = function() {
    let newPathPrimary = SvgPath.prototype.createSvgPath.call(this) // Call parent method
        .on("click", (event) => this.elementClick(event, this.actionStates))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.actionStates)))
        newPathPrimary.node().classList.add('mainPath') // change to primaryPath sometime
    return newPathPrimary
}

SvgPathPrimary.prototype.elementClick = function(event, actionStates) {
    console.log('Primary path clicked.')
}

SvgPathPrimary.prototype.elementDrag = function(event, actionStates) {
    console.log('Primary path dragging.')
}

export {
    SvgPathPrimary,
}