export class InputsHandler {
    #titleInput = document.querySelector('textarea[name="title-textarea"]');
    #discreptionInput = document.querySelector('textarea[name="description-textarea"]');
    #prioritySwitch = document.querySelector('input[type="checkbox"]');
    #startDateInput = document.querySelector("#start");
    #endDateInput = document.querySelector("#End");
  constructor() {
  }
  get getTitle() {
    return this.#titleInput.value;
  }
  get getDiscreption() {
    return this.#discreptionInput.value;
  }
  get getStartDate() {
    return this.#startDateInput.value;
  }
  get getEndDate() {
    return this.#endDateInput.value;
  }

  get isPriority(){
    return this.#prioritySwitch.checked;
  }

  set setTitle(title) {
    this.#titleInput.value = title;
  }
  set setDiscreption(discreption) {
    this.#discreptionInput.value = discreption;
  }
  set setStartDate(date) {
    this.#startDateInput.value = date;
  }
  set setEndDate(date) {
    this.#endDateInput.value = date;
  }

  inablePrioritySwitch(bool){
    this.#prioritySwitch.disabled = bool;
  }

  clearInputs(){
    this.#titleInput.value ='';
    this.#discreptionInput.value ='';
    this.#startDateInput.value ='';
    this.#endDateInput.value ='';
    this.#prioritySwitch.checked = false;
  }

}
