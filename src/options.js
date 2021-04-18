const save = document.getElementById("save");
const reset = document.getElementById("reset");
const email = document.getElementById("email");
const prefix = document.getElementById("prefix");

// Populate the settings with the previously stored values.
chrome.storage.sync.get(["email", "prefix"], (items) => {
  if (items.email !== undefined) {
    email.value = items.email;
  }
  if (items.prefix !== undefined) {
    prefix.value = items.prefix;
  }
});

email.addEventListener("input", () => {
  document.getElementById("email-hint").textContent = "";
});

prefix.addEventListener("input", () => {
  document.getElementById("prefix-hint").textContent = "";
});

save.addEventListener("click", () => {
  let validation = check(email.value, prefix.value);

  if (validation.result === "success") {
    store(email.value.trim(), prefix.value.trim());
  } else {
    let hint = document.getElementById(`${validation.setting}-hint`);
    hint.textContent = validation.message;
  }
});

reset.addEventListener("click", () => {
  chrome.storage.sync.clear(() => {
    location.reload();
  });
});

function check(email, prefix) {
  // Email validation
  if (email.length > 0) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return {
        result: "failure",
        setting: "email",
        message: "Email format is not correct, please double-check.",
      };
    }
  }

  // Prefix validation
  if (prefix.length > 60) {
    return {
      result: "failure",
      setting: "prefix",
      message: "Make sure the prefix does not exceed 60 characters.",
    };
  }

  return { result: "success" };
}

function store(email, prefix) {
  save.disabled = true;
  chrome.storage.sync.set({ email: email, prefix: prefix }, () => {
    alert("Settings saved");
    save.disabled = false;
  });
}

function alert(text) {
  let note = document.getElementById("note");
  note.textContent = text;
  let effect = new KeyframeEffect(note, [{ opacity: 1 }, { opacity: 0 }], {
    duration: 2500,
    fill: "forwards",
  });

  let animation = new Animation(effect, document.timeline);
  animation.play();
}
