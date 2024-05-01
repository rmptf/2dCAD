// import {removeEndPointFunction} from '../../../DocumentSvg_functions/endPoint_functions/addEndPoint_NEW.js'
import {dragEndPoint} from '../SvgElement_functions/dragSvgElements_NEW.js'

function SvgEndPoint(parentFigure, parentElement, actionStates, pathData, index) {
    this.ELEMENT = 'circle'
    this.CLASSNAME = 'endPoint'

    this.parentFigure = parentFigure
    this.parentElement = parentElement
    this.actionStates = actionStates
    this.adjoiningSecondaryPaths = {
        first: null,
        second: null
    }
    this.pathData = pathData
    this.svgElementObject = this.createSvgEndPoint(index)
}

SvgEndPoint.prototype.createSvgEndPoint = function(index) {
    let newEndPoint = this.parentElement.insert(this.ELEMENT, ':nth-child(' + (index + 1) + ')') // D3.JS index's first pos as 1 (not 0) when using 'nth-child' so 1 is added to index
    // let newEndPoint = this.parentElement.append(this.ELEMENT)
        .attr('class', this.CLASSNAME)
        // .on("click", (event) => this.elementClick(event, this.actionStates, this.parentFigure, this.pathData))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
    return newEndPoint
}

SvgEndPoint.prototype.elementDrag = function(event, parentFigure, pathData, actionStates) {
    // console.log('EndPoint dragging.')
    dragEndPoint(event, parentFigure, pathData)
}

// SvgEndPoint.prototype.elementClick = function(event, actionStates, parentFigure, pathData,) {
//     if(actionStates.addEndPointActive === false && actionStates.addEndPointActive_curve === false && actionStates.removeEndPointActive === false && actionStates.drawParallelPathAcive === false && actionStates.measurePathActive === false) {
//         console.log('EndPoint path clicked, all EndPoint click functions off.')
//     } else if(actionStates.removeEndPointActive === true) {
//         console.log('Remove EndPoint = true')
//         removeEndPointFunction(this, event)
//         actionStates.removeEndPointActive = false
//     }
// }

export {
    SvgEndPoint
}



