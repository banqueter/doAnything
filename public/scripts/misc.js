///////////////////////////////////////////////////////////////////////
// Selectors //
///////////////////////////////////////////////////////////////////////

// Select the form element
const form = document.querySelector("form");
// Select any checkbox
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// Select both <a> tags in the header
const links = document.querySelectorAll("header a");
// Select the textarea
const textarea = document.querySelector("textarea");
// Select the textarea's name attribute
const textAName = document.querySelector('textarea[name="newTodo"]');
// Select the body
const body = document.getElementsByTagName("body")[0];

///////////////////////////////////////////////////////////////////////
// Flags/presets //
///////////////////////////////////////////////////////////////////////

// Variable to keep track of whether a new todo was added or not:
// Any value in local storage set to true? a)Y: true! c)No: false c)No result: false
let newTodoAdded =
  localStorage.getItem("newTodoAdded") === "true" ? true : false;
// Add an event listener to intercept the form submission
form.addEventListener("submit", () => {
  // Set newTodoAdded to true => (do play write on reload)
  newTodoAdded = true;
  localStorage.setItem("newTodoAdded", newTodoAdded);
});

// Keep track of wheter the page has been loaded the first time or not
let firstLoad = sessionStorage.getItem("firstLoad") === "false" ? false : true;
// Play the 'whoosh' sound effect when the client loads an endpoint except
function playWhoosh() {
  if (!firstLoad) {
    const whoosh = new Audio("/sounds/whoosh.mp3");
    whoosh.play();
  } else {
    firstLoad = false;
    // Saving variable to the local storage
    sessionStorage.setItem("firstLoad", firstLoad);
  }
}

///////////////////////////////////////////////////////////////////////
// Event listeners //
///////////////////////////////////////////////////////////////////////

textarea.addEventListener("input", function () {
  textAreaAdjust(this);
});

// Allowing client to press "Enter" to submit the form
textAName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    form.submit();
    // Set newTodoAdded to true => (do not play write on reload)
    newTodoAdded = true;
    localStorage.setItem("newTodoAdded", newTodoAdded);
  }
});

// Toggle endpoint if "Tab" is pressed
window.addEventListener("keydown", function (event) {
  if (event.key === "Tab") {
    // Set newTodoAdded to false => (do not play write on reload)
    newTodoAdded = false;
    localStorage.setItem("newTodoAdded", newTodoAdded);
    if (window.location.pathname === "/list1") {
      event.preventDefault();
      window.location.href = "/list2";
    } else if (window.location.pathname === "/list2") {
      event.preventDefault();
      window.location.href = "/list1";
    }
  }
});

// Call saveCheckboxState whenever the user interacts with a checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", saveCheckboxState);
});
// Add an event listener to call loadCheckboxState when the page is loaded
window.addEventListener("load", loadCheckboxState);

///////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////

// Mark a todo as done
function toggleStrikeThrough(checkbox) {
  checkbox.classList.toggle(`shadowed`);
  const label = checkbox.nextElementSibling;
  label.classList.toggle("strikethrough");
  const parent = checkbox.parentNode;
  parent.classList.toggle("dark");
  // Play the 'done' sound effect when a checkbox is checked
  // and the 'slap' sound effect when a checkbox is unchecked
  // creating an instance of each, every time
  if (checkbox.checked) {
    const done = new Audio("/sounds/done.mp3");
    done.play();
  } else {
    const slap = new Audio("/sounds/slap.mp3");
    slap.play();
  }
}

// Save the state of the checkboxes to local storage
function saveCheckboxState() {
  checkboxes.forEach((checkbox) => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
}
// Load the state of the checkboxes from local storage and toggle classes
function loadCheckboxState() {
  checkboxes.forEach((checkbox) => {
    const checked = localStorage.getItem(checkbox.id);
    checkbox.checked = checked === "true";
    if (checkbox.checked) {
      checkbox.classList.toggle("shadowed");
      checkbox.parentNode.classList.toggle("dark");
      const label = checkbox.nextElementSibling;
      label.classList.toggle("strikethrough");
    }
  });
}

// Adjusting textarea according to the amount of text included within
function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = 25 + element.scrollHeight + "px";
}

///////////////////////////////////////////////////////////////////////
// Other
///////////////////////////////////////////////////////////////////////

// Set corresponding endpoint class to the body (in order to swap svg icons accordingly)
if (window.location.pathname === "/list1" || window.location.pathname === "/") {
  body.classList.add("list1");
  body.classList.remove("list2");
} else if (window.location.pathname === "/list2") {
  body.classList.add("list2");
  body.classList.remove("list1");
}

// Set newTodoAdded to false to indicate that a new todo was not added
links.forEach(() => {
  // Set newTodoAdded to false => (do not play write on reload)
  newTodoAdded = false;
  localStorage.setItem("newTodoAdded", newTodoAdded);
});

// Play the 'whoosh' or the 'write' sound effect if a new todo was/n't added
if (newTodoAdded) {
  const write = new Audio("/sounds/write.mp3");
  write.play();
  // Set newTodoAdded to false => (do not play write on reload)
  newTodoAdded = false;
  localStorage.setItem("newTodoAdded", newTodoAdded);
} else {
  playWhoosh();
}
