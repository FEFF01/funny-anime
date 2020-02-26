//import BufferData from './buffer_data';
import { Matrix } from './interfaces';
const MAX_HEAP_SIZE = 8 * 16;
const STACK_SIZE = 0x10000;
let BUFFER: ArrayBuffer;

class Matrix3D implements Matrix {
    static BOGUS_GLOBAL = {
        //Accessing the heap
        Int8Array: Int8Array,
        Uint8Array: Uint8Array,
        Int16Array: Int16Array,
        Uint16Array: Uint16Array,
        Int32Array: Int32Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array,
        Math: {
            //Functions	
            acos: Math.acos,
            asin: Math.asin,
            atan: Math.atan,
            cos: Math.cos,
            sin: Math.sin,
            tan: Math.tan,
            exp: Math.exp,
            log: Math.log,

            ceil: Math.ceil,
            floor: Math.floor,
            sqrt: Math.sqrt,

            abs: Math.abs,

            min: Math.min,
            max: Math.max,

            atan2: Math.atan2,
            pow: Math.pow,

            imul: Math.imul,

            fround: Math.fround,

            //Constants
            E: Math.E,
            LN10: Math.LN10,
            LN2: Math.LN2,
            LOG2E: Math.LOG2E,
            LOG10E: Math.LOG10E,
            PI: Math.PI,
            SQRT1_2: Math.SQRT1_2,
            SQRT2: Math.SQRT2
        }
    }
    elements;
    constructor() {
        if (!BUFFER) {
            BUFFER = new ArrayBuffer(STACK_SIZE);
        }
        //this.bufferData = BufferData.malloc(MAX_HEAP_SIZE);
        this.elements = new Float64Array(BUFFER, 0, 16);
        var core = Matrix3DCore(
            Matrix3D.BOGUS_GLOBAL, {
            STACK_TOP: STACK_SIZE,
            HEAP_TOP: 0
        },
            BUFFER
        );
        for (var name in core) {
            this[name] = core[name];
        }
        /*if (this.bufferData.heaptop > 0) {
            (this as any)._setHeapTop(this.bufferData.heaptop);
        }
        if (typeof (this as any)._heapSize === "function") {
            this.bufferData.heaptop += (this as any)._heapSize();
        }*/
    }
    valueOf() {
        let HEAPF64 = this.elements;
        (this as any)._loadElements();
        //return "matrix3d(" + HEAPF64.join(",") + ")";
        return (
            "matrix3d(" +
            HEAPF64[0] +
            "," +
            HEAPF64[1] +
            "," +
            HEAPF64[2] +
            "," +
            HEAPF64[3] +
            "," +
            HEAPF64[4] +
            "," +
            HEAPF64[5] +
            "," +
            HEAPF64[6] +
            "," +
            HEAPF64[7] +
            "," +
            HEAPF64[8] +
            "," +
            HEAPF64[9] +
            "," +
            HEAPF64[10] +
            "," +
            HEAPF64[11] +
            "," +
            HEAPF64[12] +
            "," +
            HEAPF64[13] +
            "," +
            HEAPF64[14] +
            "," +
            HEAPF64[15] +
            ")"
        );


        /* 
        
        return "matrix3d(" + HEAPF64.join(",") + ")";
        return String.prototype.concat.call(
             "matrix3d(",
             HEAPF64[0],
             ",",
             HEAPF64[1],
             ",",
             HEAPF64[2],
             ",",
             HEAPF64[3],
             ",",
             HEAPF64[4],
             ",",
             HEAPF64[5],
             ",",
             HEAPF64[6],
             ",",
             HEAPF64[7],
             ",",
             HEAPF64[8],
             ",",
             HEAPF64[9],
             ",",
             HEAPF64[10],
             ",",
             HEAPF64[11],
             ",",
             HEAPF64[12],
             ",",
             HEAPF64[13],
             ",",
             HEAPF64[14],
             ",",
             HEAPF64[15],
             ")"
         );
         
         */
    }


}

