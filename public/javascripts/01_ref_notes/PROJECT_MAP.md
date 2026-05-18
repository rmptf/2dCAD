# PROJECT MAP

## Style Guide
Use this file for fast navigation and memory restoration.

Each map should have:
- Purpose: what this group of files controls
- Entry Point: first file to open
- Files: related files to open/check
- Notes: only the easy-to-forget details
Keep notes short. Add explanations only when the file name does not make the purpose obvious.

Naming:
- Use clear feature names
- Prefer `Creating UI Components` over `UI Stuff`
- Prefer `Parallel Line Functionality` over `Parallel Files`

When adding a new map:
- Put it under the closest major section
- Add the main entry point first
- List files in the order you usually check them
- Add only 1–3 notes unless the system is confusing

Structure:
## Name of Project File Map
Purpose:
- Brief description of purpose for map.

### Entry Point / Linked Files
- Core files used 
- [randomFile.js](../../../folder/randomFile.js) format

### Working Data Files
- Files with data used and something changed for core files

### Reference Files
- Files with data referenced by core files

### Related Files
- Files with functialities related to core functionality but not directly affected by it.

### Notes



---



# UI COMPONENT ASSEMBLIES


## Creating EJS Components
Purpose:
Main files involved in creating and rendering EJS UI components.

### Entry Point / Linked Files
- [routes/index.js](../../../routes/index.js) `entry point`
- [module_locations.js](../../reference_files/module_locations.js)
- [theme_class_data.js](../../reference_files/theme_class_data.js)
- [artBoardModelBuilder.js](../../../routes/utils/ejsModels/ejsModelBuilder/artBoardmodel/artBoardModelBuilder.js)
- [artBoardModelObjects.js](../../../routes/utils/ejsModels/ejsModelBuilder/artBoardmodel/artBoardModelObjects.js)
- [EjsModel_Class.js](../../../routes/utils/ejsModels/EjsModel_Class/EjsModel_Class.js)
- [a-artboard.ejs](../../../views/partials/modules/html/second_level_modules/artboards/a-artboard/a-artboard_files/a-artboard.ejs)
- [b-pane.ejs](../../../views/partials/modules/html/first_level_modules/panes/b-pane/b-pane_files/b-pane.ejs)
- [main.css](../../stylesheets/main.css)
- [color_modifiers_html.css](../../stylesheets/shared/base/color_modifiers_html.css)
- [a-button.css](../../stylesheets/shared/modules/html/fourth_level_modules/buttons/a-button/a-button.css)

### Working Data Files

### Reference Files

### Related Files

### Notes
- `index.ejs` is the main assembly point
- `routes/index.js` feeds model data into EJS
- `module_locations.js` controls reusable module paths



---



# FUNCTIONALITY ASSEMBLIES

## Arc to Arc Disconnected Functionality
Purpose:
When arc to arc connection disconnects, behavior isn't working properly anymore since trying to fix parallel path closed arcs.

### Entry Point / Linked Files
- [parallelFigure_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Class.js) `entry point`
- [intersectionHandler_WithArc_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/IntersectionHandler_WithArc_Class.js)
- [intersectionsSorter_WithArc_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js)
- [intersection_Contact_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/Intersection_Helper_Classes/Intersection_Contact_Class.js)
- [intersection_NoContact_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/Intersection_Helper_Classes/Intersection_NoContact_Class.js)
- [updateDocumentSvg.js](../classes/components/DocumentSvg/DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js)
- [parallelPathFunctions_NEW.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/parallelFigure_functions/parallelPathFunctions_NEW.js)

### Working Data Files
- [savedFigureData.js](../../reference_files/data/savedFigureData.js)

### Reference Files

### Related Files

### Notes
- Either arcToArcIntersections() is not working inside parallelPathFunctions_NEW
- Or the arc after arc filler isnt being told to move outwardly parallel to original arc.
    - But it probably is because the second point on arc is behaving correctly, just the top point at disconnect is not moving  



## Parallel Line Functionality
Purpose:
Controls creation, rendering, and intersection behavior of parallel figures.

### Entry Point / Linked Files
- [ParallelFigure_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Class.js) `entry point`
- [updateDocumentSvg.js](../classes/components/DocumentSvg/DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js)
- [IntersectionHandler_WithArc_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/IntersectionHandler_WithArc_Class.js)
- [IntersectionsSorter_WithArc_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js)
- [Intersection_Contact_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/Intersection_Helper_Classes/Intersection_Contact_Class.js)
- [Intersection_NoContact_Class.js](../classes/components/DocumentSvg/SvgFigure/ParallelFigure/ParallelFigure_Helper_Classes/Intersection_Helper_Classes/Intersection_NoContact_Class.js)

### Working Data Files
- [savedFigureData.js](../../reference_files/data/savedFigureData.js)
- [parallelPathFunctionsNEW.js]()

### Reference Files

### Related Files

### Notes
- Arc intersections use separate logic from line intersections
- Most debugging starts in `ParallelFigure_Class.js`



