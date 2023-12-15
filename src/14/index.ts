import { readTextFileString } from '../readfile';

const grid: string[][] = readTextFileString('./14/input.txt').split('\n').map((line) => line.split(''));

console.time('Execution Time');

const print = (roundRocksToPlace: Map<string, Point>): void => {
    const gridEmpty: string[][] = grid.map((line: string[]) => line.map((char: string) => char === 'O' ? '.' : char));
    [...roundRocksToPlace.values()].forEach((rock: Point) => {
        gridEmpty[rock.y][rock.x] = 'O';
    });
    console.log(gridEmpty.map((line: string[]) => line.join('')).join('\n'));
    console.log('\n');
};

type Point = {
    x: number;
    y: number;
};

let roundedRocksPoint: Map<string, Point> = new Map();
const roundRockAtStart: Map<string, Point> = new Map();
let wallsPoint: Map<string, Point> = new Map();
grid.forEach((line: string[], y: number) => {
    line.forEach((char: string, x: number) => {
        if (char === 'O') {
            roundedRocksPoint.set(`${x},${y}`, { x, y });
            roundRockAtStart.set(`${x},${y}`, { x, y });
        }
        if (char === '#') wallsPoint.set(`${x},${y}`, { x, y });
    });
});

const gridHeight = grid.length;
const gridWidth = grid[0].length;

const moveRock = (moveY: number, moveX: number): void => {
        let hasMoved = true
        while (hasMoved) {
            hasMoved = false
            roundedRocksPoint.forEach((rock: Point) => {
                const targetX = rock.x + moveX;
                const targetY = rock.y + moveY;
                const targetKey = `${targetX},${targetY}`;

                if (
                    targetX >= 0 && targetY >= 0
                    && targetX < gridWidth && targetY < gridHeight
                    && !wallsPoint.has(targetKey)
                    && !roundedRocksPoint.has(targetKey)
                ) {
                    hasMoved = true;
                    roundedRocksPoint.delete(`${rock.x},${rock.y}`);
                    rock.x = targetX;
                    rock.y = targetY;
                    roundedRocksPoint.set(targetKey, rock);
                }
            });
        }
};

//print(roundedRocksPoint);
moveRock(-1, 0);
//print(roundedRocksPoint);

let total = 0;
[...roundedRocksPoint.values()].forEach((rock: Point) => {
    total += (grid.length - rock.y );
});
console.log(`Day 14 Part 1: ${total}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');

// init map
roundedRocksPoint = new Map();
grid.forEach((line: string[], y: number) => {
    line.forEach((char: string, x: number) => {
        if (char === 'O') roundedRocksPoint.set(`${x},${y}`, { x, y });
    });
});

let cycles: number = 1000000000;

let i = 0;
let cyclesPoint: string[] = [];
let equalCycle: number = 0;
let beforeCycleEqual: number = 0;
print(roundedRocksPoint);
while (i++ < cycles) {

    moveRock(-1, 0); // north
    let newCycle = [...roundedRocksPoint.values()].map((rock: Point) => `${rock.x},${rock.y}`).join('');
    moveRock(0, -1); // west
    newCycle += [...roundedRocksPoint.values()].map((rock: Point) => `${rock.x},${rock.y}`).join('');
    moveRock(+1, 0); // south
    newCycle += [...roundedRocksPoint.values()].map((rock: Point) => `${rock.x},${rock.y}`).join('');
    moveRock(0, +1); // east
    newCycle += [...roundedRocksPoint.values()].map((rock: Point) => `${rock.x},${rock.y}`).join('');
    
    // when cycle if equal to an existing cycle, we have found the recurring cycle number
    if (cyclesPoint.find((cycle: string) => cycle === newCycle)) {
        beforeCycleEqual = cyclesPoint.indexOf(newCycle)+1;
        equalCycle = i-cyclesPoint.indexOf(newCycle)-1;
        break;
    }
    cyclesPoint.push(newCycle);
}

total = 0;
[...roundedRocksPoint.values()].forEach((rock: Point) => {
    total += (grid.length - rock.y );
});

// after beforeCycleEqual value cycles, each equalCycle it's the same result
// so we can calculate the number of cycle to do before the result
const numberCycleToResult = beforeCycleEqual + (1000000000-beforeCycleEqual)%equalCycle;
// init map
roundedRocksPoint = new Map();
grid.forEach((line: string[], y: number) => {
    line.forEach((char: string, x: number) => {
        if (char === 'O') roundedRocksPoint.set(`${x},${y}`, { x, y });
    });
});

i=0;
while (i++ < numberCycleToResult) {
    moveRock(-1, 0); // north
    moveRock(0, -1); // west
    moveRock(+1, 0); // south
    moveRock(0, +1); // east
}

total = 0;
[...roundedRocksPoint.values()].forEach((rock: Point) => {
    total += (grid.length - rock.y );
});
export const part2 = total;

console.log(`Day 14 Part 2: ${part2}`);