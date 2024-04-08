import { SvgPath } from "../SvgPath_Class";

// Child class using "Inheritance"
function SvgPath_Closed(parentElement, parentFigure) {
    // Call the constructor of the parent class
    SvgPath.call(this, parentElement, parentFigure);
    this.className_2 = className_2; // Add className_2 property
}

// Inherit methods from the parent class
SvgPath_Closed.prototype = Object.create(SvgPath.prototype);
SvgPath_Closed.prototype.constructor = SvgPath_Closed;

// Override the createSvgPath method
SvgPath_Closed.prototype.createSvgPath = function() {
    let newPath = SvgPath.prototype.createSvgPath.call(this); // Call parent method
    newPath.attr('class_2', this.className_2); // Add additional attribute
    return newPath;
}

export {
    SvgPath_Closed,
}