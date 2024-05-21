let lists = [];

class TodoList {
    constructor(name) {
        this.id = Date.now().toString();
        this.name = name;
        this.taskList = [];
    }

    addTodoItem(task) {
        this.taskList.push(task);
    }

    removeTodoItem(task) {
        const index = this.taskList.indexOf(task);
        if (index > -1) {
            this.taskList.splice(index, 1);
        }
    }
}

const createTodoList = (name) => {
    const myTodoList = new TodoList(name);
    lists.push(myTodoList);
}

const deleteTodoList = (listId) => {
    // Perform any cleanup or additional actions before deleting the todo item
    // For now, let's just log a message
    const index = getListIndex(listId);
    console.log(`list index ${index}`);
    lists.splice(index, 1);
}

const updateName = (listId, newName) => {
    const list = getList(listId);
    list.name = newName;
}

const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

const getList = (listId) => lists.find((list) => list.id === listId);

export default {lists, createTodoList, deleteTodoList, updateName};