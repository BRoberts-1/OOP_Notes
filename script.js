'use strict';

// Section 208 - Constructor functions and 'new' operator

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// 1. New {} created
// 2. function is called with new operator, this keyword is set to {}
// 3. {} is linked to prototype
// 4. function automatically returns {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack); // returns: new objects with above properties and values

// Section 209 - Prototypes

// console.log(Person.prototype); // returns: constructor object

// To create a method to be inherited by all objects created by our constructor:
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge(); // can now call this method on our jonas object
// matilda.calcAge();

// console.log(jonas.__proto__); // returns: our prototype object created bt our constructor function used to create jonas
// console.log(jonas.__proto__ === Person.prototype); // returns: true
// // also to prove where it is from:
// console.log(Person.prototype.isPrototypeOf(jonas)); // returns: true
// console.log(Person.prototype.isPrototypeOf(Person)); // returns: false

// // Section 210 - Prototypal Inheritance and the Prototype Chain

// // Can also attach properties to be inherited by created objects of our constructor eg:

// Person.prototype.species = 'Homosapiens';
// console.log(jonas, matilda); // can see this new property as an inherited property, not ON the objects themselves when created, but as part of the prototype they inherited.
// Can check if a property is inherited or is on the object itself:
// console.log(jonas.hasOwnProperty('firstname')); //returns: true
// console.log(jonas.hasOwnProperty('species')); //returns: false

// End of Section 210 and Start of Section 211-Prototypal Inheritance on Built-In Objects
// console.log(jonas.__proto__);
// console.log(jonas.__proto__.__proto__); //returns: Object.prototype
// console.log(jonas.__proto__.__proto__.__proto__); //returns: null

// console.log(Person.prototype.constructor); //returns: function itself

// // To inspect the above must use console.dir
// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 4, 5, 6, 9, 3];
// console.log(arr.__proto__); //returns: array.prototype with all the various methods available for arrays in JS
// console.log(arr.__proto__ === Array.prototype); //returns: true

// console.log(arr.__proto__.__proto__); //returns: Object.prototype because the prototype itself is an object.
// // All this is a way for us to reuse code over and over again

// // To extend the prototype methods-do not do this in practice:
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique()); //returns: [3, 6, 5, 9]

// //Prototypal inheritance also applie to HTML elements
// const h1 = document.querySelector('h1');
// console.dir(document.querySelector('h1')); //returns: document object with various properties including prototype object and if you keep opening nested you will find ElementPrototype object

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
  // Instance methods
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
  // Static method
  static hey() {
    console.log('Hey there!');
    console.log(this);
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

// We use setters and getters with classes. Above is case where we want to validate the data as we create the object.

// Section 215 - Static Methods

// We can use Array.from() to convert an array-like structure to a real array.
Array.from(document.querySelectorAll('h1'));
// Array.from is a simple function that is attached only the to Array constructor and not to the prototype property. You cannot call this method on any object, only as Array.from

// The .from() method is in the Array namespace e.g. Number.parsefloat() is another example of a method in a namespace

// We use these as helpers that should be related to a certain constructor eg:
// To implement a static method for a constructor function:

// Here is our constructor:
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.hey = function () {
//   console.log('Hey there 🤞!');
//   console.log(this);
// };

// // Whatever object is calling the method will be the this keyword inside of the function. Here the this keyword is the entire 'Person' constructor function.

// Person.hey(); //returns: Hey there!
// // jonas.hey(); // returns; jonas is not defined because there is no prototypal inheritance of the .hey() method in jonas object.

// // Static methods don't need an instance of a class to be created before they are called. Instance methods do need an instance before they can be called.
// PersonCl.hey(); //this will now point to the entire class of PersonCl-because we put it as a static method in the class.

// They are helper methods to implement on a class or constructor function.

// Section 216 - Object.create

// This is the least used way to implement prototypal inheritance in JS, but is necessary for true class inheritance.

// It is the 3rd way to implement prototypal inheritance/delegation. When we use Object.create there are no prototype properties, constructor functions, or 'new' operators.

// We use Object.create() to manually set the prototype of an object to any other object we choose by passing in that 'other' object as the argument.

const PersonProto = {
  //object literal to be our object prototype
  calcAge() {
    // our method we want to bequeath/bestor to other objects
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// We create an instance of our object:

const steven = Object.create(PersonProto); //we enter our object we want to inherit from

console.log(steven); //returns and empty object with our calcAge method as an inheritance

// We can fill the object manually with properties and values:
steven.name = 'Steven';
steven.birthYear = '2002';

// Now that our object has data we can call our method on it:
steven.calcAge(); //returns: 35

// Now our prototype chain works as with other methods we used to implement prototypal inheritance. Here is proof of prototypal inheritance:

console.log(steven.__proto__ === PersonProto); // true

// To programmatically add properties to an empty object, we start with a new empty object:

const sarah = Object.create(PersonProto);

// we add a new function to our PersonProto object(see line 302) and then call it on our empty object:

sarah.init('Sarah', 1979);
sarah.calcAge();

// This is no a constructor function, init(), because we don't use the 'new' operator when calling it.

///////////////////////////////////////
// Section 217 - Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS); // returns: 75
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford); // returns: object with {make: 'Ford', speed: 80}

// Section 218 - Inheritance Between "Classes": Constuctor Functions

// So far we have practiced prototypal inheritance from a prototype and instances or from an object, but now we will see real inheritance(in classic OOP) between classes.
// Although real classes do not exist in JS.

// We will create a Person class(the Parent class) and have the Student class inherit from the Person class. A student is a subtype of a person. A student IS a person, but just a more specific type of person.
// The idea is the student can have its own specific methods that are particular to a studen, but it inherits the general methods from its parent class ie Person class.

// This will be done first with Constructor functions:
// We start with our Person constructor
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
// We then have our Person method
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // parameters here are usually same as Parent's and then add more(here we add course)
  Person.call(this, firstName, birthYear); // we use the .call() method to set our prototype equal to the Person prototype using 'this' keyword as an argument to do so.
  this.course = course;
};

// To link the Student prototype with the Person prototype we will use Object.create(). This allows us to manually set our prototype property. Our Student object will then inherit from the Person object. But Object.create() creates an empty object so we must fill it.
// It does not work to say Student.prototype = Person.prototype because this just points our student to the same object as the parent and doesn't allow for inheritance. It would just be the same object.

// Linking prototypes:
Student.prototype = Object.create(Person.prototype);

// We then have our student constructor with the introduce method:
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// We create ann instand of
const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge(); //returns: 17. This works because JS looks up the calcAge property through the prototype chain until it finds it in the Person prototype.
console.log(mike.__proto__); //returns: Object with .introduce() method
console.log(mike.__proto__.__proto__); // returns: Object with .calcAge() method. It is the prototype of the prototype.

console.log(mike instanceof Student); //returns: true
console.log(mike instanceof Person); // returns: true b/c we linked Student to Person for inheritance
console.log(mike instanceof Object); // returns: true b/c Object is also in the prototype chain

// console.dir(Student.prototype.constructor); //returns: object set to Person, and we want it to be set to student. To accomplish this we just write:
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// Section 219 - Coding Challenge #3
///////////////////////////////////////

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/
