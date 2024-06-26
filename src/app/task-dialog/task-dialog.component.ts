import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    console.log(this.data);
    console.log(this.backupTask);

    if (this.data.enableDelete) {
      // WITHOUT THIS WILL CAUSE create new empty todo when click cancel for edit prompt
      this.data.task.title = this.backupTask.title;
      this.data.task.description = this.backupTask.description;
      this.dialogRef.close(this.data);
    }
    this.dialogRef.close();
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
