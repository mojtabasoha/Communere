import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MedicationModel } from '../models/medications.model';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  filterMedications(search: string = ''): Observable<MedicationModel[]> {
    const storedData = localStorage.getItem('medications');
    if (storedData) {
      const data = JSON.parse(storedData) as MedicationModel[];
      return of(
        data.filter((medication) =>
          medication.name.toLowerCase().includes(search)
        )
      );
    }
    return of([]);
  }

  saveMedications(data: MedicationModel): Observable<void> {
    const storedData = localStorage.getItem('medications');
    let medications: MedicationModel[] = [];
    if (storedData) {
      medications = JSON.parse(storedData) as MedicationModel[];
    }
    medications.push(data);
    return new Observable((observer) => {
      setTimeout(() => {
        localStorage.setItem('medications', JSON.stringify(medications));
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
}
