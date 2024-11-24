const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const { title, dueDate } = req.body;
  tasks.push({ title, dueDate, completed: false });
  res.redirect('/');
});

app.get('/toggle/:index', (req, res) => {
  const taskIndex = req.params.index;
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  const taskIndex = req.params.index;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
