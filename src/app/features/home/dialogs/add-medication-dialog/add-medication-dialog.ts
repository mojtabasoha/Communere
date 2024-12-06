import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';

import { noDuplicateTimesValidator } from '../../../../shared/validators/no-duplicate-times.validator';
import { MEDICATION_UNITS, WEEK_DAYS } from '../../models/constants';

@Component({
  selector: 'app-add-medication-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-medication-dialog.html',
  styleUrl: './add-medication-dialog.css',
  providers: [DatePipe],
})
export class AddMedicationDialog {
  private _fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<AddMedicationDialog>);
  submitted = false;
  timeInputCount: number[] = [];
  data = inject(MAT_DIALOG_DATA);
  form: FormGroup;
  units = MEDICATION_UNITS;
  days = WEEK_DAYS;

  constructor(private datePipe: DatePipe) {
    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dosage: [null, [Validators.required, Validators.min(0.1)]],
      unit: ['', Validators.required],
      days: ['', Validators.required],
      timeFrequency: this._fb.array(
        [this._fb.control('', Validators.required)],
        noDuplicateTimesValidator
      ),
      createDate: '',
    });
  }

  get timeFrequency(): FormArray {
    return this.form.get('timeFrequency') as FormArray;
  }

  handleAddTime() {
    if (this.timeFrequency.length < 5) {
      this.timeFrequency.push(this._fb.control(''));
    }
  }

  removeTime(index: number) {
    this.timeFrequency.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.controls['createDate'].setValue(
      this.datePipe.transform(new Date(), 'dd MMMM yyyy')
    );
    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
