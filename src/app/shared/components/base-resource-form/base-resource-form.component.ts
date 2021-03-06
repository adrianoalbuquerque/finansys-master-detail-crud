import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  protected router: Router;
  protected route: ActivatedRoute;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentyAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(): void {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected setCurrentyAction(): void {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(+params.get('id')))
        )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (error) => alert('Ocorreu um erro no servidor' + error)
        );
    }
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.createPageTitle();
    } else {
      this.editionPageTitle();
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected createPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  private updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  private actionsForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirect/reload page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() => {
        this.router.navigate([baseComponentPath, resource.id, 'edit']);
      });
  }

  private actionsForError(error): void {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Por favor, tente mais tarde!',
      ];
    }
  }

  protected abstract buildResourceForm(): void;
}
