

class Easing {
    expr: string;
    nsteps: number;
    direction: string;
    static mirror(ease: Easing | string) {
        return Easing.concat(Easing.easeReverse, ease, Easing.easeReverse);
    }
    static symmetry(ease: Easing | string) {
        return Easing.split(0.5, ease);
    }
    static mix(...ease_list: Array<Easing | string>) {
        return new Easing(
            ease_list.map(
                ease => `(${ease.toString()})/${ease_list.length}`
            ).join("+")
        );
    }
    static concat(...ease_list: Array<Easing | string>) {
        return new Easing(
            ease_list.reduce(
                (wrap: string, ease) => wrap.replace(
                    /\$\{\S*?\$\S*?\}/g,
                    `(${ease.toString()})`
                ), Easing.easeLinear.expr)
        );
    }
    static split(lt: number, ease_l: Easing | string, ease_r = ease_l) {
        if (lt > 0 && lt < 1) {
            let lf = 1 / lt, rf = 1 / (1 - lt);
            return new Easing(`__t<${lt}?(__t*=${lf},(${
                ease_l.toString()
                })/${lf}):(__t=(1-__t)*${rf},1-(${
                ease_r.toString()
                })/${rf})`);
        } else {
            return lt <= 0 ? ease_r : ease_l;
        }
    }
    static easeLinear = new Easing("${$}");
    static easeReverse = new Easing("1-${$}");

    static easeBack = new Easing("${$}*${$}*(3*${$}-2)");
    static easeCirc = new Easing("1-Math.sqrt(1-${$}*${$})");
    static easeSwing = new Easing("0.5-Math.cos(${$}*Math.PI)/2");
    static easeBounce = new Easing(
        "__a=7.5625,__b=2.75," +
        "${$}<1/__b?" +
        "(__a*${$}*${$}):" +
        "(${$}<2/__b?" +
        "(__a*(__b=${$}-1.5/__b)*__b+0.75):" +
        "(${$}<2.5/__b?" +
        "(__a*(__b=${$}-2.25/__b)*__b+0.9375):" +
        "(__a*(__b=${$}-2.625/__b)*__b+0.984375)" +
        "))"
    );
    static cubicBezier: (mx1: number, my1: number, mx2: number, my2: number) => Easing = null;
    static bezier(y0: number, y1: number) {
        return new Easing(`__a=\${$},__b=1-__a,3*__b*__b*__a*${y0}+3*__b*__a*__a*${y1}+__a*__a*__a`);
    };
    static elastic(amplitude?: number, period: number = 0.5) {
        let a = amplitude >= 1 ? (amplitude <= 10 ? amplitude : 10) : 1;
        let p = period <= 2 ? (period >= 0.1 ? period : 0.1) : 2;
        let s = p / (Math.PI * 2) * Math.asin(1 / a);
        return new Easing(`\${$}&&(__b=\${$}-1,-${a}*Math.pow(2,10*__b)*Math.sin(((__b-${s})*Math.PI*2)/${p}))`);
    };

    static easeInBack = Easing.easeBack;
    static easeOutBack = Easing.easeInBack.mirror();
    static easeInOutBack = Easing.easeInBack.symmetry();

    static easeInCirc = Easing.easeCirc;
    static easeOutCirc = Easing.easeInCirc.mirror();
    static easeInOutCirc = Easing.easeInCirc.symmetry();

    static easeInBounce = Easing.easeBounce;
    static easeOutBounce = Easing.easeInBounce.mirror();
    static easeInOutBounce = Easing.easeOutBounce.symmetry();

    static easeInQuad: Easing; static easeInCubic: Easing; static easeInQuart: Easing; static easeInQuint: Easing; static easeInExpo: Easing;

    static easeOutQuad: Easing; static easeOutCubic: Easing; static easeOutQuart: Easing; static easeOutQuint: Easing; static easeOutExpo: Easing;

    static easeInOutQuad: Easing; static easeInOutCubic: Easing; static easeInOutQuart: Easing; static easeInOutQuint: Easing; static easeInOutExpo: Easing;

    constructor(
        expr: string | Easing,
        nsteps?: number,
        direction?: string
    ) {
        if (this instanceof Easing) {
            nsteps && (this.nsteps = nsteps);
            direction && (this.direction = direction);
            this.expr = expr instanceof Easing ? expr.toString() : expr;
        } else {
            return new Easing(expr, nsteps, direction);
        }
    }
    mirror() {
        return Easing.mirror(this);
    }
    symmetry() {
        return Easing.symmetry(this);
    }
    split(lt: number = 0.5, ease?: Easing | string) {
        return Easing.split(lt, this, ease);
    }
    steps(nsteps = this.nsteps, direction = this.direction) {
        return new Easing(this.expr, nsteps, direction);
    }
    mix(...ease_list: Array<Easing>) {
        return Easing.mix(this, ...ease_list);
    }
    concat(...ease_list: Array<Easing>) {
        return Easing.concat(this, ...ease_list);
    }
    toFunction() {
        return new Function("p", `var __a,__b,__t;return ${this.toString("p")};`) as (process: number) => number;
    }
    toString(identifier: String = "${$}") {
        let interval: number;
        return `__t=${identifier},${
            this.nsteps ?
                `__t!==1 && (__t=(__t-__t%${
                interval = 1 / this.nsteps
                }${
                this.direction === "start" ? `+${interval}` : ``
                })),` :
                ``
            }` +
            this.expr.replace(
                /\$\{\S*?\$\S*?\}/g,
                `__t`
            ) + ``;
    }
}
["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(
    (name, index) => {
        let ease = new Easing(`Math.pow(\${$},${index + 2})`);
        Easing["easeIn" + name] = ease;
        Easing["easeOut" + name] = ease.mirror();
        Easing["easeInOut" + name] = ease.symmetry();
    }
);

export default Easing;

/**
    get easeMirror(){
        return this.mirror();
    }
    get easeSymmetry(){
        return this.symmetry();
    }
    get easeBack() {
        return this.concat(Easing.easeBack);
    }
    get easeCire() {
        return this.concat(Easing.easeCire);
    }
    get easeSwing() {
        return this.concat(Easing.easeSwing);
    }
    get easeBounce() {
        return this.concat(Easing.easeBounce);
    }
 */
