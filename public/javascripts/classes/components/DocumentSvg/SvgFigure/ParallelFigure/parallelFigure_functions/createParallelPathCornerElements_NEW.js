function createAndAddSvgElementAndUpdateDataArrays(parallelFigure, passedIndex, shape) {
    console.log("createAndAddSvgElementAndUpdateDataArrays")

    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    let referenceEndPointsParallelPerpendicular = parallelFigure.parallelFigurePathDatas_transformed
    let referenceEndPointsBaseAndFillers = parallelFigure.originalFigurePathDatas_plusFillers

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

    // parallelFigurePathDatas
    let thisParPathData = parallelFigurePathDatas[index][0]
    let data1 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    let data2 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    parallelFigure.createParallelPathData([data1, data2], index)

    // parallelFigurePathDatas_transformed
    referenceEndPointsParallelPerpendicular.splice(index, 0, [
        {x: parallelFigurePathDatas[index][0].coords.x, y: parallelFigurePathDatas[index][0].coords.y},
        {x: parallelFigurePathDatas[index][1].coords.x, y: parallelFigurePathDatas[index][1].coords.y}
    ])

    // originalFigurePathDatas_plusFillers
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")

    let doubleIndex = index * 2
    parallelFigure.createFillerParallelEndPoint(data2, doubleIndex, 2)
    parallelFigure.createFillerParallelEndPoint(data1, doubleIndex, 1)

    parallelFigure.createFillerParallelPath(index)
}

export {
    createAndAddSvgElementAndUpdateDataArrays
}


function determineSweepFlag(referenceEndPointsBaseAndFillers, index, self) {
    console.log("starter___")
    let newSweepFlag
    let prevBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index - 1)
    let thisBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index)
    let nextBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index + 1)
    let prevBaseRefArc = prevBaseRefNoFiller.arc
    let thisBaseRefArc = thisBaseRefNoFiller.arc
    let nextBaseRefArc = nextBaseRefNoFiller.arc
    let prevBaseRefCoords = prevBaseRefNoFiller.coords
    let thisBaseRefCoords = thisBaseRefNoFiller.coords
    let nextBaseRefCoords = nextBaseRefNoFiller.coords

    // both arcs exist
    if(thisBaseRefArc.exist && nextBaseRefArc.exist) {
        console.log(111)
        // both arcs have different sweep flags
        if(thisBaseRefArc.sweepFlag !== nextBaseRefArc.sweepFlag) {
            let direction
            if(thisBaseRefCoords.y > prevBaseRefCoords.y && thisBaseRefCoords.y > nextBaseRefCoords.y) {
                direction = 0
                newSweepFlag = direction
                return newSweepFlag
            }
            if(thisBaseRefCoords.y < prevBaseRefCoords.y && thisBaseRefCoords.y < nextBaseRefCoords.y) {
                direction = 1
                newSweepFlag = direction
                return newSweepFlag
            }
            if(thisBaseRefCoords.y > prevBaseRefCoords.y && thisBaseRefCoords.y < nextBaseRefCoords.y) {
                if(thisBaseRefCoords.x > prevBaseRefCoords.x){
                    direction = 1
                    newSweepFlag = direction
                    return newSweepFlag
                }
                if(thisBaseRefCoords.x < prevBaseRefCoords.x){
                    direction = 0
                    newSweepFlag = direction
                    return newSweepFlag
                }
            }
            if(thisBaseRefCoords.y < prevBaseRefCoords.y && thisBaseRefCoords.y > nextBaseRefCoords.y) {
                if(thisBaseRefCoords.x > prevBaseRefCoords.x) {
                    direction = 0
                    newSweepFlag = direction
                    return newSweepFlag
                }
                if(thisBaseRefCoords.x < prevBaseRefCoords.x) {
                    direction = 1
                    newSweepFlag = direction
                    return newSweepFlag
                }
            }
        // both arcs have the same sweep flags
        } else if(thisBaseRefArc.sweepFlag === nextBaseRefArc.sweepFlag) {
            nextBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
        }
    }
    // only one arc; prev index is arc
    if(thisBaseRefArc.exist && !nextBaseRefArc.exist) {
        console.log(222)
        thisBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
    }
    // only one arc; next index is arc
    if(!thisBaseRefArc.exist && nextBaseRefArc.exist) {
        console.log(333)
        nextBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
    }

    return newSweepFlag
}

function getRefPointAtIndexIfNotFiller(refEndPointsBase, index) {
    let refEndPointsBaseNoFiller
    let fillerAdder = 0
    const isFiller = (newIndex) => refEndPointsBase[newIndex] === "filler"

    if (isFiller(index) && !isFiller(index + 1)){
        fillerAdder = 1
    }

    if (isFiller(index) && isFiller(index + 1)){
        fillerAdder = -1
    }

    refEndPointsBaseNoFiller = refEndPointsBase[index + fillerAdder]

    return refEndPointsBaseNoFiller
}