import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, filter, finalize, of, tap } from 'rxjs';

import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { AddMedicationDialog } from '../dialogs/add-medication-dialog/add-medication-dialog';
import { MedicationListComponent } from '../components/medication-list/medication-list.component';
import { MedicationModel } from '../models/medications.model';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SearchBoxComponent,
    MatButtonModule,
    MedicationListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(SearchBoxComponent) searchBoxComponent!: SearchBoxComponent;
  dialog = inject(MatDialog);
  localstorageService = inject(LocalstorageService);
  medicationData: MedicationModel[] = [];
  filteredMedications: MedicationModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.getMedications().subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMedicationDialog, {
      minWidth: '800px',
      data: {},
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(res => res!==undefined),
        concatMap((res) => this.addMedication(res)),
        concatMap(() => this.getMedications())
      )
      .subscribe();
  }

  getMedications(search = '') {
    this.loading = true;
    return this.localstorageService.filterMedications(search).pipe(
      tap((res: MedicationModel[]) => (this.medicationData = res)),
      finalize(() => (this.loading = false))
    );
  }

  addMedication(data: MedicationModel) {
    this.loading = true;
    if (this.searchBoxComponent) {
      this.searchBoxComponent.resetSearch();
    }
    return this.localstorageService
      .saveMedications(data)
      .pipe(finalize(() => (this.loading = false)));
  }

  onSearchChange(search: string) {
    this.getMedications(search).subscribe();
  }
}
