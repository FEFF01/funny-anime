declare enum ORDER {
    NORMAL = "normal",
    AUTO = "auto"
}
declare enum DIRECTION {
    ALTERNATE = "alternate",
    ACCUMULATIVE = "accumulative"
}
declare enum POSITION {
    LEFT = -1,
    RIGHT = 1,
    MIDDLE = 0
}
interface TweenOption {
    target?: {
        [tweenKey: string]: number;
    } | any;
    key_mask_map?: {
        [tweenKey: string]: number;
    };
    direction?: DIRECTION;
    duration?: number;
    begin?: number;
    loop?: number | boolean;
    es?: Easing;
    keys?: string[];
    msak_map?: {
        [tweenKey: string]: number;
    };
}
interface Easing {
    steps(nsteps?: number, direction?: string): void;
    concat(...easeing_list: Array<Easing>): Easing;
    toString(target?: string): string;
    toFunction(): (process: number) => number;
}
interface AnimationDescriptor {
    name: string;
    keys: string[];
    mask?: number;
    masks?: number[];
    values?: {
        [propName: string]: number;
    };
    parent?: string;
}
interface TweenData {
    ft?: number;
    tt?: number;
    val: number;
    es?: Easing;
}
interface AnimationData extends TweenData {
    key?: string;
    onPlay?: () => boolean | void;
    onEnd?: (dtime?: number) => void;
    [AnimationKey: string]: any;
}
interface Matrix {
    valueOf(): string;
    setIdentify?(): void;
    scale?(...axes: number[]): void;
    translate?(...axes: number[]): void;
    rotateY?(angle: number): void;
    rotateX?(angle: number): void;
    rotateZ?(angle: number): void;
    rotate3d?(x: number, y: number, z: number, angle: number): void;
}
interface AnimationConfig {
    order?: ORDER;
    duration?: number;
    es?: Easing;
    direction?: DIRECTION;
    loop?: number;
    begin?: number;
    speed?: number;
    matrix?: {
        new (): Matrix;
    };
    sync_keys?: string[];
}
export { DIRECTION, POSITION, ORDER, AnimationDescriptor, AnimationData, AnimationConfig, Matrix, TweenOption, TweenData };
