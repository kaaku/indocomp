import {Component, input} from '@angular/core';
import {FieldTree, FormField} from '@angular/forms/signals';
import {FudisGridColumns, NgxFudisModule} from '@funidata/ngx-fudis';
import {NgOptimizedImage} from '@angular/common';

export interface ImageOption {
  path: string;
  value: string;
  width: number;
  height: number;
  label: string;
}

@Component({
  selector: 'app-radio-button-image-group',
  imports: [
    NgxFudisModule,
    NgOptimizedImage,
    FormField
  ],
  templateUrl: './radio-button-image-group.html',
  styleUrl: './radio-button-image-group.scss',
})
export class RadioButtonImageGroup {
  readonly options = input.required<ImageOption[]>();
  readonly field = input.required<FieldTree<string>>();
  readonly columns = input<FudisGridColumns>('1fr');
}
