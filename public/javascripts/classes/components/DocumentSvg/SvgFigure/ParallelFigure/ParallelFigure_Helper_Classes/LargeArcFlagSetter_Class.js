// import {getDistance} from '../../../../../../math/mathFunctions.js' // OLD LOC
// import {findLineMidpoint, isGreaterThan} from '../../../../../../math/mathFunctions.js'
import {findLineMidpoint, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01,
    updateSVG_highlight_2_points_1_line_01_A,
    updateSVG_highlight_2_points_1_line_01_B,
    
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02,
    updateSVG_highlight_2_points_1_line_02_A,
    updateSVG_highlight_2_points_1_line_02_A_NEW,
    updateSVG_highlight_2_points_1_line_02_B,
    updateSVG_highlight_2_points_1_line_02_B_NEW,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03,
    updateSVG_highlight_2_points_1_line_03_A,
    updateSVG_highlight_2_points_1_line_03_B,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04,
    updateSVG_highlight_2_points_1_line_04_A,
    updateSVG_highlight_2_points_1_line_04_B,
} from "../../../../../../functions/animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js"


function LargeArcFlagSetter(parallelFigure) {
    this.ParFigure = parallelFigure
    this.testFigure01 = this.ParFigure.testFigure_01
    this.testFigure02 = this.ParFigure.testFigure_02
    this.testFigure03 = this.ParFigure.testFigure_03
    this.svgTestElementsGroup = this.ParFigure.SvgFigure.svgGroups.secondarySvgGroupElements[4]
    this.svgFigure = this.ParFigure.SvgFigure

    this.arcFlagSetterObject = {
        fakeVar: null,
    }
}

LargeArcFlagSetter.prototype.setLargeArcFlag = function(parFigure, indexModifier, runOrNot) {
// function setLargeArcFlag(targetIntersectionPoints, parFigureObj, index, self, runOrNot) {
    console.log(" ")
    console.log("ARCFLAG_FLIPPER_running")

    let targetIntersectionPoints = parFigure.parallelFigurePathDatas
    let parFigureObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier

    // let targetIntersectionPoints = this.ParFigure.parallelFigurePathDatas
    // let parFigureObj = this.ParFigure.parallelFigureObject
    // let index = this.ParFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier

    console.log(index)

    // let prevTargetEndPoint = targetIntersectionPoints[index - 1][1]
    let prevTargetEndPoint = targetIntersectionPoints[index][0] //TODO: test that this works 100%
    let thisTargetEndPoint = targetIntersectionPoints[index][1]
    let midPointBetweenInts = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)

    // // TEST //
    // // good test to see if anything is atually running (this sets all arc flags to 1 which makes crazy shapes and is visually obvious)
    // thisTargetEndPoint.arc.arcFlag = 1 //(seems to work rn, problem must be somewhere else)
    // // TEST //

    parFigureObj.counterOfArcsAsTheyArrive = parFigureObj.counterOfArcsAsTheyArrive + 1


    if(runOrNot === true) {
        console.log("FLIPPER__set")
        console.log(index)

        if(parFigureObj.iterationCounter === 1) {
            let pooper1 = isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x)
            let pooper2 = isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)

            console.log(midPointBetweenInts)
            console.log(thisTargetEndPoint.arc.center)
            console.log(pooper1, pooper2)

            // FIXME: right here, checking if the following number carries all tht way through

            parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive] = {
                startPos_x1GreaterThanX2: pooper1,
                startPos_y1GreaterThanY2: pooper2
            }
        }

        let flipFlag = detectCrossover(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], parFigureObj, index)

        const flipFlagAndFunction = (flipFlag, endPOINT) => {
            if (flipFlag) {
                endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag
                // endPOINT.arc.exist = false
                console.log("AAAAA_BBBBB_")
                console.log(endPOINT.arc.arcFlag)
            }
        }

        flipFlagAndFunction(flipFlag, thisTargetEndPoint)

        // updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts)
        // updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, this.svgTestElementsGroup)
        updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, this.testFigure01, this.testFigure02, this.testFigure03)
    } else {
        console.log("FLIPPER__dont_set")
        console.log(index)
    }
    console.log(" ")
}

function detectCrossover(movingPoint, stationaryPoint, parFigureObj, index) {
    let x1 = movingPoint[0]
    let y1 = movingPoint[1]
    let x2 = stationaryPoint[0]
    let y2 = stationaryPoint[1]
    let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
    let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
    let flipFlag = false

    if(parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 !== currentPos_x1GreaterThanX2 && parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 !== currentPos_Y1GreaterThanY2) {
        console.log("AAAAA_CROSSED")
        flipFlag = true
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2
        return flipFlag
    } else {
        console.log("AAAAA_NO_CROSS")
    }
    return flipFlag
}

// function updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, svgGroup) {
function updateSVGArcFlags(index, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, TESTFIGURE_01, TESTFIGURE_02, TESTFIGURE_03) {
    // if(index === 1) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevTargetEndPoint, thisTargetEndPoint], svgGroup)
    //     updateSVG_highlight_2_points_1_line_01_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgGroup)
    //     updateSVG_highlight_2_points_1_line_01_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgGroup)
    // }

    if(index === 2) {
        // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02([prevTargetEndPoint, thisTargetEndPoint], svgGroup)
        // TESTFIGURE_03.updateTestFigure_333([prevTargetEndPoint, thisTargetEndPoint])
        // TESTFIGURE_03.updateTestFigure_functionBuilder_02([prevTargetEndPoint, thisTargetEndPoint])
        TESTFIGURE_03.functionHolder.forEach(func => func([prevTargetEndPoint, thisTargetEndPoint]))

        // updateSVG_highlight_2_points_1_line_02_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgGroup)
        // updateSVG_highlight_2_points_1_line_02_A_NEW([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgGroup, thisThing)
        // updateSVG_highlight_2_points_1_line_02_A_NEW([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgFigure)
        // TESTFIGURE_01.updateTestFigure_111([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y])
        // TESTFIGURE_01.updateTestFigure_functionBuilder_01([[prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]])
        TESTFIGURE_01.functionHolder.forEach(func => func([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]))

        // updateSVG_highlight_2_points_1_line_02_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgGroup)
        // updateSVG_highlight_2_points_1_line_02_B_NEW(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgGroup, thisThing)
        // updateSVG_highlight_2_points_1_line_02_B_NEW(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgFigure)
        // TESTFIGURE_02.updateTestFigure_functionBuilder_01([midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]])
        TESTFIGURE_02.functionHolder.forEach(func => func(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]))
    }

    // if(index === 3) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03([prevTargetEndPoint, thisTargetEndPoint], svgGroup)
    //     updateSVG_highlight_2_points_1_line_03_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgGroup)
    //     updateSVG_highlight_2_points_1_line_03_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgGroup)
    // }

    // if(index === 4) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04([prevTargetEndPoint, thisTargetEndPoint], svgGroup)
    //     updateSVG_highlight_2_points_1_line_04_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], svgGroup)
    //     updateSVG_highlight_2_points_1_line_04_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], svgGroup)
    // }
}

export {
    LargeArcFlagSetter
}