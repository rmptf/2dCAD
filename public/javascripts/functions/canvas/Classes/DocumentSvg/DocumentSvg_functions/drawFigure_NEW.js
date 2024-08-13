import {DocumentSvg} from '../DocumentSvg_Class.js'
import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {svg_expandSvgElementOnMouseMove_NEW, getElementPositionDataNEW} from './resizeSvg_NEW.js'

function drawNewFigure(event, DocSvg, CanvDoc) {
    let m111 = d3.pointer(event)
    let documentSvgFigures = DocSvg.documentSvgFigures
    let pathDrawingData = DocSvg.pathDrawingData
    let documentSvgD3 = CanvDoc.documentSvg_D3Element
    let actionStates = CanvDoc.actionStates
    pathDrawingData.m1 = d3.pointer(event)
    documentSvgD3.on("dblclick", () => svg_dblClick(documentSvgD3, actionStates, pathDrawingData, pathDrawingData.currentFigure))
    if(pathDrawingData.isDown === false) {
        // let newFigure = new SvgFigure(documentSvgD3, actionStates)
        // documentSvgFigures.push(newFigure)
        let newFigure = DocSvg.createFigure()
        pathDrawingData.currentFigure = newFigure
        let firstPathData = newFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        let secondPathData = newFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
        newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], 0)
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], firstPathData, 0)
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], secondPathData, 0)

        let posData = getElementPositionDataNEW(newFigure, CanvDoc)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, newFigure), svg_expandSvgElementOnMouseMove_NEW(event, m111, newFigure, CanvDoc, posData)})

        newFigure.figure_updateSvg()
        pathDrawingData.isDown = true
    } else {
        console.log("isDown_true")
        let thisFigure = pathDrawingData.currentFigure
        let index = thisFigure.svgPathDatas.length
        let additionalPathData = thisFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        thisFigure.createPath_secondary(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index - 1)
        thisFigure.createPrimaryEndPoint(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index)

        let posData = getElementPositionDataNEW(thisFigure, CanvDoc)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, thisFigure), svg_expandSvgElementOnMouseMove_NEW(event, m111, thisFigure, CanvDoc, posData)})

        thisFigure.figure_updateSvg()
    }
}

function drawFigureFromData(figureData, documentSvg, documentSvgD3, actionStates) {
    let scaleValue = documentSvg.scaleValue.scaleLevel
    let panCanvas = documentSvg.panElement
    let canvasDocument = documentSvg.canvDocHtmlElement
    let documentSvgElement = documentSvg.HtmlElement
    let documentSvgFigures = documentSvg.documentSvgFigures
    let documentGroup = documentSvg.documentSvgGroup.newSvgGroup
    let newFigure = new SvgFigure(documentSvg)

    console.log(canvasDocument)






    let passedDatas = JSON.parse(figureData)
    let pathDatas
    // check if the passed data is in the "old" saved shape form or the new
    if (passedDatas?.shapeData) {
        pathDatas = passedDatas.shapeData


        // // GRAB DATA FROM SAVED FIGURE
        // let mainPathData = passedDatas.shapeData
        // let svgDocPosition = passedDatas.svgDocPosition
        // let svgDimensions = passedDatas.svgDimensions

        // // SET HTML ELEMENTS POSITION & DIMENSIONS
        // // Set dragDiv position on canvas
        // // documentSvgElement.style.top = svgDocPosition.dragDivTop
        // // documentSvgElement.style.left = svgDocPosition.dragDivLeft
        // // canvDocHtmlElement.style.top = svgDocPosition.dragDivTop
        // // canvDocHtmlElement.style.left = svgDocPosition.dragDivLeft
        // canvDocHtmlElement.style.top = '2000px'
        // canvDocHtmlElement.style.left = '2000px'
        // // Set SVG dimensions
        // documentSvgElement.style.height = svgDimensions.height
        // documentSvgElement.style.width = svgDimensions.width



    } else {
        pathDatas = passedDatas
    }




    documentSvgFigures.push(newFigure)
    newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
    for (let i = 0; i < pathDatas.length; i++) {
        let pathData = newFigure.createPathData_savedData(pathDatas[i])
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], pathData, i)
        if(i !== pathDatas.length - 1) {
            newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], i)
        }
    }

    newFigure.figure_updateSvg()






    // Set documentSvgElement size to fit the PrimarySvgGroup
    // Get the documentGroup bounding box
    let documentGroupBBox = documentGroup.node().getBBox()
    // Set extra area around documentGroup
    let svgGroupBubble = 200
    // Set the documentSvgElement to the new size
    documentSvgElement.style.height = documentGroupBBox.height + svgGroupBubble
    documentSvgElement.style.width = documentGroupBBox.width + svgGroupBubble

    // Place canvasDocument in center of panCanvas
    // Get the panCanvas bounding rectangle
    let panCanvasRect = panCanvas.getBoundingClientRect()
    // Get the canvasDocument bounding rectangle
    let canvasDocRect = canvasDocument.getBoundingClientRect()
    // Calculate the panCanvas dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
    let panCanvasScaledWidthCenter = (panCanvasRect.width / scaleValue) / 2
    let panCanvasScaledHeightCenter = (panCanvasRect.height / scaleValue) / 2
    // Calculate the canvasDocument dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
    let canvDocScaledWidthCenter = (canvasDocRect.width / scaleValue) / 2
    let canvDocScaledHeightCenter =  (canvasDocRect.height / scaleValue) / 2





    //If panCanvas has been panned, find the amount needed to offset the canvasDoc to keep it in the center of the window
    let topPosition = panCanvas.offsetTop
    let leftPosition = panCanvas.offsetLeft
    let offsettop = 0
    let offsetleft = 0
    // let offsettop = (topPosition + (2500 * scaleValue)) / 2
    // let offsetleft = (leftPosition + (2500 * scaleValue)) / 2
    // let offsettop = ((topPosition / scaleValue) + 2500) / 2
    // let offsetleft = ((leftPosition / scaleValue) + 2500) / 2
    // let offsettop = topPosition + (2500 * scaleValue)
    // let offsetleft = leftPosition + (2500 * scaleValue)
    // let offsettop = topPosition + 2500
    // let offsetleft = leftPosition + 2500
    


    console.log("oskdfosdkfoskf")
    console.log(offsettop)
    console.log(offsetleft)
    console.log(scaleValue)





    // Find the distance to move the canvasDocument by subtracting its center dimensions from the panCanvas dimensions
    let movetoleft = panCanvasScaledWidthCenter - canvDocScaledWidthCenter - offsetleft
    let movetotop = panCanvasScaledHeightCenter - canvDocScaledHeightCenter - offsettop
    // Set the Svg Element to the new Size
    canvasDocument.style.top = movetotop + 'px'
    canvasDocument.style.left = movetoleft + 'px'


}

