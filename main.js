/*
 *
 */
import { InputsHandler } from "./assets/InputsHandler.mjs";
import storageHandler from "../data/StorageHandler.mjs";
import TodoTask from "./components/TodoTask.mjs";

let inputsHandler = new InputsHandler();
let errorMsgHolder = document.querySelector("p");
let saveButton = document.querySelector(".aside-save-btn");
let loader = document.querySelector("#loader");
// defining my custem element
customElements.define("todo-task", TodoTask);
let todoItem;

if (localStorage.length) {
  for (const task of storageHandler.getDataFromStorage()) {
     todoItem = document.createElement("todo-task");
    // console.log(task);
    todoItem.setAttributes(
      ['uid',"title", "description", "start-date", "end-date"],
      [task.id, task.title, task.discreption, task.startDate, task.endDate]);
    if (task.isPriority) {
      document.querySelector(".priority-todos").appendChild(todoItem);
    }else if (task.isCompleted) {
      todoItem.classList.add("completed-item");
      document.querySelector(".completed-todos").appendChild(todoItem);
    }else {
      document.querySelector(".all-todos").appendChild(todoItem); 
    }
  }
}

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
      pushTolocalStorage();
      inputsHandler.clearInputs();
    } else {
      document.querySelector(".all-todos").appendChild(createTask());
      pushTolocalStorage();
      inputsHandler.clearInputs();
    }
  }
});

document.querySelector(".aside-cancel-btn").addEventListener("click", () => {
  inputsHandler.clearInputs();
});

// creates tasks item
function createTask() {
  todoItem = document.createElement("todo-task");
  todoItem.setAttributes(
    ['uid',"title", "description", "start-date", "end-date"],
    [
      generateId(),
      inputsHandler.getTitle,
      inputsHandler.getDiscreption,
      inputsHandler.getStartDate,
      inputsHandler.getEndDate,
    ]
  );

  return todoItem;
}


function generateId() {
  return "id" + Math.random().toString(16).slice(2);
}

function pushTolocalStorage() {
  storageHandler.addItemToStorage(taskObject());
}

function taskObject() {
  return {
    id: `${todoItem.uid}`,
    title: inputsHandler.getTitle,
    discreption: inputsHandler.getDiscreption,
    startDate: inputsHandler.getStartDate,
    endDate: inputsHandler.getEndDate,
    isCompleted: false,
    isPriority: inputsHandler.isPriority,
  };
}
