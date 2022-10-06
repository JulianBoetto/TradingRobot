import tulind from "tulind";

async function sma(data) {
    try {
        const d1 = data.map(d => d.close);
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