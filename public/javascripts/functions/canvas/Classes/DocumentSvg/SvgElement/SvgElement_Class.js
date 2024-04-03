function SvgElement() {
    this.parentElement = parentElement
    this.newSvgElement = this.createSvgElement()
    // this.element = ''
    // this.className = className
    // this.id = id
}

SvgElement.prototype.createSvgElement = function() {
    let newElement = this.parentElement.append(this.element)
        // .attr('class', this.className)
        // .attr('id', this.id)
        // .on("click", (event) => clickFunction())
        // .call(d3.drag().on("drag", (event) => calledFunction()))
    return newElement
}

export {
    SvgElement
}

// SvgElement
//     SvgGroup
//     SvgPath (click, drag)
//         SvgPath_Closed
//     SvgEndPoint (click, drag)
//         EndPoint_Corner
//         EndPoint_Curve












// {
// // MAIN PATH
// let newMainPath = obj.self.mainPathGroup
//     .append('path')
//     .attr('class', 'path mainPath')
//     .on("click", (event) => handleMainPathClick(event, figureCount, obj.isDown2, obj.self))
//     .call(d3.drag().on("drag", (event) => handleMainPathDrag(event, figureCount)))
// a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL.push(newMainPath)
// let newPathData1 = rawPathData(obj.m1), newPathData2 = rawPathData(obj.m1)
// a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL.push([newPathData1, newPathData2])
// // MAIN PATH

// // SECONDARY PATH
// let secondaryPathGroup = []
// let newSecondaryPath = obj.self.secondaryPathGroup
//     .append('path')
//     .attr('class', 'path secondaryPath')
//     .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
// secondaryPathGroup.push(newSecondaryPath)
// a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
// // SECONDARY PATH

// // END POINTS
// let endPointGroup = []
// let newEndPoint1 = obj.self.endPointGroup
//     .append('circle')
//     .attr('class', 'endPoint mainEndPoint')
//     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 0, figureCount)}))
// let newEndPoint2 = obj.self.endPointGroup
//     .append('circle')
//     .attr('class', 'endPoint mainEndPoint')
//     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 1, figureCount)}))
// endPointGroup.push(newEndPoint1, newEndPoint2)
// a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPointGroup)
// // END POINTS
// }

// {
// // MAIN PATH
// let newPathData = rawPathData(obj.m1)
// a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newPathData)
// // MAIN PATH

// // SECONDARY PATH
// let newSecondaryPath = obj.self.secondaryPathGroup
//     .append('path')
//     .attr('class', 'path secondaryPath')
//     .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
// a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newSecondaryPath)
// // SECONDARY PATH

// // END POINTS
// let newEndPoint = obj.self.endPointGroup
//     .append('circle')
//     .attr('class', 'endPoint mainEndPoint')
//     .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
//     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, endPointCount, figureCount)}))
// a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newEndPoint)
// // END POINTS
// }













// function SvgElement(parentElement) {
//     this.parentElement = parentElement
// }

// // Method added to the prototype of SvgElement
// SvgElement.prototype.speak = function() {
//     console.log(`${this.parentElement} makes a sound.`)
// }



// // Child class extending from Animal
// function SvgPath(id, parentElement) {
//     SvgElement.call(this, id) // Call the constructor of the parent class
//     this.parentElement = parentElement
//     this.element = 'path'
// }

// // Inherit from Animal
// SvgPath.prototype = Object.create(SvgElement.prototype)
// SvgPath.prototype.constructor = SvgPath

// // Method added to the prototype of SvgPath
// SvgPath.prototype.speak = function() {
//   console.log(`${this.id} is my parent.`)
// }

// // Method specific to SvgPath
// SvgPath.prototype.displayInfo = function() {
//   console.log(`${this.id}'s parent is a ${this.parentElement}.`)
// }





// // // Creating instances of both classes
// // const animal = new Animal("Generic Animal");
// // const dog = new Dog("Buddy", "Golden Retriever");

// // // Using methods of each class
// // animal.speak(); // Output: Generic Animal makes a sound.
// // dog.speak();    // Output: Buddy barks.
// // dog.displayInfo(); // Output: Buddy is a Golden Retriever.