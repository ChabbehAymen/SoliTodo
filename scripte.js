let prioritiesTasks = [];
let allTasks = [];
let completedTasks = [];

document.querySelector(".aside-save-btn").addEventListener("click", () => {
  if (document.querySelector('input[type="checkbox"]').checked) {
    prioritiesTasks.push(createTask());
  } else {
    allTasks.push(createTask());
  }

  updateUi();
});

function updateUi() {
  let allTasksDiv = document.querySelector(".all-todos");
  let prioritiesTasksDiv = document.querySelector(".priority-todos");
  let completedTasksDiv = document.querySelector(".completed-todos");
  allTasksDiv.innerHTML = "";
  prioritiesTasksDiv.innerHTML = "";
  completedTasks.innerHTML = "";
  appendChildren(allTasksDiv, allTasks);
  appendChildren(prioritiesTasksDiv, prioritiesTasks);
  appendChildren(completedTasksDiv, completedTasks);
}

// creates tasks item
function createTask() {
  let todoItemContainer = createTaskItemContainer();
  appendChildren(todoItemContainer, [
    createItemHeader(),
    craeteItemDiscreption(),
    createTaskBtns(todoItemContainer),
  ]);
  return todoItemContainer;
}

function createTaskItemContainer() {
  let container = document.createElement("div");
  container.classList.add("todo-item");
  container.id = allTasks.length;
  return container;
}

// creates header of each task item
function createItemHeader() {
  let header = createHeader();
  let itemDetails = createHeaderDetailsContiner();
  appendChildren(itemDetails, [createHeaderTitle(), createHeaderDate()]);

  appendChildren(header, [createHeaderIndicator(), itemDetails]);

  return header;
}

function createHeader() {
  let header = document.createElement("div");
  header.classList.add("item-header");
  header.addEventListener("click", () => {
    console.log("modify()");
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
  return document.createTextNode(
    document.querySelector('textarea[name="title-textarea"]').value
  );
}

function createHeaderTitle() {
  let title = document.createElement("h3");
  title.appendChild(getHeaderTitleText());
  return title;
}

function getHeaderDateText() {
  return document.createTextNode(
    `${document.querySelector("#start").value} | ${
      document.querySelector("#End").value
    }`
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
  return document.createTextNode(
    document.querySelector('textarea[name="description-textarea"]').value
  );
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
    deleteTask(parent);
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
  if (task.parentNode.classList[1] == "priority-todos")
    prioritiesTasks.pop(task);
  else if (task.parentNode.classList[1] == "all-todos") allTasks.pop(task);
  else completedTasks.pop(task);
  task.parentNode.removeChild(task);
}

function completeTask(task) {
  task.classList.add('completed-item')
  completedTasks.push(task);
  if (task.parentNode.classList[1] == "priority-todos")
    prioritiesTasks.pop(task);
  else if (task.parentNode.classList[1] == "all-todos") allTasks.pop(task);
  updateUi();
}
