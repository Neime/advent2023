import { readTextFile } from '../readfile';

const lines = readTextFile('./9/input.txt');

const histories: number[][] = lines.map((line) => line.split(" ").map(Number))

console.time('Execution Time');

export const part1 = histories.reduce((acc, history) => {
    let nextHistory: number[]  = history;
    
    const placeholders: number[] = nextHistory.slice(-1);

    while (!nextHistory.every(v => v === nextHistory[0])) {
        nextHistory = nextHistory.reduce((acc, value, index) => {
            if (nextHistory.length > index+1) acc.push(nextHistory[index+1] - value);
            return acc;
        }, [] as number[]);
        
        placeholders.push(...nextHistory.slice(-1));
    };
    
    return acc + placeholders.reduce((acc, value) => acc + value, 0);
}, 0);

console.log(`Day 9 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');

export const part2 = histories.reduce((acc, history) => {
    let nextHistory: number[]  = history;
    
    const placeholders: number[] = nextHistory.slice(0, 1);

    while (!nextHistory.every(v => v === nextHistory[0])) {
        nextHistory = nextHistory.reduce((acc, value, index) => {
            if (nextHistory.length > index+1) acc.push(nextHistory[index+1] - value);
            return acc;
        }, [] as number[]);

        placeholders.push(...nextHistory.slice(0, 1));
    };

    return acc + placeholders.toReversed().reduce((acc, value, index) => {
        if (index === placeholders.length) return acc;
        return value - acc;
    }, 0);
}, 0);

console.log(`Day 9 Part 2: ${part2}`);
console.timeEnd('Execution Time');
