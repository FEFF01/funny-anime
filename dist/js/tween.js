!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";var n=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),i=0;for(t=0;t<r;t++)for(var o=arguments[t],_=0,a=o.length;_<a;_++,i++)n[i]=o[_];return n};Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(t,r,n){if(!(this instanceof e))return new e(t,r,n);r&&(this.nsteps=r),n&&(this.direction=n),this.expr=t instanceof e?t.toString():t}return e.mirror=function(t){return e.concat(e.easeReverse,t,e.easeReverse)},e.symmetry=function(t){return e.split(.5,t)},e.split=function(t,r,n){if(void 0===n&&(n=r),t>0&&t<1){var i=1/t,o=1/(1-t);return new e("__t<"+t+"?(__t*="+i+",("+r.toString()+")/"+i+"):(__t=(1-__t)*"+o+",1-("+n.toString()+")/"+o+")")}return t<=0?n:r},e.bezier=function(t,r){return new e("__a=${$},__b=1-__a,3*__b*__b*__a*"+t+"+3*__b*__a*__a*"+r+"+__a*__a*__a")},e.elastic=function(t,r){void 0===r&&(r=.5);var n=t>=1?t<=10?t:10:1,i=r<=2?r>=.1?r:.1:2;return new e("${$}&&(__b=${$}-1,-"+n+"*Math.pow(2,10*__b)*Math.sin(((__b-"+i/(2*Math.PI)*Math.asin(1/n)+")*Math.PI*2)/"+i+"))")},e.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new e(t.reduce((function(e,t){return e.replace(/\$\{\S*?\$\S*?\}/g,"("+t.toString()+")")}),e.easeLinear.expr))},e.prototype.mirror=function(){return e.mirror(this)},e.prototype.symmetry=function(){return e.symmetry(this)},e.prototype.split=function(t,r){return void 0===t&&(t=.5),e.split(t,this,r)},e.prototype.steps=function(t,r){return void 0===t&&(t=this.nsteps),void 0===r&&(r=this.direction),new e(this.expr,t,r)},e.prototype.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.concat.apply(e,n([this],t))},e.prototype.toFunction=function(){return new Function("p","var __a,__b,__t;return "+this.toString("p")+";")},e.prototype.toString=function(e){var t;return void 0===e&&(e="${$}"),"__t="+e+","+(this.nsteps?"__t!==1 && (__t=(__t-__t%"+(t=1/this.nsteps)+("start"===this.direction?"+"+t:"")+")),":"")+this.expr.replace(/\$\{\S*?\$\S*?\}/g,"__t")},e.easeLinear=new e("${$}"),e.easeReverse=new e("1-${$}"),e.easeBack=new e("${$}*${$}*(3*${$}-2)"),e.easeCirc=new e("1-Math.sqrt(1-${$}*${$})"),e.easeSwing=new e("0.5-Math.cos(${$}*Math.PI)/2"),e.easeBounce=new e("__a=7.5625,__b=2.75,${$}<1/__b?(__a*${$}*${$}):(${$}<2/__b?(__a*(__b=${$}-1.5/__b)*__b+0.75):(${$}<2.5/__b?(__a*(__b=${$}-2.25/__b)*__b+0.9375):(__a*(__b=${$}-2.625/__b)*__b+0.984375)))"),e.cubicBezier=null,e.easeInBack=e.easeBack,e.easeOutBack=e.easeInBack.mirror(),e.easeInOutBack=e.easeInBack.symmetry(),e.easeInCirc=e.easeCirc,e.easeOutCirc=e.easeInCirc.mirror(),e.easeInOutCirc=e.easeInCirc.symmetry(),e.easeInBounce=e.easeBounce,e.easeOutBounce=e.easeInBounce.mirror(),e.easeInOutBounce=e.easeOutBounce.symmetry(),e}();["Quad","Cubic","Quart","Quint","Expo"].forEach((function(e,t){var r=new i("Math.pow(${$},"+(t+2)+")");i["easeIn"+e]=r,i["easeOut"+e]=r.mirror(),i["easeInOut"+e]=r.symmetry()})),t.default=i},function(e,t,r){"use strict";var n,i,o;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.NORMAL="normal",e.AUTO="auto"}(n||(n={})),t.ORDER=n,function(e){e.ALTERNATE="alternate",e.ACCUMULATIVE="accumulative"}(i||(i={})),t.DIRECTION=i,function(e){e[e.LEFT=-1]="LEFT",e[e.RIGHT=1]="RIGHT",e[e.MIDDLE=0]="MIDDLE"}(o||(o={})),t.POSITION=o},,,,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=r(1),o=n.default.easeLinear,_=function(){function e(e,t){this.data=e,this.option=t,e&&(this.step=this.parseTween(e,t))}return e.prototype.parseTween=function(t,r){return void 0===r&&(r=this.option),e.parse(t,r)},e.parse=function(e,t){var r;void 0===t&&(t={});for(var n={},_={},a={},u=t.keys||Object.keys(e),s=[],c=function(t){n[t]=[],a[t]=_[t]=0,s=s.concat(e[t].reduce((function(e,r){return e.concat({range:r.ft||0,target:r,position:i.POSITION.LEFT,key:t},{range:r.tt||0,target:r,position:i.POSITION.RIGHT,key:t})}),[]))},f=0,l=u;f<l.length;f++){c(l[f])}s.sort((function(e,t){return e.range-t.range||t.position-e.position}));for(var p,d,v=!1,h=[],y=function(e,r,c){var f,l,y=s[e];if(c!==y.range){var m=[],g=u.map((function(e){return[e,n[e].reduce((function(t,r,n){var i,o;m.push("_"+e+"_"+n+"=(_time_-"+r.ft+")/"+(r.tt-r.ft));var _=null===(o=null===(i=r.es)||void 0===i?void 0:i.toString)||void 0===o?void 0:o.call(i,"_"+e+"_"+n);return _?_="("+_+")":(_="_def_ease(_"+e+"_"+n+")",v=!0),t+"+"+_+"*"+r.val}),_[e]+a[e])]}));h.push({init_exprs:m,eval_exprs:g,lr:c,rr:y.range}),c=y.range}if(y.position===i.POSITION.RIGHT){var b=n[y.key].indexOf(y.target);if(-1!==b)n[y.key].splice(b,1);else for(var $=e+1;$<r;$++)s[$].target===y.target&&(s.splice($,1),r--);var I=(f=y.target,l=1,(f.es||t.es||o).toFunction()(l)*f.val);return void 0===y.target.tt?a[y.key]+=I:_[y.key]+=I,p=r,d=c,"continue"}c===y.range&&n[y.key].push(y.target),p=r,d=c},m=0,g=s.length,b=(null===(r=s[0])||void 0===r?void 0:r.range)||0;m<g;m++)y(m,g,b),g=p,b=d;var $=h.length?h[h.length-1].rr:0,I=h.length?h[0].lr:0,O=t.begin,T=void 0===O?0:O,w=t.loop,M=void 0===w?1:w,x=t.direction,S=t.key_mask_map,E=t.duration,C=void 0===E?$:E,k=t.target;function R(e,t){void 0===t&&(t="0");var r=(x===i.DIRECTION.ACCUMULATIVE?_[e]+"*_loop_+":"")+t;return S?"(__a="+r+")===this._"+e+"?(status&="+~S[e]+"):(this._"+e+"=__a);":"this._"+e+"="+r+";"}"boolean"==typeof M&&(M=!0===M?864e10:1);for(var j=0,B=h;j<B.length;j++){for(var P=B[j],A="",L=0,N=P.eval_exprs;L<N.length;L++){var D=N[L];A+=R(D[0],D[1])}P.value_expr=A}var F=h.length?function e(t){var r=Math.floor(t.length/2),n=t[r];return t.length>=2?"if(_time_<="+n.lr+"){"+e(t.slice(0,r))+"}else{"+e(t.slice(r))+"}":function(e){return(e.init_exprs.length?"var "+e.init_exprs.join(",")+";":"")+e.value_expr}(n)}(h):"return 0;",U=new Function("time","var status=~0,_d_="+C+",_dl_="+C*M+",__a,__b,__t;"+(v?"function _def_ease(p){var __a,__b,__t;return "+(t.es||o).toString("p")+";}":"")+(T?"time+="+T+";":"")+"var _time_=time>=0?(time<=_dl_?time:_dl_):0;var _loop_=_time_/_d_|0;_time_="+(x===i.DIRECTION.ALTERNATE?"_loop_%2?(_d_-_time_%_d_):(_time_%_d_)":"_time_%_d_ || (_time_ && (_loop_--,_d_))")+";"+($<C?"_time_>"+$+" && (_time_="+$+");":"")+(I>0?"if(_time_<"+I+"){"+u.reduce((function(e,t){return e+"__a="+a[t]+(x===i.DIRECTION.ACCUMULATIVE?"+_loop_*"+_[t]:"")+",this._"+t+"===__a?(status&="+~S[t]+"):(this._"+t+"=__a);"}),"")+"}else{":"")+F+(I>0?"}":"")+"return status^(time<=0?6:(time<=_dl_?5:3));");return k?U.bind(k):U},e.DIRECTION=i.DIRECTION,e}();t.default=_}])}));