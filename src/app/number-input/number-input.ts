import {Component, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {generateRandomId} from '../utils';

@Component({
  selector: 'app-number-input',
  imports: [],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput implements FormValueControl<number> {
  readonly label = input.required<string>();
  readonly value = model<number>(0);

  protected readonly id = generateRandomId();

  protected onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.value.set(isNaN(value) ? 0 : value);
  }
}
