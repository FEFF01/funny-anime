"use strict";
import Matrix2d from "./matrix2d";
import Matrix3d from "./matrix3d";
import Easing from "./easing";
import Player from "./player";
import {
    ORDER,
    DIRECTION,
    AnimationDescriptor,
    AnimationData,
    TweenData,
    TweenOption,
    AnimationConfig,
    Matrix
} from "./interfaces"
import Tween from "./tween";

let PROP_TRANSFORM = "transform";
try {
    "transform" in document.body.style || (PROP_TRANSFORM = "webkitTransform");
} catch (e) {

}

let STATUS_BASE_MASK = 0b100;

class FunnyAnime extends Player {
    static EASING: typeof Easing = Easing;
    static Player = Player;
    static Matrix2d = Matrix2d;
    static Matrix3d = Matrix3d;
    static ORDER = ORDER;
    static DIRECTION = DIRECTION;
    static MATRIX3D_FACTORS = ["tz", "rx3d", "ry3d", "rz3d", "ra3d", "sz"];
    static METHODS: AnimationDescriptor[] = [
        {
            name: "translate",
            keys: ["tx", "ty", "tz"],
            parent: "matrix"
        },
        {
            name: "rotateX",
            keys: ["rx"],
            parent: "matrix"
        },
        {
            name: "rotateY",
            keys: ["ry"],
            parent: "matrix"
        },
        {
            name: "rotateZ",
            keys: ["rz"],
            parent: "matrix"
        },
        {
            name: "rotate3d",
            keys: ["rx3d", "ry3d", "rz3d", "ra3d"],
            parent: "matrix"
        },
        {
            name: "scale",
            keys: ["sx", "sy", "sz"],
            values: { sx: 1, sy: 1, sz: 1 },
            parent: "matrix"
        },
        {
            name: "opacity",
            keys: ["o"],
            values: { o: 1 }
        },
    ].map((data: AnimationDescriptor) => {
        data.values || (data.values = {});
        data.mask || (data.mask = 0);
        data.masks = data.keys.map(() => (data.mask |= STATUS_BASE_MASK <<= 1, STATUS_BASE_MASK));
        return data;
    });

    static KEYS = [];

    static PARENT_MAP: { [propName: string]: AnimationDescriptor } = {};
    static MASKS_MAP: { [propName: string]: number } = {};
    static METHODS_MAP: { [propName: string]: AnimationDescriptor } =
        FunnyAnime.METHODS.reduce((map, method) => {
            method.keys.forEach((key, index) => {
                FunnyAnime.KEYS.push(key);
                FunnyAnime.PARENT_MAP[key] = method;
                FunnyAnime.MASKS_MAP[key] = method.masks[index];
            });
            map[method.name] = method;
            return map;
        }, {});
    STATUS_BASE_MASK = STATUS_BASE_MASK;
    private key_descriptor_map = { ...FunnyAnime.PARENT_MAP };
    private method_descriptor_map = { ...FunnyAnime.METHODS_MAP };
    private key_mask_map = { ...FunnyAnime.MASKS_MAP };

    private used_dispatcher: { [methodName: string]: Array<string> } = {};
    private used_keys: string[];
    duration = 0;
    //config: AnimationConfig;
    matrix: Matrix;

    _ptime: number = NaN;
    custom?: Function;
    constructor(
        public target: HTMLElement | any = { style: {} },
        public data: Array<AnimationData> | AnimationData,
        config: AnimationConfig | Function = {},
        custom?: Function
    ) {
        super();
        if (config instanceof Function) {
            this.custom = config;
        } else {
            this.config = config;
            this.custom = custom;
        }
        typeof this.config?.speed === "number" && (this.speed = this.config.speed);

        this.render = this._parse_render(
            this._flatten(data instanceof Array ? data : [data]),
            this.config as AnimationConfig
        ) || ((step: number) => { return ~0; });
        this.matrix = new (
            this.config?.matrix ||
            (
                this.used_keys.some(key => FunnyAnime.MATRIX3D_FACTORS.indexOf(key) !== -1) ?
                    FunnyAnime.Matrix3d :
                    FunnyAnime.Matrix2d
            )
        )();
    }
    private _parse_render(
        data: { [tweenKey: string]: Array<TweenData> },
        config: AnimationConfig = {}
    ) {
        let render_code = "";
        this.used_keys = Object.keys(data);
        
        config.order === FunnyAnime.ORDER.AUTO || this.used_keys.sort((a, b) => {
            let i1 = FunnyAnime.KEYS.indexOf(a),
                i2 = FunnyAnime.KEYS.indexOf(b);
            ~i1 || (i1 = this.used_keys.indexOf(a) * FunnyAnime.KEYS.length / this.used_keys.length);
            ~i2 || (i2 = this.used_keys.indexOf(b) * FunnyAnime.KEYS.length / this.used_keys.length);
            return i1 - i2;
        });
        let method_groups = this._get_groups(this.used_keys, config);

        for (let method_name in method_groups) {
            this["_tween_" + method_name] = Tween.parse(data, method_groups[method_name]);
            render_code +=
                method_groups[method_name].keys.reduce(
                    (reset_expr, key) => ",target._" + key + "-=this._" + key + reset_expr, ";"
                ).slice(1) +
                "status&=this._tween_" + method_name + "(time);" +
                method_groups[method_name].keys.reduce(
                    (set_expr, key) => ",target._" + key + "+=this._" + key + set_expr, ";"
                ).slice(1);
        }
        for (const dispatcher_name in this.used_dispatcher) {
            let used_dispatchers: Array<AnimationDescriptor> = [];
            let key_descriptor_map = this.key_descriptor_map;
            let code = "";
            for (const key of this.used_dispatcher[dispatcher_name]) {
                used_dispatchers.indexOf(key_descriptor_map[key]) === -1 &&
                    used_dispatchers.push(key_descriptor_map[key]);
            }
            for (const dispatcher of used_dispatchers) {
                for (const key of dispatcher.keys) {
                    this["_" + key] = 0;
                    isNaN(this.target["_" + key]) && (this.target["_" + key] = dispatcher.values[key] || 0);
                }
                code += `${
                    dispatcher_name !== "matrix" ?
                        `status&${
                        dispatcher.mask
                        }&&` :
                        ``
                    }this.${
                    dispatcher.parent ? (`${dispatcher.parent}.`) : ``
                    }${dispatcher.name}(${
                    dispatcher.keys.map(key => `target._${key}`).join(",")
                    });`;
            }
            if (dispatcher_name === "matrix") {
                let transform_mask = this.used_dispatcher.matrix.reduce(
                    (mask, key) => mask | (FunnyAnime.MASKS_MAP[key] || 0),
                    0
                );
                render_code += "if(status&" + transform_mask + "){";
                render_code += "this.matrix.setIdentity();";
                code += "target.style." + PROP_TRANSFORM + "=this.matrix.valueOf();";
                code += "}";
            }
            render_code += code;
        }
        return render_code && (new Function("time", "var status=~0,target=this.target;" + render_code + "return status;") as (step: number) => number);
    }

