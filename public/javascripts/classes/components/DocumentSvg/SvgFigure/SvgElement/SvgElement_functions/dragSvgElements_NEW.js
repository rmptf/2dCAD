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
    pathData.coords.x += event.dx
    pathData.coords.y += event.dy

    figure.figure_updateSvg()
}

export {
    dragPath,
    dragEndPoint
}