import {calculateArcAndDescribePath, describeComplexPath} from '../../math/svgElementCalculations.js'
import {makeDeepCopy, transformData, findParallelDistance} from '../../drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js'

let updateSVG_highlight_1_point_01_switches = [1,0]
let updateSVG_highlight_1_point_02_switches = [1,0]
let updateSVG_highlight_2_points_1_line_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_02_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_03_switches = [1,0]
let updateSVG_highlight_2_points_1_line_04_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches = [1,0]


function updateSVG_highlight_1_point_01(coords, self) {
    if(updateSVG_highlight_1_point_01_switches[0] === 1) {
        if(updateSVG_highlight_1_point_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_01')
            updateSVG_highlight_1_point_01_switches[1] = 1
        }

        let point = d3.select("#visualTest--intersectPt1--IDTAG_01")

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}


function updateSVG_highlight_1_point_02(coords, self) {
    if(updateSVG_highlight_1_point_02_switches[0] === 1) {
        if(updateSVG_highlight_1_point_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--2 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_05')
            updateSVG_highlight_1_point_02_switches[1] = 1
        }

        let point = d3.select("#visualTest--intersectPt1--IDTAG_05")

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}







function updateSVG_highlight_2_points_1_line_01(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_01_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--IDTAG_02')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--IDTAG_02')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_02')
            updateSVG_highlight_2_points_1_line_01_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_02")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_02")
        let path = d3.select("#visualTest--path--IDTAG_02")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_2_points_1_line_02(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_02_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--IDTAG_03')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_03')
            updateSVG_highlight_2_points_1_line_02_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_03")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_03")
        let path = d3.select("#visualTest--path--IDTAG_03")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path1--IDTAG_04')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path2--IDTAG_04')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path3--IDTAG_04')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--3 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--IDTAG_04')
            updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches[1] = 1
        }

        // GREEN
        let pathData1 = makeDeepCopy(pathData)
        pathData1[1].arc.arcFlag = 1
        pathData1[1].arc.sweepFlag = 0
        // PINK
        let pathData2 = makeDeepCopy(pathData)
        pathData2[1].arc.arcFlag = 1
        pathData2[1].arc.sweepFlag = 1
        // NAVY
        let pathData3 = makeDeepCopy(pathData)
        pathData3[1].arc.arcFlag = 0
        pathData3[1].arc.sweepFlag = 1
        // 
        let pathData4 = makeDeepCopy(pathData)
        pathData4[1].arc.arcFlag = 0
        pathData4[1].arc.sweepFlag = 0

        let path1 = d3.select("#intArcTEST--path1--IDTAG_04")
        let path2 = d3.select("#intArcTEST--path2--IDTAG_04")
        let path3 = d3.select("#intArcTEST--path3--IDTAG_04")
        let path4 = d3.select("#intArcTEST--path4--IDTAG_04")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}












function updateSVG_highlight_2_points_1_line_03(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_03_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_03_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--IDTAG_06')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--IDTAG_06')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_06')
            updateSVG_highlight_2_points_1_line_03_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_06")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_06")
        let path = d3.select("#visualTest--path--IDTAG_06")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_2_points_1_line_04(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_04_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_04_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--IDTAG_07')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--IDTAG_07')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_07')
            updateSVG_highlight_2_points_1_line_04_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_07")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_07")
        let path = d3.select("#visualTest--path--IDTAG_07")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path1--IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path2--IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path3--IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--3 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--IDTAG_08')
            updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches[1] = 1
        }

        // GREEN
        let pathData1 = makeDeepCopy(pathData)
        pathData1[1].arc.arcFlag = 1
        pathData1[1].arc.sweepFlag = 0
        // PINK
        let pathData2 = makeDeepCopy(pathData)
        pathData2[1].arc.arcFlag = 1
        pathData2[1].arc.sweepFlag = 1
        // NAVY
        let pathData3 = makeDeepCopy(pathData)
        pathData3[1].arc.arcFlag = 0
        pathData3[1].arc.sweepFlag = 1
        // 
        let pathData4 = makeDeepCopy(pathData)
        pathData4[1].arc.arcFlag = 0
        pathData4[1].arc.sweepFlag = 0

        let path1 = d3.select("#intArcTEST--path1--IDTAG_08")
        let path2 = d3.select("#intArcTEST--path2--IDTAG_08")
        let path3 = d3.select("#intArcTEST--path3--IDTAG_08")
        let path4 = d3.select("#intArcTEST--path4--IDTAG_08")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}



export {
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,
    updateSVG_highlight_2_points_1_line_01,
    updateSVG_highlight_2_points_1_line_02,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01,
    updateSVG_highlight_2_points_1_line_03,
    updateSVG_highlight_2_points_1_line_04,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02,
}