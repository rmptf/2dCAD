import {Canvas} from '../Canvas/Canvas_Class.js'
import {Footer} from '../Footer/Footer_Class.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'

function ArtBoard(fakeVar) {
    this.dataHandler = new EjsModelDataHandler()

    this.handledData = this.dataHandler.ready.then(() => {
        console.log("1111")
        console.log(this.dataHandler.modelData)
        return this.dataHandler.modelData
    })
    this.processedData = this.dataHandler.ready.then(() => {
        console.log("2222")
        console.log(this.dataHandler.processedData)
        return this.dataHandler.processedData
    })

    console.log('3333')
    console.log(this)
}

export {
    ArtBoard
}