import './style.css';
import createTodoItem from './todoitem.js';
import createTodoList from './todolist.js';
import {RenderHeader, RenderContent, ToggleSidePanel} from './UIController.js';

RenderHeader();
RenderContent();
ToggleSidePanel();

const task = createTodoItem('Laundry', 'wash, dry and fold clothes', '', 1);
task.updatePriority(2);
task.updateTitle('Laundry/Sheets');

console.log(task);

const myTodoList = createTodoList('Groceries');
myTodoList.addTodoItem(task);
console.log(myTodoList);

const nextTask = createTodoItem('Exercise', '1 hour weight lifting', '', 2);
myTodoList.updateName('Monday');
myTodoList.addTodoItem(nextTask);
console.log(myTodoList);