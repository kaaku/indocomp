import {Component, input, model} from '@angular/core';
import {FormValueControl, ValidationError, WithOptionalField} from '@angular/forms/signals';
import {generateRandomId} from '../utils';
import {NgxFudisModule} from '@funidata/ngx-fudis';

@Component({
  selector: 'app-number-input',
  imports: [NgxFudisModule],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput implements FormValueControl<number> {
  readonly label = input.required<string>();
  readonly value = model<number>(0);
  readonly minValue = input<number>();
  readonly maxValue = input<number>();

  readonly dirty = input<boolean>(false);
  readonly touched = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  protected readonly id = generateRandomId();

  protected onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.value.set(isNaN(value) ? 0 : value);
  }
}
