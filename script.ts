interface Task {
    text: string;
    editing: boolean;
}

let taskList: Task[] = [];

function renderTasks(): void {
    const list = document.getElementById('taskList') as HTMLUListElement;
    list.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');

        if (task.editing) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.text;
            input.oninput = (e: Event) => {
                const target = e.target as HTMLInputElement;
                taskList[index].text = target.value;
            };

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.onclick = () => {
                taskList[index].editing = false;
                renderTasks();
            };

            li.appendChild(input);
            li.appendChild(saveBtn);
        } else {
            const textNode = document.createTextNode(task.text);
            li.appendChild(textNode);

            const actions = document.createElement('div');
            actions.className = 'actions';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => {
                taskList[index].editing = true;
                renderTasks();
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                taskList.splice(index, 1);
                renderTasks();
            };

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(actions);
        }

        list.appendChild(li);
    });
}

function addTask(): void {
    const input = document.getElementById('taskInput') as HTMLInputElement;
    const value = input.value.trim();

    if (value) {
        taskList.push({ text: value, editing: false });
        input.value = '';
        renderTasks();
    }
}

document.getElementById('addBtn')?.addEventListener('click', addTask);
