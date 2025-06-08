const dayLabels = document.getElementById("dayLabels");
const dayDates = document.getElementById("dayDates");
const selectedDateDisplay = document.getElementById("selectedDate");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskDateLabel = document.getElementById("taskDateLabel");
const taskList = document.getElementById("taskList");

let current = new Date();
let selectedDate = null;
let tasksByDate = {}; // e.g. { '2025-06-01': ['Task1', 'Task2'] }

function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const start = new Date(date);
  start.setDate(date.getDate() + diff);
  return start;
}

function renderWeek(date) {
  const startOfWeek = getStartOfWeek(date);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();

  dayLabels.innerHTML = "";
  dayDates.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const thisDate = new Date(startOfWeek);
    thisDate.setDate(startOfWeek.getDate() + i);

    const label = document.createElement("div");
    label.textContent = days[i];
    dayLabels.appendChild(label);

    const dateDiv = document.createElement("div");
    dateDiv.textContent = thisDate.getDate();

    if (thisDate.toDateString() === today.toDateString()) {
      dateDiv.classList.add("today");
    }
    if (i === 6) {
      dateDiv.classList.add("sunday");
    }

    dateDiv.addEventListener("click", () => {
      document.querySelectorAll(".day-dates div").forEach(el => el.classList.remove("selected"));
      dateDiv.classList.add("selected");

      selectedDate = new Date(thisDate);
      const isoStr = selectedDate.toISOString().split("T")[0];
      selectedDateDisplay.textContent = selectedDate.toDateString();
      renderTasks(isoStr);
    });

    dayDates.appendChild(dateDiv);
  }

  monthSelect.value = current.getMonth();
  yearSelect.value = current.getFullYear();
}

function populateMonthYear() {
  const monthNames = [...Array(12).keys()].map(m =>
    new Date(2000, m).toLocaleString("default", { month: "short" })
  );

  monthSelect.innerHTML = "";
  monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 50; y <= currentYear + 20; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

function addTaskForDate(dateStr, task) {
  if (!tasksByDate[dateStr]) {
    tasksByDate[dateStr] = [];
  }
  tasksByDate[dateStr].push({ text: task, completed: false });
  renderTasks(dateStr);
}

function renderTasks(dateStr) {
  taskList.innerHTML = "";
  taskDateLabel.textContent = new Date(dateStr).toDateString();

  const tasks = tasksByDate[dateStr] || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✅";
    completeBtn.className = "complete-btn";
    completeBtn.title = "Mark as complete";
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks(dateStr);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑";
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete task";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks(dateStr);
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}


document.getElementById("prevWeekBtn").addEventListener("click", () => {
  current.setDate(current.getDate() - 7);
  renderWeek(current);
});

document.getElementById("nextWeekBtn").addEventListener("click", () => {
  current.setDate(current.getDate() + 7);
  renderWeek(current);
});

document.getElementById("todayBtn").addEventListener("click", () => {
  current = new Date();
  renderWeek(current);
  selectedDate = null;
  selectedDateDisplay.textContent = "None";
  taskDateLabel.textContent = "None";
  taskList.innerHTML = "";
});

monthSelect.addEventListener("change", () => {
  current.setMonth(parseInt(monthSelect.value));
  current.setDate(1);
  renderWeek(current);
});

yearSelect.addEventListener("change", () => {
  current.setFullYear(parseInt(yearSelect.value));
  current.setDate(1);
  renderWeek(current);
});

addTaskBtn.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Please select a date to add a task.");
    return;
  }

  const task = prompt("Enter your task:");
  if (task && task.trim() !== "") {
    const isoStr = selectedDate.toISOString().split("T")[0];
    addTaskForDate(isoStr, task.trim());
  }
});

populateMonthYear();
renderWeek(current);
