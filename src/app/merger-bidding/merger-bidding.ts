import {Component, computed, signal} from '@angular/core';
import {form, FormField} from "@angular/forms/signals";
import {NgxFudisModule} from '@funidata/ngx-fudis';

type CompanyType = '' | 'shipping' | 'rice' | 'spice' | 'rice_spice' | 'siap_saji' | 'rubber' | 'oil';

interface BiddingData {
  companyAGoods: number;
  companyBGoods: number;
  companyType: CompanyType;
  winningBid: string;
}

const GOOD_VALUE_BY_COMPANY_TYPE: Record<CompanyType, number> = {
  '': 0,
  'shipping': 10,
  'rice': 20,
  'spice': 25,
  'rice_spice': 25,
  'siap_saji': 35,
  'rubber': 30,
  'oil': 40,
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
    winningBid: '',
  });

  protected readonly biddingForm = form(this.biddingModel);

  protected readonly validBids = computed<string[]>(() => {
    const {companyAGoods, companyBGoods, companyType} = this.biddingModel()
    if (companyAGoods === 0 || companyBGoods === 0 || companyType === '') {
      return [];
    }

    const totalGoods = companyAGoods + companyBGoods;
    const nominalValue = GOOD_VALUE_BY_COMPANY_TYPE[companyType] * totalGoods;
    return [
      nominalValue,
      ...Array.from({length: 40}).map((_, i) => nominalValue + (i + 1) * totalGoods),
    ].map(value => value.toString());
  });
}
