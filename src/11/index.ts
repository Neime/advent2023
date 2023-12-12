import { readTextFile,readTextFileString } from '../readfile';

const lines: string[][] = readTextFile('./11/input.txt').map((line) => line.split(""))

interface Point {
    x: number;
    y: number;
}

const distance = (age: number, lines: string[][]): number => {
    const galaxies: Point[] = [];
    const rowWithoutGalaxy: number[] = lines.map((line, i) => i).filter((value) => !lines[value].includes("#"));
    const colWithoutGalaxy: number[] = lines[0].map((line, i) => i).filter((value) => !lines.map((line) => line[value]).includes("#"));
    
    for (let y=0; y<lines.length; y++) {
        for (let x=0; x<lines[0].length; x++) {
            if (lines[y][x] === "#") {
                const xExp = x + [...colWithoutGalaxy].filter((value) => value < x).length * (age-1);
                const yExp = y + [...rowWithoutGalaxy].filter((value) => value < y).length * (age-1);
                galaxies.push({x: xExp, y: yExp});
            }
        }
    }
    
    let distance = 0;
    for (let i=0; i<galaxies.length; i++) {
        for (let j=i+1; j<galaxies.length; j++) {
            const galaxyStart = galaxies[i];
            const galaxyEnd = galaxies[j];
            const distanceX = Math.abs(galaxyStart.x - galaxyEnd.x);
            const distanceY = Math.abs(galaxyStart.y - galaxyEnd.y);
            distance += distanceX + distanceY;
        }
    }

    return distance;
};

console.time('Execution Time');
console.log(`Day 11 Part 1: ${distance(2, lines)}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');

export const part2 = 0;

console.log(`Day 11 Part 2: ${distance(1000000, lines)}`);
console.timeEnd('Execution Time');
