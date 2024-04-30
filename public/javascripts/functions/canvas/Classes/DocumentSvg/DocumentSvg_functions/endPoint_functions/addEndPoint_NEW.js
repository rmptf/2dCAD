// these can be made into 1 function (should they?)
function addEndPointFunction(event, secondaryPath) {
    let m1 = d3.pointer(event)
    let thisFigure = secondaryPath.thisFigure
    let index = secondaryPath.thisFigure.svgPaths.secondaryPaths.indexOf(secondaryPath) + 1
    let additionalPathData = thisFigure.createPathData_splice(m1[0], m1[1], index)
    thisFigure.createPath_secondary_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index)
    thisFigure.createPrimaryEndPoint_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index, false)

    thisFigure.figure_updateSvg()
}

function addEndPointFunction_curve(event, secondaryPath) {
    let m1 = d3.pointer(event)
    let thisFigure = secondaryPath.thisFigure
    let index = secondaryPath.thisFigure.svgPaths.secondaryPaths.indexOf(secondaryPath) + 1
    let additionalPathData = thisFigure.createPathData_splice(m1[0], m1[1], index)
    thisFigure.createPath_secondary_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index)
    thisFigure.createPrimaryEndPoint_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index, true)

    let prevPathData = thisFigure.svgPathDatas[index]
    prevPathData.initiateCurvePoint('east')
    let thisPathData = thisFigure.svgPathDatas[index + 1]
    thisPathData.initiateCurvePoint('west')

    thisFigure.figure_updateSvg()
}

export {
    addEndPointFunction,
    addEndPointFunction_curve
}