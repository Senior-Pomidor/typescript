"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWords = generateWords;
const makeOrdinal_1 = __importDefault(require("./makeOrdinal"));
const isFinite_1 = __importDefault(require("./isFinite"));
const isSafeNumber_1 = __importDefault(require("./isSafeNumber"));
;
const MAX_NUMBER = 9007199254740992;
const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen',
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];
function toWords(number, asOrdinal) {
    const num = typeof number === 'string'
        ? parseInt(number, 10)
        : number;
    if (!(0, isFinite_1.default)(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!(0, isSafeNumber_1.default)(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    const words = generateWords(num);
    return asOrdinal ? (0, makeOrdinal_1.default)(words) : words;
}
function generateWords(number, words = []) {
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
        return generateWords(0, [...words, LESS_THAN_TWENTY[number]]);
    }
    if (number < 100 /* DecimalNumbers.ONE_HUNDRED */) {
        const remainder = number % 10 /* DecimalNumbers.TEN */;
        let word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / 10 /* DecimalNumbers.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            return generateWords(0, [...words, word]);
        }
        return generateWords(remainder, [...words, word]);
    }
    let remainder = null;
    let word = '';
    if (number < 1000 /* DecimalNumbers.ONE_THOUSAND */) {
        remainder = number % 100 /* DecimalNumbers.ONE_HUNDRED */;
        word = generateWords(Math.floor(number / 100 /* DecimalNumbers.ONE_HUNDRED */)) + ' hundred';
    }
    else if (number < 1000000 /* DecimalNumbers.ONE_MILLION */) {
        remainder = number % 1000 /* DecimalNumbers.ONE_THOUSAND */;
        word = generateWords(Math.floor(number / 1000 /* DecimalNumbers.ONE_THOUSAND */)) + ' thousand,';
    }
    else if (number < 1000000000 /* DecimalNumbers.ONE_BILLION */) {
        remainder = number % 1000000 /* DecimalNumbers.ONE_MILLION */;
        word = generateWords(Math.floor(number / 1000000 /* DecimalNumbers.ONE_MILLION */)) + ' million,';
    }
    else if (number < 1000000000000 /* DecimalNumbers.ONE_TRILLION */) {
        remainder = number % 1000000000 /* DecimalNumbers.ONE_BILLION */;
        word = generateWords(Math.floor(number / 1000000000 /* DecimalNumbers.ONE_BILLION */)) + ' billion,';
    }
    else if (number < 1000000000000000 /* DecimalNumbers.ONE_QUADRILLION */) {
        remainder = number % 1000000000000 /* DecimalNumbers.ONE_TRILLION */;
        word = generateWords(Math.floor(number / 1000000000000 /* DecimalNumbers.ONE_TRILLION */)) + ' trillion,';
    }
    else if (number <= MAX) {
        remainder = number % 1000000000000000 /* DecimalNumbers.ONE_QUADRILLION */;
        word = generateWords(Math.floor(number / 1000000000000000 /* DecimalNumbers.ONE_QUADRILLION */)) +
            ' quadrillion,';
    }
    if (!remainder) {
        throw new Error('not correct number');
    }
    return generateWords(remainder, [...words, word]);
}
