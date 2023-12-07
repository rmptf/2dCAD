// can probaby just place this insde dragDiv.js now that its setting global vars
function setSvg(dragDivId, svgId, canvasId){
    a_canvas_globalVars.svg = d3.select('#' + svgId)
    a_canvas_globalVars.canvas = d3.select('#' + canvasId)
    a_canvas_globalVars.dragDiv = document.getElementById(dragDivId)
    a_canvas_globalVars.svgHTML = document.getElementById(svgId)
}

export {
    setSvg
}