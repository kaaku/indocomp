import {Component, signal} from '@angular/core';
import {form, FormField} from "@angular/forms/signals";
import {NgxFudisModule} from '@funidata/ngx-fudis';

type CompanyType = '' | 'shipping' | 'rice' | 'spice' | 'rice_spice' | 'siap_saji' | 'rubber' | 'oil';

interface BiddingData {
  companyAGoods: number;
  companyBGoods: number;
  companyType: CompanyType;
}

@Component({
  selector: 'app-merger-bidding',
  imports: [NgxFudisModule, FormField],
  templateUrl: './merger-bidding.html',
  styleUrl: './merger-bidding.scss',
})
export class MergerBidding {

  protected readonly biddingModel = signal<BiddingData>({
    companyAGoods: 0,
    companyBGoods: 0,
    companyType: '',
  });

  protected readonly biddingForm = form(this.biddingModel);
}
