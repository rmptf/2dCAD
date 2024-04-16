import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointPrimary(parentElement, parentFigure) {
    SvgEndPoint.call(this, parentElement, parentFigure)
    // this.newSvgEndPointPrimary = this.createSvgEndPoint()
}

SvgEndPointPrimary.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointPrimary.prototype.constructor = SvgEndPointPrimary

SvgEndPointPrimary.prototype.createSvgEndPoint = function() {
    let newEndPointPrimary = SvgEndPoint.prototype.createSvgEndPoint.call(this)
        .attr('cx', 100).attr('cy', 100)
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
    newEndPointPrimary.node().classList.add('mainEndPoint') // change to primaryEndPoint sometime
    this.figure.figureSvgEndPoints = newEndPointPrimary
    return newEndPointPrimary
}

export {
    SvgEndPointPrimary
}









// import {SvgPath} from '../SvgPath_Class.js'

// // Child class using "Inheritance"
// function SvgPathPrimary(parentElement, parentFigure) {
//     // Call the constructor of the parent class
//     SvgPath.call(this, parentElement, parentFigure)
//     this.className_new = 'className_PRIMARY' // Add className_new property
//     // this.newSvgPathPrimary = this.createSvgPath() // turned off for now, call here or at newPathInstantiate?
// }

// // Inherit methods from the parent class
// SvgPathPrimary.prototype = Object.create(SvgPath.prototype)
// SvgPathPrimary.prototype.constructor = SvgPathPrimary

// // Override the createSvgPath method
// SvgPathPrimary.prototype.createSvgPath = function() {
//     let newPathPrimary = SvgPath.prototype.createSvgPath.call(this) // Call parent method
//         .attr('class', this.className_new) // Add additional attribute
//         // .on("click", (event) => handleClick())
//         // .call(d3.drag().on("drag", (event) => handleDrag()))
//     this.figure.figureSvgPaths.primaryPath = newPathPrimary
//     return newPathPrimary
// }

// export {
//     SvgPathPrimary,
// }