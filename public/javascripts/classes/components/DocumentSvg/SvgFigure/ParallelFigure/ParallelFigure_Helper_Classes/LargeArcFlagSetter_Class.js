import {findLineMidpoint, getDistance, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"
import {translateLinePreservingDirection, pointCrossedAxis} from "../ParallelFigureUtils/GeometryUtils/geometryUtils.js"

function LargeArcFlagSetter(parallelFigure) {
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    // this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    //old
    // this.index = null
    this.firstIteration = true
    this.prevCrossState = null

    let svgFigure = parallelFigure.svgFigure
    // Add ReferenceFigures
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_01.addLine({palette: 4, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_02 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_02.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_03 = new ReferenceFigure(svgFigure, false) // not working rn
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)


    // NEW FLIP FLAP SHIT
    this.referenceFigure_01_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01_A.addCircle({palette: 1, circRad: 3, fillClr: 4}, 1)

    this.referenceFigure_02_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_02_A.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)

    this.referenceFigure_03_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_04_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_04_A.addCircle({palette: 1, circRad: 15, fillClr: 4}, 1)
}


LargeArcFlagSetter.prototype.setLargeArcFlag = function(indexModifier, runOrNot, index) {
    // console.log("ARCFLAG_FLIPPER_RUNNING")
    let modifiedIndex = index + indexModifier

    let parallelEndPoint_start = this.originalFigurePathDatas[modifiedIndex].children.parallel_pathDatas.pathData_west
    let parallelEndPoint_end = this.originalFigurePathDatas[modifiedIndex + 1].children.parallel_pathDatas.pathData_east
    let midPointBetweenEndPoints = findLineMidpoint(parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y, parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y)

    this.referenceFigure_01.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
    this.referenceFigure_02.runFunctions([midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
    this.referenceFigure_03.runFunctions([[parallelEndPoint_start, parallelEndPoint_end]])

    if(runOrNot === true) {
        let translatedAxis = translateLinePreservingDirection(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y])
        let hasTargetCrossedAxis =  pointCrossedAxis(translatedAxis[0], translatedAxis[1], midPointBetweenEndPoints, [this.referenceFigure_04_A])

        this.referenceFigure_01_A.runFunctions([midPointBetweenEndPoints])
        this.referenceFigure_02_A.runFunctions([[parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
        this.referenceFigure_03_A.runFunctions([translatedAxis[0], translatedAxis[1]])
        this.referenceFigure_04_A.runFunctions([midPointBetweenEndPoints])

        if(this.firstIteration === true) {
            this.prevCrossState = hasTargetCrossedAxis
            this.firstIteration = false
        }
        if(hasTargetCrossedAxis !== this.prevCrossState) {
            parallelEndPoint_end.arc.arcFlag = +!parallelEndPoint_end.arc.arcFlag
            this.prevCrossState = hasTargetCrossedAxis
        } 
    }
}

export {
    LargeArcFlagSetter
}