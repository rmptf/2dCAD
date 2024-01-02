import {doLinesIntersect} from './intParPaths_functions/doLinesIntersect.js'
import {updateSVG_highlight_1_point_01,updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../animate/updateSvg_forTesting/updateSvg_forTests.js'
import {findIntersectingPointSIMPLER} from '../drawParallelPath_functions/parallelPathFunctions.js'

function titsAndAss(self, parallelPathDatas_stopAtIntersect_fromGLOBAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel, originalFigure_counter_groupCount_GLOBAL, parallelPathObject) {
    let runObserverCheck = false
    let intCoords
    let paths = parallelPathDatas_stopAtIntersect_fromGLOBAL
    let path1
    let path2

    for (let i = 0; i < paths.length - 2; i++) {
        path1 = [paths[i][0].coords, paths[i][1].coords]
        for (let j = i + 2; j < paths.length; j++) {
            path2 = [paths[j][0].coords, paths[j][1].coords]
            let checker = doLinesIntersect(path1[0], path1[1], path2[0], path2[1])
            if(checker.doesIntersect === true) {
                runShitIfInt(i, j, checker)
                runObserverCheck = true
                intCoords = checker.coords
            } else {
                runShitIfNOInt(i, j, checker)
            }
        }
    }

    if(runObserverCheck === true) {
        runObserver(self, intCoords)
    }
}

function runShitIfInt(i, j, checker) {
    console.log("These_INTERSECT: ")
    console.log(checker)
    console.log(i, j)
}

function runShitIfNOInt(i, j, checker) {
    console.log("These_DONT_INTERSECT: ")
    console.log(checker)
    console.log(i, j)
}

function runObserver(self, intCoords) {
    updateSVG_highlight_1_point_01([intCoords.x, intCoords.y], self)
    // updateSVG_highlight_2_points_1_line_01([line1_shape1_perpPoints.perpendicularPoint1_X, line1_shape1_perpPoints.perpendicularPoint1_Y], [intersectingPoint_1.x, intersectingPoint_1.y], self)
}






















// function findDuplicateIndices(arr) {
//     const duplicateIndices = {};
  
//     for (let i = 0; i < arr.length - 2; i++) {
//         // console.log("III: " + i)
//       for (let j = i + 2; j < arr.length; j++) {
//         // console.log("J  : " + j)
//         console.log("Count")
//         if (arr[i] === arr[j]) {
//           if (!duplicateIndices[arr[i]]) {
//             duplicateIndices[arr[i]] = [i, j];
//           } else {
//             duplicateIndices[arr[i]].push(j);
//           }
//         }
//       }
//     }

//     // for (let i = 0; i < arr.length; i++) {
//     //     // console.log("III: " + i)
//     //   for (let j = 0; j < arr.length; j++) {
//     //     // console.log("J  : " + j)
//     //     console.log("Count")
//     //     if (arr[i] === arr[j]) {
//     //       if (!duplicateIndices[arr[i]]) {
//     //         duplicateIndices[arr[i]] = [i, j];
//     //       } else {
//     //         duplicateIndices[arr[i]].push(j);
//     //       }
//     //     }
//     //   }
//     // }
  
//     return duplicateIndices;
//   }
  
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// // const numbers = [1, 2, 3, 4, 5, 6, 2, 8, 2, 10, 11, 12]
// // const numbers = [1]
// // const numbers = [1, 2]
// // const numbers = [1, 2, 3]
// // const numbers = [1, 2, 3, 4]
// // const numbers = [1, 2, 3, 4, 5]
// // const numbers = [1, 2, 3, 4, 5, 6]
// // const numbers = [1, 2, 3, 4, 5, 6, 7]
// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// const duplicateIndices = findDuplicateIndices(numbers)
// console.log(duplicateIndices)
// // findDuplicateIndices(numbers)


// // checking every index against the others once
// // 2, 3, 4,  5,  6,  7,  8,  9, 10, 11, 12,
// // 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66,

// // checking every index against the otehrs once except for the indexes directly next to each other
// // 2, 3, 4, 5,  6,  7,  8,  9, 10, 11, 12,
// // 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55,

export {
    titsAndAss
}