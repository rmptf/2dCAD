import {SvgPath} from '../SvgPath_Class.js'

// Child class using "Inheritance"
function SvgPathPrimary(parentElement, parentFigure) {
    // Call the constructor of the parent class
    SvgPath.call(this, parentElement, parentFigure)
    // this.className_new = 'className_PRIMARY' // Add className_new property
    // this.newSvgPathPrimary = this.createSvgPath() // turned off for now, call here or at newPathInstantiate?
}

// Inherit methods from the parent class
SvgPathPrimary.prototype = Object.create(SvgPath.prototype)
SvgPathPrimary.prototype.constructor = SvgPathPrimary

// Override the createSvgPath method
SvgPathPrimary.prototype.createSvgPath = function() {
    let newPathPrimary = SvgPath.prototype.createSvgPath.call(this) // Call parent method
        // .attr('class', this.className_new) // Add additional attribute
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
        newPathPrimary.node().classList.add('mainPath') // change to primaryPath sometime
    this.figure.figureSvgPaths.primaryPath = newPathPrimary
    return newPathPrimary
}

export {
    SvgPathPrimary,
}