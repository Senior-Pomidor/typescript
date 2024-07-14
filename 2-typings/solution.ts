const enum DecimalNumbers {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1_000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,           //         1.000.000.000 (9)
    ONE_TRILLION = 1_000_000_000_000,       //     1.000.000.000.000 (12)
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
