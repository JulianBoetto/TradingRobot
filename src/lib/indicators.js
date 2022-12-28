import tulind from "tulind";

async function sma(data) {
    try {
        const d1 = data.map(d => d.close);
        const results = await tulind.indicators.sma.indicator([d1], [30]);
        const d2 = results[0];
        const diff = data.length - d2.length;
        const emptyArray = [...new Array(diff)].map(d => "");
        const d3 = [...emptyArray, ...d2];
        data = data.map((d, i) => ({ ...d, sma: d3[i] }));
        return data;
    } catch (error) {
        console.log(error);
    }
};

async function ema(data) {
    try {
        const d1 = data.map(d => d.close);
        const results = await tulind.indicators.ema.indicator([d1], [2]);
        const d2 = results[0];
        const diff = data.length - d2.length;
        const emptyArray = [...new Array(diff)].map(d => "");
        const d3 = [...emptyArray, ...d2];
        data = data.map((d, i) => ({ ...d, ema: d3[i] }));
        return data;
    } catch (error) {
        console.log(error);
    }
};

async function rsi(data) {
    try {
        const d1 = data.map(d => d.close);
        const results = await tulind.indicators.rsi.indicator([d1], [2]);
        const d2 = results[0];
        const diff = data.length - d2.length;
        const emptyArray = [...new Array(diff)].map(d => "");
        const d3 = [...emptyArray, ...d2];
        data = data.map((d, i) => ({ ...d, rsi: d3[i] }));
        return data;
    } catch (error) {
        console.log(error);
    }
};

async function macd(data) {
    try {
        const d1 = data.map(d => d.close);
        const results = await tulind.indicators.macd.indicator([d1], [12, 26, 9]);
        const diff = data.length - results[0].length;
        const emptyArray = [...new Array(diff)].map(d => "");
        const macd1 = [...emptyArray, ...results[0]];
        const macd2 = [...emptyArray, ...results[1]];
        const macd3 = [...emptyArray, ...results[2]];
        data = data.map((d, i) => ({
            ...d,
            macd_fast: macd1[i],
            macd_slow: macd2[i],
            macd_histogram: macd3[i]
        }));
        return data;
    } catch (error) {
        console.log(error);
    }
};

export {
    sma,
    ema,
    rsi,
    macd
};