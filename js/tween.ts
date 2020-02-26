

import Easing from './easing';

import { DIRECTION, POSITION, TweenOption, TweenData } from './interfaces';



interface TweenStep {
    (step: number): number;
}


interface CalcBlock {
    init_exprs: Array<string>,
    eval_exprs: Array<[string, string | number]>,
    lr: number,
    rr: number,
    value_expr?: string
}


const EASE_LINEAR = Easing.easeLinear;

class Tween {
    static DIRECTION = DIRECTION;
    step: TweenStep;
    constructor(
        private data: { [tweenKey: string]: Array<TweenData> },
        private option?: TweenOption
    ) {
        if (data) {
            this.step = this.parseTween(data, option);
        }
    }
    protected parseTween(
        data: { [tweenKey: string]: Array<TweenData> },
        option: TweenOption = this.option
    ) {
        return Tween.parse(data, option);
    }

    static parse(data: { [tweenKey: string]: Array<TweenData> }, option: TweenOption = {}) {

        let left_tween_map = {};
        let accumulate_values = {};
        let initial_values = {};
        let tween_keys = option.keys || Object.keys(data);
        let range_set = [];
        for (const key of tween_keys) {
            left_tween_map[key] = [];
            initial_values[key] = accumulate_values[key] = 0;
            range_set = range_set.concat(
                data[key].reduce(
                    (res, unit) => {
                        return res.concat(
                            {
                                range: unit.ft || 0,
                                target: unit,
                                position: POSITION.LEFT,
                                key
                            },
                            {
                                range: unit.tt || 0,
                                target: unit,
                                position: POSITION.RIGHT,
                                key
                            }
                        );
                    },
                    []
                )
            );
        }
        range_set.sort(
            (a, b) => {
                let res = a.range - b.range;
                return res || (b.position - a.position);//让右区间优先被处理
            }
        );


        let use_def_ease = false;

        let blocks: Array<CalcBlock> = [];
        for (
            let idx = 0, len = range_set.length, cursor = range_set[0]?.range || 0;
            idx < len;
            idx++
        ) {
            let range_item = range_set[idx];
            if (cursor !== range_item.range) {
                let init_exprs = [];
                let eval_exprs: Array<[string, string | number]> = tween_keys.map(key => [
                    key,
                    left_tween_map[key].reduce(
                        (evaluation_expression: string, tween: TweenData, index: number) => {
                            init_exprs.push(
                                `_${key}_${index}=(_time_-${tween.ft})/${tween.tt - tween.ft}`
                            );
                            let ease_expr = tween.es?.toString?.(`_${key}_${index}`);
                            if (!ease_expr) {
                                ease_expr = `_def_ease(_${key}_${index})`;
                                use_def_ease = true;
                            } else {
                                ease_expr = `(${ease_expr})`;
                            }
                            return evaluation_expression +
                                `+${ease_expr}*${tween.val}`;
                        }
                        , accumulate_values[key] + initial_values[key]
                    )]
                );
                blocks.push(
                    {
                        init_exprs,
                        eval_exprs,
                        lr: cursor,
                        rr: range_item.range
                    }
                );
                cursor = range_item.range;
            }
            if (range_item.position === POSITION.RIGHT) {
                let index = left_tween_map[range_item.key].indexOf(range_item.target);
                if (index !== -1) {
                    left_tween_map[range_item.key].splice(index, 1);
                } else {
                    for (let j = idx + 1; j < len; j++) {
                        if (range_set[j].target === range_item.target) {
                            range_set.splice(j, 1);
                            len--;
                        }
                    }
                }
                let val = _get_value(range_item.target, 1);
                if (range_item.target.tt === undefined) {
                    initial_values[range_item.key] += val;
                } else {
                    accumulate_values[range_item.key] += val;
                }
                continue;
            }
            if (cursor === range_item.range) {
                left_tween_map[range_item.key].push(range_item.target);
            }
        }

        let actual_duration = blocks.length ? (blocks[blocks.length - 1].rr) : 0;
        let actual_begin = blocks.length ? (blocks[0].lr) : 0;
        let {
            begin = 0,
            loop = 1,
            direction,
            key_mask_map,
            duration = actual_duration,
            target
        } = option;
        typeof loop === "boolean" && (loop = loop === true ? 8640000000000 : 1);

        function _get_value(tween: TweenData, process: number) {
            return (tween.es || option.es || EASE_LINEAR).toFunction()(process) * tween.val;
        }
        function get_evalexpr(key: string, expression: string | number = "0") {
            let calc_expr =
                (
                    direction === DIRECTION.ACCUMULATIVE ?
                        (accumulate_values[key] + "*_loop_+") :
                        ""
                ) + expression;
            if (key_mask_map) {///*typeof expression === "number" && */
                return `(__a=${calc_expr})===this._${key}?(status&=${~key_mask_map[key]}):(this._${key}=__a);`;
            } else {
                return `this._${key}=${calc_expr};`
            }
        }

        for (let block of blocks) {
            let value_expr = "";
            for (let [key, expression] of block.eval_exprs) {
                value_expr += get_evalexpr(key, expression);
            }
            block.value_expr = value_expr;
        }



        function _parse_tween_expr(block: CalcBlock) {
            return (block.init_exprs.length ? `var ${block.init_exprs.join(",")};` : ``) +
                block.value_expr;
        }

        function _binary_search_encode(_sub_blocks: Array<CalcBlock>): string {
            let mid = Math.floor(_sub_blocks.length / 2);
            let mid_block = _sub_blocks[mid];
            if (_sub_blocks.length >= 2) {
                return `if(_time_<=${mid_block.lr}){` +
                    _binary_search_encode(_sub_blocks.slice(0, mid)) +
                    `}else{` +
                    _binary_search_encode(_sub_blocks.slice(mid)) +
                    `}`;
            } else {
                return _parse_tween_expr(mid_block);
            }
        }

        let tween_code = blocks.length ? _binary_search_encode(blocks) : "return 0;";

        let calc_step = new Function(
            `time`,
            `var status=~0,_d_=${duration},_dl_=${duration * loop},__a,__b,__t;` +
            `${use_def_ease ? `function _def_ease(p){${
                `var __a,__b,__t;` +
                `return ` + (option.es || EASE_LINEAR).toString(`p`) + `;`
                }}` : ``}` +
            (begin ? `time+=${begin};` : ``) +
            `var _time_=time>=0?(time<=_dl_?time:_dl_):0;` +
            `var _loop_=_time_/_d_|0;` +
            `_time_=${
            direction === DIRECTION.ALTERNATE ?
                `_loop_%2?(_d_-_time_%_d_):(_time_%_d_)` :
                `_time_%_d_ || (_time_ && (_loop_--,_d_))`
            };` +
            `${actual_duration < duration ? `_time_>${actual_duration} && (_time_=${actual_duration});` : ``}` +
            `${actual_begin > 0 ? `if(_time_<${actual_begin}){${
                tween_keys.reduce((expr, key) =>
                    expr + `__a=${initial_values[key]}${direction === DIRECTION.ACCUMULATIVE ? `+_loop_*${accumulate_values[key]}` : ``},this._${key}===__a?(status&=${~key_mask_map[key]}):(this._${key}=__a);`
                    , "")
                }}else{` : ``}` +
            tween_code +
            `${actual_begin > 0 ? `}` : ``}` +
            `return status^(time<=0?6:(time<=_dl_?5:3));`
        ) as TweenStep;
        return target ? calc_step.bind(target) : calc_step;

    }



}


export default Tween;