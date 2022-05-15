import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output()
  public onDialogClosed = new EventEmitter();

  @Output()
  public onDialogSubmitted = new EventEmitter();

  public close(): void {
    this.showDialog = false;
    this.onDialogClosed.emit();
  }

  public submit(): void {
    this.onDialogClosed.emit();
  }
}
