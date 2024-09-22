import makeOrdinal from './makeOrdinal';
import isFinite from './isFinite';
import isSafeNumber from './isSafeNumber';

const enum DecimalNumbers {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1_000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,           //   1.000.000.000 (9)
    ONE_TRILLION = 1_000_000_000_000,       //  1.000.000.000.000 (12)
    ONE_QUADRILLION = 1_000_000_000_000_000, // 1.000.000.000.000.000 (15)
    // MAX = 9_007_199_254_740_992,
};

const MAX_NUMBER: number = 9_007_199_254_740_992;

const LESS_THAN_TWENTY: ReadonlyArray<string> = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen',
]

const TENTHS_LESS_THAN_HUNDRED: ReadonlyArray<string> = [
    'zero', 'ten', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
]

function toWords(number: string | number, asOrdinal: boolean): string {
    const num: number = typeof number === 'string'
        ? parseInt(number, 10)
        : number;

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }

    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }

    const words: string = generateWords(num);

    return asOrdinal ? makeOrdinal(words) : words;
}
