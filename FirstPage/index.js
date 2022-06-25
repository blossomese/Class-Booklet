const forms = document.querySelector("form");

forms.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  let textInput = document.querySelector(".text-input");
  if (textInput.value.toLowerCase() !== "blossy") {
    alert("Incorrect User Name");
    return;
  }
  localStorage.setItem("user", textInput.value);

  window.location.assign("../secondpage/demo.html");
}
