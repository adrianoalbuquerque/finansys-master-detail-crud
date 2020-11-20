import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list';
import { Entry } from '../service/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
