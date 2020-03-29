import { Matrix } from './interfaces';
declare class Matrix3D implements Matrix {
    static BOGUS_GLOBAL: {
        Int8Array: Int8ArrayConstructor;
        Uint8Array: Uint8ArrayConstructor;
        Int16Array: Int16ArrayConstructor;
        Uint16Array: Uint16ArrayConstructor;
        Int32Array: Int32ArrayConstructor;
        Uint32Array: Uint32ArrayConstructor;
        Float32Array: Float32ArrayConstructor;
        Float64Array: Float64ArrayConstructor;
        Math: {
            acos: (x: number) => number;
            asin: (x: number) => number;
            atan: (x: number) => number;
            cos: (x: number) => number;
            sin: (x: number) => number;
            tan: (x: number) => number;
            exp: (x: number) => number;
            log: (x: number) => number;
            ceil: (x: number) => number;
            floor: (x: number) => number;
            sqrt: (x: number) => number;
            abs: (x: number) => number;
            min: (...values: number[]) => number;
            max: (...values: number[]) => number;
            atan2: (y: number, x: number) => number;
            pow: (x: number, y: number) => number;
            imul: (x: number, y: number) => number;
            fround: (x: number) => number;
            E: number;
            LN10: number;
            LN2: number;
            LOG2E: number;
            LOG10E: number;
            PI: number;
            SQRT1_2: number;
            SQRT2: number;
        };
    };
    elements: any;
    constructor();
    valueOf(): string;
}
export default Matrix3D;
