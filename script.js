const taskForm = document.querySelector("form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDeadline = document.getElementById("deadline");
const taskStatus = document.getElementById("status");
const taskList = document.getElementById("task-list");

let tasks = [];
let editingTaskId = null;

// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks added yet.";
        taskList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach((task) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <strong>${task.title}</strong><br>
            Description: ${task.description || "No description"}<br>
            Deadline: ${task.deadline || "No deadline"}<br>
            Status: ${task.status}
            <br><br>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <hr>
        `;

        taskList.appendChild(listItem);
    });
}

// Add or update task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const deadline = taskDeadline.value;
    const status = taskStatus.value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    if (editingTaskId !== null) {
        const task = tasks.find((task) => task.id === editingTaskId);

        task.title = title;
        task.description = description;
        task.deadline = deadline;
        task.status = status;

        editingTaskId = null;
    } else {
        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            deadline: deadline,
            status: status
        };

        tasks.push(newTask);
    }

    taskForm.reset();
    displayTasks();
});

// Edit task
function editTask(id) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return;
    }

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskDeadline.value = task.deadline;
    taskStatus.value = task.status;

    editingTaskId = id;
}

// Delete task
function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    tasks = tasks.filter((task) => task.id !== id);

    displayTasks();
}

// Initial display
displayTasks();