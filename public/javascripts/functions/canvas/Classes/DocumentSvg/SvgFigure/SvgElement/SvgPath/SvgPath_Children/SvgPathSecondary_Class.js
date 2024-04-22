import {SvgPath} from '../SvgPath_Class.js'

// Child class using "Inheritance"
function SvgPathSecondary(parentElement, parentFigure) {
    // Call the constructor of the parent class
    SvgPath.call(this, parentElement, parentFigure)
}

// Inherit methods from the parent class
SvgPathSecondary.prototype = Object.create(SvgPath.prototype)
SvgPathSecondary.prototype.constructor = SvgPathSecondary

// Override the createSvgPath method
SvgPathSecondary.prototype.createSvgPath = function() {
    let newPathSecondary = SvgPath.prototype.createSvgPath.call(this) // Call parent method
        // .attr('class', this.className_new) // Add additional attribute
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
        newPathSecondary.node().classList.add('secondaryPath')
    return newPathSecondary
}

// SvgPathSecondary.prototype.setCoordinateData = function() {
//     this.svgElementObject.attr('cx', this.pathData.coords.x).attr('cy', this.pathData.coords.y)
// }

export {
    SvgPathSecondary
}