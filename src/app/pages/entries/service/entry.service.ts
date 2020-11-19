import { Entry } from './entry.model';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/';
import { flatMap } from 'rxjs/operators';
import { CategoryService } from '../../categories/service/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    // Configuração feita para resover problemas da apiFake
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  update(entry: any): Observable<Entry> {
    // Configuração feita para resover problemas da apiFake
    return this.categoryService.getById(entry.id).pipe(
      flatMap((category) => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }

}
