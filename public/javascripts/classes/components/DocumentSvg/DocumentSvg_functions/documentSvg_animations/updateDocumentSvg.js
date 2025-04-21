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

function updateSVG_thisSvgParallelFigure(figure, i1, subFigureSkipperIndexModifiers) {
    let parallelPathDatas = figure.parallelFigurePathDatas
    //new
    let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
    let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0



    //FIXME: WORKING ON SKIPPING ELEMENTS THAT DONT HAVE TO BE ANIMATED
    // have got path working in very specific situations, have to build robustly
    // havent started working on end points (if needed?)
    // PARALLEL PATH
    let parallelPaths = figure.svgPaths.parallelPaths
    for (let i = 0; i < parallelPaths.length; i++) {
        console.log("LOOOOOOOPING")
        console.log(i)
        console.log(i1 - 1)
        console.log(skippedIndicies[0] - 1)


        //old (no skip)
        // parallelPaths[i].svgElementObject
        //     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))






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



        // if(skippedIndicies.includes(i)) {
        //     // console.log(parallelPathDatas[i])
        //     // console.log(parallelPathDatas[i + skippedIndicies.length - 1])
        //     parallelPaths[i].svgElementObject
        //         // .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i + currentSkippedIndex][1]]))
        //         .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i + 0][1]]))
        //     parallelPaths[i].svgElementObject.style("stroke", "red")
        // }

        //new (skip)
        // if(i === skippedIndicies - 1) {
        if(i === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
            // console.log("CHECKINGHERERERE")
            // console.log(currentSkippedIndex)
            // console.log(skippedIndicies[0] - 1)
            // console.log(i)

            // parallelPaths[i].svgElementObject
            //     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i + currentSkippedIndex][1]]))
            // parallelPaths[i].svgElementObject.style("stroke", "red")


            //FIXME: HARDCODED
            if(skippedIndicies.length === 1) {
            // if(skippedIndicies.length === 1 && i === i1 - 1) {
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RED")
                console.log("SkippedIndicies_NOT_ORDERED")
                console.log(skippedIndicies_NOT_ORDERED)
                console.log("SkippedIndicies")
                console.log(skippedIndicies)
                console.log("SkippedIndicies_Length")
                console.log(skippedIndicies.length)
                console.log("CurrentSkipped_Index")
                console.log(currentSkippedIndex)
                console.log("Index previous to first skipped index.")
                console.log(skippedIndicies[0] - 1)
                console.log("i")
                console.log(i)
                // console.log("pathDatas_A")
                // console.log(parallelPathDatas[i][0])
                // console.log(parallelPathDatas[i+1][1])
                // console.log("pathDatas_B")
                // console.log(parallelPathDatas[i-1][0])
                // console.log(parallelPathDatas[i-1][1])


                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
                parallelPaths[i].svgElementObject.style("stroke", "red")

            } else if(skippedIndicies.length === 2) {
            // } else if(skippedIndicies.length === 2 && i === i1 - 1) {
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("PINK")
                console.log("SkippedIndicies_NOT_ORDERED")
                console.log(skippedIndicies_NOT_ORDERED)
                console.log("SkippedIndicies")
                console.log(skippedIndicies)
                console.log("SkippedIndicies_Length")
                console.log(skippedIndicies.length)
                console.log("CurrentSkipped_Index")
                console.log(currentSkippedIndex)
                console.log("Index previous to first skipped index.")
                console.log(skippedIndicies[0] - 1)
                console.log("i")
                console.log(i)
                // console.log("pathDatas_A")
                // console.log(parallelPathDatas[i][0])
                // console.log(parallelPathDatas[i+2][1])
                // console.log("pathDatas_B")
                // console.log(parallelPathDatas[i-1][0])
                // console.log(parallelPathDatas[i-1][1])


                parallelPaths[i].svgElementObject // ((SHAPE AAAA)) and others
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
                parallelPaths[i].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
                // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
                //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
                // parallelPaths[i-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

            } else if(skippedIndicies.length === 3) {
            // } else if(skippedIndicies.length === 3 && i === i1 - 1) {
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("YELLOW")
                console.log("SkippedIndicies_NOT_ORDERED")
                console.log(skippedIndicies_NOT_ORDERED)
                console.log("SkippedIndicies")
                console.log(skippedIndicies)
                console.log("SkippedIndicies_Length")
                console.log(skippedIndicies.length)
                console.log("CurrentSkipped_Index")
                console.log(currentSkippedIndex)
                console.log("Index previous to first skipped index.")
                console.log(skippedIndicies[0] - 1)
                console.log("i")
                console.log(i)
                // console.log("pathDatas_A")
                // console.log(parallelPathDatas[i][0])
                // console.log(parallelPathDatas[i+3][1])
                // console.log("pathDatas_B")
                // console.log(parallelPathDatas[i-1][0])
                // console.log(parallelPathDatas[i-1][1])


                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                parallelPaths[i].svgElementObject.style("stroke", "yellow")

                // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
                //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
                // parallelPaths[i-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

            } else if(skippedIndicies.length === 4) {
            // } else if(skippedIndicies.length === 4 && i === i1 - 1) {
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("RUNNING")
                console.log("SkippedIndicies_NOT_ORDERED")
                console.log(skippedIndicies_NOT_ORDERED)
                console.log("SkippedIndicies")
                console.log(skippedIndicies)
                console.log("SkippedIndicies_Length")
                console.log(skippedIndicies.length)
                console.log("CurrentSkipped_Index")
                console.log(currentSkippedIndex)
                console.log("Index previous to first skipped index.")
                console.log(skippedIndicies[0] - 1)
                console.log("i")
                console.log(i)
                // console.log("pathDatas_A")
                // console.log(parallelPathDatas[i][0])
                // console.log(parallelPathDatas[i+4][1])
                // console.log("pathDatas_B")
                // console.log(parallelPathDatas[i-1][0])
                // console.log(parallelPathDatas[i-1][1])


                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                parallelPaths[i].svgElementObject.style("stroke", "green")
            }
            //FIXME: HARDCODED
        }
        // else if(i === skippedIndicies) {
        else if(skippedIndicies.includes(i)) {
            console.log("GUNNING")
            console.log("GUNNING")
            console.log("GUNNING")
            console.log("GUNNING")
            console.log("GUNNING")
            console.log("GUNNING")
            parallelPaths[i].svgElementObject.style("stroke", "white")
            //do nothing
        }
        // else if( i === skippedIndicies + 1) {
        else if(i === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
            console.log("FUNNING")
            console.log("FUNNING")
            console.log("FUNNING")
            console.log("FUNNING")
            console.log("FUNNING")
            console.log("FUNNING")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
            
            parallelPaths[i].svgElementObject.style("stroke", "green")
        }
        else {
            console.log("PUNNING")
            console.log("PUNNING")
            console.log("PUNNING")
            console.log("PUNNING")
            console.log("PUNNING")
            console.log("PUNNING")
            console.log("PUNNING")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))

            parallelPaths[i].svgElementObject.style("stroke", "blue")
        }

        //OLD NEW WAY
        // //new (skip)
        // if(i === skippedIndicies - 1) {
        //     parallelPaths[i].svgElementObject
        //         .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
        //     parallelPaths[i].svgElementObject.style("stroke", "red")
        // }
        // else if(i === skippedIndicies) {
        //     parallelPaths[i].svgElementObject.style("stroke", "white")
        //     //do nothing
        // }
        // else if( i === skippedIndicies + 1) {
        //     parallelPaths[i].svgElementObject
        //         .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
        //     parallelPaths[i].svgElementObject.style("stroke", "blue")
        // }
        // else {
        //     parallelPaths[i].svgElementObject
        //         .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
        //     parallelPaths[i].svgElementObject.style("stroke", "green")
        // }


    }
    // PARALLEL PATH

    //FIXME: Do i need to apply skipper to these??
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



// let parallelPathDatas = figure.parallelFigurePathDatas
//     //new
//     let skipper = subFigureSkipperIndexModifiers.subFigureIndex


//     //FIXME: WORKING ON SKIPPING ELEMENTS THAT DONT HAVE TO BE ANIMATED
//     // have got path working in very specific situations, have to build robustly
//     // havent started working on end points (if needed?)
//     // PARALLEL PATH
//     let parallelPaths = figure.svgPaths.parallelPaths
//     for (let i = 0; i < parallelPaths.length; i++) {
//         //old (no skip)
//         // parallelPaths[i].svgElementObject
//         //     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))

//         //new (skip)
//         if(i === skipper - 1) {
//             parallelPaths[i].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
//         }
//         else if(i === skipper) {
//             //do nothing
//         }
//         else if( i === skipper + 1) {
//             parallelPaths[i].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
//         }
//         else {
//             parallelPaths[i].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
//         }
//     }
