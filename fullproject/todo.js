document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("task");
    const datetimeInput = document.getElementById("datetime");
    const clearBtn = document.createElement("button");
  
    // Load from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    tasks.forEach(task => addTaskToDOM(task));
  
    // Add task function
    window.addTask = function () {
      const text = taskInput.value.trim();
      const datetime = datetimeInput.value;
  
      if (text === "" || datetime === "") {
        alert("Please enter a task and date/time.");
        return;
      }
  
      const task = { text, datetime, status: "pending" };
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addTaskToDOM(task);
  
      taskInput.value = "";
      datetimeInput.value = "";
    };
  
    // Add task to UI
    function addTaskToDOM(task) {
      const li = document.createElement("li");
      li.className = "task-item";
  
      const taskText = document.createElement("span");
      taskText.textContent = `${task.text} 📅 ${new Date(task.datetime).toLocaleString()}`;
  
      const statusBadge = document.createElement("strong");
      statusBadge.textContent = ` (${task.status}) `;
      statusBadge.style.color = task.status === "completed" ? "green" : task.status === "rejected" ? "red" : "orange";
  
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✅";
      completeBtn.onclick = () => updateStatus(task, "completed");
  
      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "❌";
      rejectBtn.onclick = () => updateStatus(task, "rejected");
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => deleteTask(task);
  
      li.appendChild(taskText);
      li.appendChild(statusBadge);
      li.appendChild(completeBtn);
      li.appendChild(rejectBtn);
      li.appendChild(deleteBtn);
  
      taskList.appendChild(li);
    }
  
    // Update status
    function updateStatus(task, status) {
      task.status = status;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      refreshTasks();
    }
  
    // Delete task
    function deleteTask(taskToDelete) {
      tasks = tasks.filter(task => task !== taskToDelete);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      refreshTasks();
    }
  
    // Refresh UI
    function refreshTasks() {
      taskList.innerHTML = "";
      tasks.forEach(addTaskToDOM);
    }
  
    // Clear all tasks
    clearBtn.textContent = "🧹 Clear All Tasks";
    clearBtn.onclick = () => {
      if (confirm("Are you sure you want to remove all tasks?")) {
        tasks = [];
        localStorage.removeItem("tasks");
        refreshTasks();
      }
    };
  
    document.querySelector(".todo-input").appendChild(clearBtn);
  });
  
