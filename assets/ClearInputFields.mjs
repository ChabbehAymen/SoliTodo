/*
*This function was exported as module because of reduce duplication of code(DON'T REPEATE UR SELF)
*this function is used in the TodoTask class and main scripte file
*/  
export function clearInputFields() {
  document.querySelectorAll("textarea").forEach((area) => {
    area.value = "";
  });
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelector('input[type="checkbox"]').checked = false;
}