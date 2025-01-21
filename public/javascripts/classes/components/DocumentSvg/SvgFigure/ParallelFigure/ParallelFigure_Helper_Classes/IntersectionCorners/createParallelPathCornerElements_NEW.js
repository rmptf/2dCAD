import {PathDataCorner} from "../../../SvgData/SvgData_Children/SvgData_Corner_Class.js"

// FIXME: not currently a class... should it be?
// FIXME: Create as a class when handling different corner shapes.
    // This might have to change for each corner shape
function createAndAddSvgElementAndUpdateDataArrays(parallelFigure, passedIndex, shape) {
    console.log("createAndAddSvgElementAndUpdateDataArrays")

    // old
    // let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    //new
    let originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    let referenceEndPointsParallelPerpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    let referenceEndPointsBaseAndFillers = parallelFigure.originalFigurePathDatas_plusFillers

    // set indecies based on the shape of the intersection
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

    console.log("PASSED_INDEX")
    console.log(originalFigurePathDatas[index].children.parallel_pathDatas)

    // parallelFigurePathDatas
    //old
    // let referenceParallelPathData = parallelFigurePathDatas[index][0]
    //new
    // find reference parallelPathData for new corner
    let referenceParallelPathData = originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east

    // fill in the data for the new corner using the data from the reference
    //old
    // let data1 = {coords: {x: referenceParallelPathData.coords.x, y: referenceParallelPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    // let data2 = {coords: {x: referenceParallelPathData.coords.x, y: referenceParallelPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    let data1 = {coords: {x: referenceParallelPathData.coords.x, y: referenceParallelPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(originalFigurePathDatas, index, self), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    let data2 = {coords: {x: referenceParallelPathData.coords.x, y: referenceParallelPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(originalFigurePathDatas, index, self), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    // use the data to create a parellelPathDataCorner
    let parPathDataCorner = PathDataCorner.createParallelPathDataCorner(parallelFigure, [data1, data2], index)
    
    // // old
    // // parallelFigurePathDatas_perpendicularProjections
    // referenceEndPointsParallelPerpendicular.splice(index, 0, [
    //     {x: parallelFigurePathDatas[index][0].coords.x, y: parallelFigurePathDatas[index][0].coords.y},
    //     {x: parallelFigurePathDatas[index][1].coords.x, y: parallelFigurePathDatas[index][1].coords.y}
    // ])

    //new
    // parallelFigurePathDatas_perpendicularProjections
    // create a new referenceEndPointsParallelPerpendicular and splice it into the array
    referenceEndPointsParallelPerpendicular.splice(index, 0, [
        {x: originalFigurePathDatas[index-1].children.parallel_pathDatas.pathData_west.coords.x, y: originalFigurePathDatas[index-1].children.parallel_pathDatas.pathData_west.coords.y},
        {x: originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east.coords.x, y: originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east.coords.y}
    ])

    // originalFigurePathDatas_plusFillers
    // splice a "filler" placeholder into the referenceEndPointsBaseAndFillers array
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")

    // create corner Path elements, place them into the dom and update corrosponding pathDatas
    let path = parallelFigure.createParallelPathCorner(index)

    // create corner EndPoint elements, place them into the dom and update corrosponding pathDatas
    let doubleIndex = index * 2
    parallelFigure.createParallelEndPointCorner(parPathDataCorner[1], doubleIndex, parPathDataCorner[1], referenceParallelPathData, path)
    parallelFigure.createParallelEndPointCorner(parPathDataCorner[0], doubleIndex, parPathDataCorner[0], referenceParallelPathData, null)
}

export {
    createAndAddSvgElementAndUpdateDataArrays
}


// set indecies based on the shape of the intersection
// find reference parallelPathData for new corner
// create a new referenceEndPointsParallelPerpendicular and splice it into the array
// splice a "filler" placeholder into the referenceEndPointsBaseAndFillers array
// create corner EndPoint elements, place them into the dom and update corrosponding pathDatas
// create corner Path elements, place them into the dom and update corrosponding pathDatas


function determineSweepFlag(referenceEndPointsBaseAndFillers, index, self) {
    console.log("starter___")
    let newSweepFlag
    //old
    // let prevBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index - 1)
    // let thisBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index)
    // let nextBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index + 1)
    //new
    // let prevBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index - 1)
    // let thisBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index)
    // let nextBaseRefNoFiller = getRefPointAtIndexIfNotFiller(referenceEndPointsBaseAndFillers, index + 1)
    let prevBaseRefNoFiller = referenceEndPointsBaseAndFillers[index - 1]
    let thisBaseRefNoFiller = referenceEndPointsBaseAndFillers[index]
    let nextBaseRefNoFiller = referenceEndPointsBaseAndFillers[index + 1]
    console.log(prevBaseRefNoFiller)
    console.log(thisBaseRefNoFiller)
    console.log(nextBaseRefNoFiller)
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








// import {dragEndPoint} from '../SvgElement_functions/dragSvgElements_NEW.js'

// function SvgEndPoint(parentFigure) {
//     this.ELEMENT = 'circle'
//     this.parentFigure = parentFigure
// }

// SvgEndPoint.prototype.createSvgEndPoint = function(index) {
//     let newEndPoint = this.parentElement.insert(this.ELEMENT, ':nth-child(' + (index + 1) + ')')
//         .attr('class', this.CLASSNAME)
//     return newEndPoint
// }

// export {
//     SvgEndPoint
// }