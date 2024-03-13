import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
import {describeComplexPath} from '../math/svgElementCalculations.js'

function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(mainPathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}

function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}

export {
    dragPath,
    dragEndPoint
}