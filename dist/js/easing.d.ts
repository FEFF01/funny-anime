declare class Easing {
    expr: string;
    nsteps: number;
    direction: string;
    static mirror(ease: Easing | string): Easing;
    static symmetry(ease: Easing | string): string | Easing;
    static mix(...ease_list: Array<Easing | string>): Easing;
    static concat(...ease_list: Array<Easing | string>): Easing;
    static split(lt: number, ease_l: Easing | string, ease_r?: string | Easing): string | Easing;
    static easeLinear: Easing;
    static easeReverse: Easing;
    static easeBack: Easing;
    static easeCirc: Easing;
    static easeSwing: Easing;
    static easeBounce: Easing;
    static cubicBezier: (mx1: number, my1: number, mx2: number, my2: number) => Easing;
    static bezier(y0: number, y1: number): Easing;
    static elastic(amplitude?: number, period?: number): Easing;
    static easeInBack: Easing;
    static easeOutBack: Easing;
    static easeInOutBack: string | Easing;
    static easeInCirc: Easing;
    static easeOutCirc: Easing;
    static easeInOutCirc: string | Easing;
    static easeInBounce: Easing;
    static easeOutBounce: Easing;
    static easeInOutBounce: string | Easing;
    static easeInQuad: Easing;
    static easeInCubic: Easing;
    static easeInQuart: Easing;
    static easeInQuint: Easing;
    static easeInExpo: Easing;
    static easeOutQuad: Easing;
    static easeOutCubic: Easing;
    static easeOutQuart: Easing;
    static easeOutQuint: Easing;
    static easeOutExpo: Easing;
    static easeInOutQuad: Easing;
    static easeInOutCubic: Easing;
    static easeInOutQuart: Easing;
    static easeInOutQuint: Easing;
    static easeInOutExpo: Easing;
    constructor(expr: string | Easing, nsteps?: number, direction?: string);
    mirror(): Easing;
    symmetry(): string | Easing;
    split(lt?: number, ease?: Easing | string): string | Easing;
    steps(nsteps?: number, direction?: string): Easing;
    mix(...ease_list: Array<Easing>): Easing;
    concat(...ease_list: Array<Easing>): Easing;
    toFunction(): (process: number) => number;
    toString(identifier?: String): string;
}
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
