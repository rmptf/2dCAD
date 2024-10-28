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

function updateSVG_thisSvgParallelFigure(figure) {
    let parallelPathDatas = figure.parallelFigurePathDatas
    let parallelPaths = figure.svgPaths.parallelPaths

    // PARALLEL PATH
    for (let i = 0; i < parallelPaths.length; i++) {
        parallelPaths[i].svgElementObject
            .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
    }
    // PARALLEL PATH

    // PARALLEL END POINTS
    let endPoints = figure.svgEndPoints
    let k = -1
    // let p = parallelPaths.length + 1
    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            // p = p - 1
            console.log('start')
            console.log('length')
            console.log(parallelPaths.length)
            console.log('lenthcount')
            console.log(i)
            console.log('data count')
            console.log(j)
            console.log('endpoint')
            console.log(k)
            // console.log(p)
            console.log('end')
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

            console.log('coords')
            console.log(parallelPathDatas[i][j].coords)
            // if(!isEven(i)) {
            //     // p = p - 1
            //     endPoints[p].svgElementObject
            //     .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
            // } else {
            //     // k = k + 1
            //     endPoints[k].svgElementObject
            //     .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
            // }
        }


        function isEven(number) {
            return number % 2 === 0;
          }
    }
    // PARALLEL END POINTS

    // let k = -1
    // for (let i = 0; i < parallelPathsArray.length; i++) {
    //     for (let j = 0; j < parallelPathData[i].length; j++) {
    //         k = k + 1
    //         let endPoint1 = d3.select(parallelEndPointsArray[k]._groups[0][0])
    //         endPoint1.attr('cx', parallelPathData[i][j].coords.x).attr('cy', parallelPathData[i][j].coords.y)
    //             // .style('r', 5)
    //     }
    // }


}

export {
    updateSVG_thisSvgFigure,
    updateSVG_thisSvgParallelFigure,
}