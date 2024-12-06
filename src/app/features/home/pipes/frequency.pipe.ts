import { Pipe, PipeTransform } from '@angular/core';

import { MedicationModel } from '../models/medications.model';

@Pipe({
  name: 'frequency',
})
export class FrequencyPipe implements PipeTransform {
  transform(value: MedicationModel): string {
    let convertedDays = '';
    if (value.days.length === 7) {
      convertedDays = 'Every day';
    } else {
      convertedDays = value.days.join(',');
    }
    return `${convertedDays} at ${value.timeFrequency.join(',')}`;
  }
}
