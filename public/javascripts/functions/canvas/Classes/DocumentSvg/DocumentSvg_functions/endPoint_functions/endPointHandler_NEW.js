function addEndPointFunction(event, secondaryPath, isArc) {
    let m1 = d3.pointer(event)
    let thisFigure = secondaryPath.thisFigure
    let index = thisFigure.svgPaths.secondaryPaths.indexOf(secondaryPath) + 1
    let additionalPathData = thisFigure.createPathData_splice(m1[0], m1[1], index)
    thisFigure.createPath_secondary_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index)
    thisFigure.createPrimaryEndPoint_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index, isArc)

    if(isArc) {
        let prevPathData = thisFigure.svgPathDatas[index]
        prevPathData.initiateCurvePoint('east')
        let thisPathData = thisFigure.svgPathDatas[index + 1]
        thisPathData.initiateCurvePoint('west')
    }

    thisFigure.figure_updateSvg()
}

// needs cleaning
function removeEndPointFunction(event, endPoint) {
    let thisFigure = endPoint.parentFigure
    let index = thisFigure.svgEndPoints.indexOf(endPoint)
    let finalIndex = thisFigure.svgEndPoints.length - 1
    let secondaryPathIndex = index
    let arcIndex
    let nextEndPoint = thisFigure.svgEndPoints[index + 1]


    if(index === finalIndex) {
        secondaryPathIndex = index - 1
    }

    if(index === 0) {
        if(nextEndPoint.pathData.arc.exist === true) {
            thisFigure.svgPathDatas[index + 1].terminateCurvePoint()
            thisFigure.svgPathDatas[index + 2].terminateCurvePoint()
            thisFigure.svgEndPoints[index + 1].removeEndPointCurveClass()
        }
    }

    if(endPoint.pathData.arc.exist === true) {
        if(endPoint.pathData.arc.side === 'east') {
            arcIndex = index + 1
        } else if(endPoint.pathData.arc.side === 'west') {
            arcIndex = index - 1
            thisFigure.svgEndPoints[arcIndex].removeEndPointCurveClass()
        }
        thisFigure.svgPathDatas[arcIndex].terminateCurvePoint()
    }


    endPoint.svgElementObject.remove()
    thisFigure.svgEndPoints.splice(index, 1)
    thisFigure.svgPathDatas.splice(index, 1)
    thisFigure.svgPaths.secondaryPaths[secondaryPathIndex].svgElementObject.remove()
    thisFigure.svgPaths.secondaryPaths.splice(secondaryPathIndex, 1)

    thisFigure.figure_updateSvg()
}


export {
    addEndPointFunction,
    removeEndPointFunction
}