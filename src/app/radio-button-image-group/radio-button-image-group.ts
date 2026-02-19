import {Component, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {FudisGridColumns, NgxFudisModule} from '@funidata/ngx-fudis';
import {NgOptimizedImage} from '@angular/common';

export interface ImageOption {
  path: string;
  value: string;
  width: number;
  height: number;
  alt: string;
}

@Component({
  selector: 'app-radio-button-image-group',
  imports: [
    NgxFudisModule,
    NgOptimizedImage
  ],
  templateUrl: './radio-button-image-group.html',
  styleUrl: './radio-button-image-group.scss',
})
export class RadioButtonImageGroup implements FormValueControl<string> {
  readonly options = input.required<ImageOption[]>();
  readonly value = model<string>('');
  readonly columns = input<FudisGridColumns>('1fr');
}
