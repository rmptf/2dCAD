import {calculateArcAndDescribePath, describeComplexPath} from './animation_functions/svgElementCalculationsNEW.js'

function updateSVG_thisSvgFigure(figure) {
    let pathDatas = figure.svgPathDatas
    // console.log(pathDatas)

    // PATH
    let primaryPath = figure.svgPaths.primaryPath
    primaryPath.svgElementObject
        .attr('d', calculateArcAndDescribePath(pathDatas))
    // PATH

    // SECONDARY PATH
    let secondaryPaths = figure.svgPaths.secondaryPaths
    for (let i = 0; i < secondaryPaths.length; i++) {
        secondaryPaths[i].svgElementObject
            .attr('d', describeComplexPath([pathDatas[i], pathDatas[i + 1]]))
    }
    // SECONDARY PATH

    // END POINTS
    let endPoints = figure.svgEndPoints
    for (let i = 0; i < endPoints.length; i++) {
        endPoints[i].svgElementObject
            .attr('cx', pathDatas[i].coords.x)
            .attr('cy', pathDatas[i].coords.y)
    }
    // END POINTS
}

// 123-4 X
// 132-4 X

// 213-4 *
// 231-4 *

// 312-4 X
// 321-4 *

// 324-1 *
// 342-1 *

// 234-1 ?
// 243-1 ?

// 432-1
// 423-1

// function updateSVG_thisSvgParallelFigure(figure, iii, subFigureSkipperIndexModifiers) {
//     let parallelPathDatas = figure.parallelFigurePathDatas
//     let parallelPaths = figure.svgPaths.parallelPaths

//     let newIII = iii

//     let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
//     let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
//     let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


//     for (let i = 0; i < parallelPaths.length; i++) {
//         if(i === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
//             //FIXME: HARDCODED
//             if(skippedIndicies.length === 1) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(i)
//                 console.log(" ")
//                 parallelPaths[i].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
//                 parallelPaths[i].svgElementObject.style("stroke", "red")

//             } else if(skippedIndicies.length === 2) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(i)
//                 console.log(" ")
//                 parallelPaths[i].svgElementObject // ((SHAPE AAAA)) and others
//                     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
//                 parallelPaths[i].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
//                 // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 // parallelPaths[i-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

//             } else if(skippedIndicies.length === 3) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(i)
//                 console.log(" ")
//                 parallelPaths[i].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[i].svgElementObject.style("stroke", "yellow")

//                 // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 // parallelPaths[i-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

//             } else if(skippedIndicies.length === 4) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(i)
//                 console.log(" ")
//                 parallelPaths[i].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[i].svgElementObject.style("stroke", "green")
//             }
//             //FIXME: HARDCODED
//         }
//         else if(skippedIndicies.includes(i)) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(i)
//             console.log(" ")
//             parallelPaths[i].svgElementObject.style("stroke", "white")
//             //do nothing
//         }
//         else if(i === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(i)
//             console.log(" ")
//             parallelPaths[i].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
            
//             parallelPaths[i].svgElementObject.style("stroke", "green")
//         }
//         else {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(i)
//             console.log(" ")
//             parallelPaths[i].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))

//             parallelPaths[i].svgElementObject.style("stroke", "blue")
//         }
//     }
//     // PARALLEL PATH





//     // PARALLEL END POINTS //FIXME: Do i need to apply skipper to these??
//     let endPoints = figure.svgEndPoints
//     let k = -1
//     for (let i = 0; i < parallelPaths.length; i++) {
//         for (let j = 0; j < parallelPathDatas[i].length; j++) {
//             k = k + 1
//             endPoints[k].svgElementObject
//                 .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
//         }
//     }
//     // PARALLEL END POINTS
// }









    























    // function updateSVG_thisSvgParallelFigure(figure, iii, subFigureSkipperIndexModifiers) {
    // let parallelPathDatas = figure.parallelFigurePathDatas
    // let parallelPaths = figure.svgPaths.parallelPaths

    // // let newIII = iii - 1

    // let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    // let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
    // let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


    // for (let newIII = 0; newIII < parallelPaths.length; newIII++) {
    //     if(newIII === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
    //         //FIXME: HARDCODED
    //         if(skippedIndicies.length === 1) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_01")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+1][1]]))
    //             parallelPaths[newIII].svgElementObject.style("stroke", "red")

    //         } else if(skippedIndicies.length === 2) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_02")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
    //             parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
    //             // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
    //             //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
    //             // parallelPaths[newIII-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

    //         } else if(skippedIndicies.length === 3) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_03")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
    //             parallelPaths[newIII].svgElementObject.style("stroke", "yellow")

    //             // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
    //             //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
    //             // parallelPaths[newIII-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

    //         } else if(skippedIndicies.length === 4) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_04")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
    //             parallelPaths[newIII].svgElementObject.style("stroke", "green")
    //         }
    //         //FIXME: HARDCODED
    //     }
    //     else if(skippedIndicies.includes(newIII)) {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("THIS_IS_SKIPPED")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject.style("stroke", "white")
    //         //do nothing
    //     }
    //     else if(newIII === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("TELL_ME_NOW_IF_EVER_CALLED")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject
    //             .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))
            
    //         parallelPaths[newIII].svgElementObject.style("stroke", "green")
    //     }
    //     else {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("NORMAL_RUN")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject
    //             .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))

    //         parallelPaths[newIII].svgElementObject.style("stroke", "blue")
    //     }
    // }
    // // PARALLEL PATH


















