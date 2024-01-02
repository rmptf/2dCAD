function createAndAddSvgElementAndUpdateDataArrays(self, index, shape, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel) {
    let thisSvgEndPointIndex = (index * 2) + 1
    let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
    let thisSvgPathIndex = index + 1
    let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + index + '_'))
    let parPathData = []
    let indexer

    if(shape === 'p2a'){
        parPathData[0] = 0
        parPathData[1] = "AAA"
        indexer = index
    }else if(shape === 'a2p'){
        parPathData[0] = 1
        parPathData[1] = "BBB"
        indexer = index + 1
    }else if(shape === 'a2a'){
        parPathData[0] = 0
        parPathData[1] = "CCC"
        indexer = index + 1
    }

    self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
    self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
    self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')

    let doubleIndex = index * 2
    a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
    a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)

    let parallelPathDataGLOBAL = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    let thisParPathData = parallelPathDataGLOBAL[index][0]
    // Add function here to determine things like arcFlags, sweepFlags and ?center?
    parallelPathDataGLOBAL.splice(index, 0, [
        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
    ])

    parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
        {x: parallelPathDataGLOBAL[index][0].coords.x, y: parallelPathDataGLOBAL[index][0].coords.y},
        {x: parallelPathDataGLOBAL[index][1].coords.x, y: parallelPathDataGLOBAL[index][1].coords.y}
    ])
    parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(indexer, 0, "filler")
}

export {
    createAndAddSvgElementAndUpdateDataArrays
}