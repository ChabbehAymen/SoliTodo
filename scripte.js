/*
 *
 */
import { clearInputFields } from "./assets/ClearInputFields.mjs";
import TodoTask from "./components/TodoTask.mjs";

let titleTextarea = document.querySelector('textarea[name="title-textarea"]');
let descriptionTextarea = document.querySelector(
  'textarea[name="description-textarea"]'
);
// TODO Clean my ex partner HTML, CSS and JS
let startDate = document.querySelector("#start");
let endDate = document.querySelector("#End");
let prioritySwitch = document.querySelector('input[type="checkbox"]');
let errorMsg = document.querySelector("p");
const saveButton = document.querySelector(".aside-save-btn");
const loader = document.querySelector("#loader");
// defining my custem element
customElements.define("todo-task", TodoTask);

document.querySelector(".aside-save-btn").addEventListener("click", () => {
  if (titleTextarea.value === "" || descriptionTextarea.value === "") {
    errorMsg.textContent = "Please enter a title and description.";
  } else if (emptyDate() || unvalideDate()) {
    errorMsg.textContent = "Please enter a valid date.";
  } else {
    errorMsg.textContent = "";
    saveButton.style.color = "transparent";
    loader.style.display = "inline-block";
    saveButton.style.zIndex = "0";
    setTimeout(() => {
      loader.style.display = "none";
      saveButton.style.zIndex = "1";

      saveButton.style.color = "white";
    }, 800);
    // add the item to it's container
    if (prioritySwitch.checked) {
      document.querySelector(".priority-todos").appendChild(createTask());
      clearInputFields();
    } else {
      document.querySelector(".all-todos").appendChild(createTask());
      clearInputFields();
    }
  }
});

function emptyDate() {
  return startDate.value === "" || endDate.value === "";
}

function unvalideDate() {
  return (
    startDate.value.slice(-2) > endDate.value.slice(-2) ||
    startDate.value.slice(5, -3) > endDate.value.slice(5, -3)
  );
}

document.querySelector(".aside-cancel-btn").addEventListener("click", () => {
  clearInputFields();
});

// creates tasks item
function createTask() {
  let todoItem = document.createElement("todo-task");
  todoItem.setAttributes(
    ["title", "description", "start-date", "end-date"],
    [titleTextarea.value, descriptionTextarea.value, startDate.value, endDate.value]
  );

  return todoItem;
}

// this function will be used when a node will append more than one childe
window.HTMLElement.prototype.setAttributes = function (attributes, values) {
  for (let i = 0; i < attributes.length; i++) {
    console.log(`${attributes[i]}="${values[i]}"`);
    this.setAttribute(attributes[i], values[i]);
  }
}