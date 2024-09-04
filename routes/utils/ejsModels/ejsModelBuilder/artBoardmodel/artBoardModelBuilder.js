const {Ejs_Model} = require('../../EjsModel_Class/EjsModel_Class.js')
const {MODEL_OBJECTS} = require('./artBoardModelObjects.js')

let ARTBOARDMODEL = new Ejs_Model(MODEL_OBJECTS.MODEL_OBJECT_01)
ARTBOARDMODEL.injectChildObjIntoParentObj(MODEL_OBJECTS.MODEL_OBJECT_02)

module.exports = {ARTBOARDMODEL}