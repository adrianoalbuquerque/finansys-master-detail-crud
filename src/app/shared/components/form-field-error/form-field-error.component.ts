import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMesage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMesage(): string | null {
    if (this.mustShowMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'Dado obrigatório';
    }
    else if (this.formControl.errors.email) {
      return 'Formato de email inválido';
    }
    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return 'Deve ter no mínimo ' +  requiredLength + ' caracteres';
    }
  }
}
