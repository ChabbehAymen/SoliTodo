/*
 *
 */
import { InputsHandler } from "./assets/InputsHandler.mjs";
import TodoTask from "./components/TodoTask.mjs";


let inputsHandler = new InputsHandler();
let errorMsgHolder = document.querySelector("p");
const saveButton = document.querySelector(".aside-save-btn");
const loader = document.querySelector("#loader");
// defining my custem element
customElements.define("todo-task", TodoTask);

document.querySelector(".aside-save-btn").addEventListener("click", () => {
  if (!inputsHandler.isTitleAndDescriptionValide()) {
    errorMsgHolder.textContent = "Please enter a title and description.";
  } else if (!inputsHandler.isDatesValide()) {
    errorMsgHolder.textContent = "Please enter a valid date.";
  } else {
    errorMsgHolder.textContent = "";
    saveButton.style.color = "transparent";
    loader.style.display = "inline-block";
    saveButton.style.zIndex = "0";
    setTimeout(() => {
      loader.style.display = "none";
      saveButton.style.zIndex = "1";

      saveButton.style.color = "white";
    }, 800);
    // add the item to it's container
    if (inputsHandler.isPriority) {
      document.querySelector(".priority-todos").appendChild(createTask());
      inputsHandler.clearInputs();
    } else {
      document.querySelector(".all-todos").appendChild(createTask());
      inputsHandler.clearInputs();
    }
  }
});

document.querySelector(".aside-cancel-btn").addEventListener("click", () => {
      inputsHandler.clearInputs();
});

// creates tasks item
function createTask() {
  let todoItem = document.createElement("todo-task");
  todoItem.setAttributes(
    ["title", "description", "start-date", "end-date"],
    [inputsHandler.getTitle, inputsHandler.getDiscreption, inputsHandler.startDate, inputsHandler.endDate]
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