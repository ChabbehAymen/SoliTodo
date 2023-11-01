let titleTextarea = document.querySelector('textarea[name="title-textarea"]');
let discreptionTextarea = document.querySelector(
  'textarea[name="description-textarea"]'
);
let startDay = document.querySelector("#start");
let endDay = document.querySelector("#End");
let prioritySwitch = document.querySelector('input[type="checkbox"]')

document.querySelector(".aside-save-btn").addEventListener("click", () => {
  if (prioritySwitch.checked) {
    document.querySelector(".priority-todos").appendChild(createTask());
    clearInputFields();

  } else {
    document.querySelector(".all-todos").appendChild(createTask());
    clearInputFields();
  }
});

document.querySelector('.aside-cancel-btn').addEventListener('click', ()=>{
  clearInputFields();
})

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
  let header = createHeader(parent);
  let itemDetails = createHeaderDetailsContiner();
  appendChildren(itemDetails, [createHeaderTitle(), createHeaderDate()]);

  appendChildren(header, [createHeaderIndicator(), itemDetails]);

  return header;
}

function createHeader(parent) {
  let header = document.createElement("div");
  header.classList.add("item-header");
  header.addEventListener("click", () => {
    modify(parent);
  });
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

function createHeaderTitle() {
  let title = document.createElement("h3");
  title.appendChild(getHeaderTitleText());
  return title;
}

function getHeaderDateText() {
  return document.createTextNode(
    `${startDay.value} | 
    ${endDay.value}`
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
  btn.textContent = "Delete";
  btn.addEventListener("click", () => {
    parent.classList.add('delete-todo-item-animation')
    setTimeout(() => {
      deleteTask(parent);
    }, 400);
  });
  return btn;
}

function createCompleteBtn(parent) {
  let btn = document.createElement("button");
  btn.classList.add("complete-btn");
  btn.textContent = "Complete";
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
  titleTextarea.value = task.children[0].children[1].children[0].innerHTML;
  discreptionTextarea.value = task.children[1].innerHTML;
  startDay.value = task.children[0].children[1].children[1].innerHTML.slice(
    0,
    10
  );
  endDay.value = task.children[0].children[1].children[1].innerHTML.slice(-10);
  if (task.parentNode.classList[1] == 'priority-todos') {
    prioritySwitch.checked = true;
  }else{
    prioritySwitch.checked = false;
  }
  deleteTask(task);
}

function clearInputFields() {
  document.querySelectorAll('textarea').forEach((area) => {
    area.value = '';
  });
  document.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });
  document.querySelector('input[type="checkbox"]').checked = false;
}
