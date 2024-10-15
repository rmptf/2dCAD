import {findLineMidpoint, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"

function LargeArcFlagSetter(parallelFigure) {
    this.ParFigure = parallelFigure
    this.svgTestElementsGroup = this.ParFigure.SvgFigure.svgGroups.secondarySvgGroupElements[4]
    this.svgFigure = this.ParFigure.SvgFigure

    this.arcFlagSetterObject = {
        fakeVar: null,
    }


    this.referenceFigure_01 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_01.addLine({palette: 4, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_02 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_02.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_03 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)

    this.referenceFigure_04 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_04.addLine({palette: 3, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_05 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_05.addLine({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_06 = new ReferenceFigure(parallelFigure, false)
    this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_06.addPath({palette: 4, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_06.addPath({palette: 4, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)

}

// function setLargeArcFlag(targetIntersectionPoints, parFigureObj, index, self, runOrNot) {
LargeArcFlagSetter.prototype.setLargeArcFlag = function(parFigure, indexModifier, runOrNot) {
    console.log(" ")
    console.log("ARCFLAG_FLIPPER_running")

    // let targetIntersectionPoints = this.ParFigure.parallelFigurePathDatas
    // let parFigureObj = this.ParFigure.parallelFigureObject
    // let index = this.ParFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier    
    let originalFigurePathDatas_W_FILLERS = parFigure.originalFigurePathDatas_plusFillers
    let targetIntersectionPoints = parFigure.parallelFigurePathDatas
    let parFigureObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier

    console.log("poooooper")
    console.log(index)
    // console.log(refEndPointsBase)


    // NEW WAY OF CHECKING FOR FILLERS
    // - only tested for 1 & 2 fillers behind (for test figure drawing)
    let fillerCounter = originalFigurePathDatas_W_FILLERS.slice(0, index + 1).filter(x => x === 'filler').length

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
        console.log(indexModifier)

        if(parFigureObj.iterationCounter === 1) {
            let pooper1 = isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x)
            let pooper2 = isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)

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
        updateReferenceFigures(index, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, this)
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
        flipFlag = true
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_x1GreaterThanX2
        parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2 = !parFigureObj.arrayOfArcFlagsInitPos[parFigureObj.counterOfArcsAsTheyArrive].startPos_y1GreaterThanY2
        return flipFlag
    } else {
        console.log("AAAAA_NO_CROSS")
    }
    return flipFlag
}

function updateReferenceFigures(index, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, thisClass) {
    if(index === 2 + fillerCounter) {
        thisClass.referenceFigure_01.runFunctions([[prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]])
        thisClass.referenceFigure_02.runFunctions([midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]])
        thisClass.referenceFigure_03.runFunctions([[prevTargetEndPoint, thisTargetEndPoint]])
    }
    if(index === 3 + fillerCounter) {
        thisClass.referenceFigure_04.runFunctions([[prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]])
        thisClass.referenceFigure_05.runFunctions([midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]])
        thisClass.referenceFigure_06.runFunctions([[prevTargetEndPoint, thisTargetEndPoint]])
    }
}

export {
    LargeArcFlagSetter
}