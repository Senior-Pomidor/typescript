// import makeOrdinal from './makeOrdinal';
// import isFinite from './isFinite';
// import isSafeNumber from './isSafeNumber';

const enum DecimalNumbers {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1_000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,             //   1.000.000.000 (9)
    ONE_TRILLION = 1_000_000_000_000,        //  1.000.000.000.000 (12)
    ONE_QUADRILLION = 1_000_000_000_000_000, // 1.000.000.000.000.000 (15)
};

const MAX_NUMBER: number = 9_007_199_254_740_992;
const MIN_NUMBER: number = -9_007_199_254_740_992 + 1;

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

const makeOrdinal = (word: string): string => {
    console.log(word)

    return word
}

const isFinite = (num: number): boolean => {
    return num < Infinity
}

const isSafeNumber = (num: number): boolean => {
    return num <= MAX_NUMBER && num >= MIN_NUMBER
}

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

export function generateWords(number: number, words: Array<string> = []): string {
    // We’re done
    if (number === 0) {
        return !words.length
            ? 'zero'
            : words.join(' ').replace(/,$/, '');
    }

    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        return generateWords(0, [...words, LESS_THAN_TWENTY[number]])
    }

    if (number < DecimalNumbers.ONE_HUNDRED) {
        const remainder = number % DecimalNumbers.TEN;
        let word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / DecimalNumbers.TEN)];

        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder]

            return generateWords(0, [...words, word])
        }
        

        return generateWords(remainder, [...words, word])
    }

    let remainder: number | null = null
    let word: string = ''

    if (number < DecimalNumbers.ONE_THOUSAND) {
        remainder = number % DecimalNumbers.ONE_HUNDRED;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_HUNDRED)) + ' hundred';
    } else if (number < DecimalNumbers.ONE_MILLION) {
        remainder = number % DecimalNumbers.ONE_THOUSAND;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_THOUSAND)) + ' thousand,';
    } else if (number < DecimalNumbers.ONE_BILLION) {
        remainder = number % DecimalNumbers.ONE_MILLION;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_MILLION)) + ' million,';
    } else if (number < DecimalNumbers.ONE_TRILLION) {
        remainder = number % DecimalNumbers.ONE_BILLION;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_BILLION)) + ' billion,';
    } else if (number < DecimalNumbers.ONE_QUADRILLION) {
        remainder = number % DecimalNumbers.ONE_TRILLION;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_TRILLION)) + ' trillion,';
    } else if (number <= MAX_NUMBER) {
        remainder = number % DecimalNumbers.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / DecimalNumbers.ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    if (!remainder) {
        throw new Error('not correct number')
    }

    return generateWords(remainder, [...words, word])
}
