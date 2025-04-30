function ClosedArcChecker() {

    // CLOSED ARC STUFF
    this.firstCycle = true
    this.arcHasClosed = true
    this.arcHasOpened = false
    this.endPoints_origPosStart = null
    this.endPoints_origPosEnd = null
    
}

export {
    ClosedArcChecker
}

ClosedArcChecker.prototype.checkIfArcIsClosed = function() {
    let parallelEndPoint_start = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    let parallelEndPoint_end = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    let parallelEndPoint_end_next = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    // let referencFigureIndex = 1 // REFERENCE FIGURE STUFF

    if(this.firstCycle === true) {
        this.endPoints_origPosStart = [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]
        this.endPoints_origPosEnd = [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]
        // // REFERENCE FIGURE STUFF
        // if(this.index === referencFigureIndex) {

        //     let svgFigure = this.PARFIGURE.svgFigure
        //     this.referenceFigure_largeDot_01_fig01 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_largeDot_01_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
        //     this.referenceFigure_largeDot_02_fig01 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_largeDot_02_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
        //     this.referenceFigure_dottedLine_01_fig01 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_dottedLine_01_fig01.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

        //     this.referenceFigure_largeDot_01_fig02 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_largeDot_01_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
        //     this.referenceFigure_largeDot_02_fig02 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_largeDot_02_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
        //     this.referenceFigure_dottedLine_01_fig02 = new ReferenceFigure(svgFigure, false)
        //     this.referenceFigure_dottedLine_01_fig02.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})
        // }
        // // REFERENCE FIGURE STUFF
        this.firstCycle = false
    }

    // // REFERENCE FIGURE STUFF
    // let figures = [
    //     this.referenceFigure_largeDot_01_fig01,
    //     this.referenceFigure_largeDot_02_fig01,
    //     this.referenceFigure_dottedLine_01_fig01,
    //     this.referenceFigure_largeDot_01_fig02,
    //     this.referenceFigure_largeDot_02_fig02,
    //     this.referenceFigure_dottedLine_01_fig02
    // ]
    // let checkForFigureAndRunAFunction = (pos1, pos2, figure) => figures.length > 0 ? figures[figure].changeCircleColor(pos1, pos2) : null
    // if(this.index === referencFigureIndex) {
    //     figures[0].runFunctions([this.endPoints_origPosStart])
    //     figures[1].runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
    //     figures[2].runFunctions([this.endPoints_origPosStart, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
    //     figures[3].runFunctions([this.endPoints_origPosEnd])
    //     figures[4].runFunctions([[parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
    //     figures[5].runFunctions([this.endPoints_origPosEnd, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
    // }
    // // REFERENCE FIGURE STUFF

    let hasArcClosed = areTwoLinesIntersecting(this.endPoints_origPosStart, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], this.endPoints_origPosEnd, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y])

    if(hasArcClosed === true) {
        if(this.arcHasClosed === true) {
            // // REFERENCE FIGURE STUFF
            // if(this.index === referencFigureIndex) {
            //     checkForFigureAndRunAFunction(1, 2, 0)
            //     checkForFigureAndRunAFunction(1, 2, 1)
            //     checkForFigureAndRunAFunction(3, 4, 3)
            //     checkForFigureAndRunAFunction(3, 4, 4)
            // }
            // // REFERENCE FIGURE STUFF
            this.arcHasClosed = false
            this.arcHasOpened = true
            this.PARFIGURE.skipped_indecies_NOT_ORDERED.push(this.index + 1)
            this.PARFIGURE.skipped_indecies.push(this.index + 1)
            this.PARFIGURE.skipped_indecies.sort((a, b) => a - b)  // Sorts in ascending order // FIXME: try to eliminate this
            this.PARFIGURE.currentSkippedIndex = this.index + 1

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
        if(this.arcHasOpened === true) {
            // // REFERENCE FIGURE STUFF
            // if(this.index === referencFigureIndex) {
            //     checkForFigureAndRunAFunction(2, 1, 0)
            //     checkForFigureAndRunAFunction(2, 1, 1)
            //     checkForFigureAndRunAFunction(4, 3, 3)
            //     checkForFigureAndRunAFunction(4, 3, 4)
            // }
            // // REFERENCE FIGURE STUFF
            this.arcHasOpened = false
            this.arcHasClosed = true
        }
    }
}