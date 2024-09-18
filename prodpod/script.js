let pomodoroTimer;
let pomodoroDuration;
let pomodoroMinutes;
let pomodoroSeconds;

function startPomodoro() {
    pomodoroDuration = parseInt(document.getElementById('pomodoro-duration').value);
    pomodoroMinutes = pomodoroDuration;
    pomodoroSeconds = 0;
    pomodoroTimer = setInterval(updatePomodoroTimer, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroTimer);
}

function resetPomodoro() {
    clearInterval(pomodoroTimer);
    document.getElementById('pomodoroTimer').textContent = formatTime(pomodoroDuration, 0);
    pomodoroMinutes = pomodoroDuration;
    pomodoroSeconds = 0;
}

function updatePomodoroTimer() {
    if (pomodoroSeconds === 0) {
        if (pomodoroMinutes === 0) {
            clearInterval(pomodoroTimer);
            alert('Pomodoro session ended!');
            return;
        }
        pomodoroMinutes--;
        pomodoroSeconds = 59;
    } else {
        pomodoroSeconds--;
    }
    document.getElementById('pomodoroTimer').textContent = formatTime(pomodoroMinutes, pomodoroSeconds);
}

function formatTime(minutes, seconds) {
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

document.getElementById('startPomodoro').addEventListener('click', startPomodoro);
document.getElementById('pausePomodoro').addEventListener('click', pausePomodoro);
document.getElementById('resetPomodoro').addEventListener('click', resetPomodoro);

// Dark Mode and Light Mode
document.querySelector('.switch input[type="checkbox"]').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});



// Event Listener for Checkbox Change
document.getElementById('tasks').addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        updateProgressBar();
    }
});


function updateProgressBar() {
    const checkboxes = document.querySelectorAll('#tasks input[type="checkbox"]');
    const completedTasks = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const totalTasks = checkboxes.length;
    const progress = (completedTasks / totalTasks) * 100;
    document.getElementById('progress-bar').value = progress;
}

// Add Task Button Event Listener
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
        taskInput.value = ''; // Clear input field
        updateProgressBar();
    } else {
        alert('Please enter a task.');
    }
});

// Function to add task to the list
function addTask(taskName) {
    const tasksList = document.getElementById('tasks');
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox"> ${taskName}`;
    tasksList.appendChild(li);
}
