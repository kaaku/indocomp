import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxFudisModule} from '@funidata/ngx-fudis';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxFudisModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
