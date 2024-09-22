const enum DecimalNumbers {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1_000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,             // 1.000.000.000 (9)
    ONE_TRILLION = 1_000_000_000_000,        // 1.000.000.000.000 (12)
    ONE_QUADRILLION = 1_000_000_000_000_000, // 1.000.000.000.000.000 (15)
}

const MAX: number = 9_007_199_254_740_992

const LESS_THAN_TWENTY: readonly string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen',
]

const TENTHS_LESS_THAN_HUNDRED: readonly string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
    'eighty', 'ninety',
]

const isSafeNumber = (num: number) => num >= 0 && num <= MAX


const toWords = (number: string): string => {
    const num: number = parseInt(number, 10);

    if (!Number.isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }

    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }

    return generateWords(num)
}

const generateWords = (number: number, words: string[] = []): string => {
    let remainder: number = 0; // остаток от деления на 10
    let word: string = '';     // текущее слово

    // We’re done
    if (number === 0) {
        return !words.length ? 'zero' : words.join(' ').replace(/,$/, '');
    }

    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');

        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;

        word = LESS_THAN_TWENTY[number];
    }

    return 'str'
}
