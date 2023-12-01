import { readTextFile } from '../readfile';

export const part1 = readTextFile('./1/input.txt').reduce<number>(
  (acc, line) => {
    const matches: Array<string> = line.match(/\d/g);
    return acc + parseInt((matches?.at(0) || '') + (matches?.at(-1) || ''));
  },
  0
);

console.log(`Day 1 Part 1: ${part1}`);

const letterNumber = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

export const part2 = readTextFile('./1/input.txt').reduce<number>(
  (acc, line) => {
    const matches: Array<string> = Array.from(line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g), (match) => match[1]);
    const firstElement: string = matches?.at(0) || '';
    const lastElement: string = matches?.at(-1) || '';
    const first: string = !isNaN(firstElement as any) ? firstElement : (letterNumber.indexOf(firstElement) + 1) + '';
    const last: string = !isNaN(lastElement as any) ? lastElement : (letterNumber.indexOf(lastElement) + 1) + '';
    
    return acc + parseInt(first + last);
  },
  0
);

console.log(`Day 1 Part 2: ${part2}`);