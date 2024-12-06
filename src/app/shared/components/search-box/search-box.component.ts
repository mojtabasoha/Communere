import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-search-box',
  imports: [MatIconModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit {
  @Input() placeholder: string = 'Search...';
  @Output() searchChange = new EventEmitter<string>();
  searchTerm = '';
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((searchTerm) => this.searchChange.emit(searchTerm.toLowerCase()))
      )
      .subscribe();
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  resetSearch() {
    this.searchTerm = '';
  }
}
