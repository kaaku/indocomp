import {Component, input} from '@angular/core';
import {FieldTree, FormField} from '@angular/forms/signals';
import {NgxFudisModule} from '@funidata/ngx-fudis';

export interface RadioButtonOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-button-group',
  imports: [
    NgxFudisModule,
    FormField
  ],
  templateUrl: './radio-button-group.html',
})
export class RadioButtonGroup {
  readonly field = input.required<FieldTree<string>>();
  readonly options = input.required<RadioButtonOption[]>();
}
