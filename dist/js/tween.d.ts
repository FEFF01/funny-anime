import { DIRECTION, TweenOption, TweenData } from './interfaces';
interface TweenStep {
    (step: number): number;
}
declare class Tween {
    private data;
    private option?;
    static DIRECTION: typeof DIRECTION;
    step: TweenStep;
    constructor(data: {
        [tweenKey: string]: Array<TweenData>;
    }, option?: TweenOption);
    protected parseTween(data: {
        [tweenKey: string]: Array<TweenData>;
    }, option?: TweenOption): any;
    static parse(data: {
        [tweenKey: string]: Array<TweenData>;
    }, option?: TweenOption): any;
}
export default Tween;
