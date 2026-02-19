import {Component, computed, signal} from '@angular/core';
import {form, FormField} from "@angular/forms/signals";
import {NgxFudisModule} from '@funidata/ngx-fudis';
import {NumberInput} from '../number-input/number-input';
import {RadioButtonGroup, RadioButtonOption} from '../radio-button-group/radio-button-group';
import {ImageOption, RadioButtonImageGroup} from '../radio-button-image-group/radio-button-image-group';

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

const INITIAL_DATA: BiddingData = {
  companyAGoods: 0,
  companyBGoods: 0,
  mergerType: '',
  winningBid: '',
}

const DEFAULT_VISIBLE_BIDS = 40;
const VISIBLE_BIDS_INCREMENT = 20;

@Component({
  selector: 'app-merger-bidding',
  imports: [NgxFudisModule, FormField, NumberInput, RadioButtonGroup, RadioButtonImageGroup],
  templateUrl: './merger-bidding.html',
  styleUrl: './merger-bidding.scss',
})
export class MergerBidding {

  protected readonly mergerOptions: ImageOption[] = [
    {
      value: 'shipping',
      path: 'img/shipping.png',
      width: 100,
      height: 100,
      alt: 'Shipping Merger'
    },
    {
      value: 'rice',
      path: 'img/rice.png',
      width: 100,
      height: 100,
      alt: 'Rice Merger'
    },
    {
      value: 'spice',
      path: 'img/spice.png',
      width: 100,
      height: 100,
      alt: 'Spice Merger'
    },
    {
      value: 'rice_spice',
      path: 'img/rice_spice.png',
      width: 100,
      height: 100,
      alt: 'Rice & Spice Merger'
    },
    {
      value: 'siap_saji',
      path: 'img/siap_saji.png',
      width: 100,
      height: 100,
      alt: 'Siap Saji Merger'
    },
    {
      value: 'rubber',
      path: 'img/rubber.png',
      width: 100,
      height: 100,
      alt: 'Rubber Merger'
    },
    {
      value: 'oil',
      path: 'img/oil.png',
      width: 100,
      height: 100,
      alt: 'Oil Merger'
    }
  ];

  private readonly biddingModel = signal<BiddingData>({...INITIAL_DATA});

  protected readonly biddingForm = form(this.biddingModel);

  protected readonly visibleBids = signal<number>(DEFAULT_VISIBLE_BIDS);

  protected readonly validBids = computed<RadioButtonOption[]>(() => {
    const {companyAGoods, companyBGoods, mergerType} = this.biddingModel();
    if (companyAGoods === 0 || companyBGoods === 0 || mergerType === '') {
      return [];
    }

    const totalGoods = companyAGoods + companyBGoods;
    const nominalValue = GOOD_VALUE_BY_MERGER_TYPE[mergerType] * totalGoods;
    return [
      nominalValue,
      ...Array.from({length: this.visibleBids()}).map((_, i) => nominalValue + (i + 1) * totalGoods),
    ].map(bid => ({label: `${bid} rp`, value: bid.toString()}));
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

  resetForm() {
    this.biddingModel.set({...INITIAL_DATA});
    this.visibleBids.set(DEFAULT_VISIBLE_BIDS);
  }

  onShowMoreBids() {
    this.visibleBids.update(current => current + VISIBLE_BIDS_INCREMENT);
  }
}
