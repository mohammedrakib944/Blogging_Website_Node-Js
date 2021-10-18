const container = document.getElementById("contain");
function showLogin() {
  const login = document.querySelector(".login");

  login.classList.add("showLogin");
}

function gotoReg() {
  const login = document.querySelector(".login");
  const reg = document.querySelector(".Registration");

  login.classList.remove("showLogin");
  reg.classList.add("showReg");
}

function gotoLogin() {
  const login = document.querySelector(".login");
  const reg = document.querySelector(".Registration");

  login.classList.add("showLogin");
  reg.classList.remove("showReg");
}

function closeReg() {
  const reg = document.querySelector(".Registration");
  reg.classList.remove("showReg");
}

function closeLogin() {
  const login = document.querySelector(".login");
  login.classList.remove("showLogin");
}
