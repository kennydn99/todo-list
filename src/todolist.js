class TodoList {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTodoItem(task) {
        this.taskList.push(task);
    }

}