// Dark Mode Toggle
const darkModeButton = document.getElementById('darkMode');
let isDarkMode = false;

darkModeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#f5f7fa';
    document.body.style.color = isDarkMode ? '#fff' : '#333';
    darkModeButton.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Update card backgrounds
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach(card => {
        card.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#fff';
    });
    
    // Update sidebar
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#fff';
    
    // Update tasks and activities
    const items = document.querySelectorAll('.task, .activity');
    items.forEach(item => {
        item.style.backgroundColor = isDarkMode ? '#3d3d3d' : '#f8fafc';
    });
});

// Task Checkbox Functionality
const taskCheckboxes = document.querySelectorAll('.task input[type="checkbox"]');

taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const label = e.target.nextElementSibling;
        if (e.target.checked) {
            label.style.textDecoration = 'line-through';
            label.style.color = '#64748b';
        } else {
            label.style.textDecoration = 'none';
            label.style.color = isDarkMode ? '#fff' : '#333';
        }
    });
});

// Add Task Button
const addTaskButton = document.querySelector('.add-task');
const tasksList = document.querySelector('.tasks-list');

addTaskButton.addEventListener('click', () => {
    const taskName = prompt('Enter task name:');
    if (taskName) {
        const taskId = `task${Date.now()}`;
        const taskHTML = `
            <div class="task">
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}">${taskName}</label>
                <span class="badge medium">Medium</span>
            </div>
        `;
        tasksList.insertAdjacentHTML('afterbegin', taskHTML);
        
        // Add event listener to new checkbox
        const newCheckbox = document.getElementById(taskId);
        newCheckbox.addEventListener('change', (e) => {
            const label = e.target.nextElementSibling;
            if (e.target.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#64748b';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = isDarkMode ? '#fff' : '#333';
            }
        });
    }
});

// Notifications
const notificationsButton = document.getElementById('notifications');
let hasNotification = true;

notificationsButton.addEventListener('click', () => {
    alert('No new notifications');
    hasNotification = false;
    notificationsButton.style.color = '#64748b';
});