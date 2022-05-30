import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent {
  @Input()
  public submitText = 'Ok';
  @Input()
  public dialogTitle = 'Title';
  @Input()
  public showDialog = false;
  @Input()
  public hideFooter = false;
  @Input()
  public enableButton = true;

  @Output()
  public onDialogClosed = new EventEmitter<boolean>();

  public close(): void {
    this.showDialog = false;
    this.onDialogClosed.emit(false);
  }

  public submit(): void {
    this.onDialogClosed.emit(true);
  }
}
