interface TickCallbackFunction {
    (time: number): void;
}
declare class Tick {
    private tasks;
    private _tasks;
    private _bid;
    private _af;
    private _next;
    constructor();
    request(callback: TickCallbackFunction): number;
    finally(): void;
    cancel(id: number): TickCallbackFunction;
    now: () => number;
    private _dispatch;
}
interface RenderFunction {
    (time: number): number;
}
interface PlayerConfig {
    onPlay?: (ft: number, tt: number) => boolean | void;
    onEnd?: (dtime?: number) => void;
    [key: string]: any;
}
declare class Player {
    private ot;
    private et;
    private dt;
    private _af;
    static TICK: Tick;
    speed: number;
    isRun: boolean;
    config: PlayerConfig;
    render: RenderFunction;
    constructor(...options: Array<RenderFunction | PlayerConfig | number>);
    step(step: number): this;
    pause(): this;
    play(ft?: number, tt?: number): this;
    private _play;
}
export default Player;
