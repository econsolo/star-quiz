import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/common/util/util.service';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.css']
})
export class AnswerDialogComponent {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AnswerDialogComponent>,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) private data: any) {

    this.form = data.form;

  }

  /**
   * Validate user's input value and close the dialog
   * @param event Click Button Event
   */
  public gotAnswer(event: Event): void {
    // avoid some ocasionally redirects
    event.preventDefault();

    if (this.form.invalid) {
      this.utilService.showErrors(this.form);
      return;
    }

    // the caller already have user's input value, no need to return it here
    this.dialogRef.close();
  }


}
