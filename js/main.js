import Person from "./modules/DataObject.js";

// IIFE - immediately invoced function expression
(() => {
    console.log('fired!');

    console.log(Person);

    debugger;
})();