// Copyright (c) 2025 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.2-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-function@v0.2.2-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-ndarray-like@v0.2.2-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-assert-is-order@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.2-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-buffer-ctors@v0.3.0-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-zeros@v0.2.2-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-shape@v0.2.2-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-dtype@v0.2.2-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-order@v0.2.2-esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-numel@v0.2.2-esm/index.mjs";import{assign as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-next-cartesian-index@v0.2.2-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gcopy@v0.2.1-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";function v(v,f,b,c){var g,y,x,w,u,E,T,k,z,B,C,V,q,A,D,F;if(!s(v))throw new TypeError(a("null5t",v));if(arguments.length<3?w=f:3===arguments.length?e(f)?(w=f,T=b):(g=!0,u=f,w=b):(g=!0,u=f,w=b,T=c),!e(w))throw new TypeError(a("null2b",w));if(g){if(!r(u))throw new TypeError(a("null2V",u));if(V=n(u,"dtype")?u.dtype:m(v),n(u,"order")){if(!t(u.order))throw new TypeError(a("null5C","order",u.order));k=u.order}}else V=m(v);if(null===(E=d(V)))throw new TypeError(a("nullBf","dtype",u.dtype));for(void 0===k&&(k=l(v)),q=o(v),A=p(q),y=q.length,z="row-major"===k?y-1:0,B=i(y),x={length:0},F=0;F<A;F++)F>0&&(B=j(q,k,B,z,B)),D=v.get.apply(v,B),w.call(T,D,B.slice(),v)||(x[x.length]=D,x.length+=1);return C=new E(A=x.length),h(A,x,1,C,1),new v.constructor(V,C,[A],[1],0,k)}export{v as default};
//# sourceMappingURL=index.mjs.map
