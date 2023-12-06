import { readTextFile } from '../readfile';

const lines = readTextFile('./6/test-part1.txt');

export const part1 = lines.reduce<number>(
    (acc, seed, index) => {

    return acc;
}, 0);

export const part2 = lines.reduce<number>(
    (acc, seed, index) => {

    return acc;
}, 0);

console.log(`Day 6 Part 1: ${part1}`);
console.log(`Day 6 Part 2: ${part1}`);''