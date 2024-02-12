function createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, passedIndex, shape) {
    let index
    let indexer
    let sideCode
    if(shape === 'p2a'){
        index = passedIndex
        indexer = index
        sideCode = "AAA"
    }else if(shape === 'a2p'){
        index = passedIndex
        indexer = index + 1
        sideCode = "BBB"
    }else if(shape === 'a2a'){
        index = passedIndex - 1
        indexer = index + 1
        sideCode = "CCC"
    }

    let thisSvgEndPointIndex = (index * 2) + 1
    let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
    let thisSvgPathIndex = index + 1
    let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + index + '_'))

    self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
    self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
    self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')

    let doubleIndex = index * 2
    a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
    a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)

    let parallelPathDataGLOBAL = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    let thisParPathData = parallelPathDataGLOBAL[index][0]

    // function determineSweepFlag() {
    //     console.log("pooper")
    //     console.log(index)
    //     let sweepFlagOK
    //     let prevParPathDataArc = parallelPathDataGLOBAL[index - 1][1].arc
    //     let thisParPathDataArc = parallelPathDataGLOBAL[index][0].arc

    //     if(prevParPathDataArc.exist) {
    //         console.log(prevParPathDataArc.sweepFlag)
    //         prevParPathDataArc.sweepFlag === 0 ? sweepFlagOK = 1 : sweepFlagOK = 0
    //     }
    //     if(thisParPathDataArc.exist) {
    //         console.log(thisParPathDataArc.sweepFlag)
    //         thisParPathDataArc.sweepFlag === 0 ? sweepFlagOK = 1 : sweepFlagOK = 0
    //     }
    //     console.log(sweepFlagOK)
    //     return sweepFlagOK
    // }



        function determineSweepFlag() {
        console.log("pooper")
        console.log(index)
        let sweepFlagOK
        let prevParPathDataArc = parallelPathDataGLOBAL[index - 1][1].arc
        let thisParPathDataArc = parallelPathDataGLOBAL[index][0].arc

        if(prevParPathDataArc.exist) {
            console.log(prevParPathDataArc.sweepFlag)
            prevParPathDataArc.sweepFlag === 0 ? sweepFlagOK = 1 : sweepFlagOK = 0
            if(thisParPathDataArc.exist) {
                if(prevParPathDataArc.sweepFlag === thisParPathDataArc.sweepFlag) {
                    let direction
                    if(1 === 1) { // determine if a2a points up or down here somehow
                        direction = 1
                    } else {
                        direction = 0
                    }
                    console.log(thisParPathDataArc.sweepFlag)
                    console.log("crapper_111")
                    sweepFlagOK = direction
                    return sweepFlagOK
                }
            }
        }

        if(thisParPathDataArc.exist) {
            console.log(thisParPathDataArc.sweepFlag)
            thisParPathDataArc.sweepFlag === 0 ? sweepFlagOK = 1 : sweepFlagOK = 0
        }

        console.log(sweepFlagOK)
        console.log("crapper_333")
        return sweepFlagOK
    }





    parallelPathDataGLOBAL.splice(index, 0, [
        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}},
        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}},
    ])

    referenceEndPointsParallelPerpendicular.splice(index, 0, [
        {x: parallelPathDataGLOBAL[index][0].coords.x, y: parallelPathDataGLOBAL[index][0].coords.y},
        {x: parallelPathDataGLOBAL[index][1].coords.x, y: parallelPathDataGLOBAL[index][1].coords.y}
    ])
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")
}

export {
    createAndAddSvgElementAndUpdateDataArrays
}