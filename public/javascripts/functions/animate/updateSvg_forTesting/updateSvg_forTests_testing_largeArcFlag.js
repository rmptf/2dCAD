import {calculateArcAndDescribePath, describeComplexPath} from '../../math/svgElementCalculations.js'
import {makeDeepCopy, transformData, findParallelDistance} from '../../drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js'
import {SvgGroup} from '../../../classes/components/DocumentSvg/SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'

let updateSVG_highlight_1_point_01_switches = [1,0]
let updateSVG_highlight_1_point_02_switches = [1,0]
let updateSVG_highlight_2_points_1_line_01_A_switches = [1,0]
let updateSVG_highlight_2_points_1_line_01_B_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_02_A_switches = [1,0]
let updateSVG_highlight_2_points_1_line_02_B_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches = [1,0]
let updateSVG_highlight_2_points_1_line_03_A_switches = [1,0]
let updateSVG_highlight_2_points_1_line_03_B_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03_switches = [1,0]
let updateSVG_highlight_2_points_1_line_04_A_switches = [1,0]
let updateSVG_highlight_2_points_1_line_04_B_switches = [1,0]
let updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04_switches = [1,0]


function updateSVG_highlight_1_point_01(coords, self) {
    if(updateSVG_highlight_1_point_01_switches[0] === 1) {
        if(updateSVG_highlight_1_point_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_01')
            updateSVG_highlight_1_point_01_switches[1] = 1
        }

        let point = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_01")

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}


function updateSVG_highlight_1_point_02(coords, self) {
    if(updateSVG_highlight_1_point_02_switches[0] === 1) {
        if(updateSVG_highlight_1_point_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--2 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_02')
            updateSVG_highlight_1_point_02_switches[1] = 1
        }

        let point = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_02")

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}




























function updateSVG_highlight_2_points_1_line_01_A(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_01_A_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_01_A_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_03')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_03')
            updateSVG_highlight_2_points_1_line_01_A_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_03")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_03")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_03")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_2_points_1_line_01_B(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_01_B_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_01_B_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_04')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_04')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_04')
            updateSVG_highlight_2_points_1_line_01_B_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_04")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_04")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_04")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path1--largeArcFlag-IDTAG_05')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path2--largeArcFlag-IDTAG_05')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path3--largeArcFlag-IDTAG_05')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--3 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--largeArcFlag-IDTAG_05')
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

        let path1 = d3.select("#intArcTEST--path1--largeArcFlag-IDTAG_05")
        let path2 = d3.select("#intArcTEST--path2--largeArcFlag-IDTAG_05")
        let path3 = d3.select("#intArcTEST--path3--largeArcFlag-IDTAG_05")
        let path4 = d3.select("#intArcTEST--path4--largeArcFlag-IDTAG_05")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}






















function updateSVG_highlight_2_points_1_line_02_A(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_02_A_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_02_A_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_06')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_06')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_06')
            updateSVG_highlight_2_points_1_line_02_A_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_06")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_06")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_06")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_2_points_1_line_02_B(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_02_B_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_02_B_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_07')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_07')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_07')
            updateSVG_highlight_2_points_1_line_02_B_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_07")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_07")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_07")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path1--largeArcFlag-IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path2--largeArcFlag-IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path3--largeArcFlag-IDTAG_08')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--3 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--largeArcFlag-IDTAG_08')
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

        let path1 = d3.select("#intArcTEST--path1--largeArcFlag-IDTAG_08")
        let path2 = d3.select("#intArcTEST--path2--largeArcFlag-IDTAG_08")
        let path3 = d3.select("#intArcTEST--path3--largeArcFlag-IDTAG_08")
        let path4 = d3.select("#intArcTEST--path4--largeArcFlag-IDTAG_08")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}


















//vv
function updateSVG_highlight_2_points_1_line_03_A(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_03_A_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_03_A_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_09')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_09')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_09')
            updateSVG_highlight_2_points_1_line_03_A_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_09")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_09")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_09")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}

//vvv
function updateSVG_highlight_2_points_1_line_03_B(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_03_B_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_03_B_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--5 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_10')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--5 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_10')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_10')
            updateSVG_highlight_2_points_1_line_03_B_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_10")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_10")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_10")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}

//vvvv
function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--2').attr('id', 'intArcTEST--path1--largeArcFlag-IDTAG_11')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--2 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'intArcTEST--path2--largeArcFlag-IDTAG_11')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--5').attr('id', 'intArcTEST--path3--largeArcFlag-IDTAG_11')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--5 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--largeArcFlag-IDTAG_11')
            updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03_switches[1] = 1
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

        let path1 = d3.select("#intArcTEST--path1--largeArcFlag-IDTAG_11")
        let path2 = d3.select("#intArcTEST--path2--largeArcFlag-IDTAG_11")
        let path3 = d3.select("#intArcTEST--path3--largeArcFlag-IDTAG_11")
        let path4 = d3.select("#intArcTEST--path4--largeArcFlag-IDTAG_11")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}



















function updateSVG_highlight_2_points_1_line_04_A(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_04_A_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_04_A_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_12')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_12')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_12')
            updateSVG_highlight_2_points_1_line_04_A_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_12")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_12")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_12")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_2_points_1_line_04_B(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_04_B_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_04_B_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt1--largeArcFlag-IDTAG_13')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--2 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--largeArcFlag-IDTAG_13')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--3 testElem-dashArray--5').attr('id', 'visualTest--path--largeArcFlag-IDTAG_13')
            updateSVG_highlight_2_points_1_line_04_B_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--largeArcFlag-IDTAG_13")
        let point2 = d3.select("#visualTest--intersectPt2--largeArcFlag-IDTAG_13")
        let path = d3.select("#visualTest--path--largeArcFlag-IDTAG_13")

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04(pathData, self) {
    if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04_switches[0] === 1) {
        if(updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04_switches[1] < 1) {
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path1--largeArcFlag-IDTAG_14')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--1 testElem-stroke-color--1 testElem-dashArray--none').attr('id', 'intArcTEST--path2--largeArcFlag-IDTAG_14')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--2 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path3--largeArcFlag-IDTAG_14')
            self.testEndPointGroup.append('path').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--3 testElem-stroke-color--2 testElem-dashArray--none').attr('id', 'intArcTEST--path4--largeArcFlag-IDTAG_14')
            updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04_switches[1] = 1
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

        let path1 = d3.select("#intArcTEST--path1--largeArcFlag-IDTAG_14")
        let path2 = d3.select("#intArcTEST--path2--largeArcFlag-IDTAG_14")
        let path3 = d3.select("#intArcTEST--path3--largeArcFlag-IDTAG_14")
        let path4 = d3.select("#intArcTEST--path4--largeArcFlag-IDTAG_14")

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))
    }
}






















export {
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,
    updateSVG_highlight_2_points_1_line_01_A,
    updateSVG_highlight_2_points_1_line_01_B,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01,
    updateSVG_highlight_2_points_1_line_02_A,
    updateSVG_highlight_2_points_1_line_02_B,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02,
    updateSVG_highlight_2_points_1_line_03_A,
    updateSVG_highlight_2_points_1_line_03_B,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03,
    updateSVG_highlight_2_points_1_line_04_A,
    updateSVG_highlight_2_points_1_line_04_B,
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04,
}