// ======= Get Elements =======
const bookmarkForm = document.forms[0];
const siteNameInput = document.querySelector("[name='sitename']");
const urlInput = document.querySelector("[name='url']");
const iconContainer = document.querySelector(".site-label"); // For appending validation icons

bookmarkForm.onsubmit = (e) => e.preventDefault();

// ======= Validation Functions =======
function isSiteNameValid() {
  const value = siteNameInput.value;
  if (value.length < 3) {
    return false;
  }
  for (let i = 0; i < value.length; ++i) {
    if (value[i] === " ") {
      return false;
    }
  }
  return true;
  // return value.contains(" ")
  // return (
  //   value.length >= 3 && value[0] !== " " && value[value.length - 1] !== " "
  // );
}

function isUrlValid() {
  const urlValue = urlInput.value.trim();
  const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
  return regex.test(urlValue);
}

// ======= Set icon position based on input =======
function setIconPosition(input, iconElement) {
  iconElement.style.top = input.name === "sitename" ? "38px" : "115px";
}

// ======= Remove old icons =======
function clearValidationIcon(input) {
  const suffix = input.name === "sitename" ? "1" : "2";
  const existingErrorIcon = document.querySelector(`.error-icon-${suffix}`);
  const existingSuccessIcon = document.querySelector(`.correct-icon-${suffix}`);
  if (existingErrorIcon) existingErrorIcon.remove();
  if (existingSuccessIcon) existingSuccessIcon.remove();
}

// ======= Create and insert icon =======
let flag = false;
function insertValidationIcon(type, input) {
  const iconDiv = document.createElement("div");
  const suffix = input.name === "sitename" ? "1" : "2";
  iconDiv.className = `${type}-icon ${type}-icon-${suffix}`;
  iconDiv.innerHTML = `<i class="fa-solid fa-${
    type === "error" ? "xmark" : "check"
  }"></i>`;
  setIconPosition(input, iconDiv);
  iconContainer.appendChild(iconDiv);
  flag = true;
}
// === default input shape
function inputDefaultState(input) {
  input.style.cssText = `input:focus {
  border: 1px solid rgb(212, 155, 62);
  outline: none;
  box-shadow: 0 0 10px rgb(250, 208, 141, 0.9);
}`;
  clearValidationIcon(input);
}
// ======= Apply input effects (styles + icons) =======
function applyValidationFeedback(isValid, onBlur, input) {
  const isEmpty = input.value === "";

  clearValidationIcon(input);

  if (isEmpty) {
    // input.style.border = "";
    // input.style.outline = "";
    // if (!onBlur) {
    //   input.style.boxShadow = "0 0 10px rgb(250, 208, 141, 0.9)";
    // } else {
    //   input.style.boxShadow = "none";
    // }
    inputDefaultState(input);
    return;
  }

  if (isValid) {
    input.style.border = "1px solid rgb(0, 200, 0)";
    input.style.boxShadow = onBlur ? "none" : "0 0 10px rgba(0, 200, 0, 0.3)";
    insertValidationIcon("correct", input);
  } else {
    input.style.border = "1px solid rgb(255, 0, 0)";
    input.style.outline = "none";
    input.style.boxShadow = onBlur ? "none" : "0 0 10px rgba(255, 0, 0, 0.3)";
    insertValidationIcon("error", input);
  }
}

// ======= Attach Input Events =======
siteNameInput.addEventListener("input", () =>
  applyValidationFeedback(isSiteNameValid(), false, siteNameInput)
);
siteNameInput.addEventListener("blur", () =>
  applyValidationFeedback(isSiteNameValid(), true, siteNameInput)
);

urlInput.addEventListener("input", () =>
  applyValidationFeedback(isUrlValid(), false, urlInput)
);
urlInput.addEventListener("blur", () =>
  applyValidationFeedback(isUrlValid(), true, urlInput)
);

// ======= Final form check =======
function isFormValid() {
  return (
    isSiteNameValid() &&
    isUrlValid() &&
    siteNameInput.value !== "" &&
    urlInput.value !== ""
  );
}
function createBoxLayer() {
  // Create boxLayer div
  const boxLayer = document.createElement("div");
  boxLayer.className = "boxLayer";

  // Create checkBox container
  const checkBox = document.createElement("div");
  checkBox.className = "checkBox";

  // Top section with dots and close button
  const sec1 = document.createElement("div");
  sec1.className = "sec1";

  const dots = document.createElement("div");
  dots.className = "dots";
  dots.innerHTML = `
    <i class="fa-solid fa-circle dot-1"></i>
    <i class="fa-solid fa-circle dot-2"></i>
    <i class="fa-solid fa-circle dot-3"></i>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.className = "outButton";
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  // Optional: close on click
  closeBtn.onclick = () => boxLayer.remove();

  sec1.appendChild(dots);
  sec1.appendChild(closeBtn);

  // Heading
  const heading = document.createElement("h4");
  heading.textContent =
    "Site Name or Url is not valid, Please follow the rules below:";

  // Rules list
  const boxList = document.createElement("ul");
  boxList.className = "boxList";
  boxList.innerHTML = `
    <li><i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 characters</li>
    <li><i class="fa-regular fa-circle-right"></i> Site URL must be a valid one</li>
  `;

  // Build structure
  checkBox.appendChild(sec1);
  checkBox.appendChild(heading);
  checkBox.appendChild(boxList);
  boxLayer.appendChild(checkBox);

  // Append to main container (recommended)
  document.querySelector(".main-page").appendChild(boxLayer);
}

function removeBoxLayer() {
  const boxLayer = document.querySelector(".boxLayer");
  if (boxLayer) {
    boxLayer.remove();
  }
}

function addRow(siteName, url) {
  const table = document.querySelector("table");

  const row = table.insertRow();
  const indexCell = row.insertCell(0);
  const siteNameCell = row.insertCell(1);
  const siteUrlCell = row.insertCell(2);
  const deleteCell = row.insertCell(3);

  let btnElement = document.createElement("button");
  btnElement.innerHTML = "Delete";

  btnElement.addEventListener("click", function () {
    deleteRow(row);
  });

  let aElement = document.createElement("a");
  aElement.href = url;
  aElement.textContent = siteName;
  aElement.target = "_blank";

  indexCell.textContent = table.rows.length - 1;
  siteNameCell.appendChild(aElement);
  siteUrlCell.textContent = url;
  deleteCell.appendChild(btnElement);
}
function deleteRow(row) {
  const table = document.querySelector("table");
  table.deleteRow(row.rowIndex);
}

const submitBtn = document.querySelector("[name='submit']");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!isFormValid()) {
    createBoxLayer();
    attachOutsideClickOnce();
  } else {
    addRow(siteNameInput.value, urlInput.value);
    inputDefaultState(siteNameInput);
    inputDefaultState(url);
    siteNameInput.value = "";
    urlInput.value = "";
  }
});

function handleClickOutsideBox(event) {
  const boxLayer = document.querySelector(".boxLayer");
  const checkBox = document.querySelector(".checkBox");

  if (boxLayer && checkBox && !checkBox.contains(event.target)) {
    boxLayer.remove();
    document.removeEventListener("click", handleClickOutsideBox);
  }
}

function attachOutsideClickOnce() {
  setTimeout(() => {
    document.addEventListener("click", handleClickOutsideBox);
  }, 1);
}
