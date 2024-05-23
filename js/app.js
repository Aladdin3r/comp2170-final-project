document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".todo-form");
  const input = document.querySelector('input[name="name"]');
  const todoList = document.querySelector(".todo-items");
  const errorMessage = document.querySelector(".error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
      addTask(taskText);
      input.value = "";
      errorMessage.style.display = "none"; // Hide error message
    } else {
      errorMessage.textContent = "Task cannot be empty, try again.";
      errorMessage.style.display = "block"; // Show error message
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-wrapper");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", function () {
      checkbox.classList.toggle("checked");
      task.classList.toggle("crossed-out");
    });

    const task = document.createElement("span");
    task.textContent = taskText;

    // remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-task");
    removeButton.innerHTML = '<img src="images/remove.svg"/>';
    removeButton.addEventListener("click", function () {
      li.remove();
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
      });

      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          task.textContent = input.value;
          input.replaceWith(task);
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
});
