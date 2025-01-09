import {PathDataParallel} from "../../SvgData/SvgData_Children/SvgData_Parallel_Class.js"
import {PathDataCorner} from "../../SvgData/SvgData_Children/SvgData_Corner_Class.js"
// import {PathData} from "../../SvgData/SvgData_Class.js"

// FIXME: Eventually move to parallegFigure?
// FIXME: not currently a class... should it be?
function createAndAddSvgElementAndUpdateDataArrays(parallelFigure, passedIndex, shape) {
    console.log("createAndAddSvgElementAndUpdateDataArrays")

    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    let referenceEndPointsParallelPerpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    let referenceEndPointsBaseAndFillers = parallelFigure.originalFigurePathDatas_plusFillers

    

    //FIXME:
    //FIXME:


    let originalFigurePathDatas = parallelFigure.originalFigurePathDatas


    //FIXME:
    //FIXME:

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
    console.log(index)
    console.log(indexer)
    console.log(originalFigurePathDatas[index].children.parallel_pathDatas)

    // parallelFigurePathDatas
    //old
    // let thisParPathData = parallelFigurePathDatas[index][0]
    //new
    let thisParPathData = originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east

    let data1 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    let data2 = {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: determineSweepFlag(referenceEndPointsBaseAndFillers, index, self), side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: sideCode}}
    // parallelFigure.createParallelPathData([data1, data2], index)
    // let parPathData = PathDataParallel.createParallelPathData(parallelFigure, [data1, data2], index)
    let parPathData = PathDataCorner.createParallelPathDataCorner(parallelFigure, [data1, data2], index)
    
    // // old
    // // parallelFigurePathDatas_perpendicularProjections
    // referenceEndPointsParallelPerpendicular.splice(index, 0, [
    //     {x: parallelFigurePathDatas[index][0].coords.x, y: parallelFigurePathDatas[index][0].coords.y},
    //     {x: parallelFigurePathDatas[index][1].coords.x, y: parallelFigurePathDatas[index][1].coords.y}
    // ])

    //new
    // parallelFigurePathDatas_perpendicularProjections
    referenceEndPointsParallelPerpendicular.splice(index, 0, [
        {x: originalFigurePathDatas[index-1].children.parallel_pathDatas.pathData_west.coords.x, y: originalFigurePathDatas[index-1].children.parallel_pathDatas.pathData_west.coords.y},
        {x: originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east.coords.x, y: originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east.coords.y}
    ])

    // originalFigurePathDatas_plusFillers
    referenceEndPointsBaseAndFillers.splice(indexer, 0, "filler")

    let doubleIndex = index * 2
    // parallelFigure.createFillerParallelEndPoint(data2, doubleIndex, 2, data2)
    // parallelFigure.createFillerParallelEndPoint(data1, doubleIndex, 1, data1)

    // parallelFigure.createFillerParallelEndPoint(parPathData[1], doubleIndex, 2, parPathData[1])
    // parallelFigure.createFillerParallelEndPoint(parPathData[0], doubleIndex, 1, parPathData[0])


    //FIXME: an example of how to insert these elemnts into the correct spot in the DOM is listed at the bottom of this page:
    //FIXME: an example of how to insert these elemnts into the correct spot in the DOM is listed at the bottom of this page:
    parallelFigure.createParallelEndPointCorner(parPathData[1], doubleIndex, 2, parPathData[1])
    parallelFigure.createParallelEndPointCorner(parPathData[0], doubleIndex, 1, parPathData[0])

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



// EXAMPLE 1
// // To insert a new circle element into the DOM after a specific circle on the same layer, you can use JavaScript's DOM manipulation methods. Assuming you have a reference to the existing circle element after which you want to insert the new one, you can use the insertBefore or after method, depending on your setup.

// // Here's how to do it:

// // Using insertBefore

// // The insertBefore method allows you to insert an element before a specified node. To insert after a specific element, you can use the next sibling of that element as the reference.
// // Get a reference to the SVG container (e.g., <svg> or a group <g>)
// const svgLayer = document.getElementById('mySvgLayer');

// // Create your new circle element
// const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
// newCircle.setAttribute('cx', '50');
// newCircle.setAttribute('cy', '50');
// newCircle.setAttribute('r', '10');
// newCircle.setAttribute('fill', 'red');

// // Get the reference to the circle after which you want to insert
// const targetCircle = document.getElementById('existingCircleId');

// // Insert the new circle after the target circle
// if (targetCircle.nextSibling) {
//   svgLayer.insertBefore(newCircle, targetCircle.nextSibling);
// } else {
//   // If it's the last child, just append it
//   svgLayer.appendChild(newCircle);
// }


// EXAMPLE 2
// // Using after (Modern)
// // If you are working in a modern browser, you can use the after method to directly insert the element after a specific one.

// // Create your new circle element
// const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
// newCircle.setAttribute('cx', '50');
// newCircle.setAttribute('cy', '50');
// newCircle.setAttribute('r', '10');
// newCircle.setAttribute('fill', 'red');

// // Get the reference to the circle after which you want to insert
// const targetCircle = document.getElementById('existingCircleId');

// // Insert the new circle after the target circle
// targetCircle.after(newCircle);

