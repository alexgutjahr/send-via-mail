const save = document.getElementById("save");
const reset = document.getElementById("reset");
const email = document.getElementById("email");
const hint = document.getElementById("hint");

// Pre-populate the email address with the stored one.
chrome.storage.sync.get("email", ({ storedEmail }) => {
  if (storedEmail !== undefined) {
    email.value = storedEmail;
  }
});

save.addEventListener("click", () => {
  let validation = validate(email.value);

  if (validation.result == "failure") {
    hint.textContent = validation.message;
  } else {
    hint.textContent = "";
    chrome.storage.sync.set({ email: email.value }, () => {
      save.textContent = "Saved 🙌";
      save.classList.remove("btn-outline-dark");
      save.classList.add("btn-outline-success");
      setTimeout(function () {
        save.textContent = "Save";
        save.classList.add("btn-outline-dark");
        save.classList.remove("btn-outline-success");
      }, 2000);
    });
  }
});

email.addEventListener("input", () => {
  hint.textContent = "";
});

reset.addEventListener("click", () => {
  chrome.storage.sync.clear(() => {
    location.reload();
  });
});

function validate(email) {
  if (email.length == 0) {
    return { result: "failure", message: "Email must not be empty." };
  }

  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return { result: "failure", message: "Email format is not correct, please double-check." };
  }

  return { result: "success" };
}
