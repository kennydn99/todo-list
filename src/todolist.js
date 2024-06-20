import todoitem from "./todoitem";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";

let lists = [];

let allTasksView = false;

class TodoList {
    constructor(name) {
        this.id = Date.now().toString();
        this.name = name;
        this.taskList = [];
    }

    addTodoItem(task) {
        this.taskList.push(task);
        saveToLocalStorage(lists);
    }

    removeTodoItem(task) {
        const index = this.taskList.indexOf(task);
        if (index > -1) {
            this.taskList.splice(index, 1);
            saveToLocalStorage(lists);
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            taskList: this.taskList.map(task => task.toJSON())
        };
    }

    static fromJSON(json) {
        const list = new TodoList(json.name);
        list.id = json.id;
        list.taskList = json.taskList.map(todoitem.TodoItem.fromJSON);
        return list;
    }
}

lists = loadFromLocalStorage(TodoList);

const createTodoList = (name) => {
    const myTodoList = new TodoList(name);
    lists.push(myTodoList);
    saveToLocalStorage(lists);
}

const deleteTodoList = (listId) => {
    // Perform any cleanup or additional actions before deleting the todo item
    // For now, let's just log a message
    const index = getListIndex(listId);
    if (index !== -1) {
        lists.splice(index, 1);
        saveToLocalStorage(lists);
    }
}

const updateName = (listId, newName) => {
    const list = getList(listId);
    list.name = newName;
    saveToLocalStorage(lists);
}

const addTodoItemtoList = (listId, todoItem) => {
    const list = getList(listId);
    list.addTodoItem(todoItem);
    saveToLocalStorage(lists);
}

const removeTodoItemFromList = (listId, todoItem) => {
    const list = getList(listId);
    list.removeTodoItem(todoItem);
    saveToLocalStorage(lists);
}

const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

const getList = (listId) => lists.find((list) => list.id === listId);

const getSelectedList = () => lists.find((list) => list.selected);

const setAllTasksView = (state) => allTasksView = state;

const isAllTasksView = () => allTasksView;

const getListForTask = (task) => lists.find(list => list.taskList.includes(task));

export default {
    lists, 
    createTodoList, 
    deleteTodoList, 
    updateName, 
    getList, 
    getSelectedList, 
    addTodoItemtoList, 
    removeTodoItemFromList,
    setAllTasksView,
    isAllTasksView,
    getListForTask
};