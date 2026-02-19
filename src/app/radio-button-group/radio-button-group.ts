import {Component, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {NgxFudisModule} from '@funidata/ngx-fudis';

export interface RadioButtonOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-button-group',
  imports: [
    NgxFudisModule
  ],
  templateUrl: './radio-button-group.html',
  styleUrl: './radio-button-group.scss',
})
export class RadioButtonGroup implements FormValueControl<string> {
  readonly options = input.required<RadioButtonOption[]>();
  readonly value = model<string>('');

  protected onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value ?? '');
  }
}