//'almost asm';
function Matrix3DCore(stdlib, env, buffer) {
    "use asm";
    var sin = stdlib.Math.sin;
    var cos = stdlib.Math.cos;
    var sqrt = stdlib.Math.sqrt;
    var PI = stdlib.Math.PI;
    var HEAPF64 = new stdlib.Float64Array(buffer);
    /*
    var HEAP32=new stdlib.Int32Array(buffer);
    var STACK_TOP = env.STACK_TOP | 0;*/
    var HEAP_TOP = env.HEAP_TOP | 0;



    var cv = 0.0,
        sv = 0.0;

    var f0 = 0.0,
        f1 = 0.0,
        f2 = 0.0,
        f3 = 0.0;

    var e0 = 0.0,
        e1 = 0.0,
        e2 = 0.0,
        e3 = 0.0,
        e4 = 0.0,
        e5 = 0.0,
        e6 = 0.0,
        e7 = 0.0,
        e8 = 0.0,
        e9 = 0.0,
        e10 = 0.0,
        e11 = 0.0,
        e12 = 0.0,
        e13 = 0.0,
        e14 = 0.0,
        e15 = 0.0;

    var i0 = 0,
        i1 = 8,
        i2 = 16,
        i3 = 24,
        i4 = 32,
        i5 = 40,
        i6 = 48,
        i7 = 56,
        i8 = 64,
        i9 = 72,
        i10 = 80,
        i11 = 88,
        i12 = 96,
        i13 = 104,
        i14 = 112,
        i15 = 120;





    function setIdentity() {
        e0 = e5 = e10 = e15 = 1.0;
        e4 = e8 = e12 = e1 = e9 = e13 = e2 = e6 = e14 = e3 = e7 = e11 = 0.0;
    }

    function scale(x: number, y: number, z: number) {
        x = +x;
        y = +y;
        z = +z;
        e0 = e0 * x;
        e4 = e4 * y;
        e8 = e8 * z;
        e1 = e1 * x;
        e5 = e5 * y;
        e9 = e9 * z;
        e2 = e2 * x;
        e6 = e6 * y;
        e10 = e10 * z;
        e3 = e3 * x;
        e7 = e7 * y;
        e11 = e11 * z;
    }

    function translate(x: number, y: number, z: number) {
        x = +x;
        y = +y;
        z = +z;
        e12 = e12 + e0 * x + e4 * y + e8 * z;
        e13 = e13 + e1 * x + e5 * y + e9 * z;
        e14 = e14 + e2 * x + e6 * y + e10 * z;
        e15 = e15 + e3 * x + e7 * y + e11 * z;
    }

    function multiply() {
        var t0 = 0.0,
            t1 = 0.0,
            t2 = 0.0,
            t3 = 0.0,
            t4 = 0.0,
            t5 = 0.0,
            t6 = 0.0,
            t7 = 0.0,
            t8 = 0.0,
            t9 = 0.0,
            t10 = 0.0,
            t11 = 0.0,
            t12 = 0.0,
            t13 = 0.0,
            t14 = 0.0,
            t15 = 0.0;

        t0 = +HEAPF64[i0 >> 3], t1 = +HEAPF64[i1 >> 3], t2 = +HEAPF64[i2 >> 3], t3 = +HEAPF64[i3 >> 3];
        t4 = +HEAPF64[i4 >> 3], t5 = +HEAPF64[i5 >> 3], t6 = +HEAPF64[i6 >> 3], t7 = +HEAPF64[i7 >> 3];
        t8 = +HEAPF64[i8 >> 3], t9 = +HEAPF64[i9 >> 3], t10 = +HEAPF64[i10 >> 3], t11 = +HEAPF64[i11 >> 3];
        t12 = +HEAPF64[i12 >> 3], t13 = +HEAPF64[i13 >> 3], t14 = +HEAPF64[i14 >> 3], t15 = +HEAPF64[i15 >> 3];

        f0 = e0, f1 = e4, f2 = e8, f3 = e12;
        e0 = f0 * t0 + f1 * t1 + f2 * t2 + f3 * t3;
        e4 = f0 * t4 + f1 * t5 + f2 * t6 + f3 * t7;
        e8 = f0 * t8 + f1 * t9 + f2 * t10 + f3 * t11;
        e12 = f0 * t12 + f1 * t13 + f2 * t14 + f3 * t15;


        f0 = e1, f1 = e5, f2 = e9, f3 = e13;
        e1 = f0 * t0 + f1 * t1 + f2 * t2 + f3 * t3;
        e5 = f0 * t4 + f1 * t5 + f2 * t6 + f3 * t7;
        e9 = f0 * t8 + f1 * t9 + f2 * t10 + f3 * t11;
        e13 = f0 * t12 + f1 * t13 + f2 * t14 + f3 * t15;


        f0 = e2, f1 = e6, f2 = e10, f3 = e14;
        e2 = f0 * t0 + f1 * t1 + f2 * t2 + f3 * t3;
        e6 = f0 * t4 + f1 * t5 + f2 * t6 + f3 * t7;
        e10 = f0 * t8 + f1 * t9 + f2 * t10 + f3 * t11;
        e14 = f0 * t12 + f1 * t13 + f2 * t14 + f3 * t15;


        f0 = e3, f1 = e7, f2 = e11, f3 = e15;
        e3 = f0 * t0 + f1 * t1 + f2 * t2 + f3 * t3;
        e7 = f0 * t4 + f1 * t5 + f2 * t6 + f3 * t7;
        e11 = f0 * t8 + f1 * t9 + f2 * t10 + f3 * t11;
        e15 = f0 * t12 + f1 * t13 + f2 * t14 + f3 * t15;
    }

    function rotateZ(angle: number) {
        angle = +angle;
        angle = (PI * +angle) / 180.0;
        cv = cos(angle), sv = sin(angle);
        f0 = e0, f1 = e1, f2 = e2, f3 = e3;

        e0 = f0 * cv + e4 * sv;
        e1 = f1 * cv + e5 * sv;
        e2 = f2 * cv + e6 * sv;
        e3 = f3 * cv + e7 * sv;
        e4 = f0 * -sv + e4 * cv;
        e5 = f1 * -sv + e5 * cv;
        e6 = f2 * -sv + e6 * cv;
        e7 = f3 * -sv + e7 * cv;
    }

    function rotateY(angle: number) {
        angle = +angle;
        angle = (PI * angle) / 180.0;
        cv = cos(angle), sv = sin(angle);
        f0 = e0, f1 = e1, f2 = e2, f3 = e3;
        e0 = f0 * cv + e8 * -sv;
        e1 = f1 * cv + e9 * -sv;
        e2 = f2 * cv + e10 * -sv;
        e3 = f3 * cv + e11 * -sv;
        e8 = f0 * sv + e8 * cv;
        e9 = f1 * sv + e9 * cv;
        e10 = f2 * sv + e10 * cv;
        e11 = f3 * sv + e11 * cv;
    }

    function rotateX(angle: number) {
        angle = +angle;
        angle = (PI * angle) / 180.0;
        cv = cos(angle), sv = sin(angle);
        f0 = e4, f1 = e5, f2 = e6, f3 = e7;

        e4 = e4 * cv + e8 * sv;
        e5 = e5 * cv + e9 * sv;
        e6 = e6 * cv + e10 * sv;
        e7 = e7 * cv + e11 * sv;
        e8 = f0 * -sv + e8 * cv;
        e9 = f1 * -sv + e9 * cv;
        e10 = f2 * -sv + e10 * cv;
        e11 = f3 * -sv + e11 * cv;
    }
    function rotate3d(x: number, y: number, z: number, angle: number) {
        x = +x;
        y = +y;
        z = +z;
        angle = +angle;
        var s = 0.0,
            c = 0.0,
            rlen = 0.0,
            nc = 0.0,
            xy = 0.0,
            yz = 0.0,
            zx = 0.0,
            xs = 0.0,
            ys = 0.0,
            zs = 0.0;

        angle = (PI * angle) / 180.0;
        s = sin(angle), c = cos(angle);

        rlen = 1.0 / sqrt(x * x + y * y + z * z);
        x = x * rlen;
        y = y * rlen;
        z = z * rlen;

        nc = 1.0 - c;
        xy = x * y;
        yz = y * z;
        zx = z * x;
        xs = x * s;
        ys = y * s;
        zs = z * s;
        HEAPF64[i0 >> 3] = x * x * nc + c;
        HEAPF64[i1 >> 3] = xy * nc + zs;
        HEAPF64[i2 >> 3] = zx * nc - ys;
        HEAPF64[i3 >> 3] = 0.0;
        HEAPF64[i4 >> 3] = xy * nc - zs;
        HEAPF64[i5 >> 3] = y * y * nc + c;
        HEAPF64[i6 >> 3] = yz * nc + xs;
        HEAPF64[i7 >> 3] = 0.0;
        HEAPF64[i8 >> 3] = zx * nc + ys;
        HEAPF64[i9 >> 3] = yz * nc - xs;
        HEAPF64[i10 >> 3] = z * z * nc + c;
        HEAPF64[i11 >> 3] = 0.0;
        HEAPF64[i12 >> 3] = 0.0;
        HEAPF64[i13 >> 3] = 0.0;
        HEAPF64[i14 >> 3] = 0.0;
        HEAPF64[i15 >> 3] = 1.0;
        multiply();
    }

    function _loadElements() {
        var ft = 10000.0,
            mv = 6755399441055744.0;

        HEAPF64[i0 >> 3] = (e0 * ft + mv - mv) / ft;
        HEAPF64[i1 >> 3] = (e1 * ft + mv - mv) / ft;
        HEAPF64[i2 >> 3] = (e2 * ft + mv - mv) / ft;
        HEAPF64[i3 >> 3] = (e3 * ft + mv - mv) / ft;
        HEAPF64[i4 >> 3] = (e4 * ft + mv - mv) / ft;
        HEAPF64[i5 >> 3] = (e5 * ft + mv - mv) / ft;
        HEAPF64[i6 >> 3] = (e6 * ft + mv - mv) / ft;
        HEAPF64[i7 >> 3] = (e7 * ft + mv - mv) / ft;
        HEAPF64[i8 >> 3] = (e8 * ft + mv - mv) / ft;
        HEAPF64[i9 >> 3] = (e9 * ft + mv - mv) / ft;
        HEAPF64[i10 >> 3] = (e10 * ft + mv - mv) / ft;
        HEAPF64[i11 >> 3] = (e11 * ft + mv - mv) / ft;
        HEAPF64[i12 >> 3] = (e12 * ft + mv - mv) / ft;
        HEAPF64[i13 >> 3] = (e13 * ft + mv - mv) / ft;
        HEAPF64[i14 >> 3] = (e14 * ft + mv - mv) / ft;
        HEAPF64[i15 >> 3] = (e15 * ft + mv - mv) / ft;

        /*HEAPF64[i0 >> 3] = +(~~(e0 * 10000.0)) / 10000.0;
        HEAPF64[i1 >> 3] = +(~~(e1 * 10000.0)) / 10000.0;
        HEAPF64[i2 >> 3] = +(~~(e2 * 10000.0)) / 10000.0;
        HEAPF64[i3 >> 3] = +(~~(e3 * 10000.0)) / 10000.0;
        HEAPF64[i4 >> 3] = +(~~(e4 * 10000.0)) / 10000.0;
        HEAPF64[i5 >> 3] = +(~~(e5 * 10000.0)) / 10000.0;
        HEAPF64[i6 >> 3] = +(~~(e6 * 10000.0)) / 10000.0;
        HEAPF64[i7 >> 3] = +(~~(e7 * 10000.0)) / 10000.0;
        HEAPF64[i8 >> 3] = +(~~(e8 * 10000.0)) / 10000.0;
        HEAPF64[i9 >> 3] = +(~~(e9 * 10000.0)) / 10000.0;
        HEAPF64[i10 >> 3] = +(~~(e10 * 10000.0)) / 10000.0;
        HEAPF64[i11 >> 3] = +(~~(e11 * 10000.0)) / 10000.0;
        HEAPF64[i12 >> 3] = +(~~(e12 * 10000.0)) / 10000.0;
        HEAPF64[i13 >> 3] = +(~~(e13 * 10000.0)) / 10000.0;
        HEAPF64[i14 >> 3] = +(~~(e14 * 10000.0)) / 10000.0;
        HEAPF64[i15 >> 3] = +(~~(e15 * 10000.0)) / 10000.0;*/
        /*HEAPF64[i0 >> 3] = e0;
        HEAPF64[i1 >> 3] = e1;
        HEAPF64[i2 >> 3] = e2;
        HEAPF64[i3 >> 3] = e3;
        HEAPF64[i4 >> 3] = e4;
        HEAPF64[i5 >> 3] = e5;
        HEAPF64[i6 >> 3] = e6;
        HEAPF64[i7 >> 3] = e7;
        HEAPF64[i8 >> 3] = e8;
        HEAPF64[i9 >> 3] = e9;
        HEAPF64[i10 >> 3] = e10;
        HEAPF64[i11 >> 3] = e11;
        HEAPF64[i12 >> 3] = e12;
        HEAPF64[i13 >> 3] = e13;
        HEAPF64[i14 >> 3] = e14;
        HEAPF64[i15 >> 3] = e15;*/
    }
   
    /*function _setHeapTop(offset: number) {
        offset = offset | 0;
        HEAP_TOP = offset;
        i0 = HEAP_TOP + 0 | 0;
        i1 = HEAP_TOP + 8 | 0;
        i2 = HEAP_TOP + 16 | 0;
        i3 = HEAP_TOP + 24 | 0;
        i4 = HEAP_TOP + 32 | 0;
        i5 = HEAP_TOP + 40 | 0;
        i6 = HEAP_TOP + 48 | 0;
        i7 = HEAP_TOP + 56 | 0;
        i8 = HEAP_TOP + 64 | 0;
        i9 = HEAP_TOP + 72 | 0;
        i10 = HEAP_TOP + 80 | 0;
        i11 = HEAP_TOP + 88 | 0;
        i12 = HEAP_TOP + 96 | 0;
        i13 = HEAP_TOP + 104 | 0;
        i14 = HEAP_TOP + 112 | 0;
        i15 = HEAP_TOP + 120 | 0;
    }*/

    /*function _heapSize() {
        return 8 * 16 | 0;
    }*/

    return {
        //_heapSize,
        //_setHeapTop,
        setIdentity,
        scale,
        translate,
        multiply,
        rotateZ,
        rotateY,
        rotateX,
        rotate3d,
        _loadElements
    };
}

export default Matrix3D;