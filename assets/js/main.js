// Sumbit task form
document.getElementById('toDoFormSumbit').addEventListener('submit', submitTask);
function submitTask(e) {
    const taskName = document.getElementById('taskName').value;
    const id = Math.floor(Math.random() * 100000) + '';
    const status = 'Do';

    const task = { id, status, taskName };
    let allTask = [];

    if (localStorage.getItem('amarTask')) {
        const getTask = JSON.parse(localStorage.getItem('amarTask'));
        allTask = getTask;
    }

    allTask.push(task);
    localStorage.setItem('amarTask', JSON.stringify(allTask));

    this.reset();
    e.preventDefault();
}

