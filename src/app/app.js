// constante qui permet de récupérer le contenu du champ input, form, ul.
const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');
// maniplutaiton du formulaire
form.addEventListener("submit", event => {
    // On supprime le fonctionnement par defaut du submit
    event.preventDefault();
    // On récupère le contenu du champ input
    const value = input.value;
    input.value = '';
    // On ajoute la nouvelle tâche
    addToDo(value);
});
// Création d'un objet todos qui contient les données de la liste
const todos = [
    {
        text: 'Faire les courses',
        done: false,
        editMode: false,
    }
]
// Fonction qui affiche les données de la liste
const displayTodo = () => {
    // Iteration sur la liste
    const todoNode = todos.map((todo, index) => {
        // condition d'affichage de l'édition
        if (todo.editMode){
            // retourne le contenu du mode édition
            return createTodoEditElement(todo, index);
        } else {
            // Retourne un élément li
            return createTodoElement(todo, index);
        }
        
        
    })
    ul.innerHTML = '';
    ul.append(...todoNode);
};
// Création d'un élément li
const createTodoElement = (todo, index) => {  
    const li = document.createElement('li');
    li.innerHTML = `<span class="todo ${ todo.done ? 'done' : ''} "></span>
    <p>${todo.text}</p>
    <button class="delete">Supprimer</button>`;
    // Création du bouton d'édition
    const buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = 'Editer';
    // Ajout de l'évènement au bouton d'édition
    buttonEdit.addEventListener('click', (event) => {
        event.stopPropagation();
        toogleEditMode(index);
    });
    // Fonction pour trigger le toggle
    li.addEventListener('click', event => {
        toogleTodo(index);
    });
    // Fonction qui permet de supprimer une tâche
    li.querySelector('.delete').addEventListener('click', (event) => {
        todos.splice(index, 1);
        // On stop la propagation de l'évènement pour garder le toogle sur la tâche
        event.stopPropagation();
        displayTodo();
    });
    // Ajout du bouton d'édition dans la liste
    li.appendChild(buttonEdit);
    return li;
};

// Fonction qui permet de créer un élément li pour l'édition
const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    // Création du bouton de sauvegarde
    const buttonSave = document.createElement('button');
    buttonSave.innerHTML = 'Sauvegarder';
    // Ajout de l'évènement au bouton de sauvegarde
    buttonSave.addEventListener('click', (event) => {
        editTodo(index, input);
    });
    // Création du bouton d'annulation
    const buttonCancel = document.createElement('button');
    buttonCancel.innerHTML = 'Annuler';
    // Ajout de l'évènement au bouton d'annulation
    buttonCancel.addEventListener('click', (event) => {
        // On stop la propagation de l'évènement pour garder le toogle sur la tâche
        event.stopPropagation();
        toogleEditMode(index);
    });
    li.append(input, buttonSave, buttonCancel);
    return li;

}

// Fonction qui permet de toogle la class done
const toogleTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
}

// Fonction qui permet d'ajouter une nouvelle tâche
const addToDo = (text) => {
    // On pousse la nouvelle tâche dans l'objet todos
    todos.push ({
        text,
        done: false,
    });
    displayTodo();
}

// Création du toogle du mode édition
const toogleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

// Création du mode édition
const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();
}

// Invocation de la fonction displayTodo
displayTodo();