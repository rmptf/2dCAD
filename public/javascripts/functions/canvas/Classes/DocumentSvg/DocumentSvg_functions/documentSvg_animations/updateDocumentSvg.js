import {calculateArcAndDescribePath, describeComplexPath} from '../documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'

function updateSVG_thisSvgFigure(figure) {
    let pathDatas = figure.svgPathDatas
    // console.log(pathDatas)

    // PATH
    let primaryPath = figure.svgPaths.primaryPath
    primaryPath.svgElementObject
        .attr('d', calculateArcAndDescribePath(pathDatas))
    // PATH

    // SECONDARY PATH
    let secondaryPaths = figure.svgPaths.secondaryPaths
    for (let i = 0; i < secondaryPaths.length; i++) {
        secondaryPaths[i].svgElementObject
            .attr('d', describeComplexPath([pathDatas[i], pathDatas[i + 1]]))
    }
    // SECONDARY PATH

    // END POINTS
    let endPoints = figure.svgEndPoints
    for (let i = 0; i < endPoints.length; i++) {
        endPoints[i].svgElementObject
            .attr('cx', pathDatas[i].coords.x)
            .attr('cy', pathDatas[i].coords.y)
    }
    // END POINTS
}

// function updateSVG_parallelPathAndPoints(parallelEndPointsArray, parallelPathsArray, parallelPathData) {
//     // PARALLEL END POINTS
//     let k = -1
//     for (let i = 0; i < parallelPathsArray.length; i++) {
//         for (let j = 0; j < parallelPathData[i].length; j++) {
//             k = k + 1
//             let endPoint1 = d3.select(parallelEndPointsArray[k]._groups[0][0])
//             endPoint1.attr('cx', parallelPathData[i][j].coords.x).attr('cy', parallelPathData[i][j].coords.y)
//                 // .style('r', 5)
//         }
//     }
//     // PARALLEL END POINTS

//     // PARALLEL PATH
//     for (let i = 0; i < parallelPathsArray.length; i++) {
//         let parallelPath = d3.select(parallelPathsArray[i]._groups[0][0])
//             // parallelPath.attr('d', calculateArcAndDescribePath([parallelPathData[i][0], parallelPathData[i][1]]))
//             parallelPath.attr('d', describeComplexPath([parallelPathData[i][0], parallelPathData[i][1]]))
//     }
//     // PARALLEL PATH
// }

export {
    updateSVG_thisSvgFigure,
    // updateSVG_mainPathAndPoints,
    // updateSVG_parallelPathAndPoints
}