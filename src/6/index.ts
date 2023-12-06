import { readTextFile } from '../readfile';

const [timesStr, distancesStr] = readTextFile('./6/input.txt');

const times: string[] = timesStr.split(' ').filter(val => val).slice(1);
const distances: string[] = distancesStr.split(' ').filter(val => val).slice(1);

const races: number[][] = times.map((time, index) => {
    return [
        parseInt(time),
        parseInt(distances[index])
    ]
});

const racesMaps: Map<number, number>[] = races.map((races, index) => {
    const [maxTime, lastRecord] = races;
    
    let map: Map<number, number> = new Map();
    for (let i: number = 1; i < maxTime; i++) {
        const timeHold: number = i;
        const distanceRun: number = (maxTime - i) * i;
        if (distanceRun > parseInt(distances[index])) map.set(timeHold, distanceRun);
    }
    
    return map;
});

export const part1: number = racesMaps.reduce((acc, raceMap, index) => {
    return (acc === 0 ? 1 : acc) * raceMap.size;
}, 0);


const time: number = parseInt(times.reduce((acc, time) => {
    return acc + time;
}, ''));
const distance: number = parseInt(distances.reduce((acc, time) => {
    return acc + time;
}, ''));

let numberRaceWin: number = 0;
for (let i: number = 1; i < time; i++) {
    const distanceRun: number = (time - i) * i;
    if (distanceRun > distance) numberRaceWin++;
}

console.log(`Day 6 Part 1: ${part1}`);
console.log(`Day 6 Part 2: ${numberRaceWin}`);''