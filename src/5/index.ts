import { readTextFileString, readTextFile } from '../readfile';

const lines = readTextFileString('./5/input.txt');

interface Range {
    destinationStart: number;
    destinationEnd: number;
    sourceStart: number;
    sourceEnd: number;
    diff: number;
}

interface SeedRange {
    start: number;
    end: number;
}

const [seeds, soilsM, fertilizerM, waterM, lightM, temperatureM, humidityM, locationM]: Array<string> = lines.match(/[^:]+(\d)/g) || [];
const soils = ranges(soilsM);
const fertilizers = ranges(fertilizerM);
const waters = ranges(waterM);
const lights = ranges(lightM);
const temperatures = ranges(temperatureM);
const humiditys = ranges(humidityM);
const locations = ranges(locationM);


const seedsArr = seeds.match(/\d+/g);

const seedRanges = seedsArr.reduce<Array<SeedRange>>(
    (acc, seed, index) => {
        if (index % 2 === 1) return acc;
        const start: number = parseInt(seed);
        const end: number = start+parseInt(seedsArr[index+1]);
        const range = {start, end};
        return [...acc, range];
    },
    []
);

function findDestination(source: number, ranges: Array<Range>): number {
    if (source < ranges[0].destinationStart) return source;

    return ranges.reduce((acc, range) => {
        if (range.sourceStart <= source && source <= range.sourceEnd) {
            const destination = source + range.diff;
            return (acc !== 0 && acc < destination) ? acc : destination;
        }
        
        return acc;
    }, 0);
}

function findSource(destination: number, ranges: Array<Range>): number {
    return ranges.reduce((acc, range) => {
        if (range.destinationStart <= destination && destination <= range.destinationEnd) {
            const source = destination - range.diff;
            return (acc !== 0 && acc < source) ? acc : source;
        }
        
        return acc;
    }, 0) || destination;
}

function ranges(str: string): Array<Range> {
    const [empty, ...rangesStr] = str.split('\n');
    const ranges = rangesStr.map((rangeStr) => {
        const [destination, source, range] = rangeStr.match(/\d+/g);
        return {
            destinationStart: parseInt(destination),
            destinationEnd: parseInt(destination) + parseInt(range),
            sourceStart: parseInt(source),
            sourceEnd: parseInt(source) + parseInt(range),
            diff: parseInt(destination) - parseInt(source),
        }
    });

    return ranges.sort((a, b) => a.destinationStart - b.destinationStart);
}


export const part1 = seeds.match(/\d+/g).reduce<number>(
    (acc, seed, index) => {
    const soil = findDestination(parseInt(seed), soils) || parseInt(seed);
    const fertilizer = findDestination(soil, fertilizers) || soil;
    const water = findDestination(fertilizer, waters) || fertilizer;
    const light = findDestination(water, lights) || water;
    const temperature = findDestination(light, temperatures) || light;
    const humidity = findDestination(temperature, humiditys) || temperature;
    const location = findDestination(humidity, locations) || humidity;

    return acc === 0 ? location : (location > acc ? acc : location);
},
0
);

const [seedsStr, ...convertersSrt]: Array<string> = lines.match(/[^:]+(\d)/g) || [];
const seedsMap = seedsStr.match(/\d+/g).map((val, index, array) => {
    if (index % 2 === 0) { return [parseInt(array[index]), parseInt(array[index])+parseInt(array[index + 1])-1, -1] }
}).filter(val => val);

const maps = convertersSrt.map((converterStr, index) => {
    return converterStr.trim().split("\n").map((line, index) => {
        const [dest, source, length] = line.split(' ').map(Number);
        return [source, source + length - 1, dest - source];
    });
});

let candidateSeeds: number[] = [];
seedLoop: while (seedsMap.length > 0) {
    let [seedMin, seedMax, depth] = seedsMap.pop();

    if (depth === maps.length - 1) {
        candidateSeeds.push(seedMin);
        continue seedLoop;
    }

    for (const [sourceMin, sourceMax, diff] of maps[depth + 1]) {
        if (seedMin <= sourceMax && sourceMin <= seedMax) {
            const intersect: number[] = [Math.max(seedMin, sourceMin), Math.min(seedMax, sourceMax)];
            seedsMap.push([intersect[0] + diff, intersect[1] + diff, depth + 1]);

            if (seedMin < intersect[0]) {
                seedsMap.push([seedMin, intersect[0] - 1, depth]);
            }

            if (seedMax > intersect[1]) {
                seedsMap.push([intersect[1] + 1, seedMax, depth]);
            }

            continue seedLoop;
        }
    }

    if (!candidateSeeds.includes(seedMin)) {
        seedsMap.push([seedMin, seedMax, depth + 1]);
    }
}

console.log(`Day 5 Part 1: ${part1}`);
console.log(`Day 5 Part 2: ${Math.min(...candidateSeeds).toString()}`);''