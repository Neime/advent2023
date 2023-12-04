import { readTextFile } from '../readfile';

export const part1 = readTextFile('./4/input.txt').reduce<number>(
  (acc, line, index) => {
    const [game, winningNumbers, yourNumbers]: Array<string> = line.match(/(\d+)*[^:|]+(\d+)*/g) || [];
    const winningNumbersList: Array<string> = winningNumbers.match(/\d+/g);
    const yourNumbersList: Array<string> = yourNumbers.match(/\d+/g);
    const matchingNumbers: Array<string> = winningNumbersList.filter(num => yourNumbersList.includes(num));
    const points: number = matchingNumbers.reduce((acc, num, index) => {
        return index === 0 ? 1 : acc * 2;
    }, 0);

    return acc + points;
  },
  0
);

console.log(`Day 4 Part 1: ${part1}`);


const lines = readTextFile('./4/input.txt');
let games: number = 0;
const winGames: Array<Game> = [];
interface Game {
    cardNumber: number;
    numbers: number;
}

export const part2 = readTextFile('./4/input.txt').reduce<number>(
  (acc, line, index) => {
    const numberLineWin: number = getNumberMatchingByLine(line, index);
    
    findScratchcards(numberLineWin, index);
    
    return games + index + 1;
  },
  0
);

function findScratchcards(number: number, card: number): void
{
    for (let i = card+1; i < card + number +1; i++) {
        const numberLinePrev = getNumberMatchingByLine(lines[i], i);
        games++;

        if (numberLinePrev > 0) {
            findScratchcards(numberLinePrev, i);
        } 
    }
}

function getNumberMatchingByLine(line: string, gameNumber: number): number
{
    const cardExit = winGames.reduce((acc, game) => acc || game.cardNumber === gameNumber, false) === true;

    if (cardExit) return winGames.reduce((acc, game) => game.cardNumber === gameNumber ? acc + game.numbers : acc, 0);

    const [game, winningNumbers, yourNumbers]: Array<string> = line.match(/(\d+)*[^:|]+(\d+)*/g) || [];
    const winningNumbersList: Array<string> = winningNumbers.match(/\d+/g);
    const yourNumbersList: Array<string> = yourNumbers.match(/\d+/g);
    const matchingNumbers: Array<string> = winningNumbersList.filter(num => yourNumbersList.includes(num));
    
    if (!cardExit) {
        winGames.push({
            cardNumber: gameNumber,
            numbers: matchingNumbers.length,
        });
    }
    
    return matchingNumbers.length;
}

console.log(`Day 4 Part 2: ${part2}`);''