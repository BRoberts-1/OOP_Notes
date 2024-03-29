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

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// console.log(bmw);
// console.log(mercedes);

// bmw.accelerate();
// bmw.brake();
// mercedes.brake();
// mercedes.accelerate();

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

// const PersonProto = {
//   //object literal to be our object prototype
//   calcAge() {
//     // our method we want to bequeath/bestor to other objects
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// // We create an instance of our object:

// const steven = Object.create(PersonProto); //we enter our object we want to inherit from

// console.log(steven); //returns and empty object with our calcAge method as an inheritance

// // We can fill the object manually with properties and values:
// steven.name = 'Steven';
// steven.birthYear = '2002';

// // Now that our object has data we can call our method on it:
// steven.calcAge(); //returns: 35

// // Now our prototype chain works as with other methods we used to implement prototypal inheritance. Here is proof of prototypal inheritance:

// console.log(steven.__proto__ === PersonProto); // true

// // To programmatically add properties to an empty object, we start with a new empty object:

// const sarah = Object.create(PersonProto);

// // we add a new function to our PersonProto object(see line 302) and then call it on our empty object:

// sarah.init('Sarah', 1979);
// sarah.calcAge();

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

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS); // returns: 75
// ford.accelerate();
// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford); // returns: object with {make: 'Ford', speed: 80}

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
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// To link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
}; // this accelerate function will override parent accelerate function, so child overrides parent. this is polymorphism

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla); // can see in console the methods we now have linked together: chargeBattery prototype chargeTo and 'accelerate' and 'brake' in prototype of the prototype
tesla.brake();
tesla.accelerate();

////////////////////////////
// Section 220 - Inheritance between 'classes', ES6 Classes

class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there');
  }
}

// We use the 'extends' keyword to cause the StudentCL class to inherit from the PersonCL class
// also 'super' keyword calls the constructor function of the parent class
class StudentCL extends PersonCL {
  constructor(fullName, birthYear, course) {
    // This super call needs to always happen first because it creates the 'this' keyword in this subclass
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // this calcAge() method will 'override' or 'shadow' the parent method
  calcAge() {
    `I'm ${
      2037 - this.birthYear
    } years old, but as a student I feel more like ${
      2037 - this.birthYear + 20
    }`;
  }
}

// If you don't need any new properties, then you don't need to bother writing a constructor method in the child class because everything is already inherited from parent calass

// const martha = new StudentCL('Martha Jones', 2012);
const martha = new StudentCL('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

/////////////////
// Section 221 - Inheritance Between 'Classes'-Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  },
};

const steven = Object.create(PersonProto);

// We will make 'student' inherit directly from 'person' prototype.
// creating 'student' prototype as an empty object with name as 'PersonProto'
const StudentProto = Object.create(PersonProto);
// init method to make it easier to create students
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
// StudentProto is the prototype of the jay object and PersonProto is the prototype of StudentProto
// PersonProto is a parent prototype of jay ie it is in the prototype chain of jay
// So, starts with PersonProto as parent, and then StudentProto as child, and then jay object inherits from StudentProt which inherits from parent-PersonProto-this is the prototype chain.

// With Object.create() we are linking classes together through a prototype chain. We are dealing just with objects (just linking objects together)here and not constructor functions and not fake classe ES6.

// In real job ES6 classes and constructor functions are more used, but need to know all three ways, as you will see all three ways.

/////////////////////////
// Section 222 - Another Class Example
class Account {
  // Public fields(go to all instances, not prototypes):
  // Public fields are also referenced by the 'this' keyword

  locale = navigator.language;

  // Private fields use the # symbol before them
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // we can add any property or inputs we want without basing it on anything else e.g.:
    // Protected property has an underscore in front as a convention
    this.#movements = [];
    // this.locale = navigator.language;
    // can execute any code we want in this constructor function eg;
    console.log(`Thanks for opening an account, ${owner}`);
  }
  // These methods are our Public interface to our object API
  // ie Public Methods:
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
  }

  withdrawal(value) {
    this.deposit(-value); // we are calling the method deposit() inside another method
  }

  // _approveLoan(value) {
  //   return true;
  // }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved.`);
    }
  }

  static helper() {
    console.log('Helper');
  }
  // Private Methods
  #approveLoan(value) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// For making deposits and withdrawals we can use the following:
// acc1.movements.push(250); // for deposits
// acc1.movements.push(-140); // for withdrawals
// console.log(acc1);

// However, it is better not to do this, and instead, create methods inside the constructor to call- see above deposit() and withdrawal() methods like so:
acc1.deposit(250);
acc1.withdrawal(140); // we abstracted away the negative above
acc1.requestLoan(1000);
// acc1.#approveLoan(1000);

console.log(acc1);
console.log(acc1.pin);

Account.helper();

// So the methods deposit() and withdrawal() are an interface to our objects aka API
// Certain methods and data should not be accessable outside the object, as it can create bugs so we need protected properties aka encapsulation.

