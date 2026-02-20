import {ImageOption} from '../radio-button-image-group/radio-button-image-group';

export type MergerType = '' | 'shipping' | 'rice' | 'spice' | 'rice_spice' | 'siap_saji' | 'rubber' | 'oil';

export const GOOD_VALUE_BY_MERGER_TYPE: Record<MergerType, number> = {
  '': 0,
  'shipping': 10,
  'rice': 20,
  'spice': 25,
  'rice_spice': 25,
  'siap_saji': 35,
  'rubber': 30,
  'oil': 40,
}

export const mergerOptions: ImageOption[] = [
  {
    value: 'shipping',
    path: 'img/shipping.png',
    width: 100,
    height: 100,
    label: `Shipping (${GOOD_VALUE_BY_MERGER_TYPE['shipping']} rp)`
  },
  {
    value: 'rice',
    path: 'img/rice.png',
    width: 100,
    height: 100,
    label: `Rice (${GOOD_VALUE_BY_MERGER_TYPE['rice']} rp)`
  },
  {
    value: 'spice',
    path: 'img/spice.png',
    width: 100,
    height: 100,
    label: `Spice (${GOOD_VALUE_BY_MERGER_TYPE['spice']} rp)`
  },
  {
    value: 'rice_spice',
    path: 'img/rice_spice.png',
    width: 100,
    height: 100,
    label: `Rice + Spice (${GOOD_VALUE_BY_MERGER_TYPE['rice_spice']} rp)`
  },
  {
    value: 'siap_saji',
    path: 'img/siap_saji.png',
    width: 100,
    height: 100,
    label: `Siap Saji (${GOOD_VALUE_BY_MERGER_TYPE['siap_saji']} rp)`
  },
  {
    value: 'rubber',
    path: 'img/rubber.png',
    width: 100,
    height: 100,
    label: `Rubber (${GOOD_VALUE_BY_MERGER_TYPE['rubber']} rp)`
  },
  {
    value: 'oil',
    path: 'img/oil.png',
    width: 100,
    height: 100,
    label: `Oil (${GOOD_VALUE_BY_MERGER_TYPE['oil']} rp)`
  }
];