    private _enable(key: string) {
        let descriptor = this.key_descriptor_map[key];
        if (!descriptor) {
            this.method_descriptor_map.custom =
                this.key_descriptor_map[key] =
                descriptor =
                this.method_descriptor_map.custom || {
                    name: "custom",
                    keys: [],
                    mask: 0,
                    masks: [],
                    values: {}
                };
            this.STATUS_BASE_MASK <<= 1;
            descriptor.keys.push(key);
            this.key_mask_map[key] = this.STATUS_BASE_MASK;
            descriptor.mask |= this.STATUS_BASE_MASK;
            descriptor.masks.push(this.STATUS_BASE_MASK);
        }
    }

    private _flatten(data: Array<AnimationData>): { [animaKey: string]: Array<TweenData> } {
        return data.reduce((
            result,
            item
        ) => {
            Object.keys(item).forEach(key => {
                if (
                    FunnyAnime.KEYS.indexOf(key) !== -1 ||
                    this.custom && !/^(ft|tt|es)$/.test(key)
                ) {
                    if (!result[key]) {
                        result[key] = [];
                        this._enable(key);
                    }
                    result[key].push(
                        {
                            ft: item.ft || 0,
                            tt: item.tt,
                            val: item[key],
                            es: item.es
                        }
                    );
                }
            });
            return result;
        }, {});
    }
    opacity(a: number) {
        this.target.style.opacity = a;
    }

    private _get_groups(keys: Array<string>, config: AnimationConfig) {
        let group_map: { [methodName: string]: TweenOption } = {};
        let target = this;
        let used_dispatcher = this.used_dispatcher;
        let key_mask_map = this.key_mask_map;
        function _fill_tween_option(
            option: TweenOption,
            ...configs: Array<TweenOption | AnimationConfig>
        ) {
            option.key_mask_map = key_mask_map;
            option.target = target;
            for (const config of configs) {
                for (const key of ["direction", "duration", "begin", "loop", "es"]) {
                    option[key] === undefined && (option[key] = config[key]);
                }
            }
            return option;
        }
        for (const key of keys) {
            let descriptor = this.key_descriptor_map[key];
            let method_name = descriptor.name;
            let dispatcher_name = descriptor.parent || method_name;
            (used_dispatcher[dispatcher_name] || (used_dispatcher[dispatcher_name] = [])).push(key);

            if (config[key]) {
                _fill_tween_option(group_map[key] = { keys: [key] }, config[key], config);
            } else if (config[method_name]) {
                let _subcof = config[method_name];
                if (_subcof[key]) {
                    _fill_tween_option(group_map[key] = { keys: [key] }, _subcof[key], _subcof, config);
                } else {
                    group_map[method_name] ||
                        _fill_tween_option(group_map[method_name] = { keys: [] }, config[method_name], config);
                    group_map[method_name].keys.push(key);
                }
            } else {
                group_map.root || _fill_tween_option(group_map.root = { keys: [] }, config);//, 
                group_map.root.keys.push(key);
            }
        }
        return group_map;

    }
}

try {
    (window as any).FunnyAnime = FunnyAnime;
} catch (e) {

}

module.exports = FunnyAnime;



/*
class TransofrmDescripter implements Matrix {
    elements: Array<string> = [];
    constructor() {

    }
    setIdentity() {
        this.elements.splice(0, this.elements.length);
    }
    valueOf() {
        return this.elements.join(" ");
    }
}*/

/*{
    name: "rotate",
    keys: ["rx2d", "ry2d"],
    parent: "matrix"
},*/
/*{
    name: "perspectiveOrigin",
    keys: ["pox", "poy"],
    values: { pox: 0.5, poy: 0.5 }
}, {
    name: "perspective",
    keys: ["pv"],
}*/
