import {doLinesIntersect} from './intParPaths_functions/doLinesIntersect.js'
import {updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../animate/updateSvg_forTesting/updateSvg_forTests.js'
import {findIntersectingPointSIMPLER} from '../drawParallelPath_functions/parallelPathFunctions.js'

let line1IfInter
let line2IfInter
let removedPathData = [[]]
let runObserver

function checkForIntersectingPaths(
        self,
        parallelPathDatas_stopAtIntersect_fromGLOBAL,
        parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY,
        parallelPathDatas_stopAtPerpendicular_fromLOCAL,
        parallelFigure_data_pathDatasAndFillers_array_drawParallel,
        i,
        originalFigure_counter_groupCount_GLOBAL,
        parallelPathObject,
        skipperCheckers
    ) {

    for (let j = 0; j < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; j++) {
        if(i !== j && i !== j - 1 && i !== j + 1) {
            let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords]
            let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords]
            let checker = doLinesIntersect(line1_int[0], line1_int[1], line2_int[0], line2_int[1])

            if(checker.doesIntersect === true) {
                console.log("These_INTERSECT: ")
                console.log(i, j)
                runObserver = true
                line1IfInter = i
                line2IfInter = j
                let arrayOfIndeciesToRemoveVar = arrayOfIndeciesToRemove(i, j)
                removePaths(arrayOfIndeciesToRemoveVar, checker.coords)
            } else {
                console.log("These_DONT_INTERSECT: ")
            }
        }
    }

    checkInteractionBetweenTheseGuys(runObserver, line1IfInter, line2IfInter)

    function checkInteractionBetweenTheseGuys(runOrNot, i, j) {
        console.log("inside_checker_runner")
        // console.log(i, j)
        // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        let indeciesInOrder = higherLowerIndex(i, j)
        let thisIndex = indeciesInOrder[0]
        // let nextIndex = indeciesInOrder[0] + 1
        let nextIndex = thisIndex + 1

        let thisIndex_shape2 = indeciesInOrder[1]
        let nextIndex_shape2 = thisIndex_shape2 + 1
        if(runOrNot === true) {
            console.log("checker_running")
            // find this intersection point between itself and its intersecting line of the lines of the parallel shape that intersect.
            let line1_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex]
            let line1_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex + 1]
            let line1_shape1_perpPoints = findPerpendicularPointsOfPath(parallelPathObject.parallelDistance, line1_shape1_point1, line1_shape1_point2)

            let line2_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex]
            let line2_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex + 1]
            let line2_shape1_perpPoints = findPerpendicularPointsOfPath(parallelPathObject.parallelDistance, line2_shape1_point1, line2_shape1_point2)

            let line1_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2]
            let line1_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2 + 1]
            let line1_shape2_perpPoints = findPerpendicularPointsOfPath(parallelPathObject.parallelDistance, line1_shape2_point1, line1_shape2_point2)

            let line2_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2]
            let line2_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2 + 1]
            let line2_shape2_perpPoints = findPerpendicularPointsOfPath(parallelPathObject.parallelDistance, line2_shape2_point1, line2_shape2_point2)

            let intersectingPoint_1 = findIntersectingPointSIMPLER(
                line1_shape1_perpPoints.perpendicularPoint1_X,
                line1_shape1_perpPoints.perpendicularPoint1_Y,
                line1_shape1_perpPoints.perpendicularPoint2_X,
                line1_shape1_perpPoints.perpendicularPoint2_Y,
                line2_shape1_perpPoints.perpendicularPoint1_X,
                line2_shape1_perpPoints.perpendicularPoint1_Y,
                line2_shape1_perpPoints.perpendicularPoint2_X,
                line2_shape1_perpPoints.perpendicularPoint2_Y
            )

            let intersectingPoint_2 = findIntersectingPointSIMPLER(
                line1_shape2_perpPoints.perpendicularPoint1_X,
                line1_shape2_perpPoints.perpendicularPoint1_Y,
                line1_shape2_perpPoints.perpendicularPoint2_X,
                line1_shape2_perpPoints.perpendicularPoint2_Y,
                line2_shape2_perpPoints.perpendicularPoint1_X,
                line2_shape2_perpPoints.perpendicularPoint1_Y,
                line2_shape2_perpPoints.perpendicularPoint2_X,
                line2_shape2_perpPoints.perpendicularPoint2_Y
            )

            function findPerpendicularPointsOfPath(pardistance, point11, point22) {
                const line1_X = getPerpPoint("X", "sin", pardistance, point11, point22, point11)
                const line1_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point11)
                const line2_X = getPerpPoint("X", "sin", pardistance, point11, point22, point22)
                const line2_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point22)

                return {
                    perpendicularPoint1_X: line1_X,
                    perpendicularPoint1_Y: line1_Y,
                    perpendicularPoint2_X: line2_X,
                    perpendicularPoint2_Y: line2_Y
                }

                function getPerpPoint(plane, sinOrCos, distance, point1, point2, target) {
                    const angle = Math.atan2(point1.coords.y - point2.coords.y, point1.coords.x - point2.coords.x)
                    const sinCosValue = (sinOrCos === "sin") ? Math.sin(angle) : Math.cos(angle)
            
                    return (plane === "X") ? target.coords.x - distance * sinCosValue : target.coords.y + distance * sinCosValue
                }
            }

            // updateSVG_highlight_1_point_01([intersectingPoint_1.x, intersectingPoint_1.y])
            updateSVG_highlight_2_points_1_line_01([line1_shape1_perpPoints.perpendicularPoint1_X, line1_shape1_perpPoints.perpendicularPoint1_Y], [intersectingPoint_1.x, intersectingPoint_1.y], self)

            // updateSVG_highlight_1_point_02([intersectingPoint_2.x, intersectingPoint_2.y])
            updateSVG_highlight_2_points_1_line_02([line1_shape2_perpPoints.perpendicularPoint1_X, line1_shape2_perpPoints.perpendicularPoint1_Y], [intersectingPoint_2.x, intersectingPoint_2.y], self)
            











            // let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords]
            // let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

            let firstLine1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
            let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][1]]

            // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
            // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

            // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
            // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

            // updateSVG_highlight_2_points_1_line_01([firstLine1_perp[0].x, firstLine1_perp[0].y], [firstLine1_perp[1].x, firstLine1_perp[1].y])
            // updateSVG_highlight_2_points_1_line_02([firstLine2_perp[0].x, firstLine2_perp[0].y], [firstLine2_perp[1].x, firstLine2_perp[1].y])

            let checker = doLinesIntersect(firstLine1_perp[0], firstLine1_perp[1], firstLine2_perp[0], firstLine2_perp[1])
            if(checker.doesIntersect === false) {
                // addPaths()
            }
        } else {
            console.log("checker_not_running")
        }
    }


    function arrayOfIndeciesToRemove(firstIntersectPath, secondIntersectPath) {
        let lowerIndex
        let higherIndex
        let counter = 0

        if(firstIntersectPath < secondIntersectPath){
            lowerIndex = firstIntersectPath
            higherIndex = secondIntersectPath
        } else {
            lowerIndex = secondIntersectPath
            higherIndex = firstIntersectPath
        }

        for (let k = lowerIndex + 1; k < higherIndex; k++) {
            counter = counter + 1
        }

        parallelPathObject.removeStartIndex = lowerIndex
        return {removeCount: counter, startIndex: lowerIndex + 1, endIndex: higherIndex - 1}
    }

    function higherLowerIndex(firstIntersectPath, secondIntersectPath) {
        let lowerIndex
        let higherIndex
        let counter = 0

        if(firstIntersectPath < secondIntersectPath){
            lowerIndex = firstIntersectPath
            higherIndex = secondIntersectPath
        } else {
            lowerIndex = secondIntersectPath
            higherIndex = firstIntersectPath
        }

        return [lowerIndex, higherIndex]
    }


    // TODO: 1
    // Have to make it dynamic: allow figure to remove multiple overlapping sections
    // TODO: 2
    // Undo remove when sections no longer intersect
    function removePaths(removalData, intersectCoords) {
        let removeornot_arcsAndFillers = true
        for (let l = 0; l < removalData.removeCount; l++) {
            if(parallelPathObject.removeornot_allParData === true) {
                console.log("findme_Remove")
                let prevIndex = removalData.startIndex - 1
                let thisIndex = removalData.startIndex
                let nextIndex = removalData.startIndex + 1
                let doubleIndex = removalData.startIndex * 2

                let startIndex = removalData.startIndex
                let finishIndex = removalData.endIndex

                removedPathData[0].push({
                    thisIndex: removalData.startIndex,
                    pathDataSAI: [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]],
                    pathDataSAP: [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex]],
                    pathDataPAF: [],
                })

                a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(thisIndex, 1)           //parallelPathDatas_stopAtIntersect_fromGLOBAL          a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
                parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                let removeCountDAF = finishIndex - startIndex
                if (removeornot_arcsAndFillers === true) {
                    for (let m = 0; m < removeCountDAF; m++) {
                        removedPathData[0][l].pathDataPAF.push(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex])
                        console.log("Remove_PathDatasAndFillers")
                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                    }
                    removeornot_arcsAndFillers = false
                } else {
                    console.log("Remove_No_PathDatasAndFillers")
                }

                let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                let svgPathGroup = self.parallelPathGroup._groups[0][0]
                let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                // Remove SVG elements from the DOM
                firstAddedSvgEndPoint.remove()
                secondAddedSvgEndPoint.remove()
                addedSvgPath.remove()

                skipperCheckers.skipperChecker_Path = true

                // let updateSvgCounter = prevIndex
                // updateSVG_highlight_1_point_01([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.y])
                // updateSVG_highlight_1_point_02([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.y])
                // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.y]) // end
                // updateSVG_highlight_1_point_04([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.y])
            }
        }
        parallelPathObject.removeornot_allParData = false
    }

    function addPaths() {
        console.log("findme_addPaths_removedPathDataArray")
        console.log(removedPathData)

        // for (let n = 0; n < removedPathData[0].length; n++) {
        // backwards for loop
        for (let n = removedPathData[0].length - 1; n >= 0; n--) {
            console.log(n)
            let index = removedPathData[0][n].thisIndex
            let pathDataSAI = removedPathData[0][n].pathDataSAI
            let pathDataSAP = removedPathData[0][n].pathDataSAP
            let pathDataPAF = removedPathData[0][n].pathDataPAF

            // create svg element for dom
            let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
            let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
            let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath wasRemoved:_' + n);

            // place svg element in correct index of dom
            let thisSvgEndPointIndex = (index * 2) + 1
            let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
            let thisSvgPathIndex = index + 1
            self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
            self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
            self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')

            // place svg element in global arrays
            let doubleIndex = index * 2
            a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
            a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)

            // place pathDatas in global arrays
            parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(index, 0, pathDataSAI[0])

            // place pathDatas in global arrays
            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, pathDataSAP[0])

            // place pathDatas in global arrays
            if(pathDataPAF[0] !== undefined) {
                parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(index + 1, 0, pathDataPAF[0]) // FIXME: index + 1 might not be the best way for this to run
            }
        }

        skipperCheckers.skipperChecker_Path = false
        parallelPathObject.removeornot_allParData = true
        runObserver = false
        removedPathData = [[]]
    }
}

export {
    checkForIntersectingPaths
}