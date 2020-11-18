import { Component, OnInit } from '@angular/core';
import { Entry } from '../service/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      (entries) => (this.entries = entries),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () =>
          (this.entries = this.entries.filter(
            (element) => element !== entry
          )),
        () => alert('Erro ao tentar excluir')
      );
    }
  }
}
