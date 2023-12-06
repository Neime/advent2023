import { readTextFile } from '../readfile';

const [timesStr, distancesStr] = readTextFile('./6/input.txt');

const times = timesStr.split(' ').filter(val => val).slice(1);
const distances = distancesStr.split(' ').filter(val => val).slice(1);

const races = times.map((time, index) => {
    return [
        parseInt(time),
        parseInt(distances[index])
    ]
});

const racesMaps = races.map((races, index) => {
    const [maxTime, lastRecord] = races;
    
    let map = new Map();
    for (let i = 1; i < maxTime; i++) {
        const timeHold = i;
        const distanceRun = (maxTime - i) * i;
        if (distanceRun > parseInt(distances[index])) map.set(timeHold, distanceRun);
    }
    
    return map;
});

export const part1 = racesMaps.reduce((acc, raceMap, index) => {
    return (acc === 0 ? 1 : acc) * raceMap.size;
}, 0);


const time = parseInt(times.reduce((acc, time) => {
    return acc + time;
}, ''));
const distance = parseInt(distances.reduce((acc, time) => {
    return acc + time;
}, ''));

let numberRaceWin = 0;
for (let i = 1; i < time; i++) {
    const timeHold = i;
    const distanceRun = (time - i) * i;
    if (distanceRun > distance) numberRaceWin++;
}

console.log(`Day 6 Part 1: ${part1}`);
console.log(`Day 6 Part 2: ${numberRaceWin}`);''