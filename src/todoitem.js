// This module will handle the creation, manipulation, and management of individual to-do items.
// It should include functions for creating new to-do items, setting their properties 
// (title, description, due date, priority, notes, checklist), updating them, and deleting them.

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    updateTitle = (newTitle) => {
        this.title = newTitle;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    delete() {
        // Perform any cleanup or additional actions before deleting the todo item
        // For now, let's just log a message
        console.log(`Deleting todo item: ${this.title}`);
    }
}

const createTodoItem = (title, description, dueDate, priority) => {
    return new TodoItem(title, description, dueDate, priority);
};

console.log('hello from todoitem module');