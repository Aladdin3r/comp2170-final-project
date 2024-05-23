document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".todo-form");
  const inputs = document.querySelectorAll('input[name="name"]');
  const todoLists = document.querySelectorAll(".todo-items");
  const errorMessages = document.querySelectorAll(".error-message");
  const charCounts = document.querySelectorAll("#char-count");
  const submitButtons = document.querySelectorAll("#main-button");
  const MAX_CHARS = 50;

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      const inputLength = input.value.length;
      charCounts[index].textContent = `${inputLength}/${MAX_CHARS}`;
      if (inputLength > MAX_CHARS) {
        charCounts[index].style.color = "red";
        errorMessages[index].textContent = "Woah there speedracer, cut it down a little bit ;)";
        errorMessages[index].style.display = "block";
        submitButtons[index].disabled = true;
      } else {
        charCounts[index].style.color = "white";
        errorMessages[index].style.display = "none";
        submitButtons[index].disabled = false;
      }
    });
  });

  forms.forEach((form, index) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const taskText = inputs[index].value.trim();
      if (taskText.length > MAX_CHARS) {
        errorMessages[index].textContent = "Character limit exceeded. Please shorten your task.";
        errorMessages[index].style.display = "block";
      } else if (taskText) {
        addTask(taskText, todoLists[index]);
        inputs[index].value = "";
        charCounts[index].textContent = `0/${MAX_CHARS}`;
        saveData();
        errorMessages[index].style.display = "none";
      } else {
        errorMessages[index].textContent = "Task cannot be empty, try again.";
        errorMessages[index].style.display = "block";
      }
    });
  });

  function addTask(taskText, targetList) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-wrapper");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", function () {
      checkbox.classList.toggle("checked");
      task.classList.toggle("crossed-out");
      saveData();
    });

    const task = document.createElement("span");
    task.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-task");
    removeButton.innerHTML = '<img src="images/remove.svg"/>';
    removeButton.addEventListener("click", function () {
      taskToRemove = li;
      handleRemoveTask();
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-task");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.textContent;
      input.classList.add("edit-input");

      task.replaceWith(input);
      input.focus();

      input.addEventListener("blur", function () {
        task.textContent = input.value;
        input.replaceWith(task);
        saveData();
      });

      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          task.textContent = input.value;
          input.replaceWith(task);
          saveData();
        }
      });
    });

    checkboxWrapper.appendChild(checkbox);
    li.appendChild(checkboxWrapper);
    li.appendChild(task);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(removeButton);

    li.appendChild(buttonsDiv);
    targetList.appendChild(li);
  }

  function saveData() {
    const data = {
      daily: [],
      weekly: [],
      monthly: []
    };

    todoLists.forEach((list, index) => {
      const listId = list.closest(".todo").id;
      document.querySelectorAll(`#${listId} .task-item`).forEach(function (task) {
        data[listId].push({
          text: task.querySelector("span").textContent,
          completed: task.querySelector(".checkbox").classList.contains("checked"),
        });
      });
    });

    localStorage.setItem("tasks", JSON.stringify(data));
  }

  function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || {
      daily: [],
      weekly: [],
      monthly: []
    };

    Object.keys(tasks).forEach(listId => {
      tasks[listId].forEach(function (task) {
        const list = document.querySelector(`#${listId} .todo-items`);
        addTask(task.text, list);
        if (task.completed) {
          const lastAddedTask = list.lastChild;
          lastAddedTask.querySelector(".checkbox").classList.add("checked");
          lastAddedTask.querySelector("span").classList.add("crossed-out");
        }
      });
    });
  }

  function handleRemoveTask() {
    const dontAskAgain = localStorage.getItem("dontAskAgain");
    if (dontAskAgain === "true") {
      taskToRemove.remove();
      saveData();
    } else {
      showDeleteConfirmationPopup();
    }
  }

  function showDeleteConfirmationPopup() {
    const popup = document.getElementById("delete-confirmation-popup");
    popup.style.display = "block";

    document.getElementById("confirm-delete").addEventListener("click", function () {
      if (document.getElementById("dont-ask-again").checked) {
        localStorage.setItem("dontAskAgain", "true");
      }
      taskToRemove.remove();
      saveData();
      popup.style.display = "none";
    });

    document.getElementById("cancel-delete").addEventListener("click", function () {
      popup.style.display = "none";
    });

    document.querySelector(".close-button").addEventListener("click", function () {
      popup.style.display = "none";
    });
  }

  showTask();

  // card buttons
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const cards = document.querySelectorAll(".todo");

  let currentIndex = 0;

  prevButton.addEventListener("click", function () {
    cards[currentIndex].classList.remove("front");
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    cards[currentIndex].classList.add("front");
  });

  nextButton.addEventListener("click", function () {
    cards[currentIndex].classList.remove("front");
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add("front");
  });
});
