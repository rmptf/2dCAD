function ParallelFigure(svgFigure) {
    this.SvgFigure = svgFigure

    console.log('this.SvgFigure')
    console.log(this.SvgFigure)

    // Figure Data
    // let parallelPathDatas_globalRef = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // let parallelPathDatasCopyForPerpendicular = transformData(parallelPathDatas_globalRef)
    // let basePathDatasCopy = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let basePathDatasCopySecondary = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

    this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
    this.parallelPathDatas_globalRef = this.SvgFigure.svgPathDatas // ?might be wring?
    // this.parallelPathDatasCopyForPerpendicular = transformData(this.parallelPathDatas_globalRef)
    // this.basePathDatasCopy = makeDeepCopy(this.originalFigurePathDatas)
    // this.basePathDatasCopySecondary = makeDeepCopy(this.originalFigurePathDatas)
    // Figure Data

    // Svg Elements
    this.svgPaths = {
        primaryPath: null,
    }

    this.svgEndPoints = []
    // Svg Elements

    this.parallelPathObject = {
        pathToArcCounter: -1,
        arcToPathCounter: -1,
        arcToArcCounter: -1,
        pathToArchIndexArray: [],
        arcToPathIndexArray: [],
        arcToArcIndexArray: [],
        collectIndicesOfIntersections: true,
        removeornot_allParData: true,
        parallelPathSegmentCounter_FIRST: -1,
        parallelPathSegmentCounter_SECOND: 0,
        removeStartIndex: null,
        parallelDistance: null,
        iterationCounter: 0,

        // arc flag stuff
        arrayOfArcFlagsInitPos: [],
        counterOfArcsAsTheyArrive: 0,
        setThisArcFlag_at2Joiner_from1Joiner: null,
        setThisArcFlag_at4Joiner_from3Joiner: null,
        setThisArcFlag_atFinal_from1Joiner: null,
        setPrevArcFlag_atFinal_from3Joiner: null
    }
}

ParallelFigure.prototype.setParallelFigureClickEvents = function() {
    // a_canvas_globalVars.svgD3.on("mousemove", mouseMoveDrawParallel)
    // a_canvas_globalVars.svgD3.on('click', mouseDownDrawParallel)
}

ParallelFigure.prototype.parallelFigure_updateSvg = function() {
    // updateSVG_thisSvgFigure(this)
}

ParallelFigure.prototype.deepCopyPathDatas = function() {
    
}

ParallelFigure.prototype.createParallelPath = function() {
    // let newParallelFigure = new ParallelFigure()
    // newParallelFigure.svgFigure = this
    // this.parallelFigures = newParallelFigure

    // return newParallelFigure
}

ParallelFigure.prototype.createParallelEndPoint = function(figure, parentElement, pathData, index) {
    // let newEndPoint_additional = new SvgEndPointPrimary(figure, parentElement, this.actionStates, pathData, index)
    // // newEndPoint_additional.pathData = pathData
    // this.svgEndPoints.push(newEndPoint_additional)
}


export {
    ParallelFigure
}