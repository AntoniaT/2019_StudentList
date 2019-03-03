"use strict";

// variables for the template and the json Object
let parent = document.querySelector("#studentList tbody");
const baseLinkJSON = "https://petlatkea.dk/2019/hogwarts/students.json";
const bloodLinkJSON = "https://petlatkea.dk/2019/hogwarts/families.json";
const ProtoStudentObject = {
  id: "-id-",
  fullname: "-proto-name-",
  firstname : "-proto-first-",
  lastname : "-proto-last-",
  crest: "-proto-crest-",
  image : "-proto-image-",
  house : "-proto-house-",
  blood: "-blood-"
}
// variables for several lists/arrays 
const arrayOfStudents = [];
let bloodTypes = [];
let idCounter = 0;
let filteredList = [];
let currentFilter;
let currentSort;
let img = document.createElement("img");
let crestImg = document.querySelector("#crest_modal");
let inquisitSquadArray = [];
let expelledList = [];
let selStudent;
let modalColor = document.querySelector("#modal");
let cursed = new Image();

// variable for myself in the list
const meAsStudent = {
  id: "me",
  fullname: "Antonia Hackenberger",
  firstname : "Antonia",
  lastname : "Hackenberger",
  image : "",
  house : "Gryffindor",
  crest: "",
  blood: "pure",
  inquisitorial: false
}
// variables for the filter buttons
let huffleButton = document.querySelector("#huffleButton");
let gryffButton = document.querySelector("#gryffButton");
let ravenclawButton = document.querySelector("#ravenclawButton");
let slytherinButton = document.querySelector("#slytherinButton");
let allButton = document.querySelector("#btnAll");

window.addEventListener("DOMContentLoaded", init);

// init script and load data from the JSON file 
function init(){
  console.log("Ready!");
  huffleButton.addEventListener("click", setFilter);
  gryffButton.addEventListener("click", setFilter);
  ravenclawButton.addEventListener("click", setFilter);
  slytherinButton.addEventListener("click", setFilter); 
  allButton.addEventListener("click", setFilter);
  getBloodType();   
};

// push the new array of blood types to the other array
function getBloodType(bloodType) {
  fetch(bloodLinkJSON)
      .then(res => res.json())
      .then(loadBlood);
}
function loadBlood(names){
  bloodTypes = names;
  loadJSON();
}
function loadJSON(){
  fetch(baseLinkJSON)
  .then(promise => promise.json())
  .then(prepareObjects);
  };

// prepare the object : create a new object and take data from JSON
function prepareObjects(jsonList){
  // push myself into the array of students
  meAsStudent.image = "images/" + meAsStudent.lastname.toLowerCase() + ".png";
  arrayOfStudents.push(meAsStudent);

  jsonList.forEach(jsonObject =>{
    const newObject = Object.create(ProtoStudentObject);
    idCounter++
    const firstSpace = jsonObject.fullname.indexOf(" ");
    const lastSpace = jsonObject.fullname.lastIndexOf(" ");
    
    newObject.id = String(idCounter);
    newObject.fullname = jsonObject.fullname;
    newObject.firstname = jsonObject.fullname.slice(0, firstSpace);
    newObject.lastname = jsonObject.fullname.slice(lastSpace + 1);
    newObject.house = jsonObject.house;
    newObject.image = "images/" + newObject.lastname.toLowerCase() + "_" + jsonObject.fullname.substring(0, 1).toLowerCase() + ".png";
    newObject.crest = "images/" + "crest-" + jsonObject.house.toLowerCase() + ".png";
    
    //include the blood type according to the blood family from second json file
    if (bloodTypes.half.includes(newObject.lastname)){
       newObject.blood = "half";
    }else if(bloodTypes.pure.includes(newObject.lastname)){
      newObject.blood = "pure";
    }else{
      newObject.blood = "muggle";
    }
    
    // Put those new objects in an array of students
    arrayOfStudents.push(newObject);
    filteredList = arrayOfStudents;
});
displayList(arrayOfStudents);
showNumbers(arrayOfStudents); // not finished - to show the status of the lists

}
// show the status of the students on the page
function showNumbers(){
  let statusTotal = document.querySelector("#statusTotal");
  let statusHouse = document.querySelector("#statusHouse");
  statusTotal.innerHTML = "Total of " + filteredList.length + " students";
 }
// create the clones and display the list of students
 function displayList(listOfStudents){
  parent.innerHTML = "";
   listOfStudents.forEach(student =>{
  const clone = document.querySelector("#template").content.cloneNode(true);
  // give the remove button an id
  clone.querySelector("[data-field=remove]").dataset.id = student.id;
  clone.querySelector("[data-field=firstname]").textContent = student.firstname;
  clone.querySelector("[data-field=lastname]").textContent = student.lastname;
  clone.querySelector("[data-field=image]").src = student.image;
  clone.querySelector("[data-field=house]").textContent = student.house;
  // add a remove button and make it listen to click
  clone.querySelector("[data-field=remove]").addEventListener("click", removeStudent)
  // add a see more button and set the attribute to be the id of each student
  clone.querySelector("[data-field=seemore]").setAttribute("id", student.id);

  //append it
  parent.appendChild(clone);
});
}
// MODAL
// create the modal and make everything listening to "click"
document.body.addEventListener("click", clickedFunction);