function drawDocumentSvgAllFiguresFromData(figuresData, documentSvg, documentSvgD3, actionStates) {
    let documentSvgFigures = documentSvg.documentSvgFigures
    let figures = JSON.parse(figuresData)
    for (let i = 0; i < figures.length; i++) {
        let newFigure = new SvgFigure(documentSvg)
        let pathDatas = figures[i]
        documentSvgFigures.push(newFigure)
        newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
        for (let j = 0; j < pathDatas.length; j++) {
            let pathData = newFigure.createPathData_savedData(pathDatas[j])
            newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], pathData, j)
            if(j !== pathDatas.length - 1) {
                newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], j)
            }
        }
        newFigure.figure_updateSvg()
    }
}

// place this function in documentSvg class
function svg_mouseMove(event, isDown, figure) {
    let m2 = d3.pointer(event)
    if(isDown === true) {
        figure.svgPathDatas.at(-1).coords.x = m2[0]
        figure.svgPathDatas.at(-1).coords.y = m2[1]
        figure.figure_updateSvg()
    }
}

// place this function in documentSvg class
function svg_dblClick(documentSvgD3, actionStates, pathDrawingData, thisFigure) {
    console.log("FINISH_DRAW")
    documentSvgD3.on("dblclick", null) // need to also turn off drawPathInit
    documentSvgD3.on("mousemove", null)
    actionStates.drawPathActive = false
    pathDrawingData.isDown = false
    pathDrawingData.currentFigure = null

    // remove last elements from dbl click
    for (let i = 0; i < 2; i++) {
        // pathdatas
        thisFigure.svgPathDatas.pop() // remove last pathData class
        // secondaryPath
        thisFigure.svgPaths.secondaryPaths.at(-1).svgElementObject.remove() // remove last secondaryPath svgElementObject
        thisFigure.svgPaths.secondaryPaths.pop() // remove last secondaryPath class
        // endPoints
        thisFigure.svgEndPoints.at(-1).svgElementObject.remove() // remove last endPoint svgElementObject
        thisFigure.svgEndPoints.pop() // remove last endPoint class

        thisFigure.figure_updateSvg()
    }
    // remove last element from click other svg
    // ...
}

export {
    drawNewFigure,
    drawFigureFromData,
    drawDocumentSvgAllFiguresFromData
}