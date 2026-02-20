import {
  Component,
  computed,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
  WritableSignal
} from '@angular/core';
import {form, FormField, max, min, required} from "@angular/forms/signals";
import {NgxFudisModule} from '@funidata/ngx-fudis';
import {NumberInput} from '../number-input/number-input';
import {RadioButtonGroup, RadioButtonOption} from '../radio-button-group/radio-button-group';
import {RadioButtonImageGroup} from '../radio-button-image-group/radio-button-image-group';
import {mergerOptions} from './merger-options';

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
  companyAGoods: NaN,
  companyBGoods: NaN,
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

  protected readonly mergerOptions = mergerOptions;

  private readonly biddingModel = signal<BiddingData>({...INITIAL_DATA});

  protected readonly biddingForm = form(this.biddingModel, (schema) => {
    min(schema.companyAGoods, 1, {message: 'Minimum 1 ship/plantation'});
    min(schema.companyBGoods, 1, {message: 'Minimum 1 ship/plantation'});
    max(schema.companyAGoods, 50, {message: 'Maximum 50 ships/plantations'});
    max(schema.companyBGoods, 50, {message: 'Maximum 50 ships/plantations'});
    required(schema.companyAGoods);
    required(schema.companyBGoods);
    required(schema.mergerType);
    required(schema.winningBid);
  });

  protected readonly visibleBids = signal<number>(DEFAULT_VISIBLE_BIDS);

  private readonly document = inject(DOCUMENT);

  private readonly paymentDistributionCard = viewChild<ElementRef<HTMLDivElement>>('paymentDistributionCard');

  protected readonly validBids = computed<RadioButtonOption[]>(() => {
    const form = this.biddingForm;
    if (!form.companyAGoods().valid() || !form.companyBGoods().valid() || !form.mergerType().valid()) {
      return [];
    }

    const {companyAGoods, companyBGoods, mergerType} = this.biddingModel();
    const totalGoods = companyAGoods + companyBGoods;
    const nominalValue = GOOD_VALUE_BY_MERGER_TYPE[mergerType] * totalGoods;
    const newValidBids = [
      nominalValue,
      ...Array.from({length: this.visibleBids()}).map((_, i) => nominalValue + (i + 1) * totalGoods),
    ].map(bid => ({label: `${bid} rp`, value: bid.toString()}));

    untracked(() => {
      // Check the validity of the current winning bid against the new valid bids and reset it if it's no longer valid
      const currentWinningBid: WritableSignal<string> = this.biddingForm.winningBid().value;
      if (currentWinningBid() && !newValidBids.some(option => option.value === currentWinningBid())) {
        currentWinningBid.set('');
      }
    });

    return newValidBids;
  });

  protected readonly paymentDistribution = computed<PaymentDistribution | null>(() => {
    if (!this.biddingForm().valid()) {
      return null;
    }

    const {companyAGoods, companyBGoods, winningBid} = untracked(() => this.biddingModel());
    const totalGoods = companyAGoods + companyBGoods;
    return {
      companyAShare: (companyAGoods / totalGoods) * Number(winningBid),
      companyBShare: (companyBGoods / totalGoods) * Number(winningBid),
    };
  });

  constructor() {
    effect(() => {
      if (this.paymentDistribution() && this.paymentDistributionCard()) {
        this.paymentDistributionCard()?.nativeElement?.scrollIntoView({behavior: 'smooth'});
      }
    });
  }

  resetForm() {
    this.biddingForm().reset();
    this.biddingModel.set({...INITIAL_DATA});
    this.visibleBids.set(DEFAULT_VISIBLE_BIDS);
    this.document.defaultView?.scrollTo({top: 0, behavior: 'smooth'});
  }

  onShowMoreBids() {
    this.visibleBids.update(current => current + VISIBLE_BIDS_INCREMENT);
  }
}
