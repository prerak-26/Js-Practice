import {formatCentPrice} from '../../scripts/utils/money.js';

describe('Test Suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCentPrice(2095)).toEqual('20.95');
    });

    it('converts 0 cents into dollars', () => {
        expect(formatCentPrice(0)).toEqual('0.00');
    });

    it('round upto the nearest cents', () => {
        expect(formatCentPrice(2000.5)).toEqual('20.01');
    });

    it('round upto the nearest cents', () => {
        expect(formatCentPrice(2000.4)).toEqual('20.00');
    });
});