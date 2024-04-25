import {describeComplexPath} from '../../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'

function dragPath(event, figure) {
    let pathDatas = figure.svgPathDatas
    for (let i = 0; i < pathDatas.length; i++) {
        pathDatas[i].coords.x += event.dx,
        pathDatas[i].coords.y += event.dy
    }

    let primaryPath = figure.svgPaths.primaryPath
    primaryPath.svgElementObject
        .attr('d', describeComplexPath(pathDatas))

    figure.figure_updateSvg()
}

function dragEndPoint(event, figure, pathData) {
    // needs figuring out, shouldn be too hard just dont have time.



    // console.log('dragass')
    // let pathData1 = pathData.svgElementObject
    // have to figure out selectors***

    console.log(pathData)

    // pathData.coords.x

    // pathData
    //     .attr('cx', pathData.coords.x += event.dx )
    //     .attr('cy', pathData.coords.y += event.dy )   

    // // END POINTS
    // let endPoints = figure.svgEndPoints
    // for (let i = 0; i < endPoints.length; i++) {
    //     endPoints[i].svgElementObject
    //         .attr('cx', pathDatas[i].coords.x)
    //         .attr('cy', pathDatas[i].coords.y)
    // }
    // // END POINTS




    // d3.select(endPointsArray[selector]._groups[0][0])
    //     .attr('cx', pathData[selector].coords.x += event.dx )
    //     .attr('cy', pathData[selector].coords.y += event.dy )   


    // updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}





// function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
//     for (let i = 0; i < pathData.length; i++) {
//         pathData[i].coords.x += event.dx,
//         pathData[i].coords.y += event.dy
//     }
//     d3.select(mainPathsArray._groups[0][0])
//         .attr({d: describeComplexPath(pathData)})
//     updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
// }

// function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
//     d3.select(endPointsArray[selector]._groups[0][0])
//         .attr('cx', pathData[selector].coords.x += event.dx )
//         .attr('cy', pathData[selector].coords.y += event.dy )   
//     updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
// }

export {
    dragPath,
    dragEndPoint
}