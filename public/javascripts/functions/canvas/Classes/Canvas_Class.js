import {CanvasScale} from '../Classes/CanvasScale_Class.js'
import {CanvasPan} from '../Classes/CanvasPan_Class.js'
import {CanvasDocument} from '../Classes/CanvasDocument/CanvasDocument_Class.js'

function Canvas(canvasElement, aCanvas_scale_element, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05, aCanvas_pan_element) {
    this.canvasElement = canvasElement
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }
    this.scaleObject = {}
    this.panObject = {}
    this.canvScaleClass = new CanvasScale(this, aCanvas_scale_element, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05)
    this.canvScaleClass.setClickEvents()
    this.canvasPanClass = new CanvasPan(this, aCanvas_pan_element)
    this.canvasPanClass.setEvents(aCanvas_pan_element)
    this.canvasDocuments = [] // changing
    
    this.canvasDocumentClasses = [] // potential change
}

Canvas.prototype.createCanvDocClass = function() {
    let newCanvDoc = new CanvasDocument(this)
    this.canvasDocumentClasses.push(newCanvDoc)
}

export {
    Canvas
}




//TODO: OOP Inheritance Example
// // Parent class
// function Animal(name) {
//     this.name = name;
//   }
  
//   // Method shared by all instances of Animal
//   Animal.prototype.sayName = function() {
//     console.log("My name is " + this.name);
//   };
  
//   // Child class inheriting from Animal
//   function Dog(name, breed) {
//     // Call parent constructor
//     Animal.call(this, name);
//     this.breed = breed;
//   }
  
//   // Set up prototype chain
//   Dog.prototype = Object.create(Animal.prototype);
//   Dog.prototype.constructor = Dog; // Set correct constructor
  
//   // Method specific to Dog
//   Dog.prototype.bark = function() {
//     console.log("Woof!");
//   };
  
//   // Create instances
//   var dog1 = new Dog("Buddy", "Labrador");
//   var dog2 = new Dog("Max", "Golden Retriever");
  
//   // Call inherited method
//   dog1.sayName(); // Output: My name is Buddy
  
//   // Call method specific to Dog
//   dog1.bark(); // Output: Woof!