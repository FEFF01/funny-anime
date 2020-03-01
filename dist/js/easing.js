!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)n[o]=i[a];return n};Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(t,r,n){if(!(this instanceof e))return new e(t,r,n);r&&(this.nsteps=r),n&&(this.direction=n),this.expr=t instanceof e?t.toString():t}return e.mirror=function(t){return e.concat(e.easeReverse,t,e.easeReverse)},e.symmetry=function(t){return e.split(.5,t)},e.mix=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new e(t.map((function(e){return"("+e.toString()+")/"+t.length})).join("+"))},e.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new e(t.reduce((function(e,t){return e.replace(/\$\{\S*?\$\S*?\}/g,"("+t.toString()+")")}),e.easeLinear.expr))},e.split=function(t,r,n){if(void 0===n&&(n=r),t>0&&t<1){var o=1/t,i=1/(1-t);return new e("__t<"+t+"?(__t*="+o+",("+r.toString()+")/"+o+"):(__t=(1-__t)*"+i+",1-("+n.toString()+")/"+i+")")}return t<=0?n:r},e.bezier=function(t,r){return new e("__a=${$},__b=1-__a,3*__b*__b*__a*"+t+"+3*__b*__a*__a*"+r+"+__a*__a*__a")},e.elastic=function(t,r){void 0===r&&(r=.5);var n=t>=1?t<=10?t:10:1,o=r<=2?r>=.1?r:.1:2;return new e("${$}&&(__b=${$}-1,-"+n+"*Math.pow(2,10*__b)*Math.sin(((__b-"+o/(2*Math.PI)*Math.asin(1/n)+")*Math.PI*2)/"+o+"))")},e.prototype.mirror=function(){return e.mirror(this)},e.prototype.symmetry=function(){return e.symmetry(this)},e.prototype.split=function(t,r){return void 0===t&&(t=.5),e.split(t,this,r)},e.prototype.steps=function(t,r){return void 0===t&&(t=this.nsteps),void 0===r&&(r=this.direction),new e(this.expr,t,r)},e.prototype.mix=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.mix.apply(e,n([this],t))},e.prototype.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.concat.apply(e,n([this],t))},e.prototype.toFunction=function(){return new Function("p","var __a,__b,__t;return "+this.toString("p")+";")},e.prototype.toString=function(e){var t;return void 0===e&&(e="${$}"),"__t="+e+","+(this.nsteps?"__t!==1 && (__t=(__t-__t%"+(t=1/this.nsteps)+("start"===this.direction?"+"+t:"")+")),":"")+this.expr.replace(/\$\{\S*?\$\S*?\}/g,"__t")},e.easeLinear=new e("${$}"),e.easeReverse=new e("1-${$}"),e.easeBack=new e("${$}*${$}*(3*${$}-2)"),e.easeCirc=new e("1-Math.sqrt(1-${$}*${$})"),e.easeSwing=new e("0.5-Math.cos(${$}*Math.PI)/2"),e.easeBounce=new e("__a=7.5625,__b=2.75,${$}<1/__b?(__a*${$}*${$}):(${$}<2/__b?(__a*(__b=${$}-1.5/__b)*__b+0.75):(${$}<2.5/__b?(__a*(__b=${$}-2.25/__b)*__b+0.9375):(__a*(__b=${$}-2.625/__b)*__b+0.984375)))"),e.cubicBezier=null,e.easeInBack=e.easeBack,e.easeOutBack=e.easeInBack.mirror(),e.easeInOutBack=e.easeInBack.symmetry(),e.easeInCirc=e.easeCirc,e.easeOutCirc=e.easeInCirc.mirror(),e.easeInOutCirc=e.easeInCirc.symmetry(),e.easeInBounce=e.easeBounce,e.easeOutBounce=e.easeInBounce.mirror(),e.easeInOutBounce=e.easeOutBounce.symmetry(),e}();["Quad","Cubic","Quart","Quint","Expo"].forEach((function(e,t){var r=new o("Math.pow(${$},"+(t+2)+")");o["easeIn"+e]=r,o["easeOut"+e]=r.mirror(),o["easeInOut"+e]=r.symmetry()})),t.default=o}])}));
//# sourceMappingURL=easing.js.map