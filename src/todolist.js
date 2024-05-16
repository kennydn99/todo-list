let lists = [];

class TodoList {
    constructor(name) {
        this.id = Date.now().toString;
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

    updateName(newName) {
        this.name = newName;
    }
}

const createTodoList = (name) => {
    const myTodoList = new TodoList(name);
    lists.push(myTodoList);
    console.log(lists);
}

const deleteTodoList = (listId) => {
    // Perform any cleanup or additional actions before deleting the todo item
    // For now, let's just log a message
    console.log(`Deleting todo list: ${this.name}, ${this.id}`);
    
}

export default {lists, createTodoList, deleteTodoList};