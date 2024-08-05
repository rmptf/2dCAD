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

function setLargeArcFlag(targetEndPoints, parPathObj, index, self, runOrNot) {
    console.log(" ")
    console.log("ARCFLAG_FLIPPER_running")

    // let prevTargetEndPoint = targetEndPoints[index - 1][1]
    let prevTargetEndPoint = targetEndPoints[index][0] //TODO: test that this works 100%
    let thisTargetEndPoint = targetEndPoints[index][1]
    let midPointBetweenInts = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)

    parPathObj.counterOfArcsAsTheyArrive = parPathObj.counterOfArcsAsTheyArrive + 1

    if(runOrNot === true) {
        console.log("FLIPPER__set")
        console.log(index)

        if(parPathObj.iterationCounter === 1) {
            let pooper1 = isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x)
            let pooper2 = isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)

            parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive] = {
                startPos_x1GreaterThanX2: pooper1,
                startPos_y1GreaterThanY2: pooper2
            }
        }

        let flipFlag = detectCrossover(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], parPathObj, index)

        const flipFlagAndFunction = (flipFlag, endPOINT) => {
            if (flipFlag) {
                endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag

                console.log("AAAAAAAAAAA")
                console.log(endPOINT.arc.arcFlag)
            }
        }

        flipFlagAndFunction(flipFlag, thisTargetEndPoint)

        // updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, self)
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

    if(parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 !== currentPos_x1GreaterThanX2 && parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 !== currentPos_Y1GreaterThanY2) {
        console.log("AAAAA_CROSSED")
        flipFlag = true
        parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 = !parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2
        parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 = !parPathObj.arrayOfArcFlagsInitPos[parPathObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2
        return flipFlag
    } else {
        console.log("AAAAA_NO_CROSS")
    }
    return flipFlag
}

function updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, self) {
    // if(index === 1) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_01_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_01_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    if(index === 2) {
        updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02([prevTargetEndPoint, thisTargetEndPoint], self)
        updateSVG_highlight_2_points_1_line_02_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
        updateSVG_highlight_2_points_1_line_02_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    }

    if(index === 3) {
        updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03([prevTargetEndPoint, thisTargetEndPoint], self)
        updateSVG_highlight_2_points_1_line_03_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
        updateSVG_highlight_2_points_1_line_03_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    }

    // if(index === 4) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_04_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_04_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }
}

export {
    setLargeArcFlag
}