import {handleMainPathClick, handleSecondaryPathClick, handleMainPathDrag, handleEndPointDrag, handleExpandSvg} from '../canvas/svgDocument_actions.js'
import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
import {getElementPositionData} from '../drafting/resizeSvg.js'
import {updateSVG_highlight_1_point_01} from '../animate/updateSvg_forTesting/updateSvg_forTests.js'

function drawPathFunction(event, obj, thisSvgHTML, thisSvgDocHTML, thisSvgD3) {
    thisSvgD3.on("dblclick", () => finishDrawPath(obj, thisSvgD3, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, true))
    obj.m1 = d3.pointer(event)

    if (obj.isDown === false) {
        obj.originalFigureCount = obj.originalFigureCount + 1 
        console.log("counter_22")
        console.log(obj.originalFigureCount)

        let thisPathCount = 0
        a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL + 1
        let figureCount
        figureCount = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL

        createSvgGroups(obj.self, ['figureGroup', 'mainPathGroup', 'secondaryPathGroup', 'endPointGroup', 'testEndPointGroup'])

        // PARALLEL GROUPS
        a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL.push(0)
        a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL.push([])
        a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL.push([])
        a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
        // PARALLEL GROUPS

        // MAIN PATH
        let newMainPath = obj.self.mainPathGroup
            .append('path')
            .attr('class', 'path mainPath')
            .on("click", (event) => handleMainPathClick(event, figureCount, obj.isDown2, obj.self))
            .call(d3.drag().on("drag", (event) => handleMainPathDrag(event, figureCount)))
        a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL.push(newMainPath)
        let newPathData1 = rawPathData(obj.m1), newPathData2 = rawPathData(obj.m1)
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL.push([newPathData1, newPathData2])
        // MAIN PATH

        // SECONDARY PATH
        let secondaryPathGroup = []
        let newSecondaryPath = obj.self.secondaryPathGroup
            .append('path')
            .attr('class', 'path secondaryPath')
            .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
        secondaryPathGroup.push(newSecondaryPath)
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
        // SECONDARY PATH

        // END POINTS
        let endPointGroup = []
        let newEndPoint1 = obj.self.endPointGroup
            .append('circle')
            .attr('class', 'endPoint mainEndPoint')
            .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 0, figureCount)}))
        let newEndPoint2 = obj.self.endPointGroup
            .append('circle')
            .attr('class', 'endPoint mainEndPoint')
            .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 1, figureCount)}))
        endPointGroup.push(newEndPoint1, newEndPoint2)
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPointGroup)
        // END POINTS

        let elementPositionData = getElementPositionData(thisSvgHTML, thisSvgDocHTML, a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount])
        thisSvgD3.on("mousemove", (event) => {event, handleExpandSvg(event, obj.m1, obj.isDown, elementPositionData, thisSvgHTML, thisSvgDocHTML, figureCount)})

        updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])

        obj.isDown = true
    } else {
        
        console.log("self")
        console.log(obj.self)
        console.log("global")
        console.log(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL)


        // console.log("secondclick")
        // console.log(" ")
        let figureCount = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL
        obj.secondaryPathCount = obj.secondaryPathCount + 1
        let thisPathCount = obj.secondaryPathCount
        let endPointCount = obj.secondaryPathCount + 1

        // MAIN PATH
        let newPathData = rawPathData(obj.m1)
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newPathData)
        // MAIN PATH

        // SECONDARY PATH
        let newSecondaryPath = obj.self.secondaryPathGroup
            .append('path')
            .attr('class', 'path secondaryPath')
            .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newSecondaryPath)
        // SECONDARY PATH

        // END POINTS
        let newEndPoint = obj.self.endPointGroup
            .append('circle')
            .attr('class', 'endPoint mainEndPoint')
            .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
            .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, endPointCount, figureCount)}))
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newEndPoint)
        // END POINTS

        let elementPositionData = getElementPositionData(thisSvgHTML, thisSvgDocHTML, a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount])
        thisSvgD3.on("mousemove", (event) => {event, handleExpandSvg(event, obj.m1, obj.isDown, elementPositionData, thisSvgHTML, thisSvgDocHTML, figureCount)})

        updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
    }
}

function finishDrawPath(obj, thisSvgD3, figureCount, chkr) {
    console.log("FINISH")

    thisSvgD3.on("click", null)
    thisSvgD3.on("dblclick", null)
    thisSvgD3.on("mousemove", null)
    a_canvas_globalVars.pressSvgElement = false
    obj.isDown = false
    obj.secondaryPathCount = 0

    if(chkr === true) {
        for (let i = 0; i < 2; i++) {
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].pop()
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].at(-1).remove()
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].pop()
            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].at(-1).remove()
            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].pop()
        }
    } else {
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].pop()
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].at(-1).remove()
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].pop()
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].at(-1).remove()
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].pop()
    }

    updateSVG_mainPathAndPoints(
        a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
        )
}

let rawPathData = (mouseData) => {return {coords: {x: mouseData[0], y: mouseData[1]}, arc: {exist: false}}}

function createSvgGroups(self, groupClassNamesArray) {
    const groupNames = groupClassNamesArray
    self.group = a_canvas_globalVars.svgD3
        .append('g')
        .attr('class', groupNames[0])
        .attr('id', 'figureGroup123')
    groupNames.slice(1).forEach(name => {
        self[name] = self.group
            .append('g')
            .attr('class', name)
    })
}

export {
    drawPathFunction,
    createSvgGroups,
    finishDrawPath
}