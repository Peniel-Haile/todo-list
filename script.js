const taskBody = document.getElementById("taskBody");
const taskTable = document.getElementById("taskTable");

function addTask() {
  const task = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("priorityInput").value;
  const status = document.getElementById("statusInput").value;
  const dueDateValue = document.getElementById("dateInput").value;

  // Validation for all 4 fields
  if (!task) {
    alert("Please enter a task.");
    return;
  }
  if (!priority) {
    alert("Please select a priority.");
    return;
  }
  if (!status) {
    alert("Please select a status.");
    return;
  }
  if (!dueDateValue) {
    alert("Please select a due date.");
    return;
  }

  let daysLeft = "";
  if (dueDateValue) {
    const dueDate = new Date(dueDateValue);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = dueDate - today;
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysLeft = daysLeft >= 0 ? daysLeft : "Overdue";
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${task}</td>
    <td>${priority}</td>
    <td>${status}</td>
    <td>${dueDateValue}</td>
    <td>${daysLeft}</td>
    <td class="delete-col"></td>
  `;

  taskBody.appendChild(row);

  document.getElementById("taskInput").value = "";
  document.getElementById("priorityInput").value = "Medium";
  document.getElementById("statusInput").value = "Not Started";
  document.getElementById("dateInput").value = "";

  updateStats();
  toggleDeleteColumn();
}

function deleteTask(icon) {
  icon.closest("tr").remove();
  updateStats();
  toggleDeleteColumn();
}

function updateStats() {
  const rows = taskBody.querySelectorAll("tr");
  let total = rows.length;
  let completed = 0;
  let todo = 0;
  let overdue = 0;

  rows.forEach(row => {
    const status = row.cells[2].textContent.toLowerCase();
    const daysLeft = row.cells[4].textContent.toLowerCase();

    if (status === "completed") completed++;
    if (status !== "completed") todo++;
    if (daysLeft === "overdue") overdue++;
  });

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("todoTasks").textContent = todo;
  document.getElementById("overdueTasks").textContent = overdue;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  document.getElementById("progressCircle").style.setProperty("--progress", `${percent}%`);
  document.getElementById("progressPercent").textContent = `${percent}%`;
}

function toggleDeleteColumn() {
  taskTable.classList.toggle("hide-delete-column", taskBody.children.length === 0);
}

// Initialize with toggling delete column off (no tasks)
toggleDeleteColumn();
