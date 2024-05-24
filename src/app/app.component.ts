import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  TaskDialogComponent,
  TaskDialogResult,
} from './task-dialog/task-dialog.component';
import { Task } from './task/task';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'kanban-fire';
  // hard code
  /* todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
    },
  ];
  inProgress: Array<Task> = new Array();
  done: Task[] = []; */
  // soft code
  // PREV VERSION - bfr optimization
  /* todo = this.store
    .collection('todo')
    .valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store
    .collection('inProgress')
    .valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store
    .collection('done')
    .valueChanges({ idField: 'id' }) as Observable<Task[]>; */
  todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<
    Task[]
  >;
  done = getObservable(this.store.collection('done')) as Observable<Task[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    console.log(list);
    console.log(task);
    //throw new Error('Method not implemented.');
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        /* const dataList = this[list];   // in-memory storage
        const taskIndex = dataList.indexOf(task); */
        if (result.delete) {
          //dataList.splice(taskIndex, 1);   // in-memory storage
          this.store.collection(list).doc(task.id).delete();
        } else {
          //dataList[taskIndex] = task;   // in-memory storage
          this.store.collection(list).doc(task.id).update(task);
        }
      });
  }

  // PREV VERSION
  /* drop(event: CdkDragDrop<Task[]>): void {
    console.log(event);
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    // TODO: handling the case of reordering tasks in the same swimlane
    // - docs: https://material.angular.io/cdk/drag-drop/overview
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  } */

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });

    // TODO: handling the case of reordering tasks in the same swimlane
    // - docs: https://material.angular.io/cdk/drag-drop/overview
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        //this.todo.push(result.task);   // in-memory storage
        this.store.collection('todo').add(result.task);
      });
  }
}
