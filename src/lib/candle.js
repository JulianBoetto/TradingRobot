class Candle {
    constructor(openTime, open, high, low, close) {
        const date = openTime/1000;
        this.time = date;
        this.open = parseFloat(open);
        this.high = parseFloat(high);
        this.low = parseFloat(low);
        this.close = parseFloat(close);
    }
};

export default Candle;