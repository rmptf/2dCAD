import {createDocument} from '../functions/canvas/canvas_document.js'
import {increaseScale, resetScale, decreaseScale} from '../functions/canvas/canvas_scale.js'
import {drawPath, addCurvePoint, addParallelPath, measurePath} from '../functions/draft/svgElementTools.js'

a_canvas_globalVars.scale = 1
a_canvas_globalVars.pressAddCurveButton = false
a_canvas_globalVars.pressAddParallelButton = false
a_canvas_globalVars.pressMeasurePathButton = false
a_canvas_globalVars.svg
a_canvas_globalVars.canvas
a_canvas_globalVars.dragDiv 
a_canvas_globalVars.svgHTML
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

a_canvas_functions.createDocument = createDocument
a_canvas_functions.increaseScale = increaseScale
a_canvas_functions.resetScale = resetScale
a_canvas_functions.decreaseScale = decreaseScale
a_canvas_functions.drawPath = drawPath
a_canvas_functions.addCurvePoint = addCurvePoint
a_canvas_functions.addParallelPath = addParallelPath
a_canvas_functions.measurePath = measurePath













// OTHER GLOBAL VARS
// // INSERT
// let scale
// let pressAddCurveButton = false
// let pressAddParallelButton = false
// let pressMeasurePathButton = false

// HMTL OBJECTS
// // INSERT
// let svg
// let canvas
// let dragDiv 
// let svgHTML

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