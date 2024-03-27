import {SvgGroup} from './SvgGroup_Class.js'

function DocumentSvg(documentSvgD3) {
    this.documentSvgAndData = {
        svgData: {
            svgGroupsData: {
                primaryName: "primaryGROUP_001",
                secondaryNames: ["secondaryGROUP_001", "secondaryGROUP_002", "secondaryGROUP_003", "secondaryGROUP_004"],
                // secondaryNames: "secondaryGROUP_001"
            },
            svgElementsData: {
                originalFigure: {
                    pathDatas: []
                },
                secondaryFigure: {
                    // empty
                },
                parallelFigure: {
                    pathDatas: []
                }
            },
        },
        svgElements: {
            svgGroupElements: {
                primary: null,
                // secondary: [],
                secondary: null,
            },
            svgElements: {
                originalFigure: {
                    paths: [],
                    endPoints: []
                },
                secondaryFigure: {
                    paths: []
                },
                parallelFigure: {
                    // ...
                }
            }
        },

    }
    this.documentSvgD3 = documentSvgD3

    // this.createSvgGroups()
}

DocumentSvg.prototype.createSvgGroups = function() {
    this.documentSvgAndData.svgElements.svgGroupElements.primary = new SvgGroup(this.documentSvgAndData.svgData.svgGroupsData.primaryName, this.documentSvgD3)

    this.documentSvgAndData.svgData.svgGroupsData.secondaryNames.forEach(name => {
        this.documentSvgAndData.svgElements.svgGroupElements.secondary.push(new SvgGroup(name, this.documentSvgD3))
    })
}

DocumentSvg.prototype.NEWcreateSvgGroups = function() {
    console.log("assssssssssssssssss")

    // take the primaryGroup name, create and SVG group for it and place inside the documentSVG D3 Element

    // this.documentSvgAndData.svgElements.svgGroupElements.primary = this.documentSvgD3
    //     .append('g')
    //     .attr('class', this.documentSvgAndData.svgData.svgGroupsData.primaryName)
    //     .attr('id', 'figureGroup123')


    // loop through secondaryGroup names, create an SVG group for each and place inside the primary SVG group
    // not working yet ...
    // this.documentSvgAndData.svgData.svgGroupsData.secondaryNames.forEach(name => {
    //     // this.documentSvgAndData.svgElements.svgGroupElements.secondary = this.documentSvgAndData.svgElements.svgGroupElements.primary
    //     //     .append('g')
    //     //     .attr('class', this.documentSvgAndData.svgData.svgGroupsData.primaryName.secondaryNames)
        
    //     this.documentSvgAndData.svgElements.svgGroupElements.secondary[name] = this.documentSvgAndData.svgElements.svgGroupElements.primary
    //         .append('g')
    //         .attr('class', this.documentSvgAndData.svgData.svgGroupsData.secondaryNames)
    // })

    // working ...
    // this.documentSvgAndData.svgElements.svgGroupElements.secondary = this.documentSvgAndData.svgElements.svgGroupElements.primary
    //     .append('g')
    //     .attr('class', this.documentSvgAndData.svgData.svgGroupsData.secondaryNames)



    // ex...
    // function createSvgGroups(self, groupClassNamesArray) {
    //     const groupNames = groupClassNamesArray
    //     self.group = a_canvas_globalVars.svgD3
    //         .append('g')
    //         .attr('class', groupNames[0])
    //         .attr('id', 'figureGroup123')
    //     groupNames.slice(1).forEach(name => {
    //         self[name] = self.group
    //             .append('g')
    //             .attr('class', name)
    //     })
    // }


    this.documentSvgAndData.svgElements.svgGroupElements.primary = new SvgGroup(this.documentSvgD3, 'bigPoopa', 'lilDICKY')
}

export {
    DocumentSvg
}