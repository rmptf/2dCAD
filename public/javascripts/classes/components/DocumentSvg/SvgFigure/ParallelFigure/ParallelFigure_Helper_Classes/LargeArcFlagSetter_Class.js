import {findLineMidpoint} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"
import {translateLinePreservingDirection, pointCrossedAxis} from "../ParallelFigureUtils/GeometryUtils/geometryUtils.js"

function LargeArcFlagSetter(parallelFigure) {
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.firstIteration = true
    this.prevCrossState = null



    // REFERENCE FIGURE STUFF
    let svgFigure = parallelFigure.svgFigure
    this.referenceFigure_01_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_01_A.addCircle({palette: 1, circRad: 3, fillClr: 4}, 1)
    this.referenceFigure_02_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_02_A.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)
    this.referenceFigure_03_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5})
    this.referenceFigure_04_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_04_A.addCircle({palette: 1, circRad: 15, fillClr: 4}, 1)
    // REFERENCE FIGURE STUFF
}


LargeArcFlagSetter.prototype.setLargeArcFlag = function(runOrNot, index) {
    let parallelEndPoint_start = this.originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west
    let parallelEndPoint_end = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_east
    let midPointBetweenEndPoints = findLineMidpoint(parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y, parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y)

    if(runOrNot === true) {
        let translatedAxis = translateLinePreservingDirection(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y])
        let hasTargetCrossedAxis =  pointCrossedAxis(translatedAxis[0], translatedAxis[1], midPointBetweenEndPoints, [this.referenceFigure_04_A])

        // REFERENCE FIGURE STUFF
        let referenceFigures = [this.referenceFigure_04_A]
        this.referenceFigure_01_A.runFunctions([midPointBetweenEndPoints])
        this.referenceFigure_02_A.runFunctions([[parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
        this.referenceFigure_03_A.runFunctions([translatedAxis[0], translatedAxis[1]])
        this.referenceFigure_04_A.runFunctions([midPointBetweenEndPoints])
        // Check if there is a referenceFigure and run it's function
        let checkForFigureAndRunAFunction = (pos1, pos2) => referenceFigures.length > 0 ? referenceFigures[0].changeCircleColor(pos1, pos2) : null
        // REFERENCE FIGURE STUFF

        if(this.firstIteration === true) {
            this.prevCrossState = hasTargetCrossedAxis
            this.firstIteration = false
        }
        if(hasTargetCrossedAxis !== this.prevCrossState) {
            parallelEndPoint_end.arc.arcFlag = +!parallelEndPoint_end.arc.arcFlag
            this.prevCrossState = hasTargetCrossedAxis
            // REFERENCE FIGURE STUFF
            if(hasTargetCrossedAxis === false){
                checkForFigureAndRunAFunction(4, 1)
            } else{
                checkForFigureAndRunAFunction(1, 4)
            }
            // REFERENCE FIGURE STUFF
        } 
    }
}

export {
    LargeArcFlagSetter
}