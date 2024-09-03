function Ejs_Model(object) {
    this.model = object
    this.children = this.model.children
}

Ejs_Model.prototype.injectChildObjIntoParentObj = function(childObject) {
    this.model.MODULE_CHILDREN_DATA.CHILDREN = childObject
    this.model.MODULE_CHILDREN_DATA.CHILDREN_NAMES = childObject.MODULE_NAME
    console.log(this.model)
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