// import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_point_02, updateSVG_highlight_1_point_03, updateSVG_highlight_1_point_04} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests.js'




// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// documentFigureCount,
// self,
// index,
// parPathObj,
// thisConnection

// targetEndPointsParallelFull,
// referenceEndPointsParallelPerpendicular,
// referenceEndPointsBaseAndFillers,
// documentFigureCount,
// self,
// index,
// parPathObj,
// thisConnection


// function createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, passedIndex, shape) {
    // referenceEndPointsParallelPerpendicular,   ==>       parallelFigurePathDatas_transformed
    // referenceEndPointsBaseAndFillers,          ==>       originalFigurePathDatas_copy
    // documentFigureCount,                       ==>       xxx
    // self,                                      ==>       xxx

function createAndAddSvgElementAndUpdateDataArrays(parallelFigure, passedIndex, shape) {
    console.log("createAndAddSvgElementAndUpdateDataArrays")

    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    let referenceEndPointsParallelPerpendicular = parallelFigure.parallelFigurePathDatas_transformed
    let referenceEndPointsBaseAndFillers = parallelFigure.originalFigurePathDatas_copy
    // let parallelEndPointGroup = parallelFigure.
    // let parallelPathGroup = parallelFigure.



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



    // thisFigure.createParallelPathData()
    // ParallelFigure.prototype.createParallelPathData = function(parentArray, passedPathData, index) {

    // let parallelPathDataGLOBAL = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // let parallelPathDataGLOBAL = parallelFigurePathDatas
    // let thisParPathData = parallelFigurePathDatas[index][0]

    // // parallelFigurePathDatas
    let thisParPathData = parallelFigurePathDatas[index][0]
    let data1 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode, pooper: 'poop'}}
    let data2 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode, pooper: 'poop'}}
    parallelFigure.createParallelPathData([data1, data2], index)

    // parallelFigurePathDatas_transformed
    referenceEndPointsParallelPerpendicular.splice(index, 0, [
        {x: parallelFigurePathDatas[index][0].coords.x, y: parallelFigurePathDatas[index][0].coords.y},
        {x: parallelFigurePathDatas[index][1].coords.x, y: parallelFigurePathDatas[index][1].coords.y}
    ])

    // originalFigurePathDatas_copy
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")




    // thisFigure.createParallelPath(i)
    // ParallelFigure.prototype.createParallelPath = function(index) {
    // this.svgPaths.parallelPaths.push(newParallelPath)

    // thisFigure.createParallelEndPoint(orig[i], i)
    // thisFigure.createParallelEndPoint(orig[i], i)
    // ParallelFigure.prototype.createParallelEndPoint = function(pathData, index) {
    // this.svgEndPoints.push(newEndPointParallel)



    //TODO:
    // find way to add joiner classes
    // maybe make sure index are correct

    //FIXME: righthere
    parallelFigure.createParallelEndPoint(data1, thisSvgEndPointIndex)
    parallelFigure.createParallelEndPoint(data2, nextSvgEndPointIndex)
    //FIXME: righthere

    // let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    // let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
    // self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
    // self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
    // let doubleIndex = index * 2
    // a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)



    //FIXME: righthere
    parallelFigure.createParallelPath(thisSvgPathIndex)
    //FIXME: righthere

    // let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + index + '_'))
    // self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')
    // a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)




}

export {
    createAndAddSvgElementAndUpdateDataArrays
}


function determineSweepFlag(referenceEndPointsBaseAndFillers, index, self) {
    // console.log("starter")
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
        // console.log(111)
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
        // prevBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
        thisBaseRefArc.sweepFlag === 0 ? newSweepFlag = 1 : newSweepFlag = 0
    }
    // only one arc; next index is arc
    // if(!prevBaseRefArc.exist && nextBaseRefArc.exist) {
    if(!thisBaseRefArc.exist && nextBaseRefArc.exist) {
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