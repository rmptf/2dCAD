// import {updateSVG_parallelPathAndPoints} from '../../../animate/updateSvg.js'

function createParallelPathElementsANDdatas_NEW(figure) {
    console.log("creating objects and transforming data")
    // // Create SVG groups for parallel endpoints and paths
    // self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup');
    // self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup');

    // // Initialize arrays to store endpoint circles, paths, and path data
    // let parallelFigureEndPointsGroup = []
    // let parallelFigurePathsGroup = []
    // let parallelFigurePathDatasGroup = []

    // for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1; i++) {
    //         // Create new SVG endpoint circles and paths
    //         let newParallelEndPoint1 = self.parallelEndPointGroup
    //             .append('circle')
    //             .attr('class', 'endPoint parallelEndPoint')
    //         let newParallelEndPoint2 = self.parallelEndPointGroup
    //             .append('circle')
    //             .attr('class', 'endPoint parallelEndPoint')
    //         let newParallelPath = self.parallelPathGroup
    //             .append('path')
    //             .attr('class', 'path parallelPath')
    //         // Add SVG elements to corresponding arrays
    //         parallelFigureEndPointsGroup.push(newParallelEndPoint1, newParallelEndPoint2);
    //         parallelFigurePathsGroup.push(newParallelPath);

    //         // Retrieve coordinates for the current and next path data
    //         let thisOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
    //         let nextOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]
    //         let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
    //         let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

    //         // Assign correct direction to pathData
    //         // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
    //         // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
    //         if (!thisOriginalFigurePathData.arc.exist) {
    //             if (nextOriginalFigurePathData.arc.exist) {
    //                 nextPlugItIn.arc.side = "west";
    //                 thisPlugItIn.arc = { ...nextPlugItIn.arc }
    //                 nextPlugItIn.arc.side = "east";
    //             }
    //         } else {
    //             if (!nextOriginalFigurePathData.arc.exist) {
    //                 thisPlugItIn.arc = { ...nextPlugItIn.arc }
    //             } else {
    //                 thisPlugItIn.arc.side = "west";
    //                 nextPlugItIn.arc.side = "east";
    //             }
    //         }
    //         parallelFigurePathDatasGroup.push([
    //             thisPlugItIn,
    //             nextPlugItIn,
    //         ])
    //     }
    //     // Push endpoint groups, path groups, and path data to respective arrays
    //     a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
    //     a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
    //     a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)

    //     // console.log(a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    //     // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
    //     // Update the SVG using the updated data
    //     updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL])
}

// original
// function createParallelPathElementsANDdatas_NEW(self, originalFigure_counter_groupCount_GLOBAL) {
//     // Create SVG groups for parallel endpoints and paths
//     self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup');
//     self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup');

//     // Initialize arrays to store endpoint circles, paths, and path data
//     let parallelFigureEndPointsGroup = []
//     let parallelFigurePathsGroup = []
//     let parallelFigurePathDatasGroup = []

//     for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1; i++) {
//             // Create new SVG endpoint circles and paths
//             let newParallelEndPoint1 = self.parallelEndPointGroup
//                 .append('circle')
//                 .attr('class', 'endPoint parallelEndPoint')
//             let newParallelEndPoint2 = self.parallelEndPointGroup
//                 .append('circle')
//                 .attr('class', 'endPoint parallelEndPoint')
//             let newParallelPath = self.parallelPathGroup
//                 .append('path')
//                 .attr('class', 'path parallelPath')
//             // Add SVG elements to corresponding arrays
//             parallelFigureEndPointsGroup.push(newParallelEndPoint1, newParallelEndPoint2);
//             parallelFigurePathsGroup.push(newParallelPath);

//             // Retrieve coordinates for the current and next path data
//             let thisOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
//             let nextOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]
//             let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
//             let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

//             // Assign correct direction to pathData
//             // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
//             // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
//             if (!thisOriginalFigurePathData.arc.exist) {
//                 if (nextOriginalFigurePathData.arc.exist) {
//                     nextPlugItIn.arc.side = "west";
//                     thisPlugItIn.arc = { ...nextPlugItIn.arc }
//                     nextPlugItIn.arc.side = "east";
//                 }
//             } else {
//                 if (!nextOriginalFigurePathData.arc.exist) {
//                     thisPlugItIn.arc = { ...nextPlugItIn.arc }
//                 } else {
//                     thisPlugItIn.arc.side = "west";
//                     nextPlugItIn.arc.side = "east";
//                 }
//             }
//             parallelFigurePathDatasGroup.push([
//                 thisPlugItIn,
//                 nextPlugItIn,
//             ])
//         }
//         // Push endpoint groups, path groups, and path data to respective arrays
//         a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
//         a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
//         a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)

//         // console.log(a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
//         // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
//         // Update the SVG using the updated data
//         updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL])
// }

export{
    createParallelPathElementsANDdatas_NEW
}