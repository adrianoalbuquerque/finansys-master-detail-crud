import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntriesModule { }
