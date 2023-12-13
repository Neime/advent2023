import { readTextFileString } from '../readfile';

const patterns: string[][] = readTextFileString('./13/input.txt').split("\n\n").map((line) => line.split("\n"));

console.time('Execution Time');

const transposePattern = (pattern: string[]): string[] => {
    const patternT = pattern[0].split('').map((_, colIndex) => pattern.map(row => row[colIndex]));
    return patternT.map((row) => row.join(''));
};

function findLineReflection(rows: string[], delta:number = 0): number {
    const height: number = rows.length;

    for (let reflectionLine: number = 0; reflectionLine < (height -1); ++reflectionLine) {
        let top: number = reflectionLine;
        let bottom: number = reflectionLine + 1;
        let diff: number = 0;
        while (top >= 0 && bottom < height) {
            if (rows[top] !== rows[bottom]) {
                for (let j: number = 0; j < rows[top].length; ++j) {
                    if (rows[top][j] === rows[bottom][j]) {
                        continue;
                    }
                    diff++;
                }
            }
            --top;
            ++bottom;
        }

        if (diff === delta) {
            return reflectionLine + 1;
        }
    }

    return -1; // No reflection line found
}

export const part1 = patterns.reduce((acc: number, pattern: string[], index: number) => { 
    const reflection = findLineReflection(pattern);

    if (-1 !== reflection) {
        acc += reflection * 100;
    } else {
        acc += findLineReflection(transposePattern(pattern)) || 0;
    }

    return acc;

}, 0);

console.log(`Day 13 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');


export const part2 = patterns.reduce((acc: number, pattern: string[], index: number) => { 
    const reflection = findLineReflection(pattern, 1);

    if (-1 !== reflection) {
        acc += reflection * 100;
    } else {
        acc += findLineReflection(transposePattern(pattern), 1) || 0;
    }

    return acc;

}, 0);

console.log(`Day 13 Part 2: ${part2}`);
console.timeEnd('Execution Time');
