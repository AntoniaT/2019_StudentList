"use strict";

let parent = document.querySelector("#parent");
const linkJSON = "http://petlatkea.dk/2019/hogwarts/students.json";

// variables for the filter buttons
let huffleButton = document.querySelector("#huffleButton");
let gryffButton = document.querySelector("#gryffButton");
let ravenclawButton = document.querySelector("#ravenclawButton");
let slytherinButton = document.querySelector("#slytherinButton");


// adding eventListeners here
window.addEventListener("DOMContentLoaded", init);

/* huffleButton.addEventListener("click", filterByHouse);
gryffButton.addEventListener("click", filterByHouse);
ravenclawButton.addEventListener("click", filterByHouse);
slytherinButton.addEventListener("click", filterByHouse); */

//1. init scipt and load data from the JSON file 

function init(){
  console.log("Ready!");
  fetch(linkJSON).then(promise => promise.json()).then();
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
}
  console.log("init");

//1.2. declare an empty global array where the object will be pushed to
const arrayOfStudents = [];

//2. create student object for each student
function prepareList(){
let JSON = [
  {
    firstname: "Hannah",
    lastname: "Abbott",
    imagename: "Hannah Abbott",
    house: "Hufflepuff"
  },
  {
    firstname: "Susan",
    lastname: "Bones",
    imagename: "image",
    house: "Hufflepuff"
  },
  {
    firstname: "Susan",
    lastname: "Bones",
    imagename: "image",
    house: "Hufflepuff"
  }];
   JSON.forEach(student =>{
   console.log(student);
   let newObject = Object.create(createProtoObject);
   newObject.setJSONData(student);
// 4. Put those new objects in an array of students
   arrayOfStudents.push(newObject);
  })
;}
//3. create an empty student object - a prototype
const createProtoObject = {
  firstname : "proto-first",
  lastname : "proto-last",
  imagename : "proto-image",
  house : "proto-house",
// set the JSON DATA to fill in the student object
  setJSONData(student){
   // split fullName into first and last
   //let firstname = fullname.substring()

   this.firstname = student.firstname;
   this.lastname = student.lastname;
   this.imagename = student.imagename;
   this.house = student.house;
}
};

console.log(arrayOfStudents);

//5. make a function that filters and decides which objects to display
function filterList(){

}

//6. make a displayList function
function displayList(students){
  forEach(student) =>{

  }

}
// create the modal to open when a student is clicked