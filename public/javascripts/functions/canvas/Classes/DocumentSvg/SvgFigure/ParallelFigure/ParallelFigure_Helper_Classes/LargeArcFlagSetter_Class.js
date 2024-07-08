// import {getDistance} from '../../../../../../math/mathFunctions.js' // OLD LOC
import {findLineMidpoint, isGreaterThan} from '../../../../../../math/mathFunctions.js'

function LargeArcFlagSetter(parallelFigure) {
    this.ParFigure = parallelFigure

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

    // let prevTargetEndPoint = targetIntersectionPoints[index - 1][1]
    let prevTargetEndPoint = targetIntersectionPoints[index][0] //TODO: test that this works 100%
    let thisTargetEndPoint = targetIntersectionPoints[index][1]
    let midPointBetweenInts = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)

    parFigureObj.counterOfArcsAsTheyArrive = parFigureObj.counterOfArcsAsTheyArrive + 1

    if(runOrNot === true) {
        console.log("FLIPPER__set")
        console.log(index)

        if(parFigureObj.iterationCounter === 1) {
            console.log('okokokokok_2')
            let pooper1 = isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x)
            let pooper2 = isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)

            parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive] = {
                startPos_x1GreaterThanX2: pooper1,
                startPos_y1GreaterThanY2: pooper2
            }
        }

        let flipFlag = detectCrossover(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], parFigureObj, index)

        const flipFlagAndFunction = (flipFlag, endPOINT) => {
            if (flipFlag) {
                endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag
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

function detectCrossover(movingPoint, stationaryPoint, parFigureObj, index) {
    let x1 = movingPoint[0]
    let y1 = movingPoint[1]
    let x2 = stationaryPoint[0]
    let y2 = stationaryPoint[1]
    let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
    let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
    let flipFlag = false

    if(parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 !== currentPos_x1GreaterThanX2 && parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 !== currentPos_Y1GreaterThanY2) {
        // console.log("CROSSED")
        flipFlag = true
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2
        return flipFlag
    } else {
        // console.log("NO_CROSS")
    }
    return flipFlag
}

export {
    LargeArcFlagSetter
}