// Section 223 - Encapsulation: Protected Properties and Methods

// Encapsulation means keeping some of the properties and methods inaccessible outside the class and the rest of the methods will be exposed/accessible outside the class and are called API. This is very important to do in any production application.

// Helps prevent code from outside the class from accidentally manipulating any data inside the class.
// When we expose only a small interface(ie small API consisting of a few public methods), then we can change all internal methods with more confidence, knowing that the internal does not rely on the external code and will not break when internal changes are made.

// JS classes do not yet support real data privacy and encapsulation. We will fake it using a convention.

// We will protect the 'movements' data as it is mission critical data by using the convention of an underscore _movements before it. As you can see, it is not truely private, but at least everyone, including yourself, will know not to touch this property outside of the class.

// We can access it using a public method, however. In production often times a method will be called getMovements, when in actuality, it is not really a 'getter' function. See the method getMovements() above. This allows everyone to get the movements without the ability to override them.
console.log(acc1.getMovements()); // this allows to get without setting ie overriding them, unless they use acc1._movements. to access the property.

// We should also make protected the pin number, so this._pin = pin
// And also protect the approveLoan() method. See above _approveLoan

////////////////////////////////////
// Section 224 - Encapsulation: Private Class Fields and Methods

// In OOP languages like Java and C++, properties are called "fields"
// There are four types of fields and methods ie public/private(2) fields and public/private(2) methods.

// Public fields(ie properties) will be present on all the instances, but not on the prototype, of the class which are created. So, locale and movements-see above to see how they are added as public fields.

// Private fields use a # symbol before them:
// console.log(acc1.#movements); // error: not accessable outside of class, reference to undeclared private field or method #movements

// For pin field, we cannot define it inside of the constructor, so what we have to do create #pin field outside and don't set to anything, and then let it be defined inside the constructor function.(like creating an empty variable). After we do this #pin; then it can no longer be accessed outside.

// Private methods are very useful in hiding the implementation details from the outside.

// There are also static versions of these public and private methods and fields

// We have used static before as a helper() function see above.
// We will not go over them, but you can check yourself.

//////////////////////////////////
// Section 225 - Chaining Methods
// Return the object itself at the end of the method we want to chain to.

///////////////////////////
// Section 226- ES6 Classes Summary

// ES6 classes is probably how you will implement classes in the real world.

class Talmid extends Person {
  // using extends keyword to set up inheritance between child class 'Talmid' and parent 'Person' class. It auto sets prototype.
  // university is a public field/property and is available on every object ie every instance created by this class
  university = 'University of Arizona';
  // we now have private fields(with #) which are not accessible outsid of the class. this is good for data privacy/encapsulation.
  #studyHours = 0;
  #course;
  // static fields are available only on the class as well. implement like this with 'static' keyword
  static numSubjects = 10;
  // constructor method is called by new operator and is madatory in a regular class, but can be omitted in a child class
  constructor(fullName, birthYear, startYear, course) {
    // call to a parent class with the 'super' keyword-it is necessary with the 'extend' keyword and needs to happen before acessing the 'this' keyword for a child class
    super(fullName, birthYear);
    // instance property (available on created object)
    this.startYear = startYear;
    // private field here is redefined with #, we first listed above without any assignment and then here we define it with the constructor. Public fields are common to all objects while private fields are not.
    this.#course = course;
  }
  // Public method
  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }
  // here we are referencing a private method
  study(hours) {
    this.#makeCoffee();
    this.studyhours += hours;
  }
  // here is a private method, if it doesn't work in a browser, then you can just use a fake _ symbol to indicate to yourself and others to treat it as private
  #makeCoffee() {
    return 'Here is a coffee for you!';
  }
  // Getter method allows us to get a value out of an object by simply writing a property instead of writing a method. EG. we could write here with this Talmid.testScore() and get our property from object
  get testScore() {
    return this._testScore;
  }
  // Setter method(must use _ to set property with same name as method(convention), and also add getter.) The setter method allows us to define a testScore property without calling a method
  set testScore(score) {
    this._testScore = score < 20 ? score : 0;
  }
  // static method is available only on the class and cannot access instance properties or methods, only static ones
  static printCurriculum() {
    console.log(`There are ${this.numSubjects} subjects`);
  }
}
// Creating a new object with the 'new' operator
const talmid = new Talmid('Jonas', 2020, 2037, 'Medicine');

// Classes are just dressing over real constructor functions because in JS, there are no real classes.
// Classes are not hoisted, but they are first class citzens
// The class body is always executed in 'strict mode'

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  // const EV = function
  constructor(make, speed, charge) {
    // Car.call
    super(make, speed);
    this.#charge = charge;
  }

  // Linking the prototypes together
  // EV.prototype.
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  // EV.prototype.
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this; // put return this; on all the methods that set something
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
