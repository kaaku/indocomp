import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxFudisModule} from '@funidata/ngx-fudis';
import {MergerBidding} from './merger-bidding/merger-bidding';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxFudisModule, MergerBidding],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
