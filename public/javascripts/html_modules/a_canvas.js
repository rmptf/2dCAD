import {cloneDragDivs, svgElementClick, setSvg} from '../functions/dragDiv.js'
import {increaseScale, resetScale, decreaseScale} from '../functions/scaleCanvas.js'
import {drawPath} from '../functions/drawPath.js'
// import {setSvg} from '../functions/setSvg.js'

// HMTL OBJECTS
// // INSERT
// let svg
// let canvas
// let dragDiv 
// let svgHTML

// GLOBAL
a_canvas_globalVars.svg
a_canvas_globalVars.canvas
a_canvas_globalVars.dragDiv 
a_canvas_globalVars.svgHTML

// DATA, SVG ELEMENTS, COUNTERS
// // INSERT
// let originalFigure_data_pathDatas_array_GLOBAL = []                    // Data                         originalFigure_data_pathDatas_array_GLOBAL
// let originalFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 originalFigure_svgElements_paths_array_GLOBAL
// let originalFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 originalFigure_svgElements_endPoints_array_GLOBAL
// let originalFigure_counter_groupCount_GLOBAL = -1                      // Counter                      originalFigure_counter_groupCount_GLOBAL
// // ORIGINAL FIGURE SecondaryPaths
// let secondaryFigure_svgElements_paths_array_GLOBAL = []                // SVG Elements                 secondaryFigure_svgElements_paths_array_GLOBAL
// // PARALLEL FIGURE
// let parallelFigure_data_pathDatas_array_GLOBAL = []                    // Data                         parallelFigure_data_pathDatas_array_GLOBAL
// let parallelFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 parallelFigure_svgElements_paths_array_GLOBAL
// let parallelFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 parallelFigure_svgElements_endPoints_array_GLOBAL
// let parallelFigure_counter_groupCount_GLOBAL = -1                      // Counter                      parallelFigure_counter_groupCount_GLOBAL
// let parallelFigure_counter_currentCount_GLOBAL = 0                     // Counter                      parallelFigure_counter_currentCount_GLOBAL
// let parallelFigure_counter_groups_array_GLOBAL = []                    // Array of Counters            parallelFigure_counter_groups_array_GLOBAL

// GLOBAL
// ORIGINAL FIGURE
a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL = []                    // Data                         originalFigure_data_pathDatas_array_GLOBAL
a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 originalFigure_svgElements_paths_array_GLOBAL
a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 originalFigure_svgElements_endPoints_array_GLOBAL
a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = -1                      // Counter                      originalFigure_counter_groupCount_GLOBAL
// ORIGINAL FIGURE SecondaryPaths
a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL = []                // SVG Elements                 secondaryFigure_svgElements_paths_array_GLOBAL
// PARALLEL FIGURE
a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL = []                    // Data                         parallelFigure_data_pathDatas_array_GLOBAL
a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 parallelFigure_svgElements_paths_array_GLOBAL
a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 parallelFigure_svgElements_endPoints_array_GLOBAL
a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = -1                      // Counter                      parallelFigure_counter_groupCount_GLOBAL
a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = 0                     // Counter                      parallelFigure_counter_currentCount_GLOBAL
a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL = []                    // Array of Counters            parallelFigure_counter_groups_array_GLOBAL

a_canvas_globalVars.pressAddCurveButton = false
a_canvas_globalVars.pressAddParallelButton = false
a_canvas_globalVars.pressMeasurePathButton = false




a_canvas_functions.cloneDragDivs = cloneDragDivs
a_canvas_functions.svgElementClick = svgElementClick
a_canvas_functions.setSvg = setSvg
a_canvas_functions.increaseScale = increaseScale
a_canvas_functions.resetScale = resetScale
a_canvas_functions.decreaseScale = decreaseScale
a_canvas_functions.drawPath = drawPath

// elementBtnOnClick: "svgElementClick(this), setSvg(this.id, this.children[4].id), 'aCanvasZoomLayer'",
// a_canvas_functions.setSvg = setSvgs