function clickedFunction (event) {
let clickedElement = event.target

if (clickedElement.getAttribute("data-field") === "seemore") {
    let clickedId = clickedElement.getAttribute("id");

//for each loop and create a modal with all the data from json
    filteredList.forEach(function (student) {
    if (student.id == clickedId) {
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#image_modal").src = student.image;
    crestImg.src = student.crest;
    document.querySelector("#fullname").innerHTML = "<span class='bolder'>Name: </span>" + student.fullname;
    document.querySelector("#housename").innerHTML = "<span class='bolder'>House: </span>" + student.house;
    document.querySelector("#blood-type").innerHTML = "<span class='bolder'>Blood: </span>" + student.blood;
    selStudent = student; // the student will update the selected Student for later use

    // change the button for inqusitorial squad
    if(selStudent.inSquad){
      document.querySelector("#squad-status").innerHTML = "<span class='bolder'>Inquisitorial Squad: </span>" + "member";
      document.querySelector("#iSquad").innerHTML = "Remove from Squad";
    }else{
      document.querySelector("#iSquad").innerHTML = "Add to Inquisitorial Squad";
      document.querySelector("#squad-status").innerHTML = "<span class='bolder'>Inquisitorial Squad: </span>" + "not a member";

    }
   // change the background color of the modal according to the house
    if (student.house === "Hufflepuff") {
      let modalColor = document.querySelector("#modal");
      modalColor.removeAttribute("class");
      modalColor.classList.add("hufflepuf");
  }else if(student.house === "Gryffindor"){
      let modalColor = document.querySelector("#modal");
      modalColor.removeAttribute("class");
      modalColor.classList.add("gryffindor");
  }else if (student.house === "Ravenclaw"){
     let modalColor = document.querySelector("#modal");
     modalColor.removeAttribute("class");
      modalColor.classList.add("ravenclaw");
  }else if (student.house === "Slytherin"){
      let modalColor = document.querySelector("#modal");
      modalColor.removeAttribute("class");
      modalColor.classList.add("slytherin");
  }

    }
  })
  }
};

document.querySelector("#closeModalBtn").addEventListener("click", function () {
  document.querySelector("#modal").style.display = "none";
})

// setting the filter
function setFilter(){
  currentFilter = this.dataset.filtername;
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
    displayList(arrayOfStudents.filter(filterType));
    filteredList = arrayOfStudents.filter(filterType);
    }}
    
// SORTING
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

  let obj = arrayOfStudents.find(obj => obj.id === event.target.dataset.id);
  // special things happening when user tries to expell me from the list -- has to reload site
  if (obj.id === "me"){
    cursed.src = "images/wickedguy.jpeg";
    cursed.classList.add("cursed");
    document.querySelector("#cursedParent").appendChild(cursed)
    let audio = new Audio("sounds/wickedlaugh.mp3");
    audio.play();
    alert("YOU CANNOT EXPELL THE MAGICAL STUDENT! Now your life will cursed!");
    displayList(arrayOfStudents);
  }else{
  // the pos is the position of the element that should be removed
  let pos = arrayOfStudents.indexOf(obj);
  //let expStudent = arrayOfStudents.splice(pos, 1);
  arrayOfStudents.splice(pos, 1);
  let expStudentList = [];
  // push the object to the expelled student list -- not working yet
 // expStudentList.push(obj);
  //console.log(expStudentList);
  }
  filterList(arrayOfStudents);
  }
// show status of expelled students
/* 
function showStatus(){
  I could set a counter on click of the remove button and set the counter to ++, show the count on the site
} */
// Inquisitorial Squad 
document.querySelector("#iSquad").addEventListener("click", () => inquiSquad());

function inquiSquad(){
  if(selStudent.inSquad){ 
    return removeFromSquad(); // return will stop the function and go to removeFromSquad function
  }

  console.log(selStudent);
  if(selStudent.blood === "pure" || selStudent.house === "Slytherin"){
    selStudent.inSquad = true;
    inquisitSquadArray.push(selStudent);
    modalColor.style.display = "none";

    console.log(inquisitSquadArray);
  }else{
    alert("You cannot appoint this student to the Inquisitorial Squad!");
  }
}

function removeFromSquad(){
 console.log("already in squad")    
 document.querySelector("#squad-status").innerHTML = "<span class='bolder'>Inquisitorial Squad: </span>" + "not a member";;
 document.querySelector("#iSquad").innerHTML = "Add to Inquisitorial Squad";
 selStudent = "";
 inquisitSquadArray.filter(obj => obj.id === selStudent.id);
}
