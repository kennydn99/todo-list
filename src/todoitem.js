// This module will handle the creation, manipulation, and management of individual to-do items.
// It should include functions for creating new to-do items, setting their properties 
// (title, description, due date, priority, notes, checklist), updating them, and deleting them.
import {parse, format, isValid} from "date-fns";

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = this.formatDate(dueDate);
        this.priority = priority;
        this.complete = false;
        this.id = Date.now().toString();
    }

    formatDate(dueDate) {
        if (dueDate) {
            const dateObject = parse(dueDate, "yyyy-MM-dd", new Date());
            if (isValid(dateObject)) {
                return format(dateObject, 'MM/dd/yyyy');
            }
        }
        return "";
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    updateDueDate(newDueDate) {
        this.dueDate = this.formatDate(newDueDate);
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            complete: this.complete,
            id: this.id
        };
    }

    static fromJSON(json) {
        const item = new TodoItem(json.title, json.description, json.dueDate, json.priority);
        item.complete = json.complete;
        item.id = json.id;
        item.dueDate = json.dueDate;
        return item;
    }
}

const createTodoItem = (title, description, dueDate, priority) => {
    return new TodoItem(title, description, dueDate, priority);
};

export default {createTodoItem, TodoItem};