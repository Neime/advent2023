import { readTextFile } from '../readfile';

const [directionsStr, ignore, ...elementsStr] = readTextFile('./8/input.txt');
console.time('Execution Time');

const directions = directionsStr.split('');

let AAAstepIndex = 0;
const elements: string[][] = elementsStr.map((elementStr, index) => {
    const [step, left, right] = elementStr.match(/\b(\w+)\b/g);
    if (step === 'AAA') AAAstepIndex = index;
    return [step, left, right];
});

let currentIndex: number = AAAstepIndex;
let stepNumber:number = 0;
while (elements[currentIndex][0] !== 'ZZZ') {
    const currentNode = elements[currentIndex];
    currentIndex =  elements.findIndex(([step]) => step === (directions[(stepNumber % directions.length)] === 'L' ? currentNode[1] : currentNode[2]));
    
    stepNumber++;
}

export const part1 = stepNumber;

console.log(`Day 8 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');

console.time('Execution Time');

interface Node {
    index: number;
}

const nodesToSearch: Array<Node> = elements.reduce((acc, [step], index) => {
    if (step.slice(-1) === 'A') acc.push({index});
    return acc;
}, [] as Array<Node>);

const steps: number[] = nodesToSearch.map<number>(( node: Node ) => {
    let stepNumber: number = 0;
    let currentIndex: number = node.index;
    while (elements[currentIndex][0].slice(-1) !== 'Z') {
        const currentNode = elements[currentIndex];
        currentIndex = elements.findIndex(([step]) => step === (directions[(stepNumber % directions.length)] === 'L' ? currentNode[1] : currentNode[2]));
        
        stepNumber++;
    }
    
    return stepNumber;
});

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

export const part2 = steps.reduce(lcm);

console.log(`Day 8 Part 2: ${part2}`);
console.timeEnd('Execution Time');

