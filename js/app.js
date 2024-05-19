document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.todo-form');
    const input = document.querySelector('input[name="name"]');
    const todoList = document.querySelector('.todo-items');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            input.value = "";
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', function() {
            checkbox.classList.toggle('checked');
        });

        const task = document.createElement('span');
        task.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-task');
        removeButton.innerHTML = '<img src="images/remove.svg"/>';
        removeButton.addEventListener('click', function() {
            li.remove();
        });

        checkboxWrapper.appendChild(checkbox);
        li.appendChild(checkboxWrapper);
        li.appendChild(task);
        li.appendChild(removeButton);

        todoList.appendChild(li);
    }
});
