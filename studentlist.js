"use strict";

let parent = document.querySelector("#studentList tbody");
const linkJSON = "http://petlatkea.dk/2019/hogwarts/students.json";
const ProtoStudentObject = {
  id: "-id-",
  fullname: "-proto-name-",
  firstname : "-proto-first-",
  lastname : "-proto-last-",
  image : "-proto-image-",
  house : "-proto-house-"
}
const arrayOfStudents = [];
let idCounter = 0;
let filteredList = [];
let currentFilter;
let currentSort;
let img = document.createElement("img");

// variables for the filter buttons
let huffleButton = document.querySelector("#huffleButton");
let gryffButton = document.querySelector("#gryffButton");
let ravenclawButton = document.querySelector("#ravenclawButton");
let slytherinButton = document.querySelector("#slytherinButton");
let allButton = document.querySelector("#btnAll");

window.addEventListener("DOMContentLoaded", init);

//1. init script and load data from the JSON file 
function init(){
  console.log("Ready!");
  huffleButton.addEventListener("click", setFilter);
  gryffButton.addEventListener("click", setFilter);
  ravenclawButton.addEventListener("click", setFilter);
  slytherinButton.addEventListener("click", setFilter); 
  allButton.addEventListener("click", setFilter);
  loadJSON();   
};

function loadJSON(){
  fetch(linkJSON)
  .then(promise => promise.json())
  .then(prepareObjects);
  };

//2. prepare the object : create a new bject and take data from JSON
function prepareObjects(jsonList){
  jsonList.forEach(jsonObject =>{
    const newObject = Object.create(ProtoStudentObject);
    idCounter++

    //newObject.fromJSON(jsonObject);
    const firstSpace = jsonObject.fullname.indexOf(" ");
    const lastSpace = jsonObject.fullname.lastIndexOf(" ");
    
    newObject.id = String(idCounter);
    newObject.fullname = jsonObject.fullname;
    newObject.firstname = jsonObject.fullname.slice(0, firstSpace);
    newObject.lastname = jsonObject.fullname.slice(lastSpace + 1);
    newObject.house = jsonObject.house;
    newObject.image = "images/" + newObject.lastname.toLowerCase() + "_" + jsonObject.fullname.substring(0, 1).toLowerCase() + ".png";

    // 4. Put those new objects in an array of students
    arrayOfStudents.push(newObject);
    filteredList = arrayOfStudents;
    
});
displayList(arrayOfStudents);
}

function displayList(listOfStudents){
  parent.innerHTML = "";
   listOfStudents.forEach(student =>{
  //create clone
  const clone = document.querySelector("#template").content.cloneNode(true);
  // give the remove button an id
  clone.querySelector("[data-field=remove]").dataset.id = student.id;
  // set clone data
  clone.querySelector("[data-field=firstname]").textContent = student.firstname;
  clone.querySelector("[data-field=lastname]").textContent = student.lastname;
  clone.querySelector("[data-field=image]").src = student.image;
  clone.querySelector("[data-field=house]").textContent = student.house;
  // add a remove button
  clone.querySelector("[data-field=remove]").addEventListener("click", removeStudent)
  //clone.querySelector("button").dataset.name = student.firstname;
  // add a see more button and set the attribute to be the id of each student
  clone.querySelector(".seeMoreBtn").setAttribute("id", student.id);

  //append it
  parent.appendChild(clone);
});
}

// create the modal and make everything listening to "click"
document.body.addEventListener("click", clickedFunction);

function clickedFunction (event) {
  let clickedElement = event.target // the clicked element
  console.log(clickedElement);

if (clickedElement.getAttribute("class") === "seeMoreBtn") {
    let clickedId = clickedElement.getAttribute("id");
    console.log(clickedId);

    //for each loop
    filteredList.forEach(function (student) {
    if (student.id == clickedId) {
    console.log(student)
    document.querySelector("#modal").style.display = "block";
    // document.querySelector("image").innerHTML = student.image;
    document.querySelector("#image_modal").src = student.image;
    document.querySelector("h1").innerHTML = "Name: " + student.fullname;
    document.querySelector("p").innerHTML = "House: " + student.house;
    // img.src = "image.png";
    // var src = document.getElementById("x");
    // src.appendChild(img);
    }
  })
  }
};

document.querySelector("#closeModalBtn").addEventListener("click", function () {
  document.querySelector("#modal").style.display = "none";
 // document.querySelector("#modal").style.backgroundColor = student.id.style.backgroundColor;
})

// setting the filter 
function setFilter(){
  currentFilter = this.dataset.filtername;
  console.log(currentFilter);
  filterList();
}  
// generic filter by house function
  function filterList(){

    if (currentFilter === "All"){
      console.log('display all');
      displayList(arrayOfStudents);
      filteredList = arrayOfStudents;
    }else {
      function filterType(student){
        return student.house === currentFilter;
    } 
    console.log("Filtering")
    displayList(arrayOfStudents.filter(filterType));//the filter function returns only the students from the desired house by looping through all of them and performing a check(the filterType function)
    filteredList = arrayOfStudents.filter(filterType);
    }}
    
// sorting
document.querySelector("#sort1").addEventListener("click", sortByFirstname);
document.querySelector("#sort2").addEventListener("click", sortByLastName);
document.querySelector("#sort3").addEventListener("click", sortByHouse);

function sortByFirstname(){
  function sortStudents(a, b){
   if (a.firstname < b.firstname){
       return -1;
   }else{
      return 1;
   }}
   console.log(filteredList)
   filteredList.sort(sortStudents);
   parent.innerHTML = "";
   displayList(filteredList);
  }


function sortByLastName() {
  function sortStudents(a, b) {
      if (a.lastname < b.lastname) {
          return -1;
      } else {
          return 1;
      }}
  console.log(filteredList)
  filteredList.sort(sortStudents);
  parent.innerHTML = "";
  displayList(filteredList);
}

function sortByHouse(){
function sortStudents(a, b){
  if (a.house < b.house){
    return -1;
  }else{
    return 1;
  }}
filteredList.sort(sortStudents);
parent.innerHTML = "";
displayList(filteredList);
}

// remove Student 
function removeStudent(event){
  console.log("Clicked remove");
  let obj = arrayOfStudents.find(obj => obj.id === event.target.dataset.id);
  let pos = arrayOfStudents.indexOf(obj);
  console.log(pos);
  arrayOfStudents.splice(pos, 1);
  displayList(arrayOfStudents)
  console.log(arrayOfStudents);

}
