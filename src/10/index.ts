import { readTextFile } from '../readfile';

const lines: string[][] = readTextFile('./10/input.txt').map((line) => line.split(""))

//console.log(lines);
interface Point {
    x: number;
    y: number;
}

const SPoint: Point = lines.reduce((acc, line, y) => {
    const x = line.findIndex((value) => value === 'S');
    if (x !== -1) acc = {x, y};
    return acc;
}, {x: 0, y: 0} as Point);

function getStartedPoints(point: Point): Point[] 
{
    const nextPoints: Point[] = [];
    ['|', '7', 'F', 'S'].includes(lines[point.y-1][point.x] || '.') ? nextPoints.push({x: point.x, y: point.y - 1}) : null;
    ['-', 'J', '7', 'S'].includes(lines[point.y][point.x +1] || '.') ? nextPoints.push({x: point.x + 1, y: point.y}) : null;
    ['|', 'J', 'L', 'S'].includes(lines[point.y+1][point.x] || '.') ? nextPoints.push({x: point.x, y: point.y + 1}) : null;
    ['-', 'F', 'L', 'S'].includes(lines[point.y][point.x-1] || '.') ? nextPoints.push({x: point.x - 1, y: point.y}) : null;
    
    return nextPoints;
}

function getNextPoint(previousPoint: Point, point: Point): Point {
    const content: string = lines[point.y][point.x];

    const fromCarnidalPoint: string = 
        previousPoint.y === point.y + 1 && previousPoint.x === point.x ? 'N' :
        previousPoint.y === point.y - 1 && previousPoint.x === point.x ? 'S' :
        previousPoint.y === point.y && previousPoint.x === point.x + 1 ? 'E' :
        'W';

    const nextPoint: Point = 
        content === 'J' && fromCarnidalPoint === 'W' ? {x: point.x, y: point.y - 1} : 
        content === 'J' && fromCarnidalPoint === 'S' ? {x: point.x-1, y: point.y } : 


        content === 'L' && fromCarnidalPoint === 'E' ? {x: point.x, y: point.y - 1} : 
        content === 'L' && fromCarnidalPoint === 'S' ? {x: point.x+1, y: point.y } : 


        content === 'F' && fromCarnidalPoint === 'E' ? {x: point.x, y: point.y + 1} : 
        content === 'F' && fromCarnidalPoint === 'N' ? {x: point.x+1, y: point.y } : 


        content === '7' && fromCarnidalPoint === 'W' ? {x: point.x, y: point.y + 1} : 
        content === '7' && fromCarnidalPoint === 'N' ? {x: point.x-1, y: point.y } : 


        content === '|' && fromCarnidalPoint === 'S' ? {x: point.x, y: point.y + 1} : 
        content === '|' && fromCarnidalPoint === 'N' ? {x: point.x, y: point.y - 1 } : 


        content === '-' && fromCarnidalPoint === 'W' ? {x: point.x+1, y: point.y} : 
        content === '-' && fromCarnidalPoint === 'E' ? {x: point.x-1, y: point.y } : 
        point;

    return nextPoint;
}

const nextPoints: Point[] = getStartedPoints(SPoint);
const startPoints: Point[] = [SPoint, nextPoints[0]];
const endPoints: Point[] = [SPoint, nextPoints[1]];
let distance = 1;

while (startPoints[distance].x !== endPoints[distance].x || startPoints[distance].y !== endPoints[distance].y ) {
    startPoints.push(getNextPoint(startPoints[distance-1], startPoints[distance]));
    endPoints.push(getNextPoint(endPoints[distance-1], endPoints[distance]));
    distance++;
}

console.time('Execution Time');

export const part1 = distance;

console.log(`Day 10 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');

export const part2 = 0

console.log(`Day 10 Part 2: ${part2}`);
console.timeEnd('Execution Time');
