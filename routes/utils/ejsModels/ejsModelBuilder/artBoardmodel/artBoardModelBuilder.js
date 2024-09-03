const {Ejs_Model} = require('../../EjsModel_Class/EjsModel_Class.js')
const {OBJECTS} = require('./artBoardModelObjects.js')

let ARTBOARDMODEL = new Ejs_Model(OBJECTS.OBJECT_1)
ARTBOARDMODEL.injectChildObjIntoParentObj(OBJECTS.OBJECT_2)

module.exports = {ARTBOARDMODEL}