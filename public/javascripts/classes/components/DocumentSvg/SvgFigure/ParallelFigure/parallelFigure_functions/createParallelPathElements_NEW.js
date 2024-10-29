import {PathData} from '../../SvgData/PathData_Class.js'

function createParallelPathDatas(originalFigurePathDatas) {
    let parallelFigurePathDatas = []

    for (let i = 0; i < originalFigurePathDatas.length - 1; i++) {

            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = originalFigurePathDatas[i]
            let nextOriginalFigurePathData = originalFigurePathDatas[i + 1]
            let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
            let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

            // Assign correct direction to pathData
            // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
            // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
            if (!thisOriginalFigurePathData.arc.exist) {
                if (nextOriginalFigurePathData.arc.exist) {
                    nextPlugItIn.arc.side = "west";
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                    nextPlugItIn.arc.side = "east";
                }
            } else {
                if (!nextOriginalFigurePathData.arc.exist) {
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                } else {
                    thisPlugItIn.arc.side = "west";
                    nextPlugItIn.arc.side = "east";
                }
            }

            let newPathData01 = new PathData()
            let newPathData02 = new PathData()
            newPathData01.setAllData(thisPlugItIn)
            newPathData02.setAllData(nextPlugItIn)
            parallelFigurePathDatas.push([newPathData01, newPathData02])
            // console.log([newPathData01, newPathData02])
        }

        return parallelFigurePathDatas
}

// Define a function to transform data from one array to a new one
function transformData(oldArrayWithOriginalData) {
    // Initialize a new array to store the transformed data
    let newArrayWithTransformedData
    // Map through the oldArrayWithOriginalData and transform each element
    newArrayWithTransformedData = oldArrayWithOriginalData.map(([point1, point2]) => (
        [
            // Create an object for the first and second points with x and y coordinates
            { x: point1.coords.x, y: point1.coords.y },
            { x: point2.coords.x, y: point2.coords.y }
        ]
    ))
    return newArrayWithTransformedData
}

export{
    createParallelPathDatas,
    transformData
}