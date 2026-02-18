import {Component, computed, signal} from '@angular/core';
import {form, FormField} from "@angular/forms/signals";
import {NgxFudisModule} from '@funidata/ngx-fudis';

type MergerType = '' | 'shipping' | 'rice' | 'spice' | 'rice_spice' | 'siap_saji' | 'rubber' | 'oil';

interface BiddingData {
  companyAGoods: number;
  companyBGoods: number;
  mergerType: MergerType;
  winningBid: string;
}

interface PaymentDistribution {
  companyAShare: number;
  companyBShare: number;
}

const GOOD_VALUE_BY_MERGER_TYPE: Record<MergerType, number> = {
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

  private readonly biddingModel = signal<BiddingData>({
    companyAGoods: 0,
    companyBGoods: 0,
    mergerType: '',
    winningBid: '',
  });

  protected readonly biddingForm = form(this.biddingModel);

  protected readonly validBids = computed<string[]>(() => {
    const {companyAGoods, companyBGoods, mergerType} = this.biddingModel()
    if (companyAGoods === 0 || companyBGoods === 0 || mergerType === '') {
      return [];
    }

    const totalGoods = companyAGoods + companyBGoods;
    const nominalValue = GOOD_VALUE_BY_MERGER_TYPE[mergerType] * totalGoods;
    return [
      nominalValue,
      ...Array.from({length: 40}).map((_, i) => nominalValue + (i + 1) * totalGoods),
    ].map(String);
  });

  protected readonly paymentDistribution = computed<PaymentDistribution | null>(() => {
    const {companyAGoods, companyBGoods, winningBid} = this.biddingModel();
    if (companyAGoods === 0 || companyBGoods === 0 || winningBid === '') {
      return null;
    }

    const totalGoods = companyAGoods + companyBGoods;
    return {
      companyAShare: (companyAGoods / totalGoods) * Number(winningBid),
      companyBShare: (companyBGoods / totalGoods) * Number(winningBid),
    };
  });
}
