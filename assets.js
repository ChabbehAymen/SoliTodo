export function clearInputFields() {
  document.querySelectorAll("textarea").forEach((area) => {
    area.value = "";
  });
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document.querySelector('input[type="checkbox"]').checked = false;
}