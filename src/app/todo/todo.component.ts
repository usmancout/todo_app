import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {NgForOf} from '@angular/common';
import {DoneComponent} from '../done/done.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [FormsModule, CdkDropList, CdkDrag, NgForOf, DoneComponent]
})
export class TodoComponent implements OnInit {
  todo: string[] = [];
  done: string[] = [];
  newTodo: string = ''; // Holds the input value for the To do list

  ngOnInit() {
    this.loadTasks();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.saveTasks();
  }

  addTask(list: string) {
    if (list === 'todo' && this.newTodo.trim()) {
      this.todo.push(this.newTodo.trim());
      this.newTodo = ''; // Clear the input after adding
    }
    this.saveTasks();
  }

  markAsDone(index: number) {
    const task = this.todo.splice(index, 1)[0]; // Remove from To Do
    this.done.push(task); // Add to Done list
    this.saveTasks();
  }

  deleteTask(list: string, index: number) {
    if (list === 'todo') {
      this.todo.splice(index, 1);
    } else if (list === 'done') {
      this.done.splice(index, 1);
    }
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('todo', JSON.stringify(this.todo));
    localStorage.setItem('done', JSON.stringify(this.done));
  }

  loadTasks() {
    const todoData = localStorage.getItem('todo');
    const doneData = localStorage.getItem('done');
    this.todo = todoData ? JSON.parse(todoData) : [];
    this.done = doneData ? JSON.parse(doneData) : [];
  }
}
