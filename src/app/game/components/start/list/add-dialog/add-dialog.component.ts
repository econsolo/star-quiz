import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/common/util/util.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private utilService: UtilService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {

      // total points of current user
      this.form = this.buildFormGroup(data.total);
  }

  /**
   * 1) Validate user's input value and save it in localStorage
   * 2) Close this dialog
   * @param userInfo Name and Email Json Object
   * @param event Click Button Event
   */
  public send(userInfo: any, event: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      this.utilService.showErrors(this.form);
      return;
    }

    this.utilService.save(userInfo);
    this.utilService.snackMsg('Done!');
    this.dialogRef.close();
  }

  /**
   * Build the FormGroup able to control all validations
   * @param total Total of user's points
   */
  private buildFormGroup(total: number): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ]],
      total: [total, []]
    });
  }

}
