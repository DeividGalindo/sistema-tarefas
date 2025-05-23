// Seleciona os elementos do DOM
const taskForm = document.getElementById('formulario-tarefas');
const taskInput = document.getElementById('tarefas'); 
const taskDescInput = document.getElementById('descricao');
const taskList = document.getElementById('listaTarefas');
const totalTasks = document.getElementById('totalTarefas');
const completedTasks = document.getElementById('tarefasCompletas');

// Armazena todas as tarefas
let tasks = [];

// Evento de envio do formulário
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDesc = taskDescInput.value.trim();

    if (taskText !== '') {
        addTask(taskText, taskDesc);
        taskInput.value = '';
        taskDescInput.value = '';
    }
});

// Função para adicionar uma nova tarefa
function addTask(text, description) {
    const task = {
        id: Date.now(),    
        text,           
        description,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}
// Função para exibir todas as tarefas na tela
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-start flex-column gap-2 ${task.completed ? 'list-group-item-success' : ''}`;

        // Bloco de conteúdo (título e descrição)
        const content = document.createElement('div');
        content.className = 'w-100';

        const title = document.createElement('strong');
        title.textContent = task.text;

        const desc = document.createElement('p');
        desc.className = 'mb-1';
        desc.textContent = task.description || '';

        content.appendChild(title);
        if (task.description) content.appendChild(desc);

        // Botões de ação
        const actions = document.createElement('div');
        actions.className = 'btn-group btn-group-sm';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Concluir';
        completeBtn.className = 'btn btn-success';
        completeBtn.onclick = () => toggleComplete(task.id);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.className = 'btn btn-warning';
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.onclick = () => removeTask(task.id);

        // Monta os elementos
        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(content);
        li.appendChild(actions);
        taskList.appendChild(li);
    });

    updateCounts();
}

// Alterna entre concluído e não concluído
function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Edita uma tarefa existente
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Editar título da tarefa:', task.text);
    const newDesc = prompt('Editar descrição da tarefa:', task.description);
    if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(task =>
            task.id === id
                ? { ...task, text: newText.trim(), description: newDesc.trim() }
                : task
        );
        renderTasks();
    }
}

// Remove uma tarefa da lista
function removeTask(id) {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}

// Atualiza os contadores de tarefas
function updateCounts() {
    totalTasks.textContent = `Total: ${tasks.length}`;
    const completed = tasks.filter(task => task.completed).length;
    completedTasks.textContent = `Concluídas: ${completed}`;
}
