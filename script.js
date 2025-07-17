var _a;
var taskList = [];
function renderTasks() {
    var list = document.getElementById('taskList');
    list.innerHTML = '';
    taskList.forEach(function (task, index) {
        var li = document.createElement('li');
        if (task.editing) {
            var input = document.createElement('input');
            input.type = 'text';
            input.value = task.text;
            input.oninput = function (e) {
                var target = e.target;
                taskList[index].text = target.value;
            };
            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.onclick = function () {
                taskList[index].editing = false;
                renderTasks();
            };
            li.appendChild(input);
            li.appendChild(saveBtn);
        }
        else {
            var textNode = document.createTextNode(task.text);
            li.appendChild(textNode);
            var actions = document.createElement('div');
            actions.className = 'actions';
            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = function () {
                taskList[index].editing = true;
                renderTasks();
            };
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function () {
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
function addTask() {
    var input = document.getElementById('taskInput');
    var value = input.value.trim();
    if (value) {
        taskList.push({ text: value, editing: false });
        input.value = '';
        renderTasks();
    }
}
(_a = document.getElementById('addBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addTask);
