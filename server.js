const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Приклад даних для to-do list
let tasks = [];

app.use(bodyParser.json());

// Отримати список завдань
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Додати нове завдання
app.post('/api/tasks', (req, res) => {
    const newTask = req.body.task;
    tasks.push(newTask);
    res.sendStatus(200);
});

// Видалити завдання за ідентифікатором
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.sendStatus(204);
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
