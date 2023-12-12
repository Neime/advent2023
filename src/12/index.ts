import { readTextFile } from '../readfile';

const springsRows: string[][] = readTextFile('./12/input.txt').map((line) => line.split(" "))

console.time('Execution Time');

const cache: Map<string, number> = new Map();
function numberArrangementBySpring(springs: string, damagedGroups: number[], numDamagedInGroup: number = 0): number {
    const cacheKey = `${springs} ${damagedGroups.join(',')} ${numDamagedInGroup}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as number;
    }

    if (springs.length === 0) {
        // when springs is empty
        // damagedGroups and last group size is down, we have a solution
        return damagedGroups.length === 0 && numDamagedInGroup === 0 ? 1 : 0;
    }

    let nummberArrangement: number = 0;
    const possible: string[] = springs[0] === '?' ? ['.', '#'] : [springs[0]];
    
    possible.forEach((currentChar) => {
        if (currentChar === '#') {
            // Extend current group
            nummberArrangement += numberArrangementBySpring(springs.slice(1), damagedGroups, numDamagedInGroup + 1);
        } else {
            if (numDamagedInGroup > 0) {
                // If we were in a group that can be closed, close it
                if (damagedGroups.length > 0 && damagedGroups[0] === numDamagedInGroup) {
                    nummberArrangement += numberArrangementBySpring(springs.slice(1), damagedGroups.slice(1));
                }
            } else {
                // If we are not in a group, move on to next char
                nummberArrangement += numberArrangementBySpring(springs.slice(1), damagedGroups);
            }
        }
    });

    cache.set(cacheKey, nummberArrangement);

    return nummberArrangement;
}

const totalArrangements: number = springsRows.reduce((acc, [springs, damagedGroupsStr], idd) => {
    const sol = numberArrangementBySpring(springs + '.', damagedGroupsStr.split(',').map(Number));
    return acc + sol;
}, 0);

export const part1 = totalArrangements;

console.log(`Day 12 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');

const totalArrangementsPart2: number = springsRows.reduce((acc, [springs, damagedGroupsStr], idd) => {
    const sol = numberArrangementBySpring((springs+'?').repeat(5).slice(0, -1) + '.', (damagedGroupsStr+',').repeat(5).slice(0, -1).split(',').map(Number));
    return acc + sol;
}, 0);

export const part2 = totalArrangementsPart2;

console.log(`Day 12 Part 2: ${part2}`);
console.timeEnd('Execution Time');
