import {SvgElement} from '../../SvgElement_Class.js'

function SvgElement_DocumentSvg() {
    SvgElement.call(this)
}

SvgElement_DocumentSvg.prototype = Object.create(SvgElement.prototype)
SvgElement_DocumentSvg.prototype.constructor = SvgElement_DocumentSvg

SvgElement_DocumentSvg.prototype.function = function() {
}

export {
    SvgElement_DocumentSvg
}