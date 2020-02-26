
import { Matrix } from './interfaces';
class Matrix2D implements Matrix {
    elements: Array<number> = new Array(16);
    constructor() {
    }
    setIdentity() {
        var e = this.elements;
        e[0] = e[5] = e[10] = e[15] = 1;
        e[4] = e[8] = e[12] = 0;
        e[1] = e[9] = e[13] = 0;
        e[2] = e[6] = e[14] = 0;
        e[3] = e[7] = e[11] = 0;;
        return this;
    }
    translate(x: number, y: number) {
        var e = this.elements;
        e[12] += e[0] * x + e[4] * y;
        e[13] += e[1] * x + e[5] * y;
        return this;
    }
    multiply(b: Array<number>) {
        for (var i = 0, a = this.elements, ai0, ai1, ai2, ai3; i < 2; i++) {
            ai0 = a[i]; ai1 = a[i + 4]; ai2 = a[i + 8]; ai3 = a[i + 12];
            a[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            a[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];

            a[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            a[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    }

    rotateZ(angle: number) {
        angle = Math.PI * angle / 180;
        var e = this.elements, ca = Math.cos(angle), sa = Math.sin(angle);
        var aj0 = e[0], aj1 = e[1];
        e[0] = aj0 * ca + e[4] * sa;
        e[1] = aj1 * ca + e[5] * sa;
        e[4] = aj0 * -sa + e[4] * ca;
        e[5] = aj1 * -sa + e[5] * ca;
        return this;
    }
    rotateY(angle: number) {
        angle = Math.PI * angle / 180;
        var e = this.elements, ca = Math.cos(angle), sa = Math.sin(angle);
        var aj0 = e[0], aj1 = e[1];
        e[0] = aj0 * ca + e[8] * -sa;
        e[1] = aj1 * ca + e[9] * -sa;
        e[8] = aj0 * sa + e[8] * ca;
        e[9] = aj1 * sa + e[9] * ca;
        return this;
    }
    rotateX(angle: number) {
        angle = Math.PI * angle / 180;
        var e = this.elements, ca = Math.cos(angle), sa = Math.sin(angle);
        var aj0 = e[4], aj1 = e[5];
        e[4] = aj0 * ca + e[8] * sa;
        e[5] = aj1 * ca + e[9] * sa;
        e[8] = aj0 * -sa + e[8] * ca;
        e[9] = aj1 * -sa + e[9] * ca;
        return this;
    }
    scale(x: number, y: number) {
        var e = this.elements;
        e[0] *= x; e[4] *= y;
        e[1] *= x; e[5] *= y;
        e[2] *= x; e[6] *= y;
        e[3] *= x; e[7] *= y;
        return this;
    }
    rotate(x: number, y: number, z: number) {
        x && this.rotateX(x);
        y && this.rotateY(y);
        z && this.rotateZ(z);
    }
    rotate3d(x: number, y: number, z: number, angle: number) {
        var e = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ],
            s: number,
            c: number,
            rlen: number,
            nc: number,
            xy: number,
            yz: number,
            zx: number,
            xs: number,
            ys: number,
            zs: number;

        angle = Math.PI * angle / 180;
        s = Math.sin(angle), c = Math.cos(angle);

        rlen = 1 / Math.sqrt(x * x + y * y + z * z);
        x *= rlen;
        y *= rlen;
        z *= rlen;

        nc = 1 - c;
        xy = x * y;
        yz = y * z;
        zx = z * x;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        e[0] = x * x * nc + c;
        e[1] = xy * nc + zs;
        e[2] = zx * nc - ys;

        e[4] = xy * nc - zs;
        e[5] = y * y * nc + c;
        e[6] = yz * nc + xs;

        e[8] = zx * nc + ys;
        e[9] = yz * nc - xs;
        e[10] = z * z * nc + c;
        return this.multiply(e);
    }
    valueOf() {
        var e = this.elements;
        return "matrix(" +
            ((e[0] * 1000000) | 0) / 1000000 + "," +
            ((e[1] * 1000000) | 0) / 1000000 + "," +
            ((e[4] * 1000000) | 0) / 1000000 + "," +
            ((e[5] * 1000000) | 0) / 1000000 + "," +
            ((e[12] * 1000000) | 0) / 1000000 + "," +
            ((e[13] * 1000000) | 0) / 1000000
            + ")";
    }
}


export default Matrix2D;