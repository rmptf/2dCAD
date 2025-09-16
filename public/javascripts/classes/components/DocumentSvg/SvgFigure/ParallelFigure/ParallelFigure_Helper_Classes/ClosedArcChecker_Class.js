import { ReferenceFigure } from "../../ReferenceFigure/ReferenceFigure_Class.js"
import { areTwoLinesIntersecting } from "../ParallelFigureUtils/GeometryUtils/geometryUtils.js"

function ClosedArcChecker(parallelFigure, index, subFigureSkipperIndexModifiers) {
    this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.index = index

    this.skipperIndexMods = subFigureSkipperIndexModifiers
    this.previousIndex = this.index + 0 + this.skipperIndexMods.previousIndexModifier
    this.thisIndex = this.index + 1 + this.skipperIndexMods.currentIndexModifier 
    this.nextIndex = this.index + 2 + this.skipperIndexMods.nextIndexModifier

    this.previousOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.previousIndex + modifierFromFunction]
    this.thisOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.thisIndex + modifierFromFunction]
    this.nextOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.nextIndex + modifierFromFunction]

    // CLOSED ARC STUFF
    this.functionRunning_firstCycle = true
    this.arcHasClosed_firstCycle = true
    this.arcHasOpened_firstCycle = false
    this.endPoints_origPosStart = null
    this.endPoints_origPosEnd = null
}

export {
    ClosedArcChecker
}

//FIXME: Get rid of this way, set dynamically
ClosedArcChecker.prototype.setIndex = function(index, subFigureSkipperIndexModifiers) {
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    this.index = index
    this.skipperIndexMods = subFigureSkipperIndexModifiers
    this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier //FIXME: specifically this one
    this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
}

// TODO:
// Actual Todo List For Closed Arcs: (unorganzed, random reminders)
    // - Arc To Arc
        // - fix disconnected corner after an arc has closed
        // - fix closed arc after a corner has disconnected
        // - handle multiple closed arcs

    // - Path To Arc
        // - start

    // - Arc To Path
        // - start
        
ClosedArcChecker.prototype.checkIfArcIsClosed = function() {
    let parallelEndPoint_start = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    let parallelEndPoint_end = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    let parallelEndPoint_end_next = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    // let referencFigureIndex = "Run_All" // REFERENCE FIGURE STUFF
    let referencFigureIndex = 1 // REFERENCE FIGURE STUFF

    if(this.functionRunning_firstCycle === true) {
        this.endPoints_origPosStart = [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]
        this.endPoints_origPosEnd = [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]


        // REFERENCE FIGURE STUFF
        if(this.index === referencFigureIndex || referencFigureIndex === "Run_All") {

            let svgFigure = this.PARFIGURE.svgFigure
            this.referenceFigure_largeDot_01_fig01 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_largeDot_01_fig01.addCircle({palette: 1, circRad: 10, fillClr: 1}, 1)
            this.referenceFigure_largeDot_02_fig01 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_largeDot_02_fig01.addCircle({palette: 1, circRad: 10, fillClr: 1}, 1)
            this.referenceFigure_dottedLine_01_fig01 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_dottedLine_01_fig01.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

            this.referenceFigure_largeDot_01_fig02 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_largeDot_01_fig02.addCircle({palette: 1, circRad: 10, fillClr: 3}, 1)
            this.referenceFigure_largeDot_02_fig02 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_largeDot_02_fig02.addCircle({palette: 1, circRad: 10, fillClr: 3}, 1)
            this.referenceFigure_dottedLine_01_fig02 = new ReferenceFigure(svgFigure, true)
            this.referenceFigure_dottedLine_01_fig02.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})
        }
        // REFERENCE FIGURE STUFF


        this.functionRunning_firstCycle = false
    }


    // REFERENCE FIGURE STUFF
    let figures = [
        this.referenceFigure_largeDot_01_fig01,
        this.referenceFigure_largeDot_02_fig01,
        this.referenceFigure_dottedLine_01_fig01,
        this.referenceFigure_largeDot_01_fig02,
        this.referenceFigure_largeDot_02_fig02,
        this.referenceFigure_dottedLine_01_fig02
    ]
    let checkForFigureAndRunAFunction = (pos1, pos2, figure) => figures.length > 0 ? figures[figure].changeCircleColor(pos1, pos2) : null
    if(this.index === referencFigureIndex || referencFigureIndex === "Run_All") {
        figures[0].runFunctions([this.endPoints_origPosStart])
        figures[1].runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
        figures[2].runFunctions([this.endPoints_origPosStart, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
        figures[3].runFunctions([this.endPoints_origPosEnd])
        figures[4].runFunctions([[parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
        figures[5].runFunctions([this.endPoints_origPosEnd, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
    }
    // REFERENCE FIGURE STUFF

    
    let hasArcClosed = areTwoLinesIntersecting(this.endPoints_origPosStart, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], this.endPoints_origPosEnd, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y])

    if(hasArcClosed === true) {
        if(this.arcHasClosed_firstCycle === true) {


            // REFERENCE FIGURE STUFF
            if(this.index === referencFigureIndex || referencFigureIndex === "Run_All") {
                checkForFigureAndRunAFunction(1, 2, 0)
                checkForFigureAndRunAFunction(1, 2, 1)
                checkForFigureAndRunAFunction(3, 4, 3)
                checkForFigureAndRunAFunction(3, 4, 4)
            }
            // REFERENCE FIGURE STUFF


            this.arcHasClosed_firstCycle = false
            this.arcHasOpened_firstCycle = true
            // if(this.index !== 0) {
                this.PARFIGURE.skipped_indecies_NOT_ORDERED.push(this.index + 1)
                this.PARFIGURE.skipped_indecies.push(this.index + 1)
                this.PARFIGURE.skipped_indecies.sort((a, b) => a - b)  // Sorts in ascending order // FIXME: try to eliminate this
                this.PARFIGURE.currentSkippedIndex = this.index + 1
            // }

            console.log("CLOSED_ARC________________________")
            console.log(this.index)


            console.log(parallelEndPoint_end)
            console.log(parallelEndPoint_end_next)

            parallelEndPoint_end.arc.hidden = true
            if(parallelEndPoint_end_next !== null) {
                parallelEndPoint_end_next.arc.hidden = true //FIXME: issue here
            }

            console.log("CLOSED_ARC")
            //FIXME:
        }
    }
    if(hasArcClosed === false) {
        if(this.arcHasOpened_firstCycle === true) {


            // REFERENCE FIGURE STUFF
            if(this.index === referencFigureIndex || referencFigureIndex === "Run_All") {
                checkForFigureAndRunAFunction(2, 1, 0)
                checkForFigureAndRunAFunction(2, 1, 1)
                checkForFigureAndRunAFunction(4, 3, 3)
                checkForFigureAndRunAFunction(4, 3, 4)
            }
            // REFERENCE FIGURE STUFF


            this.arcHasOpened_firstCycle = false
            this.arcHasClosed_firstCycle = true
        }
    }
}