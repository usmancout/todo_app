import { Component, Input } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf
  ],
  styleUrls: ['./done.component.css']
})
export class DoneComponent {
  @Input() done: string[] = [];

  deleteTask(index: number) {
    this.done.splice(index, 1);
    localStorage.setItem('done', JSON.stringify(this.done));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.saveTasks();
  }


  saveTasks() {
    localStorage.setItem('done', JSON.stringify(this.done));
  }


}
