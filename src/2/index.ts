import { readTextFile } from '../readfile';

const colors = {
    red: 12,
    green: 13,
    blue: 14,
}

export const part1 = readTextFile('./2/input.txt').reduce<number>(
  (acc, line, index) => {
    const [game, ...sets]: Array<string> = line.match(/\d*[^:;]+\d*/g) || [];
    const hasLess: boolean = sets.every((set) => {
        return set.split(',').every((color) => {
            const res = Array.from(color.matchAll(/(?=(\d+|red|green|blue))/g), (match) => match[1]);
            return !(colors[(res.at(-1) || '')] < parseInt(res.at(0) || ''));
        });
    });

    return acc + (hasLess  ? index+1 : 0);
  },
  0
);

console.log(`Day 2 Part 1: ${part1}`);

export const part2 = readTextFile('./2/input.txt').reduce<number>(
  (acc, line, index) => {
    const [game, ...sets]: Array<string> = line.match(/\d*[^:;]+\d*/g) || [];
    const colors = {red: 0, green: 0, blue: 0,}

    sets.forEach((set) => {
        set.split(',').forEach((color) => {
            const res = Array.from(color.matchAll(/(?=(\d+|red|green|blue))/g), (match) => match[1]);
            const colorName: string = res.at(-1) || '';
            const numberBall: number = parseInt(res.at(0) || '');
            colors[colorName] = numberBall > colors[colorName] ? numberBall : colors[colorName];
        });
    });

    return acc + (colors.red * colors.green * colors.blue);
  },
  0
);

console.log(`Day 2 Part 2: ${part2}`);''