import {PathData} from '../../SvgElement_Data/PathData_Class.js'

function SvgPath(parentElement, parentFigure) {
    this.parentElement = parentElement
    this.element = 'path'
    this.className = className
    this.id = id
    this.newSvgPath = this.createSvgPath()

    this.figure = parentFigure
    this.pathData = new PathData()

}

SvgPath.prototype.createSvgPath = function() {
    let newPath = this.parentElement.append(this.element)
        .attr('class', this.className)
        .attr('id', this.id)
        .on("click", (event) => handleClick())
        .call(d3.drag().on("drag", (event) => handleDrag()))
    this.figure.push(newPath)
    return newPath
}




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
};

export {
    SvgPath,
    SvgPath_Closed
};



// // SvgPath class
// function SvgPath(parentElement, parentFigure, className, id) {
//     this.parentElement = parentElement;
//     this.element = 'path';
//     this.className = className;
//     this.id = id;
//     this.figure = parentFigure;
//     this.pathData = new PathData();
// }

// SvgPath.prototype.createSvgPath = function(className_2) {
//     let newPath = this.parentElement.append(this.element)
//         .attr('class', this.className)
//         .attr('id', this.id)
//         .on("click", (event) => handleClick())
//         .call(d3.drag().on("drag", (event) => handleDrag()));
//     if(className_2) {
//         newPath.attr('class_2', className_2);
//     }
//     this.figure.push(newPath);
//     return newPath;
// };

// // SvgPath_Closed class using composition
// function SvgPath_Closed(parentElement, parentFigure, className, id, className_2) {
//     this.svgPath = new SvgPath(parentElement, parentFigure, className, id);
//     this.className_2 = className_2;
// }

// SvgPath_Closed.prototype.createSvgPath = function() {
//     return this.svgPath.createSvgPath(this.className_2);
// };

// export {
//     SvgPath,
//     SvgPath_Closed
// };








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
// }