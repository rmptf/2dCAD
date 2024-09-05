const {Ejs_Model} = require('../../EjsModel_Class/EjsModel_Class.js')
const {MODEL_OBJECTS} = require('./artBoardModelObjects.js')

// Store objects in an object for easy lookup
let objects = {
  "B_PANE": MODEL_OBJECTS.B_PANE,
  "A_ARTBOARD": MODEL_OBJECTS.A_ARTBOARD,
  "B_HEADER": MODEL_OBJECTS.B_HEADER,
  "A_CANVAS": MODEL_OBJECTS.A_CANVAS,
  "A_DOCUMENT": MODEL_OBJECTS.A_DOCUMENT,
  "B_FOOTER": MODEL_OBJECTS.B_FOOTER
}

// Array of objects and their relationships
let modelStructure = [
  { parent: "B_PANE", child: "A_ARTBOARD" },
  { parent: "A_ARTBOARD", child: "B_HEADER" },
  { parent: "A_ARTBOARD", child: "A_CANVAS" },
  { parent: "A_CANVAS", child: "A_DOCUMENT" },
  { parent: "A_ARTBOARD", child: "B_FOOTER" }
]

// Create new ModelClass and call function to inject children
let artBoardModel = new Ejs_Model(MODEL_OBJECTS.B_PANE)
artBoardModel.injectChildren(modelStructure, objects)

module.exports = {artBoardModel}