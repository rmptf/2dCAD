function ReferenceLayer(canvasData) {
    // this.canvasElement = canvasData.A_CANVAS.elements.elementData.element
    // this.documentTemplateContent = canvasData.A_CANVAS.elements.contentElementsData[3].element.content

    this.canvasElement = document.getElementById('aCanvas_01')
    this.documentTemplateContent = document.getElementById('aCanvasTemplate_02').content

    this.cloneAndAppendTemplate(this.documentTemplateContent, this.canvasElement)


    // this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)
    // this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[1].id)
    // this.documentSvg_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[2].id)
    // this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
}

export {
    ReferenceLayer
}

ReferenceLayer.prototype.cloneAndAppendTemplate = function(templateElement, targetElement) {
    targetElement.appendChild(document.importNode(templateElement, true))
}