const app = document.getElementById("app");
const loginBtn = document.getElementById("loginBtn");
const toggleModeBtn = document.getElementById("toggleModeBtn");
const taskList = document.getElementById("taskList");
const calendar = document.getElementById("calendar");
const tabs = document.querySelectorAll(".tab");
const userLabel = document.getElementById("userLabel");
const calendarUsername = document.getElementById("calendarUsername");
const goToCalendar = document.getElementById("goToCalendar");

// Tarefas de exemplo
const tasks = [
  { text: "SUA TAREFA", date: "today", done: true },
  { text: "Tarefa 2", date: "today", done: false },
  { text: "Tarefa 3", date: "other", done: false },
  { text: "Tarefa 4", date: "other", done: false },
];

// Eventos
loginBtn.addEventListener("click", handleLogin);
toggleModeBtn.addEventListener("click", () => app.classList.toggle("dark-mode"));
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderTasks(tab.dataset.filter);
  });
});

goToCalendar.addEventListener("click", () => switchScreen("calendarScreen"));

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    switchScreen(btn.dataset.back);
  });
});

// Funções
function handleLogin() {
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  userLabel.textContent = username.toUpperCase();
  calendarUsername.textContent = username.toUpperCase();
  switchScreen("taskScreen");
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "today") return task.date === "today";
    if (filter === "done") return task.done;
  });

  filtered.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const circle = document.createElement("span");
    circle.className = "circle" + (task.done ? " checked" : "");
    circle.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks(filter);
    });

    taskEl.appendChild(circle);
    taskEl.appendChild(document.createTextNode(task.text));
    taskList.appendChild(taskEl);
  });
}

function renderCalendar() {
  for (let i = 1; i <= 30; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    calendar.appendChild(day);
  }
}

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

// Inicialização
renderTasks();
renderCalendar();
