import { readTextFileString } from '../readfile';

const grid: string[][] = readTextFileString('./14/input.txt').split('\n').map((line) => line.split(''));

console.time('Execution Time');

const print = (grid: string[][], roundRocksToPlace: RockPosition[]): void => {
    const gridCopy: string[][] = grid.map((line: string[]) => [...line]);
    for (let key in roundRocksToPlace) {
        const rock: RockPosition = roundRocksToPlace[key];
        gridCopy[rock.y][rock.x] = 'O';
    }
    console.log(gridCopy.map((line: string[]) => line.join('')).join('\n'));
    console.log('\n');
};

type RockPosition = {
    x: number;
    y: number;
};

let roundedRocksPosition: RockPosition[] = [];
grid.forEach((line: string[], y: number) => {
    line.forEach((char: string, x: number) => {
        if (char === 'O') {
            roundedRocksPosition[`${x},${y}`] = { x, y };
        }
    });
});

const gridWithoutRoundedRocks: string[][] = grid.map((line: string[]) => line.map((char: string) => char === 'O' ? '.' : char));

const lastPlaceByColumnNorth: number[] = Array.from({ length: grid[0].length }, () => 0);
const lastPlaceByColumnSouth: number[] = Array.from({ length: grid[0].length }, () => grid.length-1);

const moveRock = (grid: string[][], direction: string): void => {
    const lastPlaceByColumn: number[] = (direction === 'S') ? lastPlaceByColumnSouth : lastPlaceByColumnNorth;
    for (let y: number = 0; y < grid.length; ++y) {
        const lineIndex = (direction === 'S') ? grid.length-1-y : y;
        const line: string[] = (direction !== 'E') ? grid[lineIndex] : [...grid[lineIndex]].reverse();
        let lastPlaceByLine: number = (direction === 'E') ? line.length-1 : 0;
        for (let x: number = 0; x < line.length; ++x) {
            if ((direction === 'E')) x = (line.length-1)-x;
            if (line[x] === '#') {
                lastPlaceByColumn[x] = (direction === 'S') ? lineIndex-1 : lineIndex+1;
                lastPlaceByLine = (direction === 'E') ? x-1 : x+1;
            }

            const roundedBlockAbove: RockPosition = roundedRocksPosition[`${x},${lineIndex}`];
            if (roundedBlockAbove) {
                const newPoint: RockPosition = {x:0, y:0};
                switch (direction) {
                    case 'N':
                    case 'S':
                        newPoint.y = lastPlaceByColumn[x];
                        newPoint.x = roundedBlockAbove.x;
                        break;
                    case 'W':
                    case 'E':
                        newPoint.y = roundedBlockAbove.y;
                        newPoint.x = lastPlaceByLine;
                        break;
                }

                delete roundedRocksPosition[`${x},${lineIndex}`];
                roundedRocksPosition[`${newPoint.x},${newPoint.y}`] = newPoint;
                
                (direction === 'S') ? lastPlaceByColumn[x]-- : lastPlaceByColumn[x]++;
                (direction === 'E') ? lastPlaceByLine-- : lastPlaceByLine++;
            }
        }
    }
};

//print(gridWithoutRoundedRocks, roundedRocksPosition);
moveRock(gridWithoutRoundedRocks, 'N');
//print(gridWithoutRoundedRocks, roundedRocksPosition);

let total = 0;
for (let key in roundedRocksPosition) {
    const rock: RockPosition = roundedRocksPosition[key];
    total += (grid.length - rock.y );
}
console.log(`Day 14 Part 1: ${total}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');


roundedRocksPosition = [];
grid.forEach((line: string[], y: number) => {
    line.forEach((char: string, x: number) => {
        if (char === 'O') {
            roundedRocksPosition[`${x},${y}`] = { x, y };
        }
    });
});

let cycles: number = 1000000000;
while (cycles > 0) {

    if (cycles % 100000 === 0) {
        console.log(cycles);
        console.timeEnd('Execution Time');
        console.time('Execution Time');
    }

    moveRock(gridWithoutRoundedRocks, 'N');
    moveRock(gridWithoutRoundedRocks, 'W');
    moveRock(gridWithoutRoundedRocks, 'S');
    moveRock(gridWithoutRoundedRocks, 'E');
    cycles--;
}

total = 0;
for (let key in roundedRocksPosition) {
    const rock: RockPosition = roundedRocksPosition[key];
    total += (grid.length - rock.y );
}
export const part2 = total;

console.log(`Day 14 Part 2: ${part2}`);
