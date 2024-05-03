class TodoList {
    constructor(name) {
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

    deleteTodoList() {
        // Perform any cleanup or additional actions before deleting the todo item
        // For now, let's just log a message
        console.log(`Deleting todo list: ${this.name}`);
    }
}

const createTodoList = (name) => {
    return new TodoList(name);
}

export default createTodoList;