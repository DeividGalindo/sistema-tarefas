// Seleciona os elementos do DOM
const taskForm = document.getElementById('formulario-tarefas');
const taskInput = document.getElementById('tares'); 
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