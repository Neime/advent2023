import { readTextFile } from '../readfile';


const lines = readTextFile('./3/input.txt');
const numbers = [];
export const part1 = lines.reduce<number>(
  (acc, line, index) => {
    const regex = /\d+/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
        const digit = match[0];
        const numberPositionStart = match.index;
        const numberPositionEnd = numberPositionStart + digit.length;
        for (let i = numberPositionStart - 1; i < numberPositionEnd + 1; i++) {
            if (
                line.charAt(i).match(/[^0-9.]/g)
                || (lines[index-1] && lines[index-1].charAt(i).match(/[^0-9.]/g))
                || (lines[index+1] && lines[index+1].charAt(i).match(/[^0-9.]/g))
            ) {
                numbers.push(digit);
                break;
            }
        }
    }
    return numbers.reduce((acc, number) => acc + parseInt(number), 0);
  },
  0
);

console.log(`Day 3 Part 1: ${part1}`);

export const part2 = lines.reduce<number>(
  (acc, line, index) => {
    const regex = /\*/g;
    let match;

    const numbers: Array<number> = [];
    while ((match = regex.exec(line)) !== null) {
        const symbolPosition = match.index;
        const digitsLine = getDigitsAndPosition(line);
        const digitsPrevLine = getDigitsAndPosition(lines[index-1]);
        const digitsNextLine = getDigitsAndPosition(lines[index+1]);

        const matchDigits = digitMatchPosition([...digitsLine, ...digitsNextLine, ...digitsPrevLine], symbolPosition);

        if (matchDigits.length === 2) {
            numbers.push(matchDigits[0] * matchDigits[1]);
        }
    }

    return acc + numbers.reduce((acc, number) => acc + number, 0);
  },
  0
);

interface Digit {
    digit: string;
    startPosition: number;
    endPosition: number;
}

function digitMatchPosition(digits: Array<Digit>, symbolPosition: number): Array<number> {
    const numbers = [];
    digits.forEach((digit) => {
        if (digit.startPosition-1 <= symbolPosition && digit.endPosition+1 >= symbolPosition) {
            numbers.push(digit.digit);
        }
    });
    return numbers;
}

function getDigitsAndPosition(line: string): Array<Digit>
{
    const regex = /\d+/g;
    let match;

    const digits: Array<Digit> = [];
    while ((match = regex.exec(line)) !== null) {
        const digit = match[0];
        const numberPositionStart = match.index;
        const numberPositionEnd = numberPositionStart + digit.length-1;
        
        digits.push({
            digit,
            startPosition: numberPositionStart,
            endPosition: numberPositionEnd,
        });
    }

    return digits;
}
console.log(`Day 3 Part 2: ${part2}`);''