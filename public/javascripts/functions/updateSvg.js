function mainPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self){
    console.log('Main Path Click')
}

function secondaryPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, pathCount, isDown2){
    // for now
    console.log('Secondary Path Click')

    // isolate and break out further

    // m1 = d3.pointer(event)
    // console.log("Path Count Clicked: " + pathCount)
    // if (pressAddCurveButton === false && pressAddParallelButton === false && pressMeasurePathButton == false) {
    //     console.log('path Clicked, All other path click functions off')
    // } else if (pressAddCurveButton === true) {
    //     console.log('Add Path Arc = true')

    //     originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
    //     secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))


    //     // CHANGES_FINDME_001
    //     //old
    //     let newPathCounter = -1
    //     //new
    //     // let NEW_new_FAKE_secondryPathCounter_LOCAL = -1


    //     for (let i = 0; i < secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
    //         // CHANGES_FINDME_001
    //         //old
    //         newPathCounter = newPathCounter + 1
    //         let thisPathCount = newPathCounter
    //         secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)})
    //         //new
    //         // NEW_new_FAKE_secondryPathCounter_LOCAL = NEW_new_FAKE_secondryPathCounter_LOCAL + 1
    //         // secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, NEW_new_FAKE_secondryPathCounter_LOCAL, isDown2)})
    //     }

    //     let index = pathCount + 1
    //     let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
    //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][pathCount + 1].arc = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
    //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].splice(index, 0, data);

    //     for (let i = 0; i < originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
    //         let currentEndPoint = originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
    //         currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])}))
    //     }

    //     updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

    //     pressAddCurveButton = false
    // } else if (pressAddParallelButton === true) {
    //     console.log('Add Parallel = true')
    //     drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
    //     pressAddParallelButton = false
    // } else if (pressMeasurePathButton === true) {
    //     console.log('Measure Path = true')
    //     measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
    //     pressMeasurePathButton = false
    // }
}

// PATH
function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(mainPathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // console.log(event)
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(mainPathsArray._groups[0][0])
        path.attr('d', calculateArcAndDescribePath(pathData))
    // PATH

    // SECONDARY PATH
    for (let i = 0; i < secondaryPathsArray.length; i++) {
        let secondaryPath = d3.select(secondaryPathsArray[i]._groups[0][0])
            secondaryPath.attr('d', describeComplexPath([pathData[i], pathData[i + 1]]))
    }
    // SECONDARY PATH

    // DYNAMIC END POINTS
    for (let i = 0; i < endPointsArray.length; i++) {
        let endPoint = d3.select(endPointsArray[i]._groups[0][0])
        endPoint.attr('cx', pathData[i].coords.x).attr('cy', pathData[i].coords.y)
            // .attr('r', 10)
    }
    // DYNAMIC END POINTS
}








// break these out...
function calculateArcAndDescribePath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []

    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist === true) {
            if(pathDataPass[i].arc.side === 'east') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i]
                let anchorPointStart = pathDataPass[i - 1]
                let anchorPointEnd = pathDataPass[i + 1]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            } else if (pathDataPass[i].arc.side === 'west') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i - 1]
                let anchorPointStart = pathDataPass[i]
                let anchorPointEnd = pathDataPass[i - 2]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            }
        } if(pathDataPass[i].arc.exist === false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
    }

    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d

    function solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, side) {
        let curvePointAnchor = findPerpendicularFromPoint(curvePoint, anchorPointStart, anchorPointEnd)
        let rightTriangleData = findRightTriangle(anchorPointStart.coords, curvePoint.coords)
        let solveTriangleData = solvTriangleALL(rightTriangleData.sides, anchorPointStart.coords, anchorPointEnd.coords, curvePoint.coords, curvePointAnchor)
        let intersectingPoint = findIntersectingPoint([curvePoint.coords.x, curvePoint.coords.y], [curvePointAnchor[0],curvePointAnchor[1]], [solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]], [solveTriangleData.coords.coord_B[0],solveTriangleData.coords.coord_B[1]])
        let circRadius = getDistance(curvePoint.coords.x, curvePoint.coords.y, intersectingPoint.x, intersectingPoint.y)
        let rightTriangleTheta = solveForAngleOfRightTriangle([intersectingPoint.x,intersectingPoint.y],[curvePoint.coords.x,curvePoint.coords.y],[solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]])
        if(inRange(curvePoint.coords.x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(curvePoint.coords.y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
            // console.log('str1')
            arcsAndLines.push(['L', thisPoint.coords.x, thisPoint.coords.y].join(' '))
        } else {
            // console.log('arc1')
            if(side === 'east'){                
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagEast, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagEast,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            } else if(side === 'west'){
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagWest, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagWest,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            }
        }
    }
}

function describeComplexPath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []
    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist == true) {
            arcsAndLines.push(['A', pathDataPass[i].arc.radius, pathDataPass[i].arc.radius, pathDataPass[i].arc.rotation, pathDataPass[i].arc.arcFlag, pathDataPass[i].arc.sweepFlag, pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        } if (pathDataPass[i].arc.exist == false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
        }
    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d
}

export {
    mainPathClick,
    secondaryPathClick,
    dragPath,
    dragEndPoint,
    updateSVG_mainPathAndPoints
}