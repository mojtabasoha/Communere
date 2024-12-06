import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { MedicationModel } from '../../models/medications.model';
import { FrequencyPipe } from '../../pipes/frequency.pipe';
import { MEDICATIONS_COLUMNS } from '../../models/constants';

@Component({
  selector: 'app-medication-list',
  imports: [MatTableModule, FrequencyPipe],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.css',
})
export class MedicationListComponent {
  @Input() dataSource: MedicationModel[] = [];
  displayedColumns = MEDICATIONS_COLUMNS;
}
