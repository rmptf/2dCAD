import {Canvas} from '../Canvas/Canvas_Class.js'
import {Footer} from '../Footer/Footer_Class.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'

function ArtBoard(fakeVar) {
    this.fakeVar = fakeVar
    this.dataHandler = new EjsModelDataHandler()
    this.modelData = null

    this.dataHandler.grabModelDataFromAPI().then(data => {
        this.modelData = data
        console.log("ArtBoard")
        console.log(this.modelData)
        // run create new classes at this point
    })
}

export {
    ArtBoard
}