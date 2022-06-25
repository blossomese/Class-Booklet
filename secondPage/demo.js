let items = JSON.parse(localStorage.getItem("class")) || {};

const dropDown = document.querySelector(".drop-down");
const submit = document.querySelector(".submit");
const allClasses = document.querySelector(".classes");
const dashBoard = document.querySelector(".dash");
const modal = document.querySelector(".modal-content");
const cancelButton = document.querySelector(".checked");
const edit = document.querySelector(".button");
const home = document.querySelector(".home");

//selection for the classes side bar
const j1a = document.querySelector(".j1a");
const j1b = document.querySelector(".j1b");
const j2a = document.querySelector(".j2a");
const j2b = document.querySelector(".j2b");

//Selection for the first form of input
const name = document.querySelector(".name");
const ca = document.querySelector(".ca");
const caTest = document.querySelector(".ca-test");
const exam = document.querySelector(".exam");

//Selection for the second form of input
const editName = document.querySelector(".edit-name");
const editCa = document.querySelector(".edit-ca");
const editCaTest = document.querySelector(".edit-ca-test");
const editExam = document.querySelector(".edit-exam");

// Function that display Admin's name
let users = localStorage.getItem("user");
let welcome = document.querySelector(".welcome");
welcome.textContent = "Welcome to class " + users.toLowerCase();
window.addEventListener("load", () => {
  home.classList.remove("home");
});

let defaultClass = "jss1a";
let students = [];
let studenIndex = -1;

allClasses.addEventListener("click", (e) => {
  console.log(e.target.textContent);

  if (e.target.getAttribute("class") == "dashboard") {
    home.classList.add("hide");
    home.classList.remove("home");
    dashBoard.classList.remove("hide");
    dashBoard.classList.add("show");
  } else {
    defaultClass = e.target.textContent.toLowerCase();
    students = [];
    home.classList.remove("hide");
    home.classList.add("home");
    home.innerHTML = "";

    dashBoard.classList.add("hide");
    dashBoard.classList.remove("show");
    tableCreate();
  }
});

submit.addEventListener("click", () => {
  if (name.value.trim() === "") {
    alert("name cannot be empty");
    return;
  }
  if (!items[dropDown.value]) {
    items[dropDown.value] = [
      {
        name: name.value,
        ca: ca.value ? ca.value : 0,
        caTest: caTest.value ? caTest.value : 0,
        exam: exam.value ? exam.value : 0,
      },
    ];
  } else {
    items[dropDown.value].push({
      name: name.value,
      ca: ca.value ? ca.value : 0,
      caTest: caTest.value ? caTest.value : 0,
      exam: exam.value ? exam.value : 0,
    });
  }

  localStorage.setItem("class", JSON.stringify(items));
  //localStorage.clear()
});

cancelButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

function deleteItem(i) {
  console.log(items);
  items[defaultClass].splice(i, 1);
  localStorage.setItem("class", JSON.stringify(items));
  location.reload(true);
}

//assign index to edit to a varaible outside
//get default class and find student with an index of student index

function showModal(i) {
  modal.classList.add("show");
  studenIndex = i;
  console.log(i);

  editName.value = items[defaultClass][i].name;
  editCa.value = items[defaultClass][i].ca;
  editCaTest.value = items[defaultClass][i].caTest;
  editExam.value = items[defaultClass][i].exam;
}

 edit.addEventListener("click", () => {
   items[defaultClass][studenIndex].name = editName.value;
   items[defaultClass][studenIndex].ca = editCa.value;
   items[defaultClass][studenIndex].caTest = editCaTest.value;
   items[defaultClass][studenIndex].exam = editExam.value;

   localStorage.setItem("class", JSON.stringify(items));
   location.reload(true);
 });

function tableCreate() {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  // Adding the entire table to the body tag

  home.appendChild(table);

  students = items[defaultClass];
  let row_1 = document.createElement("tr");

  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Student Name";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "C/A";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "C/A Test";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "Exam";
  let heading_5 = document.createElement("th");
  heading_5.innerHTML = "Edit/Delete";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  thead.appendChild(row_1);

  for (let i = 0; i < students?.length; i++) {
    let row_2 = document.createElement("tr");
    let row_2_data_1 = document.createElement("td");
    row_2_data_1.innerHTML = students[i].name;
    let row_2_data_2 = document.createElement("td");
    row_2_data_2.innerHTML = students[i].ca;
    let row_2_data_3 = document.createElement("td");
    row_2_data_3.innerHTML = students[i].caTest;
    let row_2_data_4 = document.createElement("td");
    row_2_data_4.innerHTML = students[i].exam;
    let row_2_data_5 = document.createElement("svg");
    row_2_data_5.innerHTML =
      "<img src='./images/edit.svg' onclick='showModal(" + i + ")'/>";
    let row_2_data_6 = document.createElement("svg");
    row_2_data_6.innerHTML =
      "<img src='./images/delete.svg' onclick='deleteItem(" + i + ")'/>";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);
    row_2.appendChild(row_2_data_5);
    row_2.appendChild(row_2_data_6);
    tbody.appendChild(row_2);
  }
}
