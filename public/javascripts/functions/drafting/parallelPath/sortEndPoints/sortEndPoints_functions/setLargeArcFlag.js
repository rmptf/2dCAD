import {findLineMidpoint, isGreaterThan} from '../../../../math/mathFunctions.js'
import {
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01,
    updateSVG_highlight_2_points_1_line_01_A,
    updateSVG_highlight_2_points_1_line_01_B,
    
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02,
    updateSVG_highlight_2_points_1_line_02_A,
    updateSVG_highlight_2_points_1_line_02_B,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03,
    updateSVG_highlight_2_points_1_line_03_A,
    updateSVG_highlight_2_points_1_line_03_B,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04,
    updateSVG_highlight_2_points_1_line_04_A,
    updateSVG_highlight_2_points_1_line_04_B,
} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js'

function setLargeArcFlag(targetEndPoints, refEndPointsBase, parPathObj, index, self, runOrNot) {
    console.log(" ")
    console.log("ARCFLAG_FLIPPER_running")

    console.log("poooooper")
    console.log(index)
    // console.log(refEndPointsBase)

    // NEW WAY OF CHECKING FOR FILLERS 
    // - only tested for 1 & 2 fillers behind (for test figure drawing)
    let fillerCounter = refEndPointsBase.slice(0, index + 1).filter(x => x === 'filler').length


    // let prevTargetEndPoint = targetEndPoints[index - 1][1]
    let prevTargetEndPoint = targetEndPoints[index][0] //TODO: test that this works 100%
    let thisTargetEndPoint = targetEndPoints[index][1]
    let midPointBetweenEndPoints = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)


    
    parPathObj.counterOfArcsAsTheyArrive = parPathObj.counterOfArcsAsTheyArrive + 1

    if(runOrNot === true) {
        console.log("FLIPPER__set")
        console.log(index)

        if(parPathObj.iterationCounter === 1) {
            let midPointX_isGreaterThan_arcCenterX = isGreaterThan(midPointBetweenEndPoints[0], thisTargetEndPoint.arc.center.x)
            let midPointY_isGreaterThan_arcCenterY = isGreaterThan(midPointBetweenEndPoints[1], thisTargetEndPoint.arc.center.y)

            console.log(midPointBetweenEndPoints)
            console.log(thisTargetEndPoint.arc.center)
            console.log(midPointX_isGreaterThan_arcCenterX, midPointY_isGreaterThan_arcCenterY)

            parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive] = {
                startPosX1_isGreaterThan_startPosX2: midPointX_isGreaterThan_arcCenterX,
                startPosY1_isGreaterThan_startPosY2: midPointY_isGreaterThan_arcCenterY
            }
        }

        let flipFlag = detectCrossover(midPointBetweenEndPoints, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], parPathObj, index)

        const flipFlagAndFunction = (flipFlag, endPOINT) => {
            if (flipFlag) {
                endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag
                // endPOINT.arc.exist = false
                console.log("AAAAA_BBBBB_")
                console.log(endPOINT.arc.arcFlag)
            }
        }

        flipFlagAndFunction(flipFlag, thisTargetEndPoint)

        updateSVGArcFlags(index, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenEndPoints, self)
    } else {
        console.log("FLIPPER__dont_set")
        console.log(index)
    }
    console.log(" ")
}
function detectCrossover(movingPoint, stationaryPoint, parPathObj, index) {
    let x1 = movingPoint[0]
    let y1 = movingPoint[1]
    let x2 = stationaryPoint[0]
    let y2 = stationaryPoint[1]
    let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
    let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
    let flipFlag = false

    if(parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 !== currentPos_x1GreaterThanX2 && parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 !== currentPos_Y1GreaterThanY2) {
        console.log("AAAAA_CROSSED")
        flipFlag = true
        parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 = !parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2
        parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 = !parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2
        return flipFlag
    } else {
        console.log("AAAAA_NO_CROSS")
    }
    return flipFlag
}

function updateSVGArcFlags(index, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenEndPoints, self) {
    // if(index === 1) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_01_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_01_B(midPointBetweenEndPoints, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    // if(index === 2) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_02_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_02_B(midPointBetweenEndPoints, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    if(index === 3 + fillerCounter) {
        updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03([prevTargetEndPoint, thisTargetEndPoint], self)
        updateSVG_highlight_2_points_1_line_03_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
        updateSVG_highlight_2_points_1_line_03_B(midPointBetweenEndPoints, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    }

    // if(index === 4) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_04_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_04_B(midPointBetweenEndPoints, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }
}

export {
    setLargeArcFlag
}