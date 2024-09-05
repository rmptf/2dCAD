function Ejs_Model(object) {
    this.model = object
    this.children = this.model.children
}

Ejs_Model.prototype.injectChildObjIntoParentObj = function(childObject) {
    this.model.MODULE_CHILDREN_DATA.CHILDREN = childObject
    this.model.MODULE_CHILDREN_DATA.CHILDREN_NAMES = childObject.MODULE_NAME
    // console.log(this.model)
}


Ejs_Model.prototype.inject = function(parentObject, childObject) {
    parentObject.MODULE_CHILDREN_DATA.CHILDREN = childObject
    parentObject.MODULE_CHILDREN_DATA.CHILDREN_NAMES = childObject.MODULE_NAME
    // console.log(this.model)
    return parentObject.MODULE_CHILDREN_DATA.CHILDREN
}


Ejs_Model.prototype.inject02 = function buildTree(data) {
    
        // Step 1: Group objects by id for easy lookup
        const lookup = {};
        data.forEach(item => {
          item.children = []; // Initialize children array for each object
          lookup[item.id] = item; // Use id as the key
        });
      
        let root = null; // To hold the root element
      
        // Step 2: Populate children and identify the root
        data.forEach(item => {
          if (item.parentId === null) {
            root = item; // Root object is the one with no parent
          } else {
            // Step 3: Find parent and add current item to its children
            const parent = lookup[item.parentId];
            if (parent) {
              parent.children.push(item);
            }
          }
        });
      
        
    //   }

      
      // Example usage:
      const result = buildTree(data);
      console.log(JSON.stringify(result, null, 2));

      return root; // Return the root of the tree
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