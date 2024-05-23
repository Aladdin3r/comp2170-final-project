document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".todo-form");
  const input = document.querySelector('input[name="name"]');
  const todoList = document.querySelector(".todo-items");
  const errorMessage = document.querySelector(".error-message");

  let taskToRemove;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
      addTask(taskText);
      input.value = "";
      saveData();
      errorMessage.style.display = "none";
    } else {
      errorMessage.textContent = "Task cannot be empty, try again.";
      errorMessage.style.display = "block"; 
    }
  });

  function addTask(taskText) {
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

    // remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-task");
    removeButton.innerHTML = '<img src="images/remove.svg"/>';
    removeButton.addEventListener("click", function () {
      taskToRemove = li;
      handleRemoveTask();
    });

    // edit button
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

    // list appending
    checkboxWrapper.appendChild(checkbox);
    li.appendChild(checkboxWrapper);
    li.appendChild(task);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(removeButton);

    li.appendChild(buttonsDiv);
    todoList.appendChild(li);
  }

  function saveData() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(function (task) {
      tasks.push({
        text: task.querySelector("span").textContent,
        completed: task.querySelector(".checkbox").classList.contains("checked")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
      addTask(task.text);
      if (task.completed) {
        const lastAddedTask = todoList.lastChild;
        lastAddedTask.querySelector(".checkbox").classList.add("checked");
        lastAddedTask.querySelector("span").classList.add("crossed-out");
      }
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

});

