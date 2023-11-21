

let titleTextarea = document.querySelector('textarea[name="title-textarea"]');
let descriptionTextarea = document.querySelector(
  'textarea[name="description-textarea"]'
);
// TODO Edite my ex partner HTML, CSS and JS 
let startDate = document.querySelector("#start");
let endDate = document.querySelector("#End");
let prioritySwitch = document.querySelector('input[type="checkbox"]');
let errorMsg = document.querySelector("p");
const saveButton = document.querySelector(".aside-save-btn");
const loader = document.querySelector("#loader");

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
  let todoItemContainer = document.createElement("todo-task");
  let title = titleTextarea.value;
  let description = descriptionTextarea.value;
  let startDateText = startDate.value;
  let endDateText = endDate.value;
  setAttributes(
    todoItemContainer,
    ["title", "description", "start-date", "end-date"],
    [title, description, startDateText, endDateText]
  );

  return todoItemContainer;
}

// this function will be used when a node will append more than one childe
function setAttributes(item, attributes, values) {
  for (let i = 0; i < attributes.lenght; i++) {
    console.log(`${attributes[i]}="${values[i]}"`);
    item.setAttribute(attributes[i], values[i]);
  }
}


function extractValueFromTaskToInput(task) {
  titleTextarea.value = task.querySelector("h3").innerText;
  descriptionTextarea.value = task.querySelector("p").innerText;
  startDate.value = task.querySelector("h4").innerText.slice(0, 10);
  endDate.value = task.querySelector("h4").innerText.slice(-10);
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
