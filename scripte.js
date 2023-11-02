let titleTextarea = document.querySelector('textarea[name="title-textarea"]');
let discreptionTextarea = document.querySelector(
  'textarea[name="description-textarea"]'
);
let startDate = document.querySelector("#start");
let endDate = document.querySelector("#End");
let prioritySwitch = document.querySelector('input[type="checkbox"]');
let errorMsg = document.querySelector("p");
const saveButton = document.querySelector(".aside-save-btn");
const loader = document.querySelector("#loader");

document.querySelector(".aside-save-btn").addEventListener("click", () => {
  if (titleTextarea.value === "" || discreptionTextarea.value === "") {
    errorMsg.textContent = "Please enter a title and description.";
  } else if (  emptyDate() || unvalideDate() ) {
    errorMsg.textContent = "Please enter a valid date.";
  } else {
    errorMsg.textContent = "";
    saveButton.style.color = "transparent";
    loader.style.display = "inline-block";
    saveButton.style.zIndex = "0";
    // dealy the execution untill the animation ends
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
  return (startDate.value.slice(-2) > endDate.value.slice(-2)) || (startDate.value.slice(5, -3) > endDate.value.slice(5, -3));
}

document.querySelector(".aside-cancel-btn").addEventListener("click", () => {
  clearInputFields();
});

// creates tasks item
function createTask() {
  let todoItemContainer = createTaskItemContainer();
  appendChildren(todoItemContainer, [
    createItemHeader(todoItemContainer),
    craeteItemDiscreption(),
    createTaskBtns(todoItemContainer),
  ]);
  return todoItemContainer;
}

function createTaskItemContainer() {
  let container = document.createElement("div");
  container.classList.add("todo-item");
  return container;
}

// creates header of each task item
function createItemHeader(parent) {
  let header = createHeader();
  let itemDetails = createHeaderDetailsContiner();
  appendChildren(itemDetails, [createHeaderTitle(parent), createHeaderDate()]);

  appendChildren(header, [createHeaderIndicator(), itemDetails]);

  return header;
}

function createHeader() {
  let header = document.createElement("div");
  header.classList.add("item-header");
  return header;
}

function createHeaderIndicator() {
  return document.createElement("hr");
}

function createHeaderDetailsContiner() {
  let container = document.createElement("div");
  container.classList.add("item-details");
  return container;
}

function getHeaderTitleText() {
  return document.createTextNode(titleTextarea.value);
}

function createHeaderTitle(parent) {
  let headerTitelContainer = document.createElement('div');
  headerTitelContainer.classList.add('title-div');
  appendChildren(headerTitelContainer, [createHeaderTitleText(),createEditBtn(parent)])
  return headerTitelContainer;
  
}

function createEditBtn(task) {
  let btn = document.createElement('button');
  btn.classList.add('modify-btn');
  let btnIcon = document.createElement('i');
  btnIcon.classList.add('fa');
  btnIcon.classList.add("fa-pen");
  btn.appendChild(btnIcon);
  btn.addEventListener('click',()=>{
    if(task.id == 'on-edit') {
      exitModifyMode(task);
      btnIcon.classList.add('fa-pen');
      btnIcon.classList.remove('fa-check');
    }
    else {
      modify(task);
      btnIcon.classList.remove('fa-pen');
      btnIcon.classList.add('fa-check');
    }
  });
  return btn
}

function createHeaderTitleText(){
  let title = document.createElement("h3");
  title.appendChild(getHeaderTitleText());
  return title;
}

function getHeaderDateText() {
  return document.createTextNode(
    `${startDate.value} | 
    ${endDate.value}`
  );
}

function createHeaderDate() {
  let date = document.createElement("h4");
  date.appendChild(getHeaderDateText());
  return date;
}

// creates Task Item discription text
function craeteItemDiscreption() {
  let discHolder = document.createElement("p");
  discHolder.appendChild(getTaskDiscText());
  return discHolder;
}

function getTaskDiscText() {
  return document.createTextNode(discreptionTextarea.value);
}

// creates buttons of the task item
function createTaskBtns(parent) {
  let taskBtnsContainer = createTaskBtnsContainer();
  appendChildren(taskBtnsContainer, [
    createDeleteBtn(parent),
    createCompleteBtn(parent),
  ]);
  return taskBtnsContainer;
}

function createTaskBtnsContainer() {
  let container = document.createElement("div");
  container.classList.add("items-btns");
  return container;
}

function createDeleteBtn(parent) {
  let btn = document.createElement("button");
  btn.classList.add("delete-btn");
  let btnIcon = document.createElement('i');
  btnIcon.classList.add('fa');
  btnIcon.classList.add('fa-trash');
  btn.appendChild(btnIcon);
  btn.addEventListener("click", () => {
    parent.classList.add("delete-todo-item-animation");
    setTimeout(() => {
      deleteTask(parent);
    }, 400);
  });
  return btn;
}

function createCompleteBtn(parent) {
  let btn = document.createElement("button");
  btn.classList.add("complete-btn");
  let btnIcon = document.createElement('i');
  btnIcon.classList.add('fa');
  btnIcon.classList.add('fa-check');
  btn.appendChild(btnIcon);
  btn.addEventListener("click", () => {
    completeTask(parent);
  });
  return btn;
}

// this function will be used when a node will append more than one childe
function appendChildren(container, children) {
  children.forEach((child) => {
    container.appendChild(child);
  });
}

function deleteTask(task) {
  task.parentNode.removeChild(task);
}

function completeTask(task) {
  deleteTask(task);
  task.classList.add("completed-item");
  let completedTasksDiv = document.querySelector(".completed-todos");
  completedTasksDiv.appendChild(task);
}

function modify(task) {
  task.id = 'on-edit';
  document.querySelector('main').classList.toggle('set-focuse');
  extractValueFromTaskToInput(task);

  prioritySwitch.disabled = true;
  document.querySelector('.aside-cancel-btn').classList.toggle('disable-style');
  document.querySelector('.aside-save-btn').classList.toggle('disable-style');
}

function exitModifyMode(task) {
  task.id = '';
  document.querySelector('main').classList.toggle('set-focuse');


  task.children[0].children[1].children[0].children[0].innerHTML = titleTextarea.value;
  task.children[1].innerHTML = discreptionTextarea.value;
  task.children[0].children[1].children[1].innerHTML= `${startDate.value} | ${endDate.value}`;

  
  prioritySwitch.disabled = false;
  document.querySelector('.aside-cancel-btn').classList.toggle('disable-style');
  document.querySelector('.aside-save-btn').classList.toggle('disable-style');
}

function extractValueFromTaskToInput(task) {
  titleTextarea.value = task.children[0].children[1].children[0].children[0].innerHTML;
  discreptionTextarea.value = task.children[1].innerHTML;
  startDate.value = task.children[0].children[1].children[1].innerHTML.slice(
    0,
    10
  );
  endDate.value = task.children[0].children[1].children[1].innerHTML.slice(-10);
  if (task.parentNode.classList[1] == "priority-todos") {
    prioritySwitch.checked = true;
  } else {
    prioritySwitch.checked = false;
  }
}

function clearInputFields() {
  document.querySelectorAll("textarea").forEach((area) => {
    area.value = "";
  });
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelector('input[type="checkbox"]').checked = false;
}
