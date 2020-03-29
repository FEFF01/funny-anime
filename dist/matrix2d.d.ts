import { Matrix } from './interfaces';
declare class Matrix2D implements Matrix {
    elements: Array<number>;
    constructor();
    setIdentity(): this;
    translate(x: number, y: number): this;
    multiply(b: Array<number>): this;
    rotateZ(angle: number): this;
    rotateY(angle: number): this;
    rotateX(angle: number): this;
    scale(x: number, y: number): this;
    rotate(x: number, y: number, z: number): void;
    rotate3d(x: number, y: number, z: number, angle: number): this;
    valueOf(): string;
}
export default Matrix2D;
