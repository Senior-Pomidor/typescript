"use strict";
const MAX = 9007199254740992;
const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
    'eighty', 'ninety',
];
const isSafeNumber = (num) => num >= 0 && num <= MAX;
const toWords = (number) => {
    const num = parseInt(number, 10);
    if (!Number.isFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    return generateWords(num);
};
const generateWords = (number, words = []) => {
    let remainder = 0; // остаток от деления на 10
    let word = ''; // текущее слово
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
    return 'str';
};
