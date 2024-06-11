// Child class using "Inheritance"
// function SvgPathParallel(thisFigure, parentElement, actionStates, index) {
function SvgPathParallel(thisFigure, parentElement, index) {
    // Call the constructor of the parent class
    // SvgPath.call(this, thisFigure, parentElement, actionStates, index)
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
    return newPathParallel
}