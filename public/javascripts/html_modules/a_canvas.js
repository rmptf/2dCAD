import {createSvgDocument} from '../functions/canvas/canvas_document.js'
import {increaseScale, resetScale, decreaseScale} from '../functions/canvas/canvas_scale.js'
import {selectDrawPath, selectAddCurvePoint, selectDrawParallelPath, selectMeasurePath} from '../functions/drafting/svgElementTools.js'
import {saveFigureData} from '../functions/tools/saveFigureData.js'
import {hotKeyPress} from '../functions/tools/hotKeys.js'

a_canvas_globalVars.scale = 1
a_canvas_globalVars.pressAddCurveButton = false
a_canvas_globalVars.pressAddParallelButton = false
a_canvas_globalVars.pressMeasurePathButton = false

a_canvas_globalVars.svgDocHTML  // previously dragDiv
a_canvas_globalVars.svgD3
a_canvas_globalVars.svgHTML
a_canvas_globalVars.canvasD3 = d3.select('#aCanvasZoomLayer')
a_canvas_globalVars.panHTML

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

a_canvas_functions.createSvgDocument = createSvgDocument
a_canvas_functions.increaseScale = increaseScale
a_canvas_functions.resetScale = resetScale
a_canvas_functions.decreaseScale = decreaseScale
a_canvas_functions.selectDrawPath = selectDrawPath
a_canvas_functions.selectAddCurvePoint = selectAddCurvePoint
a_canvas_functions.selectDrawParallelPath = selectDrawParallelPath
a_canvas_functions.selectMeasurePath = selectMeasurePath
a_canvas_functions.saveFigureData = saveFigureData

document.addEventListener("keydown", (event) => hotKeyPress(event))














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