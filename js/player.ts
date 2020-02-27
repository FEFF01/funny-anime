
const USE_TIMEOUT = false;
const MAX_SAFE_TIME = 8640000000000;

interface TickCallbackFunction {
    (time: number): void
}
class Tick {
    private tasks: Array<TickCallbackFunction> = [];
    private _tasks: Array<TickCallbackFunction> = [];
    private _bid = 0;
    private _af: number;
    private _next: Function;
    constructor() {
        this._next = USE_TIMEOUT ? window.setTimeout.bind(window, this._dispatch, 15) :
            window.requestAnimationFrame.bind(window, this._dispatch)
    }
    request(callback: TickCallbackFunction) {
        this._af || (this._af = this._next());
        return this._bid + this.tasks.push(callback);
    }
    finally() {

    }
    cancel(id: number): TickCallbackFunction {
        let result: TickCallbackFunction;
        id -= this._bid + 1;
        if (id >= 0) {
            if (id < this.tasks.length) {
                result = this.tasks[id];
                this.tasks[id] = null;
            }
        } else if (this._tasks && (id += this._tasks.length) >= 0) {
            result = this._tasks[id];
            this._tasks[id] = null;
        }
        return result;
    }
    now: () => number = USE_TIMEOUT ? function () { return Date.now() } : (window.performance ?
        function () { return performance.now() | 0; } :
        (new Function("return Date.now()-" + Date.now() + ";")) as () => number)
    private _dispatch = (time?: number) => {
        time = time ? (time | 0) : this.now();
        this._af = null;
        this._bid += this.tasks.length;
        this._tasks = this.tasks;
        this.tasks = [];
        for (let task of this._tasks) {
            task && task(time);
        }
    }
}

const TICK = new Tick();

interface RenderFunction {
    (time: number): number
}
interface PlayerConfig {
    onPlay?: (ft: number, tt: number) => boolean | void,
    onEnd?: (dtime?: number) => void,
    [key: string]: any
}
class Player {
    private ot = 0;
    private et = 0;
    private dt = 0;
    private _af: number;
    static TICK = TICK;
    speed = 1;
    isRun = false;
    config: PlayerConfig;
    render: RenderFunction;
    constructor(...options: Array<RenderFunction | PlayerConfig | number>) {
        for (const option of options) {
            switch (typeof option) {
                case "function":
                    this.render = option;
                    break;
                case "object":
                    this.config = option;
                    break;
                case "number":
                    this.speed = option;
                    break;
            }
        }
    }
    step(step: number) {
        this.render(this.dt = step);
        return this;
    }
    pause() {
        if (this.isRun) {
            this.isRun = false;
            TICK.cancel(this._af);
            this.config?.onEnd?.();
        }
        return this;
    }
    /*stop() {
        this.pause();
        this.dt = 0;
        return this;
    }*/
    play(ft: number = this.dt, tt: number = MAX_SAFE_TIME) {
        let _now = TICK.now();
        if (!this.config?.onPlay?.(ft, tt)) {
            let increment = tt >= ft ? this.speed : -this.speed;
            this.ot = _now - ft / increment;
            this.et = this.ot + tt / increment;
            TICK.cancel(this._af);
            this._play(_now, increment, tt >= ft ? 0b100 : 0b001);
        }
        return this;
    }

    private _play(time: number, increment: number, mask: number) {
        this.isRun = true;
        let _continue = (time: number) => {
            this.dt = (time - this.ot) * increment;
            if (time <= this.et && !(this.render(this.dt) & mask)) {
                this._af = TICK.request(_continue);
            } else {
                this.dt = (this.et - this.ot) * increment;
                time < this.et || this.render(this.dt);
                this.isRun = false;
                this.config?.onEnd?.(time - this.et);
            }
        }
        _continue(time);
    }
}
export default Player;