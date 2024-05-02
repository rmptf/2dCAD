import {SvgEndPoint} from '../SvgEndPoint_Class.js'
import {removeEndPointFunction} from '../../../../DocumentSvg_functions/endPoint_functions/endPointHandler_NEW.js'

function SvgEndPointPrimary(parentFigure, parentElement, actionStates, pathData, index) {
    this.ENDPOINT_CLASS = 'primaryEndPoint'
    this.ENDPOINT_CURVE_CLASS = 'primaryEndPoint_curve'
    SvgEndPoint.call(this, parentFigure, parentElement, actionStates, pathData, index)
}

SvgEndPointPrimary.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointPrimary.prototype.constructor = SvgEndPointPrimary

SvgEndPointPrimary.prototype.createSvgEndPoint = function(index) {
    let newEndPointPrimary = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointPrimary.node().classList.add(this.ENDPOINT_CLASS)
    if(this.pathData.arc.exist === true) {
        newEndPointPrimary.node().classList.add(this.ENDPOINT_CURVE_CLASS)
    }
    return newEndPointPrimary
}

SvgEndPointPrimary.prototype.elementClick = function(event, actionStates) {
    // console.log('primaryEndPoint clicked.')
    // this.changeEndPointCurveClass()
    console.log(this.pathData.arc.exist)

    if(actionStates.addEndPointActive === false && actionStates.addEndPointActive_curve === false && actionStates.removeEndPointActive === false && actionStates.drawParallelPathAcive === false && actionStates.measurePathActive === false) {
        console.log('EndPoint path clicked, all EndPoint click functions off.')
    } else if(actionStates.removeEndPointActive === true) {
        console.log('Remove EndPoint = true')
        removeEndPointFunction(event, this)
        actionStates.removeEndPointActive = false
    }
}

SvgEndPointPrimary.prototype.changeEndPointCurveClass = function() {
    let eleClassList = this.svgElementObject.node().classList
    let classListArray = Array.from(eleClassList)
    if(!classListArray.includes(this.ENDPOINT_CURVE_CLASS)) {
        eleClassList.add(this.ENDPOINT_CURVE_CLASS)
    } else {
        eleClassList.remove(this.ENDPOINT_CURVE_CLASS)
    }
}
SvgEndPointPrimary.prototype.addEndPointCurveClass = function() {
    let eleClassList = this.svgElementObject.node().classList
    eleClassList.add(this.ENDPOINT_CURVE_CLASS)
}
SvgEndPointPrimary.prototype.removeEndPointCurveClass = function() {
    let eleClassList = this.svgElementObject.node().classList
    eleClassList.remove(this.ENDPOINT_CURVE_CLASS)

}

export {
    SvgEndPointPrimary
}