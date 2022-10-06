import tulind from "tulind";
import { promisify } from 'util';

// let high  = [];
// let low   = [];
// let close = [];

let sma_0 = [];
let sma_1 = [];

var high = [9, 7, 8, 7, 8, 8, 7, 7, 8, 7];
var low = [1, 2, 3, 3, 2, 1, 2, 2, 2, 3];
var close = [4, 5, 6, 6, 6, 5, 5, 5, 6, 4];

const sma_async = promisify(tulind.indicators.sma.indicator);


async function sma(data) {
    try {
        const d1 = data.map(d => d.y[3]);
        const results = await tulind.indicators.sma.indicator([d1], [10]);
        const d2 = results[0];
        const diff = data.length - d2.length;
        const emptyArray = [...new Array(diff).map(d => "")];
        const d3 = [...emptyArray, ...d2];
        data = data.map((d, i) => ({ ...d, sma: d3[i]}));   
         
        return data;
        
    } catch (error) {
        console.log(error);
    }
};

export {
    sma
};