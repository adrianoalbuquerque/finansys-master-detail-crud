import { Entry } from './entry.model';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/';
import { catchError, flatMap } from 'rxjs/operators';
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
      return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: any): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    // Configuração feita para resover problemas da apiFake
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

}
