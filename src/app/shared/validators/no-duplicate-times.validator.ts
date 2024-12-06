import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export function noDuplicateTimesValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!(control instanceof FormArray)) {
    return null; // Not a FormArray, no validation needed.
  }

  const times = control.controls.map((c) => c.value); // Extract values from FormArray controls.
  const hasDuplicates = new Set(times).size !== times.length;

  return hasDuplicates ? { duplicateTimes: true } : null;
}
