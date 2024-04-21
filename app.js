document.addEventListener('DOMContentLoaded', function () {
    const taskTitleInput = document.getElementById('taskTitleInput');
    const taskTextInput = document.getElementById('taskTextInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    fetchTasks();

    addTaskBtn.addEventListener('click', addTask);

    taskTextInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                data.forEach(task => {
                    const taskItem = createTaskItem(task);
                    taskList.appendChild(taskItem);
                });
            });
    }

    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskText = taskTextInput.value.trim();
        if (taskTitle !== '') {
            const newTask = { title: taskTitle, text: taskText };
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
                .then(() => {
                    const taskItem = createTaskItem(newTask);
                    taskList.appendChild(taskItem);
                    taskTitleInput.value = '';
                    taskTextInput.value = '';
                });
        }
    }

    function createTaskItem(task) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;
        titleSpan.classList.add('task-title');
        const separator = document.createElement('div');
        separator.classList.add('task-separator');
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            fetch(`/api/tasks/${task.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    li.remove();
                });
        });
        taskInfo.appendChild(titleSpan);
        taskInfo.appendChild(separator);
        taskInfo.appendChild(textSpan);
        li.appendChild(taskInfo);
        li.appendChild(deleteBtn);
        return li;
    }
});
