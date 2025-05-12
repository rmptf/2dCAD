import {Canvas} from '../Canvas/Canvas_Class.js'
import {Footer} from '../Footer/Footer_Class.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'

function ArtBoard() {
    this.dataHandler = new EjsModelDataHandler()
    this.handledData = this.dataHandler.ready.then(() => {
        return this.dataHandler.modelData
    })
    this.processedData = this.dataHandler.ready.then(() => {
        let aCanvasData = this.dataHandler.findModuleDataFromProcessedData('A_CANVAS', this.dataHandler.processedData)
        let aFooterData = this.dataHandler.findModuleDataFromProcessedData('B_FOOTER', this.dataHandler.processedData)
        let aDocumentData = this.dataHandler.findModuleDataFromProcessedData('A_DOCUMENT', this.dataHandler.processedData)
        let bDocumentData = this.dataHandler.findModuleDataFromProcessedData('B_DOCUMENT', this.dataHandler.processedData)
        let canvas = new Canvas(aCanvasData, bDocumentData)
        // let canvas = new Canvas(aCanvasData)
        new Footer(canvas, canvas.canvScaleClass, aCanvasData, aFooterData, aDocumentData)
    })
}

export {
    ArtBoard
}