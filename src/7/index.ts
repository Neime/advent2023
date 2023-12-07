import { readTextFile } from '../readfile';

const handAndBids = readTextFile('./7/input.txt');

console.time('Execution Time');


function ptsCard(card: string): number
{
    return card === 'A' ? 14 : card === 'K' ? 13 : card === 'Q' ? 12 : card === 'J' ? 11 : card === 'T' ? 10 : Number(card);
}

function ptsByHand(hand: string, checkCharacted: string|null = null): number
{
    const handSort: string = hand.split('').sort().join('');

    const ptsFlush: number = Number(/(\w)\1\1\1\1/.test(handSort));
    const ptsFour: number = Number(/(\w)\1\1\1/.test(handSort));
    const isThree: boolean = /(\w)\1\1/.test(handSort);
    const ptsThree: number = isThree ? 2 : 0;
    const ptsTwo:number = handSort.match(/(\w)\1/g)?.length || 0;
    
    const pts: number = 1 + ptsFlush + ptsFour + ptsThree + ptsTwo;

    if (checkCharacted && hand.includes(checkCharacted)) {
        const handsBest: number = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reduce<number>((acc,card) => {
            if (hand.includes(card)) {
                const cardPts: number = ptsByHand(hand.replaceAll(checkCharacted, card));
                return acc > cardPts ? acc : cardPts;
            }

            return acc;
        }, 0);

        return handsBest > pts ? handsBest : pts;
    }

    return pts;
}

const handsSorted: (string|number)[][] = handAndBids.map(handAndBid => {
    const [ hand, bid ]: string[] = handAndBid.split(' ');
    return [ hand, bid, ptsByHand(hand)];
}).sort((a, b) => {
    if ((b[2] as number) === (a[2] as number)) {
        for (let i: number = 0; i < (a[0] as string).length; i++) {
            const cardA: number = ptsCard((a[0] as string).charAt(i));
            const cardB: number = ptsCard((b[0] as string).charAt(i));
            if (cardA === cardB) continue;
            return cardB > cardA ? 1 : -1;
        }
    }
    return (b[2] as number) - (a[2] as number);
});

export const part1 = handsSorted.reduce<number>((acc, handSorted, position) => {
    const [ hand, bid, pts ]: (string|number)[] = handSorted;

    return acc + (handsSorted.length - position) * Number(bid);
}, 0);

console.log(`Day 7 Part 1: ${part1}`);

console.timeEnd('Execution Time');
console.log('------');
console.time('Execution Time');


function ptsCard2(card: string): number
{
    return card === 'A' ? 14 : card === 'K' ? 13 : card === 'Q' ? 12 : card === 'J' ? 1 : card === 'T' ? 10 : Number(card);
}

const handsSorted2: (string|number)[][] = handAndBids.map(handAndBid => {
    const [ hand, bid ]: string[] = handAndBid.split(' ');
    return [ hand, bid, ptsByHand(hand, 'J')];
}).sort((a, b) => {
    if ((b[2] as number) === (a[2] as number)) {
        for (let i: number = 0; i < (a[0] as string).length; i++) {
            const cardA: number = ptsCard2((a[0] as string).charAt(i));
            const cardB: number = ptsCard2((b[0] as string).charAt(i));
            if (cardA === cardB) continue;
            return cardB > cardA ? 1 : -1;
        }
    }
    return (b[2] as number) - (a[2] as number);
});

export const part2 = handsSorted2.reduce<number>((acc, handSorted, position) => {
    const [ hand, bid, pts ]: (string|number)[] = handSorted;

    return acc + (handsSorted2.length - position) * Number(bid);
}, 0);

console.log(`Day 7 Part 2: ${part2}`);
console.timeEnd('Execution Time');

