import {findLineMidpoint, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"

function LargeArcFlagSetter(parallelFigure) {
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    // this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.index = null
    let svgFigure = parallelFigure.svgFigure

    // Add ReferenceFigures
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_01.addLine({palette: 4, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_02.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_03 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)

    this.referenceFigure_04 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_04.addLine({palette: 3, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_05 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_05.addLine({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5})
    false
    this.referenceFigure_06 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_06.addPath({palette: 4, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_06.addPath({palette: 4, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)
}

LargeArcFlagSetter.prototype.setLargeArcFlag = function(indexModifier, runOrNot) {
    console.log("ARCFLAG_FLIPPER_running")
    let modifiedIndex = this.index + indexModifier
    let fillerCounter = this.originalFigurePathDatas_plusFillers.slice(0, modifiedIndex + 1).filter(x => x === 'filler').length //FIXME: might be an easier way to acomplish this. (counts fillers behind)

    //old
    // let prevTargetEndPoint = this.parallelFigurePathDatas[modifiedIndex][0]
    // let thisTargetEndPoint = this.parallelFigurePathDatas[modifiedIndex][1]
    //new
    let prevTargetEndPoint = this.originalFigurePathDatas[modifiedIndex].children.parallel_pathDatas.pathData_west
    let thisTargetEndPoint = this.originalFigurePathDatas[modifiedIndex + 1].children.parallel_pathDatas.pathData_east
    let midPointBetweenInts = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)
    console.log(midPointBetweenInts)
    console.log(thisTargetEndPoint)

    this.parallelFigureObj.counterOfArcsAsTheyArrive = this.parallelFigureObj.counterOfArcsAsTheyArrive + 1

    // console.log("POOOOOOOOPER_NEW")
    // console.log(this.index)
    // console.log(this.parallelFigureObj.counterOfArcsAsTheyArrive)

    if(runOrNot === true) {
        console.log("FLIPPER__set")
        if(this.parallelFigureObj.iterationCounter === 1) {
            let midPointX_isGreaterThan_arcCenterX = isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x)
            let midPointY_isGreaterThan_arcCenterY = isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)
            console.log(midPointX_isGreaterThan_arcCenterX)
            this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive] = {
                startPosX1_isGreaterThan_startPosX2: midPointX_isGreaterThan_arcCenterX,
                startPosY1_isGreaterThan_startPosY2: midPointY_isGreaterThan_arcCenterY
            }
        }
        let flipFlag = this.detectCrossover(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], this.parallelFigureObj)
        const flipFlagAndFunction = (flipFlag, endPOINT) => {
            if (flipFlag) {
                endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag
                console.log("AAAAA_BBBBB_")
            }
        }
        flipFlagAndFunction(flipFlag, thisTargetEndPoint)
        updateReferenceFigures(modifiedIndex, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, this)
    } else {
        console.log("FLIPPER__dont_set")
    }
}

//FIXME:
//FIXME:
//FIXME: Work on setting the flipFlags by checking the originalPathDatas rather than the parallelFigureObj
//FIXME:
//FIXME:
LargeArcFlagSetter.prototype.detectCrossover = function(movingPoint, stationaryPoint) {
    let x1 = movingPoint[0]
    let y1 = movingPoint[1]
    let x2 = stationaryPoint[0]
    let y2 = stationaryPoint[1]
    let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
    let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
    let flipFlag = false

    console.log(this.parallelFigureObj.arrayOfArcFlagsInitPos)
    console.log(this.parallelFigureObj.counterOfArcsAsTheyArrive)

    //FIXME: // everytime a removeCornerPathsAndEndPoints runs, there is an error here with (counterOfArcsAsTheyArrive)
    if(this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 !== currentPos_x1GreaterThanX2 && this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 !== currentPos_Y1GreaterThanY2) {
        flipFlag = true
        this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 = !this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2
        this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 = !this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2
        return flipFlag
    } else {
        console.log("AAAAA_NO_CROSS")
    }
    return flipFlag
}
//FIXME:
//FIXME:
//FIXME: Work on setting the flipFlags by checking the originalPathDatas rather than the parallelFigureObj
//FIXME:
//FIXME:




//FIXME: (also need to update this to new orginalPathData way)
function updateReferenceFigures(index, fillerCounter, prevTargetEndPoint, thisTargetEndPoint, midPointBetweenInts, thisClass) {
    // if(index === 1 + fillerCounter) {
    if(index === 1) {
        thisClass.referenceFigure_01.runFunctions([[prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]])
        thisClass.referenceFigure_02.runFunctions([midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]])
        thisClass.referenceFigure_03.runFunctions([[prevTargetEndPoint, thisTargetEndPoint]])
    }
    // if(index === 2 + fillerCounter) {
    if(index === 2) {
        thisClass.referenceFigure_04.runFunctions([[prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y]])
        thisClass.referenceFigure_05.runFunctions([midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y]])
        thisClass.referenceFigure_06.runFunctions([[prevTargetEndPoint, thisTargetEndPoint]])
    }
}

export {
    LargeArcFlagSetter
}