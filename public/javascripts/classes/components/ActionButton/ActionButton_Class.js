function ActionButton(id, clickEventFunction, clickEventPass) {
    
    this.button = document.getElementById(id)
    // this.addClickEvent(clickEventFunction, clickEventPass)

    console.log(id)
}

ActionButton.prototype.addClickEvent = function(passFunction, passData) {
    this.button.onclick = function() {
        clickEventFunction(passFunction, passData)
    }
}

export {
    ActionButton
}