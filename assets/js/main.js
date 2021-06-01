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

    showAllTask()
    this.reset();
    e.preventDefault();
}

// Complete task function
function completeTask(id) {
    if (id) {
        const getTask = JSON.parse(localStorage.getItem('amarTask'));
        const currentTask = getTask.find(task => task.id === id);
        currentTask.status = 'Done';

        localStorage.setItem('amarTask', JSON.stringify(getTask));
        showAllTask();
    }
}

// Show all task function
function showAllTask() {
    const taskListArea = document.getElementById('taskListArea');
    taskListArea.innerHTML = '';

    if (localStorage.getItem('amarTask')) {
        const getTask = JSON.parse(localStorage.getItem('amarTask'));

        // add task counter length
        document.getElementById('taskCounter').innerText = getTask.length;
        // add completed counter length
        const competedTask = getTask.filter(task => task.status === 'Done');
        document.getElementById('taskCompletedCount').innerText = competedTask.length;
        // add completed counter length
        const doTask = getTask.filter(task => task.status === 'Do');
        document.getElementById('taskDoCount').innerText = doTask.length;

        
        let indexCounter = 1;
        for (let i = 0; i < getTask.length; i++) {
            const task = getTask[i];

            if (task.status == 'Done') {
                var badgeBg = 'success';
                var badgeIcon = 'check';
            } else {
                var badgeBg = 'warning';
                var badgeIcon = 'sign-out';
            }
            taskListArea.innerHTML += `
                <div class="task-list bg-white shadow pt-4 px-3 pb-2  rounded overflow-hidden my-3">
                    <i class="fa fa-${badgeIcon} badge badge-${badgeBg} mb-2 text-light"><span class="ml-2">${task.status}</span></i>
                    <h6 class="m-0"><strong>${indexCounter++}.</strong> ${task.taskName} </h6>
                    <p class="m-0 float-right mt-2">
                        <i  class="fa fa-trash btn btn-danger btn-sm"></i>
                        <i onClick="completeTask('${task.id}')" class="fa fa-check-square-o btn btn-success btn-sm"></i>
                    </p>
                </div>
            `;
            
        }
    }
}
showAllTask();

