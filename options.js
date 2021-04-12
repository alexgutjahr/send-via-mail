let save = document.getElementById("save");
let reset = document.getElementById("reset");
let email = document.getElementById("email");
let hint = document.getElementById("hint");

chrome.storage.sync.get("email", ({ email }) => {
  document.getElementById("email").value = email;
});

save.addEventListener("click", () => {
  if (invalid(email.value)) {
    return;
  }

  chrome.storage.sync.set({ email: email.value }, () => {
    save.textContent = "Saved 🙌";
    save.classList.remove("btn-outline-dark");
    save.classList.add("btn-outline-success");
  });
});

reset.addEventListener("click", () => {
  chrome.storage.sync.set({ email: null });
  location.reload();
});

function invalid(email) {
  if (email.length == 0) {
    hint.textContent = "Email must not be empty.";
    return true;
  }

  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    hint.textContent = "Email format is not correct, please double-check.";
    return true;
  }

  return false;
}
