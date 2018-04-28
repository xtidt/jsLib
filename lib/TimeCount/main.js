class TimeCount {
    constructor(options) {
        this._day = this._hour = this._minute = this._second = this._millisecond = 0;
        this._timer = null;
        this._run = false;

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.ticker = this.ticker.bind(this);
        this.format = this.format.bind(this);
        this.reflect = this.reflect.bind(this);
        this.subscribe = options.subscribe;
    }

    ticker() {
        let self = this;
        self._millisecond += 1000;
        self.format();
        self.reflect();
        if (this.run) {
            this._timer = setTimeout(self.ticker, 1000);
        }
    }

    format() {
        if (this._millisecond >= 1000) {
            this._second++;
            this._millisecond = 0;
        }
        if (this._second >= 60) {
            this._minute++;
            this._second = 0;
        }
        if (this._minute >= 60) {
            this._hour++;
            this._minute = 0;
        }
        if (this._hour >= 24) {
            this._day++;
            this._hour = 0;
        }

        this._millisecond = this.toDub(this._millisecond);
        this._second = this.toDub(this._second);
        this._minute = this.toDub(this._minute);
        this._hour = this.toDub(this._hour);
        this._day = this.toDub(this._day);
    }

    start() {
        this.run = true;
        this.ticker();
    }

    pause() {
        this.run = false;
    }

    stop() {
        this.run = false;
        clearTimeout(this._timer);
        this.reset();
    }

    toDub(n) {
        return n < 10 ? "0" + parseInt(n) : parseInt(n);
    }

    reset() {
        this._day = this._hour = this._minute = this._second = this._millisecond = '00';
        this.reflect();
        this._timer = null;
        this._run = false;
    }

    reflect() {
        let _obj = {
            Day: this._day,
            Hour: this._hour,
            Min: this._minute,
            Sec: this._second
        }
        this.subscribe(_obj);
        return _obj;
    }
}
