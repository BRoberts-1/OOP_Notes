'use strict';

// Section 208 - Constructor functions and 'new' operator

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} created
// 2. function is called with new operator, this keyword is set to {}
// 3. {} is linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack); // returns: new objects with above properties and values

// Section 209 - Prototypes

console.log(Person.prototype); // returns: constructor object

// To create a method to be inherited by all objects created by our constructor:
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // can now call this method on our jonas object
matilda.calcAge();

console.log(jonas.__proto__); // returns: our prototype object created bt our constructor function used to create jonas
console.log(jonas.__proto__ === Person.prototype); // returns: true
// also to prove where it is from:
console.log(Person.prototype.isPrototypeOf(jonas)); // returns: true
console.log(Person.prototype.isPrototypeOf(Person)); // returns: false

// Section 210 - Prototypal Inheritance and the Prototype Chain

// Can also attach properties to be inherited by created objects of our constructor eg:

Person.prototype.species = 'Homosapiens';
console.log(jonas, matilda); // can see this new property as an inherited property, not ON the objects themselves when created, but as part of the prototype they inherited.
// Can check if a property is inherited or is on the object itself:
console.log(jonas.hasOwnProperty('firstname')); //returns: true
console.log(jonas.hasOwnProperty('species')); //returns: false

// End of Section 210 and Start of Section 211-Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); //returns: Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //returns: null

console.log(Person.prototype.constructor); //returns: function itself

// To inspect the above must use console.dir
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__); //returns: array.prototype with all the various methods available for arrays in JS
console.log(arr.__proto__ === Array.prototype); //returns: true

console.log(arr.__proto__.__proto__); //returns: Object.prototype because the prototype itself is an object.
// All this is a way for us to reuse code over and over again

// To extend the prototype methods-do not do this in practice:
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); //returns: [3, 6, 5, 9]

//Prototypal inheritance also applie to HTML elements
const h1 = document.querySelector('h1');
console.dir(document.querySelector('h1')); //returns: document object with various properties including prototype object and if you keep opening nested you will find ElementPrototype object

// Section 212 - Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h */

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(mercedes);

bmw.accelerate();
bmw.brake();
mercedes.brake();
mercedes.accelerate();

// Section 213 - ES6 Classes

// JS only uses prototypal inheritance and not classes like in Java and C++. But ES6 introduced a syntax similar to regular classes except that it really is just the same prototypal inheritance.

// Can use either a class expression or a class declaration(classes are just a type of function.)

// a class expression
// const PersonCl = class {};

// a class declaration
//1st step is to write constuctor function
// include parameters for the properties you want object to contain
// use 'new' keyword when creating a new person by calling constuctor function
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     // methods are stored on .prototype property
//     console.log(2037 - this.birthYear);
//   }

//   get age() {
//     // to demo getter in our class
//     return 2037 - this.birthYear;
//   }
// }

// We can add methods below constructor functions. All the methods, we add to the class, will be stored on the prototype of the objects and not on the objects themselves.(ie prototypal inheritance)
// we store our newly created object in a variable we can access:
// const jessica = new PersonCl('Jessica', 1996);
// console.log(jessica);

// console.log(jessica.age); // our getter property asseses 41

// jessica.calcAge(); //calling method on jessica object
// console.log(jessica.__proto__ === PersonCl.prototype); // returns: true

// // Can add a method manually outside of class to our prototype property to show it's the same thing:

// // We could also just put this method inside our class and it will work the same.

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
// jessica.greet(); //returns: Hey Jessica

/* Important points about classes:
1. Classes are NOT hoisted, not even class declarations(unlike function declarations).
2. Classes, just like functions, are first-class(i.e. they can be passed and returned in functions as arguments).
3. Classes are executed in 'strict mode' automatically, even if you don't active 'strict mode' for the rest of your code.

// You can use either Classes or Constructor functions as long you understand protypes and prototypal inheritance. However, using Classes for syntax is cleaner and more easily readable because data and behavior is contained in one block. */

// Section 214 - Setters and Getters

// Every object in JS has Setters and Getters as properties.

// They are called 'assesor properties', while normal properties are called 'data properties'.

// They are functions that Get and Set a value.

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    // must include 'get' keyword before our function
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    // Any setter has exactly 1 parameter
    this.movements.push(mov);
  },
};

console.log(account.latest); //returns 300, notice that we don't call the method/function with () because it is a property that assesses a value.(i.e assessor property)

// To call 'setter' property assessor
account.latest = 50; // notice syntax is just like property we set to a value
console.log(account.movements); //returns: Array(5) [200, 530, 120, 300, 50]

// To use a setter to validate data: eg to check to see if value is a fullname(ie a firstname, a space character " ", a lastname)

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    // methods are stored on .prototype property
    console.log(2037 - this.birthYear);
  }

  get age() {
    // to demo getter in our class
    return 2037 - this.birthYear;
  }

  // Setting a property that already exists,  we need a getter as well.

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  } // if name includes a space we set fullName = name, else alert

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
// jessica.greet(); //returns: Hey Jessica

// the setter function above is called when the fullname is set by the constructor function which is then checked by the setter which is then set again and then called again to check etc. This produces an error of 'too much recursion' b/c you are continuing to set, call and check, and then set again.

// We then need to create a getter function to create the property of fullName because it is undefined eg. see above on line 226. This will then give us both the property of _fullName: "Jessica Davis" and the  property of fullName: "Jessica Davis"

// const walter = new PersonCl('Walter', 1965); //returns: alert "Walter is not a full name!"

const walter = new PersonCl('Walter White', 1965); //returns: Walter White
