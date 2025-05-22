function ReferenceLayer() {
    // ReferenceLayer Class:
    this.canvasElement = document.getElementById('aCanvas_01') //TODO: try to make not hardcoded
    this.documentTemplateContent = document.getElementById('aCanvasTemplate_02') //TODO: try to make not hardcoded
    this.referenceLayerElement = this.cloneAndAppendTemplate_ReferenceLayer(this.documentTemplateContent, this.canvasElement)
    this.referenceLayerUIElements = {optionSelects: []}

    // ReferenceLayer Children Classes:
    // OprionSelect:
    this.referenceLayerSlot = this.referenceLayerElement.querySelector("#bDocumentBodyContOOO")
    this.documentTemplateContent = this.referenceLayerElement.parentElement.parentElement.querySelector("#bDocumentTemplate000_01")





    // this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)
    // this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[1].id)
    // this.documentSvg_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[2].id)
    // this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
}

export {
    ReferenceLayer
}

//ReferenceLayer Class
ReferenceLayer.prototype.cloneAndAppendTemplate_ReferenceLayer = function(templateElement, targetElement) {
    targetElement.appendChild(document.importNode(templateElement.content, true))
    let newElement = targetElement.lastElementChild.children[0].children[0]
    return newElement
}

ReferenceLayer.prototype.repositionReferenceLayer = function(repos) {
    //TODO: this resets the elements css positioning to 0 then starts from scratch. Find way to do it relative to where it currently is.
    this.referenceLayerElement.style.left = repos[0]+"px"
    this.referenceLayerElement.style.top = repos[1]+"px"
}

ReferenceLayer.prototype.changeReferenceLayerHeader = function(newTitle) {
    let referenceLayerHeader = this.referenceLayerElement.children[0]
    referenceLayerHeader.textContent = newTitle
}

ReferenceLayer.prototype.getSvgElement = function() {
    let svgElement = this.referenceLayerElement.children[1]
    return svgElement
}








//OptionSelect Class
ReferenceLayer.prototype.cloneAndAppendTemplate_OptionSelect = function(templateElement, targetElement) {
    let fragment = document.importNode(templateElement.content, true)
    let firstElement = fragment.firstElementChild
    targetElement.appendChild(fragment)

    return firstElement
}

ReferenceLayer.prototype.addOptionSelect = function(label) {
    let referenceElemensOptionSelects = this.cloneAndAppendTemplate_OptionSelect(this.documentTemplateContent, this.referenceLayerSlot)
    let textElement = referenceElemensOptionSelects.children[0].children[0].children[0]
    textElement.textContent = label
    this.referenceLayerUIElements.optionSelects.push(referenceElemensOptionSelects)

    return referenceElemensOptionSelects
}

ReferenceLayer.prototype.toggleCheckBox = function(activeElement) {
    let elementArray = this.referenceLayerUIElements.optionSelects
    // let checkBoxElement = activeElement.children[0].children[1].children[0]
    // checkBoxElement.classList.toggle("a-optionSelect__icon--active")
    // checkBoxElement.style.backgroundColor = 'yellow'


    // TODO: change that to this
    elementArray.forEach(element => {
        if (element === activeElement) {
            element.children[0].children[1].children[0].style.backgroundColor = 'black'
        } else {
            element.children[0].children[1].children[0].style.backgroundColor = 'transparent'
        }
    })
}