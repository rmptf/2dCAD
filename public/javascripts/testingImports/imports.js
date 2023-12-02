import importedFunctions, {testConst1, testConst2, testConst3} from './exports.js'

editSvgInSomeWay()

function editSvgInSomeWay() {
    const svgWidth = 500
    const svgHeight = 500
    let svg = d3.select("svg")
    let X = 100
    let Y1 = "inside_imports"
    let Y2 = testConst1
    let Y3 = testConst2
    let Y4 = testConst3
    const importedHeight = importedFunctions.multiplyByTen(X)

    console.log("Edit SVG and multiply X by 10.")
    console.log("X: " + X)
    console.log(X + " * 10 = " + importedFunctions.multiplyByTen(X))
    importedFunctions.foo(Y1)
    importedFunctions.foo(Y2)
    importedFunctions.bar(Y3)
    importedFunctions.baz(Y4)

    svg.attr("width", svgWidth).attr("height", svgHeight)
    svg.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "pink")
    svg.append("rect").attr("width", importedHeight+"px").attr("height", "100px").attr("fill", "red")
}