//     function updateSVG_thisSvgParallelFigure(figure, iii, subFigureSkipperIndexModifiers) {
//     let parallelPathDatas = figure.parallelFigurePathDatas
//     let parallelPaths = figure.svgPaths.parallelPaths

//     let newIII = iii - 1
//     // let newIII = iii

//     let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
//     let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
//     let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


//     // for (let i = 0; i < parallelPaths.length; i++) {
//         if(newIII === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
//         // if(newIII === skippedIndicies[0] - 1 && !skippedIndicies.includes(newIII) ) { // Checks if i is equal to the index before the first skipped index
//             //FIXME: HARDCODED
//             if(skippedIndicies.length === 1) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_01")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+1][1]]))
//                     // .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII][1]]))
//                 parallelPaths[newIII].svgElementObject.style("stroke", "red")

//             } else if(skippedIndicies.length === 2) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_02")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
//                 parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
//                 // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 // parallelPaths[newIII-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only


//                 // NEWNENW
//                 // parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII][1], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
//                 // parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
//                 // NEWNENW

//             } else if(skippedIndicies.length === 3) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_03")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[newIII].svgElementObject.style("stroke", "yellow")

//                 // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 // parallelPaths[newIII-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))


//                 // // NEWNENW
//                 // parallelPaths[newIII].svgElementObject
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII][1], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 // parallelPaths[newIII].svgElementObject.style("stroke", "yellow")
//                 // // NEWNENW

//             } else if(skippedIndicies.length === 4) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_04")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[newIII].svgElementObject.style("stroke", "green")
//             }
//             //FIXME: HARDCODED
//         }
//         else if(skippedIndicies.includes(newIII)) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("THIS_IS_SKIPPED")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII].svgElementObject.style("stroke", "white")
//             //do nothing
//         }
//         else if(newIII === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("TELL_ME_NOW_IF_EVER_CALLED")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))
            
//             parallelPaths[newIII].svgElementObject.style("stroke", "green")
//         }
//         else {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("NORMAL_RUN")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII-1].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[newIII-1][1], parallelPathDatas[newIII][0]]))

//             parallelPaths[newIII-1].svgElementObject.style("stroke", "blue")
//         }
//     // }
//     // PARALLEL PATH






//     // PARALLEL END POINTS //FIXME: Do i need to apply skipper to these??
//     let endPoints = figure.svgEndPoints
//     let k = -1
//     for (let i = 0; i < parallelPaths.length; i++) {
//         for (let j = 0; j < parallelPathDatas[i].length; j++) {
//             k = k + 1
//             endPoints[k].svgElementObject
//                 .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
//         }
//     }
//     // PARALLEL END POINTS
// }


// USE THIS TO FIGURE OUT HOW TO GET THIS UPDATED TO USING ORIGINALPATHDATAS
function updateSVG_thisSvgParallelFigure(figure, i) {
    let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
    let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update

    let newIII = i - 1
    let originalFigurePathDatas = figure.originalFigurePathDatas //FIXME: new way
    // this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    // this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east

    // //NOTOWKRING
    // // let prevPD = originalFigurePathDatas[newIII - 1].children.parallel_pathDatas.pathData_west
    // // let thisPD =  originalFigurePathDatas[newIII].children.parallel_pathDatas.pathData_east

    // let prevPD = originalFigurePathDatas[newIII + 1].children.parallel_pathDatas.pathData_west
    // let thisPD =  originalFigurePathDatas[newIII + 2].children.parallel_pathDatas.pathData_east

    // console.log("okokokokokokokok")
    // console.log("NEWWAY")
    // console.log(prevPD)
    // console.log(thisPD)
    // console.log("OLDWAY")
    // console.log(parallelPathDatas[i][0])
    // console.log(parallelPathDatas[i][1])
    // //NOTOWKRING


    // PARALLEL PATH
    // for (let i = 0; i < parallelPaths.length; i++) {
        console.log(" ")
        console.log("RUNNING")
        console.log(i)
        console.log(originalFigurePathDatas[i])
        console.log(" ")
        parallelPaths[i].svgElementObject //FIXME: old way, might need to update
            .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]])) //FIXME: old way, need to update AND might need to update describeComplexPath()
            // .attr('d', describeComplexPath([prevPD, thisPD])) //FIXME: old way, need to update AND might need to update describeComplexPath()
    // }
    // PARALLEL PATH

    // PARALLEL END POINTS
    let endPoints = figure.svgEndPoints
    let k = -1
    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
        }
    }
    // PARALLEL END POINTS
}


export {
    updateSVG_thisSvgFigure,
    updateSVG_thisSvgParallelFigure,
}