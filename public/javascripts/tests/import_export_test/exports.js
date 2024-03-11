// Functions:
function multiplyByTen(x) {
        let total = x * 10
        return total
    }
function foo(x) {
    console.log('foo: ' + x)
}
function bar(x) {
    console.log('bar: ' + x)
}
function baz(x) {
    foo(x); bar(x)
}

export default {
    multiplyByTen,
    foo,
    bar,
    baz
}

// Variables:
let testConst11 = "inside_exports_111"
let testConst22 = "inside_exports_222"

export const testConst1 = testConst11
export const testConst2 = testConst22
export const testConst3 = "inside_exports_333"

// Can also do functions as variables (maybe for arrow functions? but sure why.)