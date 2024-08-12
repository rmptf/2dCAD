function createAndAddSvgElementAndUpdateDataArrays(parallelFigure, passedIndex, shape) {
    console.log("createAndAddSvgElementAndUpdateDataArrays")

    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    let referenceEndPointsParallelPerpendicular = parallelFigure.parallelFigurePathDatas_transformed
    let referenceEndPointsBaseAndFillers = parallelFigure.originalFigurePathDatas_copy

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

    // FIXME: remove the + 1 and remove the - 1 at 
    let thisSvgEndPointIndex = (index * 2) + 1
    let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
    let thisSvgPathIndex = index + 1

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

    // originalFigurePathDatas_copy
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")

    let doubleIndex = index * 2
    parallelFigure.createFillerParallelEndPoint(data1, thisSvgEndPointIndex - 1, doubleIndex)
    parallelFigure.createFillerParallelEndPoint(data2, nextSvgEndPointIndex - 1, doubleIndex)

    parallelFigure.createFillerParallelPath(thisSvgPathIndex - 1, index)
    
    // console.log("dfsdfsdfsdfsdfsdf")
    // console.log(parallelFigurePathDatas)
    // console.log(referenceEndPointsParallelPerpendicular)
    // console.log(referenceEndPointsBaseAndFillers)
    // console.log('index')
    // console.log(passedIndex)
    // console.log(index)
    // console.log(indexer)
    // console.log(thisSvgEndPointIndex)
    // console.log(nextSvgEndPointIndex)
    // console.log(thisSvgPathIndex)
    // console.log("code")
    // console.log(sideCode)
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

    // console.log(referenceEndPointsBaseAndFillers[index - 1])
    // console.log(referenceEndPointsBaseAndFillers[index])
    // console.log(referenceEndPointsBaseAndFillers[index + 1])
    // console.log(prevBaseRefNoFiller)
    // console.log(thisBaseRefNoFiller)
    // console.log(nextBaseRefNoFiller)
    // updateSVG_highlight_1_point_01([prevBaseRefCoords.x, prevBaseRefCoords.y], self)
    // updateSVG_highlight_1_point_02([thisBaseRefCoords.x, thisBaseRefCoords.y], self)
    // updateSVG_highlight_1_point_03([nextBaseRefCoords.x, nextBaseRefCoords.y], self)
    // updateSVG_highlight_1_point_04([thisBaseRefArc.center.x, thisBaseRefArc.center.y], self)

    // both arcs exist
    // if(prevBaseRefArc.exist && nextBaseRefArc.exist) {
    if(thisBaseRefArc.exist && nextBaseRefArc.exist) {
        console.log(111)
        // both arcs have different sweep flags
        // if(prevBaseRefArc.sweepFlag !== nextBaseRefArc.sweepFlag) {
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
        // } else if(prevBaseRefArc.sweepFlag === nextBaseRefArc.sweepFlag) {
        } else if(thisBaseRefArc.sweepFlag === nextBaseRefArc.sweepFlag) {
            // prevBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
            nextBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
        }
    }
    // only one arc; prev index is arc
    // if(prevBaseRefArc.exist && !nextBaseRefArc.exist) {
    if(thisBaseRefArc.exist && !nextBaseRefArc.exist) {
        console.log(222)
        // prevBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
        thisBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
    }
    // only one arc; next index is arc
    // if(!prevBaseRefArc.exist && nextBaseRefArc.exist) {
    if(!thisBaseRefArc.exist && nextBaseRefArc.exist) {
        console.log(333)
        nextBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
    }

    console.log("oskfosdkfoskdf")
    console.log(newSweepFlag)
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