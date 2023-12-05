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

const part2 = function() {
    for (let location: number = 0; location < 100000000; location++) {
        const humidity: number = findSource(location, locations);
        const temperature: number = findSource(humidity, humiditys);
        const light: number = findSource(temperature, temperatures);
        const water: number = findSource(light, lights);
        const fertilizer: number = findSource(water, waters);
        const soil: number = findSource(fertilizer, fertilizers);
        const seed: number = findSource(soil, soils);
        
        const hasInSeedRange: boolean = seedRanges.some((range) => {
            return range.start <= seed && seed <= range.end;
        });
        if (hasInSeedRange) {
            return location;
        }
    }
}

console.log(`Day 5 Part 1: ${part1}`);
console.log(`Day 5 Part 2: ${part2()}`);''