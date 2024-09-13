function Ejs_Model(object) {
    this.ejsModel = object
}

// Recursive function to inject children into parents
Ejs_Model.prototype.injectChildren = function(structure, objects) {
    structure.forEach(({parent, child}) => {
        if (objects[parent] && objects[child]) {
            objects[parent].MODULE_CHILDREN_DATA.CHILDREN.push(objects[child]) // push child object into parent object
            objects[parent].MODULE_CHILDREN_DATA.CHILDREN_MOD_LOC.push(objects[child].MODULE_LOCATION) // push child module loc into parent object
            objects[parent].MODULE_CHILDREN_DATA.CHILDREN_NAMES.push(objects[child].MODULE_NAME) // push child module name into parent pbject
            objects[child].MODULE_PARENT_DATA.PARENT_NAME = objects[parent].MODULE_NAME // push parent module name into child object
        }
    })
}

module.exports = {Ejs_Model}












// main layout (body)
    // arboard layout (was old ejs thing, inside index.ejs)
        // artboardModel: model? / layout? (built in js then injected into artboard layout)
            // artBoardModelObjects (collection of these create models)
                // ejsModules  (collection of these create objects)

// ejsModels
    // EjsModel_Class.FOLDER
        // EjsModel_Class.FILE
            // Class data
            // model build methods
    // ejsModelBuilder.FOLDER
        // artBoardModel.FOLDER
            // artBoardModelObjects.FILE (DATA)
                // parentModule_Object
                // childModule_Object
                // grandchildModule_Object
            // artBoardModelBuilder.FILE
                // import Model_Class
                // import all Objects
                // import EJS modules
                // import EJS VARIABLES
                // build Model
                // export to index