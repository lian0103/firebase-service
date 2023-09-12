function Ko(t,e){const n=Object.create(null),r=t.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return e?i=>!!n[i.toLowerCase()]:i=>!!n[i]}const Eh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ih=Ko(Eh);function Wl(t){return!!t||t===""}function qo(t){if(Y(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],i=Pe(r)?Ah(r):qo(r);if(i)for(const s in i)e[s]=i[s]}return e}else{if(Pe(t))return t;if(ye(t))return t}}const Sh=/;(?![^(]*\))/g,Ch=/:(.+)/;function Ah(t){const e={};return t.split(Sh).forEach(n=>{if(n){const r=n.split(Ch);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Go(t){let e="";if(Pe(t))e=t;else if(Y(t))for(let n=0;n<t.length;n++){const r=Go(t[n]);r&&(e+=r+" ")}else if(ye(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const _T=t=>Pe(t)?t:t==null?"":Y(t)||ye(t)&&(t.toString===Yl||!X(t.toString))?JSON.stringify(t,Kl,2):String(t),Kl=(t,e)=>e&&e.__v_isRef?Kl(t,e.value):ir(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,i])=>(n[`${r} =>`]=i,n),{})}:ql(e)?{[`Set(${e.size})`]:[...e.values()]}:ye(e)&&!Y(e)&&!Xl(e)?String(e):e,he={},rr=[],pt=()=>{},kh=()=>!1,Rh=/^on[^a-z]/,ns=t=>Rh.test(t),Yo=t=>t.startsWith("onUpdate:"),Ne=Object.assign,Xo=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Ph=Object.prototype.hasOwnProperty,te=(t,e)=>Ph.call(t,e),Y=Array.isArray,ir=t=>rs(t)==="[object Map]",ql=t=>rs(t)==="[object Set]",X=t=>typeof t=="function",Pe=t=>typeof t=="string",Jo=t=>typeof t=="symbol",ye=t=>t!==null&&typeof t=="object",Gl=t=>ye(t)&&X(t.then)&&X(t.catch),Yl=Object.prototype.toString,rs=t=>Yl.call(t),Oh=t=>rs(t).slice(8,-1),Xl=t=>rs(t)==="[object Object]",Qo=t=>Pe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,wi=Ko(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),is=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},xh=/-(\w)/g,Rt=is(t=>t.replace(xh,(e,n)=>n?n.toUpperCase():"")),Dh=/\B([A-Z])/g,Sr=is(t=>t.replace(Dh,"-$1").toLowerCase()),ss=is(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ts=is(t=>t?`on${ss(t)}`:""),Hr=(t,e)=>!Object.is(t,e),Ti=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Mi=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},no=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ec;const Mh=()=>ec||(ec=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let bt;class Nh{constructor(e=!1){this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=bt,!e&&bt&&(this.index=(bt.scopes||(bt.scopes=[])).push(this)-1)}run(e){if(this.active){const n=bt;try{return bt=this,e()}finally{bt=n}}}on(){bt=this}off(){bt=this.parent}stop(e){if(this.active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}}}function Lh(t,e=bt){e&&e.active&&e.effects.push(t)}const Zo=t=>{const e=new Set(t);return e.w=0,e.n=0,e},Jl=t=>(t.w&_n)>0,Ql=t=>(t.n&_n)>0,Fh=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=_n},Uh=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const i=e[r];Jl(i)&&!Ql(i)?i.delete(t):e[n++]=i,i.w&=~_n,i.n&=~_n}e.length=n}},ro=new WeakMap;let Or=0,_n=1;const io=30;let dt;const Ln=Symbol(""),so=Symbol("");class ea{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Lh(this,r)}run(){if(!this.active)return this.fn();let e=dt,n=ln;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=dt,dt=this,ln=!0,_n=1<<++Or,Or<=io?Fh(this):tc(this),this.fn()}finally{Or<=io&&Uh(this),_n=1<<--Or,dt=this.parent,ln=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){dt===this?this.deferStop=!0:this.active&&(tc(this),this.onStop&&this.onStop(),this.active=!1)}}function tc(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let ln=!0;const Zl=[];function Cr(){Zl.push(ln),ln=!1}function Ar(){const t=Zl.pop();ln=t===void 0?!0:t}function Qe(t,e,n){if(ln&&dt){let r=ro.get(t);r||ro.set(t,r=new Map);let i=r.get(n);i||r.set(n,i=Zo()),eu(i)}}function eu(t,e){let n=!1;Or<=io?Ql(t)||(t.n|=_n,n=!Jl(t)):n=!t.has(dt),n&&(t.add(dt),dt.deps.push(t))}function Vt(t,e,n,r,i,s){const o=ro.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&Y(t))o.forEach((c,l)=>{(l==="length"||l>=r)&&a.push(c)});else switch(n!==void 0&&a.push(o.get(n)),e){case"add":Y(t)?Qo(n)&&a.push(o.get("length")):(a.push(o.get(Ln)),ir(t)&&a.push(o.get(so)));break;case"delete":Y(t)||(a.push(o.get(Ln)),ir(t)&&a.push(o.get(so)));break;case"set":ir(t)&&a.push(o.get(Ln));break}if(a.length===1)a[0]&&oo(a[0]);else{const c=[];for(const l of a)l&&c.push(...l);oo(Zo(c))}}function oo(t,e){const n=Y(t)?t:[...t];for(const r of n)r.computed&&nc(r);for(const r of n)r.computed||nc(r)}function nc(t,e){(t!==dt||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const Bh=Ko("__proto__,__v_isRef,__isVue"),tu=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Jo)),$h=ta(),Hh=ta(!1,!0),jh=ta(!0),rc=Vh();function Vh(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=se(this);for(let s=0,o=this.length;s<o;s++)Qe(r,"get",s+"");const i=r[e](...n);return i===-1||i===!1?r[e](...n.map(se)):i}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Cr();const r=se(this)[e].apply(this,n);return Ar(),r}}),t}function ta(t=!1,e=!1){return function(r,i,s){if(i==="__v_isReactive")return!t;if(i==="__v_isReadonly")return t;if(i==="__v_isShallow")return e;if(i==="__v_raw"&&s===(t?e?sp:ou:e?su:iu).get(r))return r;const o=Y(r);if(!t&&o&&te(rc,i))return Reflect.get(rc,i,s);const a=Reflect.get(r,i,s);return(Jo(i)?tu.has(i):Bh(i))||(t||Qe(r,"get",i),e)?a:De(a)?o&&Qo(i)?a:a.value:ye(a)?t?au(a):ii(a):a}}const zh=nu(),Wh=nu(!0);function nu(t=!1){return function(n,r,i,s){let o=n[r];if(hr(o)&&De(o)&&!De(i))return!1;if(!t&&(!Ni(i)&&!hr(i)&&(o=se(o),i=se(i)),!Y(n)&&De(o)&&!De(i)))return o.value=i,!0;const a=Y(n)&&Qo(r)?Number(r)<n.length:te(n,r),c=Reflect.set(n,r,i,s);return n===se(s)&&(a?Hr(i,o)&&Vt(n,"set",r,i):Vt(n,"add",r,i)),c}}function Kh(t,e){const n=te(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&Vt(t,"delete",e,void 0),r}function qh(t,e){const n=Reflect.has(t,e);return(!Jo(e)||!tu.has(e))&&Qe(t,"has",e),n}function Gh(t){return Qe(t,"iterate",Y(t)?"length":Ln),Reflect.ownKeys(t)}const ru={get:$h,set:zh,deleteProperty:Kh,has:qh,ownKeys:Gh},Yh={get:jh,set(t,e){return!0},deleteProperty(t,e){return!0}},Xh=Ne({},ru,{get:Hh,set:Wh}),na=t=>t,os=t=>Reflect.getPrototypeOf(t);function pi(t,e,n=!1,r=!1){t=t.__v_raw;const i=se(t),s=se(e);n||(e!==s&&Qe(i,"get",e),Qe(i,"get",s));const{has:o}=os(i),a=r?na:n?sa:jr;if(o.call(i,e))return a(t.get(e));if(o.call(i,s))return a(t.get(s));t!==i&&t.get(e)}function gi(t,e=!1){const n=this.__v_raw,r=se(n),i=se(t);return e||(t!==i&&Qe(r,"has",t),Qe(r,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)}function _i(t,e=!1){return t=t.__v_raw,!e&&Qe(se(t),"iterate",Ln),Reflect.get(t,"size",t)}function ic(t){t=se(t);const e=se(this);return os(e).has.call(e,t)||(e.add(t),Vt(e,"add",t,t)),this}function sc(t,e){e=se(e);const n=se(this),{has:r,get:i}=os(n);let s=r.call(n,t);s||(t=se(t),s=r.call(n,t));const o=i.call(n,t);return n.set(t,e),s?Hr(e,o)&&Vt(n,"set",t,e):Vt(n,"add",t,e),this}function oc(t){const e=se(this),{has:n,get:r}=os(e);let i=n.call(e,t);i||(t=se(t),i=n.call(e,t)),r&&r.call(e,t);const s=e.delete(t);return i&&Vt(e,"delete",t,void 0),s}function ac(){const t=se(this),e=t.size!==0,n=t.clear();return e&&Vt(t,"clear",void 0,void 0),n}function mi(t,e){return function(r,i){const s=this,o=s.__v_raw,a=se(o),c=e?na:t?sa:jr;return!t&&Qe(a,"iterate",Ln),o.forEach((l,u)=>r.call(i,c(l),c(u),s))}}function yi(t,e,n){return function(...r){const i=this.__v_raw,s=se(i),o=ir(s),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,l=i[t](...r),u=n?na:e?sa:jr;return!e&&Qe(s,"iterate",c?so:Ln),{next(){const{value:f,done:d}=l.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function Xt(t){return function(...e){return t==="delete"?!1:this}}function Jh(){const t={get(s){return pi(this,s)},get size(){return _i(this)},has:gi,add:ic,set:sc,delete:oc,clear:ac,forEach:mi(!1,!1)},e={get(s){return pi(this,s,!1,!0)},get size(){return _i(this)},has:gi,add:ic,set:sc,delete:oc,clear:ac,forEach:mi(!1,!0)},n={get(s){return pi(this,s,!0)},get size(){return _i(this,!0)},has(s){return gi.call(this,s,!0)},add:Xt("add"),set:Xt("set"),delete:Xt("delete"),clear:Xt("clear"),forEach:mi(!0,!1)},r={get(s){return pi(this,s,!0,!0)},get size(){return _i(this,!0)},has(s){return gi.call(this,s,!0)},add:Xt("add"),set:Xt("set"),delete:Xt("delete"),clear:Xt("clear"),forEach:mi(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=yi(s,!1,!1),n[s]=yi(s,!0,!1),e[s]=yi(s,!1,!0),r[s]=yi(s,!0,!0)}),[t,n,e,r]}const[Qh,Zh,ep,tp]=Jh();function ra(t,e){const n=e?t?tp:ep:t?Zh:Qh;return(r,i,s)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?r:Reflect.get(te(n,i)&&i in r?n:r,i,s)}const np={get:ra(!1,!1)},rp={get:ra(!1,!0)},ip={get:ra(!0,!1)},iu=new WeakMap,su=new WeakMap,ou=new WeakMap,sp=new WeakMap;function op(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ap(t){return t.__v_skip||!Object.isExtensible(t)?0:op(Oh(t))}function ii(t){return hr(t)?t:ia(t,!1,ru,np,iu)}function cp(t){return ia(t,!1,Xh,rp,su)}function au(t){return ia(t,!0,Yh,ip,ou)}function ia(t,e,n,r,i){if(!ye(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=i.get(t);if(s)return s;const o=ap(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return i.set(t,a),a}function sr(t){return hr(t)?sr(t.__v_raw):!!(t&&t.__v_isReactive)}function hr(t){return!!(t&&t.__v_isReadonly)}function Ni(t){return!!(t&&t.__v_isShallow)}function cu(t){return sr(t)||hr(t)}function se(t){const e=t&&t.__v_raw;return e?se(e):t}function lu(t){return Mi(t,"__v_skip",!0),t}const jr=t=>ye(t)?ii(t):t,sa=t=>ye(t)?au(t):t;function uu(t){ln&&dt&&(t=se(t),eu(t.dep||(t.dep=Zo())))}function fu(t,e){t=se(t),t.dep&&oo(t.dep)}function De(t){return!!(t&&t.__v_isRef===!0)}function lp(t){return du(t,!1)}function up(t){return du(t,!0)}function du(t,e){return De(t)?t:new fp(t,e)}class fp{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:se(e),this._value=n?e:jr(e)}get value(){return uu(this),this._value}set value(e){const n=this.__v_isShallow||Ni(e)||hr(e);e=n?e:se(e),Hr(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:jr(e),fu(this))}}function or(t){return De(t)?t.value:t}const dp={get:(t,e,n)=>or(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const i=t[e];return De(i)&&!De(n)?(i.value=n,!0):Reflect.set(t,e,n,r)}};function hu(t){return sr(t)?t:new Proxy(t,dp)}var pu;class hp{constructor(e,n,r,i){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this[pu]=!1,this._dirty=!0,this.effect=new ea(e,()=>{this._dirty||(this._dirty=!0,fu(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!i,this.__v_isReadonly=r}get value(){const e=se(this);return uu(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}pu="__v_isReadonly";function pp(t,e,n=!1){let r,i;const s=X(t);return s?(r=t,i=pt):(r=t.get,i=t.set),new hp(r,i,s||!i,n)}function un(t,e,n,r){let i;try{i=r?t(...r):t()}catch(s){as(s,e,n)}return i}function lt(t,e,n,r){if(X(t)){const s=un(t,e,n,r);return s&&Gl(s)&&s.catch(o=>{as(o,e,n)}),s}const i=[];for(let s=0;s<t.length;s++)i.push(lt(t[s],e,n,r));return i}function as(t,e,n,r=!0){const i=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=n;for(;s;){const l=s.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,a)===!1)return}s=s.parent}const c=e.appContext.config.errorHandler;if(c){un(c,null,10,[t,o,a]);return}}gp(t,n,i,r)}function gp(t,e,n,r=!0){console.error(t)}let Vr=!1,ao=!1;const Oe=[];let Et=0;const ar=[];let Nt=null,Rn=0;const gu=Promise.resolve();let oa=null;function _u(t){const e=oa||gu;return t?e.then(this?t.bind(this):t):e}function _p(t){let e=Et+1,n=Oe.length;for(;e<n;){const r=e+n>>>1;zr(Oe[r])<t?e=r+1:n=r}return e}function aa(t){(!Oe.length||!Oe.includes(t,Vr&&t.allowRecurse?Et+1:Et))&&(t.id==null?Oe.push(t):Oe.splice(_p(t.id),0,t),mu())}function mu(){!Vr&&!ao&&(ao=!0,oa=gu.then(vu))}function mp(t){const e=Oe.indexOf(t);e>Et&&Oe.splice(e,1)}function yp(t){Y(t)?ar.push(...t):(!Nt||!Nt.includes(t,t.allowRecurse?Rn+1:Rn))&&ar.push(t),mu()}function cc(t,e=Vr?Et+1:0){for(;e<Oe.length;e++){const n=Oe[e];n&&n.pre&&(Oe.splice(e,1),e--,n())}}function yu(t){if(ar.length){const e=[...new Set(ar)];if(ar.length=0,Nt){Nt.push(...e);return}for(Nt=e,Nt.sort((n,r)=>zr(n)-zr(r)),Rn=0;Rn<Nt.length;Rn++)Nt[Rn]();Nt=null,Rn=0}}const zr=t=>t.id==null?1/0:t.id,vp=(t,e)=>{const n=zr(t)-zr(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function vu(t){ao=!1,Vr=!0,Oe.sort(vp);const e=pt;try{for(Et=0;Et<Oe.length;Et++){const n=Oe[Et];n&&n.active!==!1&&un(n,null,14)}}finally{Et=0,Oe.length=0,yu(),Vr=!1,oa=null,(Oe.length||ar.length)&&vu()}}function bp(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||he;let i=n;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:d}=r[u]||he;d&&(i=n.map(h=>h.trim())),f&&(i=n.map(no))}let a,c=r[a=Ts(e)]||r[a=Ts(Rt(e))];!c&&s&&(c=r[a=Ts(Sr(e))]),c&&lt(c,t,6,i);const l=r[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,lt(l,t,6,i)}}function bu(t,e,n=!1){const r=e.emitsCache,i=r.get(t);if(i!==void 0)return i;const s=t.emits;let o={},a=!1;if(!X(t)){const c=l=>{const u=bu(l,e,!0);u&&(a=!0,Ne(o,u))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!s&&!a?(ye(t)&&r.set(t,null),null):(Y(s)?s.forEach(c=>o[c]=null):Ne(o,s),ye(t)&&r.set(t,o),o)}function cs(t,e){return!t||!ns(e)?!1:(e=e.slice(2).replace(/Once$/,""),te(t,e[0].toLowerCase()+e.slice(1))||te(t,Sr(e))||te(t,e))}let st=null,wu=null;function Li(t){const e=st;return st=t,wu=t&&t.type.__scopeId||null,e}function wp(t,e=st,n){if(!e||t._n)return t;const r=(...i)=>{r._d&&vc(-1);const s=Li(e);let o;try{o=t(...i)}finally{Li(s),r._d&&vc(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Es(t){const{type:e,vnode:n,proxy:r,withProxy:i,props:s,propsOptions:[o],slots:a,attrs:c,emit:l,render:u,renderCache:f,data:d,setupState:h,ctx:m,inheritAttrs:p}=t;let y,v;const b=Li(t);try{if(n.shapeFlag&4){const E=i||r;y=Tt(u.call(E,E,f,s,h,d,m)),v=c}else{const E=e;y=Tt(E.length>1?E(s,{attrs:c,slots:a,emit:l}):E(s,null)),v=e.props?c:Tp(c)}}catch(E){Mr.length=0,as(E,t,1),y=Xe(gt)}let T=y;if(v&&p!==!1){const E=Object.keys(v),{shapeFlag:A}=T;E.length&&A&7&&(o&&E.some(Yo)&&(v=Ep(v,o)),T=mn(T,v))}return n.dirs&&(T=mn(T),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&(T.transition=n.transition),y=T,Li(b),y}const Tp=t=>{let e;for(const n in t)(n==="class"||n==="style"||ns(n))&&((e||(e={}))[n]=t[n]);return e},Ep=(t,e)=>{const n={};for(const r in t)(!Yo(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Ip(t,e,n){const{props:r,children:i,component:s}=t,{props:o,children:a,patchFlag:c}=e,l=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?lc(r,o,l):!!o;if(c&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==r[d]&&!cs(l,d))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?lc(r,o,l):!0:!!o;return!1}function lc(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(e[s]!==t[s]&&!cs(n,s))return!0}return!1}function Sp({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const Cp=t=>t.__isSuspense;function Ap(t,e){e&&e.pendingBranch?Y(t)?e.effects.push(...t):e.effects.push(t):yp(t)}function Ei(t,e){if(Ce){let n=Ce.provides;const r=Ce.parent&&Ce.parent.provides;r===n&&(n=Ce.provides=Object.create(r)),n[t]=e}}function fn(t,e,n=!1){const r=Ce||st;if(r){const i=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(i&&t in i)return i[t];if(arguments.length>1)return n&&X(e)?e.call(r.proxy):e}}const uc={};function Ii(t,e,n){return Tu(t,e,n)}function Tu(t,e,{immediate:n,deep:r,flush:i,onTrack:s,onTrigger:o}=he){const a=Ce;let c,l=!1,u=!1;if(De(t)?(c=()=>t.value,l=Ni(t)):sr(t)?(c=()=>t,r=!0):Y(t)?(u=!0,l=t.some(v=>sr(v)||Ni(v)),c=()=>t.map(v=>{if(De(v))return v.value;if(sr(v))return xn(v);if(X(v))return un(v,a,2)})):X(t)?e?c=()=>un(t,a,2):c=()=>{if(!(a&&a.isUnmounted))return f&&f(),lt(t,a,3,[d])}:c=pt,e&&r){const v=c;c=()=>xn(v())}let f,d=v=>{f=y.onStop=()=>{un(v,a,4)}};if(Kr)return d=pt,e?n&&lt(e,a,3,[c(),u?[]:void 0,d]):c(),pt;let h=u?[]:uc;const m=()=>{if(!!y.active)if(e){const v=y.run();(r||l||(u?v.some((b,T)=>Hr(b,h[T])):Hr(v,h)))&&(f&&f(),lt(e,a,3,[v,h===uc?void 0:h,d]),h=v)}else y.run()};m.allowRecurse=!!e;let p;i==="sync"?p=m:i==="post"?p=()=>He(m,a&&a.suspense):(m.pre=!0,a&&(m.id=a.uid),p=()=>aa(m));const y=new ea(c,p);return e?n?m():h=y.run():i==="post"?He(y.run.bind(y),a&&a.suspense):y.run(),()=>{y.stop(),a&&a.scope&&Xo(a.scope.effects,y)}}function kp(t,e,n){const r=this.proxy,i=Pe(t)?t.includes(".")?Eu(r,t):()=>r[t]:t.bind(r,r);let s;X(e)?s=e:(s=e.handler,n=e);const o=Ce;pr(this);const a=Tu(i,s.bind(r),n);return o?pr(o):Fn(),a}function Eu(t,e){const n=e.split(".");return()=>{let r=t;for(let i=0;i<n.length&&r;i++)r=r[n[i]];return r}}function xn(t,e){if(!ye(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),De(t))xn(t.value,e);else if(Y(t))for(let n=0;n<t.length;n++)xn(t[n],e);else if(ql(t)||ir(t))t.forEach(n=>{xn(n,e)});else if(Xl(t))for(const n in t)xn(t[n],e);return t}function Rp(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ku(()=>{t.isMounted=!0}),Ru(()=>{t.isUnmounting=!0}),t}const tt=[Function,Array],Pp={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:tt,onEnter:tt,onAfterEnter:tt,onEnterCancelled:tt,onBeforeLeave:tt,onLeave:tt,onAfterLeave:tt,onLeaveCancelled:tt,onBeforeAppear:tt,onAppear:tt,onAfterAppear:tt,onAppearCancelled:tt},setup(t,{slots:e}){const n=mg(),r=Rp();let i;return()=>{const s=e.default&&Su(e.default(),!0);if(!s||!s.length)return;let o=s[0];if(s.length>1){for(const p of s)if(p.type!==gt){o=p;break}}const a=se(t),{mode:c}=a;if(r.isLeaving)return Is(o);const l=fc(o);if(!l)return Is(o);const u=co(l,a,r,n);lo(l,u);const f=n.subTree,d=f&&fc(f);let h=!1;const{getTransitionKey:m}=l.type;if(m){const p=m();i===void 0?i=p:p!==i&&(i=p,h=!0)}if(d&&d.type!==gt&&(!Pn(l,d)||h)){const p=co(d,a,r,n);if(lo(d,p),c==="out-in")return r.isLeaving=!0,p.afterLeave=()=>{r.isLeaving=!1,n.update()},Is(o);c==="in-out"&&l.type!==gt&&(p.delayLeave=(y,v,b)=>{const T=Iu(r,d);T[String(d.key)]=d,y._leaveCb=()=>{v(),y._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=b})}return o}}},Op=Pp;function Iu(t,e){const{leavingVNodes:n}=t;let r=n.get(e.type);return r||(r=Object.create(null),n.set(e.type,r)),r}function co(t,e,n,r){const{appear:i,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:l,onEnterCancelled:u,onBeforeLeave:f,onLeave:d,onAfterLeave:h,onLeaveCancelled:m,onBeforeAppear:p,onAppear:y,onAfterAppear:v,onAppearCancelled:b}=e,T=String(t.key),E=Iu(n,t),A=(S,k)=>{S&&lt(S,r,9,k)},O=(S,k)=>{const $=k[1];A(S,k),Y(S)?S.every(z=>z.length<=1)&&$():S.length<=1&&$()},x={mode:s,persisted:o,beforeEnter(S){let k=a;if(!n.isMounted)if(i)k=p||a;else return;S._leaveCb&&S._leaveCb(!0);const $=E[T];$&&Pn(t,$)&&$.el._leaveCb&&$.el._leaveCb(),A(k,[S])},enter(S){let k=c,$=l,z=u;if(!n.isMounted)if(i)k=y||c,$=v||l,z=b||u;else return;let Q=!1;const ie=S._enterCb=oe=>{Q||(Q=!0,oe?A(z,[S]):A($,[S]),x.delayedLeave&&x.delayedLeave(),S._enterCb=void 0)};k?O(k,[S,ie]):ie()},leave(S,k){const $=String(t.key);if(S._enterCb&&S._enterCb(!0),n.isUnmounting)return k();A(f,[S]);let z=!1;const Q=S._leaveCb=ie=>{z||(z=!0,k(),ie?A(m,[S]):A(h,[S]),S._leaveCb=void 0,E[$]===t&&delete E[$])};E[$]=t,d?O(d,[S,Q]):Q()},clone(S){return co(S,e,n,r)}};return x}function Is(t){if(ls(t))return t=mn(t),t.children=null,t}function fc(t){return ls(t)?t.children?t.children[0]:void 0:t}function lo(t,e){t.shapeFlag&6&&t.component?lo(t.component.subTree,e):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Su(t,e=!1,n){let r=[],i=0;for(let s=0;s<t.length;s++){let o=t[s];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:s);o.type===wt?(o.patchFlag&128&&i++,r=r.concat(Su(o.children,e,a))):(e||o.type!==gt)&&r.push(a!=null?mn(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function Cu(t){return X(t)?{setup:t,name:t.name}:t}const Si=t=>!!t.type.__asyncLoader,ls=t=>t.type.__isKeepAlive;function xp(t,e){Au(t,"a",e)}function Dp(t,e){Au(t,"da",e)}function Au(t,e,n=Ce){const r=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(us(e,r,n),n){let i=n.parent;for(;i&&i.parent;)ls(i.parent.vnode)&&Mp(r,e,n,i),i=i.parent}}function Mp(t,e,n,r){const i=us(e,t,r,!0);Pu(()=>{Xo(r[e],i)},n)}function us(t,e,n=Ce,r=!1){if(n){const i=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;Cr(),pr(n);const a=lt(e,n,t,o);return Fn(),Ar(),a});return r?i.unshift(s):i.push(s),s}}const Gt=t=>(e,n=Ce)=>(!Kr||t==="sp")&&us(t,(...r)=>e(...r),n),Np=Gt("bm"),ku=Gt("m"),Lp=Gt("bu"),Fp=Gt("u"),Ru=Gt("bum"),Pu=Gt("um"),Up=Gt("sp"),Bp=Gt("rtg"),$p=Gt("rtc");function Hp(t,e=Ce){us("ec",t,e)}function mT(t,e){const n=st;if(n===null)return t;const r=ds(n)||n.proxy,i=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[o,a,c,l=he]=e[s];X(o)&&(o={mounted:o,updated:o}),o.deep&&xn(a),i.push({dir:o,instance:r,value:a,oldValue:void 0,arg:c,modifiers:l})}return t}function Tn(t,e,n,r){const i=t.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(Cr(),lt(c,n,8,[t.el,a,t,e]),Ar())}}const Ou="components";function yT(t,e){return Vp(Ou,t,!0,e)||t}const jp=Symbol();function Vp(t,e,n=!0,r=!1){const i=st||Ce;if(i){const s=i.type;if(t===Ou){const a=Tg(s,!1);if(a&&(a===e||a===Rt(e)||a===ss(Rt(e))))return s}const o=dc(i[t]||s[t],e)||dc(i.appContext[t],e);return!o&&r?s:o}}function dc(t,e){return t&&(t[e]||t[Rt(e)]||t[ss(Rt(e))])}const uo=t=>t?Vu(t)?ds(t)||t.proxy:uo(t.parent):null,Fi=Ne(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>uo(t.parent),$root:t=>uo(t.root),$emit:t=>t.emit,$options:t=>ca(t),$forceUpdate:t=>t.f||(t.f=()=>aa(t.update)),$nextTick:t=>t.n||(t.n=_u.bind(t.proxy)),$watch:t=>kp.bind(t)}),zp={get({_:t},e){const{ctx:n,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const h=o[e];if(h!==void 0)switch(h){case 1:return r[e];case 2:return i[e];case 4:return n[e];case 3:return s[e]}else{if(r!==he&&te(r,e))return o[e]=1,r[e];if(i!==he&&te(i,e))return o[e]=2,i[e];if((l=t.propsOptions[0])&&te(l,e))return o[e]=3,s[e];if(n!==he&&te(n,e))return o[e]=4,n[e];fo&&(o[e]=0)}}const u=Fi[e];let f,d;if(u)return e==="$attrs"&&Qe(t,"get",e),u(t);if((f=a.__cssModules)&&(f=f[e]))return f;if(n!==he&&te(n,e))return o[e]=4,n[e];if(d=c.config.globalProperties,te(d,e))return d[e]},set({_:t},e,n){const{data:r,setupState:i,ctx:s}=t;return i!==he&&te(i,e)?(i[e]=n,!0):r!==he&&te(r,e)?(r[e]=n,!0):te(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:i,propsOptions:s}},o){let a;return!!n[o]||t!==he&&te(t,o)||e!==he&&te(e,o)||(a=s[0])&&te(a,o)||te(r,o)||te(Fi,o)||te(i.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:te(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};let fo=!0;function Wp(t){const e=ca(t),n=t.proxy,r=t.ctx;fo=!1,e.beforeCreate&&hc(e.beforeCreate,t,"bc");const{data:i,computed:s,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:f,mounted:d,beforeUpdate:h,updated:m,activated:p,deactivated:y,beforeDestroy:v,beforeUnmount:b,destroyed:T,unmounted:E,render:A,renderTracked:O,renderTriggered:x,errorCaptured:S,serverPrefetch:k,expose:$,inheritAttrs:z,components:Q,directives:ie,filters:oe}=e;if(l&&Kp(l,r,null,t.appContext.config.unwrapInjectedRef),o)for(const W in o){const K=o[W];X(K)&&(r[W]=K.bind(n))}if(i){const W=i.call(n,n);ye(W)&&(t.data=ii(W))}if(fo=!0,s)for(const W in s){const K=s[W],Ie=X(K)?K.bind(n,n):X(K.get)?K.get.bind(n,n):pt,Fe=!X(K)&&X(K.set)?K.set.bind(n):pt,ke=it({get:Ie,set:Fe});Object.defineProperty(r,W,{enumerable:!0,configurable:!0,get:()=>ke.value,set:ve=>ke.value=ve})}if(a)for(const W in a)xu(a[W],r,n,W);if(c){const W=X(c)?c.call(n):c;Reflect.ownKeys(W).forEach(K=>{Ei(K,W[K])})}u&&hc(u,t,"c");function J(W,K){Y(K)?K.forEach(Ie=>W(Ie.bind(n))):K&&W(K.bind(n))}if(J(Np,f),J(ku,d),J(Lp,h),J(Fp,m),J(xp,p),J(Dp,y),J(Hp,S),J($p,O),J(Bp,x),J(Ru,b),J(Pu,E),J(Up,k),Y($))if($.length){const W=t.exposed||(t.exposed={});$.forEach(K=>{Object.defineProperty(W,K,{get:()=>n[K],set:Ie=>n[K]=Ie})})}else t.exposed||(t.exposed={});A&&t.render===pt&&(t.render=A),z!=null&&(t.inheritAttrs=z),Q&&(t.components=Q),ie&&(t.directives=ie)}function Kp(t,e,n=pt,r=!1){Y(t)&&(t=ho(t));for(const i in t){const s=t[i];let o;ye(s)?"default"in s?o=fn(s.from||i,s.default,!0):o=fn(s.from||i):o=fn(s),De(o)&&r?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[i]=o}}function hc(t,e,n){lt(Y(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function xu(t,e,n,r){const i=r.includes(".")?Eu(n,r):()=>n[r];if(Pe(t)){const s=e[t];X(s)&&Ii(i,s)}else if(X(t))Ii(i,t.bind(n));else if(ye(t))if(Y(t))t.forEach(s=>xu(s,e,n,r));else{const s=X(t.handler)?t.handler.bind(n):e[t.handler];X(s)&&Ii(i,s,t)}}function ca(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!n&&!r?c=e:(c={},i.length&&i.forEach(l=>Ui(c,l,o,!0)),Ui(c,e,o)),ye(e)&&s.set(e,c),c}function Ui(t,e,n,r=!1){const{mixins:i,extends:s}=e;s&&Ui(t,s,n,!0),i&&i.forEach(o=>Ui(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=qp[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const qp={data:pc,props:Cn,emits:Cn,methods:Cn,computed:Cn,beforeCreate:Ue,created:Ue,beforeMount:Ue,mounted:Ue,beforeUpdate:Ue,updated:Ue,beforeDestroy:Ue,beforeUnmount:Ue,destroyed:Ue,unmounted:Ue,activated:Ue,deactivated:Ue,errorCaptured:Ue,serverPrefetch:Ue,components:Cn,directives:Cn,watch:Yp,provide:pc,inject:Gp};function pc(t,e){return e?t?function(){return Ne(X(t)?t.call(this,this):t,X(e)?e.call(this,this):e)}:e:t}function Gp(t,e){return Cn(ho(t),ho(e))}function ho(t){if(Y(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ue(t,e){return t?[...new Set([].concat(t,e))]:e}function Cn(t,e){return t?Ne(Ne(Object.create(null),t),e):e}function Yp(t,e){if(!t)return e;if(!e)return t;const n=Ne(Object.create(null),t);for(const r in e)n[r]=Ue(t[r],e[r]);return n}function Xp(t,e,n,r=!1){const i={},s={};Mi(s,fs,1),t.propsDefaults=Object.create(null),Du(t,e,i,s);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=r?i:cp(i):t.type.props?t.props=i:t.props=s,t.attrs=s}function Jp(t,e,n,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=t,a=se(i),[c]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(cs(t.emitsOptions,d))continue;const h=e[d];if(c)if(te(s,d))h!==s[d]&&(s[d]=h,l=!0);else{const m=Rt(d);i[m]=po(c,a,m,h,t,!1)}else h!==s[d]&&(s[d]=h,l=!0)}}}else{Du(t,e,i,s)&&(l=!0);let u;for(const f in a)(!e||!te(e,f)&&((u=Sr(f))===f||!te(e,u)))&&(c?n&&(n[f]!==void 0||n[u]!==void 0)&&(i[f]=po(c,a,f,void 0,t,!0)):delete i[f]);if(s!==a)for(const f in s)(!e||!te(e,f)&&!0)&&(delete s[f],l=!0)}l&&Vt(t,"set","$attrs")}function Du(t,e,n,r){const[i,s]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(wi(c))continue;const l=e[c];let u;i&&te(i,u=Rt(c))?!s||!s.includes(u)?n[u]=l:(a||(a={}))[u]=l:cs(t.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(s){const c=se(n),l=a||he;for(let u=0;u<s.length;u++){const f=s[u];n[f]=po(i,c,f,l[f],t,!te(l,f))}}return o}function po(t,e,n,r,i,s){const o=t[n];if(o!=null){const a=te(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&X(c)){const{propsDefaults:l}=i;n in l?r=l[n]:(pr(i),r=l[n]=c.call(null,e),Fn())}else r=c}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===Sr(n))&&(r=!0))}return r}function Mu(t,e,n=!1){const r=e.propsCache,i=r.get(t);if(i)return i;const s=t.props,o={},a=[];let c=!1;if(!X(t)){const u=f=>{c=!0;const[d,h]=Mu(f,e,!0);Ne(o,d),h&&a.push(...h)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!c)return ye(t)&&r.set(t,rr),rr;if(Y(s))for(let u=0;u<s.length;u++){const f=Rt(s[u]);gc(f)&&(o[f]=he)}else if(s)for(const u in s){const f=Rt(u);if(gc(f)){const d=s[u],h=o[f]=Y(d)||X(d)?{type:d}:d;if(h){const m=yc(Boolean,h.type),p=yc(String,h.type);h[0]=m>-1,h[1]=p<0||m<p,(m>-1||te(h,"default"))&&a.push(f)}}}const l=[o,a];return ye(t)&&r.set(t,l),l}function gc(t){return t[0]!=="$"}function _c(t){const e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:t===null?"null":""}function mc(t,e){return _c(t)===_c(e)}function yc(t,e){return Y(e)?e.findIndex(n=>mc(n,t)):X(e)&&mc(e,t)?0:-1}const Nu=t=>t[0]==="_"||t==="$stable",la=t=>Y(t)?t.map(Tt):[Tt(t)],Qp=(t,e,n)=>{if(e._n)return e;const r=wp((...i)=>la(e(...i)),n);return r._c=!1,r},Lu=(t,e,n)=>{const r=t._ctx;for(const i in t){if(Nu(i))continue;const s=t[i];if(X(s))e[i]=Qp(i,s,r);else if(s!=null){const o=la(s);e[i]=()=>o}}},Fu=(t,e)=>{const n=la(e);t.slots.default=()=>n},Zp=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=se(e),Mi(e,"_",n)):Lu(e,t.slots={})}else t.slots={},e&&Fu(t,e);Mi(t.slots,fs,1)},eg=(t,e,n)=>{const{vnode:r,slots:i}=t;let s=!0,o=he;if(r.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:(Ne(i,e),!n&&a===1&&delete i._):(s=!e.$stable,Lu(e,i)),o=e}else e&&(Fu(t,e),o={default:1});if(s)for(const a in i)!Nu(a)&&!(a in o)&&delete i[a]};function Uu(){return{app:null,config:{isNativeTag:kh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let tg=0;function ng(t,e){return function(r,i=null){X(r)||(r=Object.assign({},r)),i!=null&&!ye(i)&&(i=null);const s=Uu(),o=new Set;let a=!1;const c=s.app={_uid:tg++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:Ig,get config(){return s.config},set config(l){},use(l,...u){return o.has(l)||(l&&X(l.install)?(o.add(l),l.install(c,...u)):X(l)&&(o.add(l),l(c,...u))),c},mixin(l){return s.mixins.includes(l)||s.mixins.push(l),c},component(l,u){return u?(s.components[l]=u,c):s.components[l]},directive(l,u){return u?(s.directives[l]=u,c):s.directives[l]},mount(l,u,f){if(!a){const d=Xe(r,i);return d.appContext=s,u&&e?e(d,l):t(d,l,f),a=!0,c._container=l,l.__vue_app__=c,ds(d.component)||d.component.proxy}},unmount(){a&&(t(null,c._container),delete c._container.__vue_app__)},provide(l,u){return s.provides[l]=u,c}};return c}}function go(t,e,n,r,i=!1){if(Y(t)){t.forEach((d,h)=>go(d,e&&(Y(e)?e[h]:e),n,r,i));return}if(Si(r)&&!i)return;const s=r.shapeFlag&4?ds(r.component)||r.component.proxy:r.el,o=i?null:s,{i:a,r:c}=t,l=e&&e.r,u=a.refs===he?a.refs={}:a.refs,f=a.setupState;if(l!=null&&l!==c&&(Pe(l)?(u[l]=null,te(f,l)&&(f[l]=null)):De(l)&&(l.value=null)),X(c))un(c,a,12,[o,u]);else{const d=Pe(c),h=De(c);if(d||h){const m=()=>{if(t.f){const p=d?te(f,c)?f[c]:u[c]:c.value;i?Y(p)&&Xo(p,s):Y(p)?p.includes(s)||p.push(s):d?(u[c]=[s],te(f,c)&&(f[c]=u[c])):(c.value=[s],t.k&&(u[t.k]=c.value))}else d?(u[c]=o,te(f,c)&&(f[c]=o)):h&&(c.value=o,t.k&&(u[t.k]=o))};o?(m.id=-1,He(m,n)):m()}}}const He=Ap;function rg(t){return ig(t)}function ig(t,e){const n=Mh();n.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:f,nextSibling:d,setScopeId:h=pt,insertStaticContent:m}=t,p=(g,_,w,I=null,R=null,M=null,F=!1,D=null,N=!!_.dynamicChildren)=>{if(g===_)return;g&&!Pn(g,_)&&(I=L(g),ve(g,R,M,!0),g=null),_.patchFlag===-2&&(N=!1,_.dynamicChildren=null);const{type:P,ref:j,shapeFlag:B}=_;switch(P){case ua:y(g,_,w,I);break;case gt:v(g,_,w,I);break;case Ss:g==null&&b(_,w,I,F);break;case wt:Q(g,_,w,I,R,M,F,D,N);break;default:B&1?A(g,_,w,I,R,M,F,D,N):B&6?ie(g,_,w,I,R,M,F,D,N):(B&64||B&128)&&P.process(g,_,w,I,R,M,F,D,N,re)}j!=null&&R&&go(j,g&&g.ref,M,_||g,!_)},y=(g,_,w,I)=>{if(g==null)r(_.el=a(_.children),w,I);else{const R=_.el=g.el;_.children!==g.children&&l(R,_.children)}},v=(g,_,w,I)=>{g==null?r(_.el=c(_.children||""),w,I):_.el=g.el},b=(g,_,w,I)=>{[g.el,g.anchor]=m(g.children,_,w,I,g.el,g.anchor)},T=({el:g,anchor:_},w,I)=>{let R;for(;g&&g!==_;)R=d(g),r(g,w,I),g=R;r(_,w,I)},E=({el:g,anchor:_})=>{let w;for(;g&&g!==_;)w=d(g),i(g),g=w;i(_)},A=(g,_,w,I,R,M,F,D,N)=>{F=F||_.type==="svg",g==null?O(_,w,I,R,M,F,D,N):k(g,_,R,M,F,D,N)},O=(g,_,w,I,R,M,F,D)=>{let N,P;const{type:j,props:B,shapeFlag:V,transition:q,dirs:ee}=g;if(N=g.el=o(g.type,M,B&&B.is,B),V&8?u(N,g.children):V&16&&S(g.children,N,null,I,R,M&&j!=="foreignObject",F,D),ee&&Tn(g,null,I,"created"),B){for(const le in B)le!=="value"&&!wi(le)&&s(N,le,null,B[le],M,g.children,I,R,U);"value"in B&&s(N,"value",null,B.value),(P=B.onVnodeBeforeMount)&&vt(P,I,g)}x(N,g,g.scopeId,F,I),ee&&Tn(g,null,I,"beforeMount");const pe=(!R||R&&!R.pendingBranch)&&q&&!q.persisted;pe&&q.beforeEnter(N),r(N,_,w),((P=B&&B.onVnodeMounted)||pe||ee)&&He(()=>{P&&vt(P,I,g),pe&&q.enter(N),ee&&Tn(g,null,I,"mounted")},R)},x=(g,_,w,I,R)=>{if(w&&h(g,w),I)for(let M=0;M<I.length;M++)h(g,I[M]);if(R){let M=R.subTree;if(_===M){const F=R.vnode;x(g,F,F.scopeId,F.slotScopeIds,R.parent)}}},S=(g,_,w,I,R,M,F,D,N=0)=>{for(let P=N;P<g.length;P++){const j=g[P]=D?Zt(g[P]):Tt(g[P]);p(null,j,_,w,I,R,M,F,D)}},k=(g,_,w,I,R,M,F)=>{const D=_.el=g.el;let{patchFlag:N,dynamicChildren:P,dirs:j}=_;N|=g.patchFlag&16;const B=g.props||he,V=_.props||he;let q;w&&En(w,!1),(q=V.onVnodeBeforeUpdate)&&vt(q,w,_,g),j&&Tn(_,g,w,"beforeUpdate"),w&&En(w,!0);const ee=R&&_.type!=="foreignObject";if(P?$(g.dynamicChildren,P,D,w,I,ee,M):F||K(g,_,D,null,w,I,ee,M,!1),N>0){if(N&16)z(D,_,B,V,w,I,R);else if(N&2&&B.class!==V.class&&s(D,"class",null,V.class,R),N&4&&s(D,"style",B.style,V.style,R),N&8){const pe=_.dynamicProps;for(let le=0;le<pe.length;le++){const Te=pe[le],ft=B[Te],Xn=V[Te];(Xn!==ft||Te==="value")&&s(D,Te,ft,Xn,R,g.children,w,I,U)}}N&1&&g.children!==_.children&&u(D,_.children)}else!F&&P==null&&z(D,_,B,V,w,I,R);((q=V.onVnodeUpdated)||j)&&He(()=>{q&&vt(q,w,_,g),j&&Tn(_,g,w,"updated")},I)},$=(g,_,w,I,R,M,F)=>{for(let D=0;D<_.length;D++){const N=g[D],P=_[D],j=N.el&&(N.type===wt||!Pn(N,P)||N.shapeFlag&70)?f(N.el):w;p(N,P,j,null,I,R,M,F,!0)}},z=(g,_,w,I,R,M,F)=>{if(w!==I){if(w!==he)for(const D in w)!wi(D)&&!(D in I)&&s(g,D,w[D],null,F,_.children,R,M,U);for(const D in I){if(wi(D))continue;const N=I[D],P=w[D];N!==P&&D!=="value"&&s(g,D,P,N,F,_.children,R,M,U)}"value"in I&&s(g,"value",w.value,I.value)}},Q=(g,_,w,I,R,M,F,D,N)=>{const P=_.el=g?g.el:a(""),j=_.anchor=g?g.anchor:a("");let{patchFlag:B,dynamicChildren:V,slotScopeIds:q}=_;q&&(D=D?D.concat(q):q),g==null?(r(P,w,I),r(j,w,I),S(_.children,w,j,R,M,F,D,N)):B>0&&B&64&&V&&g.dynamicChildren?($(g.dynamicChildren,V,w,R,M,F,D),(_.key!=null||R&&_===R.subTree)&&Bu(g,_,!0)):K(g,_,w,j,R,M,F,D,N)},ie=(g,_,w,I,R,M,F,D,N)=>{_.slotScopeIds=D,g==null?_.shapeFlag&512?R.ctx.activate(_,w,I,F,N):oe(_,w,I,R,M,F,N):ae(g,_,N)},oe=(g,_,w,I,R,M,F)=>{const D=g.component=_g(g,I,R);if(ls(g)&&(D.ctx.renderer=re),yg(D),D.asyncDep){if(R&&R.registerDep(D,J),!g.el){const N=D.subTree=Xe(gt);v(null,N,_,w)}return}J(D,g,_,w,R,M,F)},ae=(g,_,w)=>{const I=_.component=g.component;if(Ip(g,_,w))if(I.asyncDep&&!I.asyncResolved){W(I,_,w);return}else I.next=_,mp(I.update),I.update();else _.el=g.el,I.vnode=_},J=(g,_,w,I,R,M,F)=>{const D=()=>{if(g.isMounted){let{next:j,bu:B,u:V,parent:q,vnode:ee}=g,pe=j,le;En(g,!1),j?(j.el=ee.el,W(g,j,F)):j=ee,B&&Ti(B),(le=j.props&&j.props.onVnodeBeforeUpdate)&&vt(le,q,j,ee),En(g,!0);const Te=Es(g),ft=g.subTree;g.subTree=Te,p(ft,Te,f(ft.el),L(ft),g,R,M),j.el=Te.el,pe===null&&Sp(g,Te.el),V&&He(V,R),(le=j.props&&j.props.onVnodeUpdated)&&He(()=>vt(le,q,j,ee),R)}else{let j;const{el:B,props:V}=_,{bm:q,m:ee,parent:pe}=g,le=Si(_);if(En(g,!1),q&&Ti(q),!le&&(j=V&&V.onVnodeBeforeMount)&&vt(j,pe,_),En(g,!0),B&&Z){const Te=()=>{g.subTree=Es(g),Z(B,g.subTree,g,R,null)};le?_.type.__asyncLoader().then(()=>!g.isUnmounted&&Te()):Te()}else{const Te=g.subTree=Es(g);p(null,Te,w,I,g,R,M),_.el=Te.el}if(ee&&He(ee,R),!le&&(j=V&&V.onVnodeMounted)){const Te=_;He(()=>vt(j,pe,Te),R)}(_.shapeFlag&256||pe&&Si(pe.vnode)&&pe.vnode.shapeFlag&256)&&g.a&&He(g.a,R),g.isMounted=!0,_=w=I=null}},N=g.effect=new ea(D,()=>aa(P),g.scope),P=g.update=()=>N.run();P.id=g.uid,En(g,!0),P()},W=(g,_,w)=>{_.component=g;const I=g.vnode.props;g.vnode=_,g.next=null,Jp(g,_.props,I,w),eg(g,_.children,w),Cr(),cc(),Ar()},K=(g,_,w,I,R,M,F,D,N=!1)=>{const P=g&&g.children,j=g?g.shapeFlag:0,B=_.children,{patchFlag:V,shapeFlag:q}=_;if(V>0){if(V&128){Fe(P,B,w,I,R,M,F,D,N);return}else if(V&256){Ie(P,B,w,I,R,M,F,D,N);return}}q&8?(j&16&&U(P,R,M),B!==P&&u(w,B)):j&16?q&16?Fe(P,B,w,I,R,M,F,D,N):U(P,R,M,!0):(j&8&&u(w,""),q&16&&S(B,w,I,R,M,F,D,N))},Ie=(g,_,w,I,R,M,F,D,N)=>{g=g||rr,_=_||rr;const P=g.length,j=_.length,B=Math.min(P,j);let V;for(V=0;V<B;V++){const q=_[V]=N?Zt(_[V]):Tt(_[V]);p(g[V],q,w,null,R,M,F,D,N)}P>j?U(g,R,M,!0,!1,B):S(_,w,I,R,M,F,D,N,B)},Fe=(g,_,w,I,R,M,F,D,N)=>{let P=0;const j=_.length;let B=g.length-1,V=j-1;for(;P<=B&&P<=V;){const q=g[P],ee=_[P]=N?Zt(_[P]):Tt(_[P]);if(Pn(q,ee))p(q,ee,w,null,R,M,F,D,N);else break;P++}for(;P<=B&&P<=V;){const q=g[B],ee=_[V]=N?Zt(_[V]):Tt(_[V]);if(Pn(q,ee))p(q,ee,w,null,R,M,F,D,N);else break;B--,V--}if(P>B){if(P<=V){const q=V+1,ee=q<j?_[q].el:I;for(;P<=V;)p(null,_[P]=N?Zt(_[P]):Tt(_[P]),w,ee,R,M,F,D,N),P++}}else if(P>V)for(;P<=B;)ve(g[P],R,M,!0),P++;else{const q=P,ee=P,pe=new Map;for(P=ee;P<=V;P++){const qe=_[P]=N?Zt(_[P]):Tt(_[P]);qe.key!=null&&pe.set(qe.key,P)}let le,Te=0;const ft=V-ee+1;let Xn=!1,Ja=0;const kr=new Array(ft);for(P=0;P<ft;P++)kr[P]=0;for(P=q;P<=B;P++){const qe=g[P];if(Te>=ft){ve(qe,R,M,!0);continue}let yt;if(qe.key!=null)yt=pe.get(qe.key);else for(le=ee;le<=V;le++)if(kr[le-ee]===0&&Pn(qe,_[le])){yt=le;break}yt===void 0?ve(qe,R,M,!0):(kr[yt-ee]=P+1,yt>=Ja?Ja=yt:Xn=!0,p(qe,_[yt],w,null,R,M,F,D,N),Te++)}const Qa=Xn?sg(kr):rr;for(le=Qa.length-1,P=ft-1;P>=0;P--){const qe=ee+P,yt=_[qe],Za=qe+1<j?_[qe+1].el:I;kr[P]===0?p(null,yt,w,Za,R,M,F,D,N):Xn&&(le<0||P!==Qa[le]?ke(yt,w,Za,2):le--)}}},ke=(g,_,w,I,R=null)=>{const{el:M,type:F,transition:D,children:N,shapeFlag:P}=g;if(P&6){ke(g.component.subTree,_,w,I);return}if(P&128){g.suspense.move(_,w,I);return}if(P&64){F.move(g,_,w,re);return}if(F===wt){r(M,_,w);for(let B=0;B<N.length;B++)ke(N[B],_,w,I);r(g.anchor,_,w);return}if(F===Ss){T(g,_,w);return}if(I!==2&&P&1&&D)if(I===0)D.beforeEnter(M),r(M,_,w),He(()=>D.enter(M),R);else{const{leave:B,delayLeave:V,afterLeave:q}=D,ee=()=>r(M,_,w),pe=()=>{B(M,()=>{ee(),q&&q()})};V?V(M,ee,pe):pe()}else r(M,_,w)},ve=(g,_,w,I=!1,R=!1)=>{const{type:M,props:F,ref:D,children:N,dynamicChildren:P,shapeFlag:j,patchFlag:B,dirs:V}=g;if(D!=null&&go(D,null,w,g,!0),j&256){_.ctx.deactivate(g);return}const q=j&1&&V,ee=!Si(g);let pe;if(ee&&(pe=F&&F.onVnodeBeforeUnmount)&&vt(pe,_,g),j&6)C(g.component,w,I);else{if(j&128){g.suspense.unmount(w,I);return}q&&Tn(g,null,_,"beforeUnmount"),j&64?g.type.remove(g,_,w,R,re,I):P&&(M!==wt||B>0&&B&64)?U(P,_,w,!1,!0):(M===wt&&B&384||!R&&j&16)&&U(N,_,w),I&&Dt(g)}(ee&&(pe=F&&F.onVnodeUnmounted)||q)&&He(()=>{pe&&vt(pe,_,g),q&&Tn(g,null,_,"unmounted")},w)},Dt=g=>{const{type:_,el:w,anchor:I,transition:R}=g;if(_===wt){$e(w,I);return}if(_===Ss){E(g);return}const M=()=>{i(w),R&&!R.persisted&&R.afterLeave&&R.afterLeave()};if(g.shapeFlag&1&&R&&!R.persisted){const{leave:F,delayLeave:D}=R,N=()=>F(w,M);D?D(g.el,M,N):N()}else M()},$e=(g,_)=>{let w;for(;g!==_;)w=d(g),i(g),g=w;i(_)},C=(g,_,w)=>{const{bum:I,scope:R,update:M,subTree:F,um:D}=g;I&&Ti(I),R.stop(),M&&(M.active=!1,ve(F,g,_,w)),D&&He(D,_),He(()=>{g.isUnmounted=!0},_),_&&_.pendingBranch&&!_.isUnmounted&&g.asyncDep&&!g.asyncResolved&&g.suspenseId===_.pendingId&&(_.deps--,_.deps===0&&_.resolve())},U=(g,_,w,I=!1,R=!1,M=0)=>{for(let F=M;F<g.length;F++)ve(g[F],_,w,I,R)},L=g=>g.shapeFlag&6?L(g.component.subTree):g.shapeFlag&128?g.suspense.next():d(g.anchor||g.el),H=(g,_,w)=>{g==null?_._vnode&&ve(_._vnode,null,null,!0):p(_._vnode||null,g,_,null,null,null,w),cc(),yu(),_._vnode=g},re={p,um:ve,m:ke,r:Dt,mt:oe,mc:S,pc:K,pbc:$,n:L,o:t};let ge,Z;return e&&([ge,Z]=e(re)),{render:H,hydrate:ge,createApp:ng(H,ge)}}function En({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Bu(t,e,n=!1){const r=t.children,i=e.children;if(Y(r)&&Y(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=Zt(i[s]),a.el=o.el),n||Bu(o,a))}}function sg(t){const e=t.slice(),n=[0];let r,i,s,o,a;const c=t.length;for(r=0;r<c;r++){const l=t[r];if(l!==0){if(i=n[n.length-1],t[i]<l){e[r]=i,n.push(r);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,t[n[a]]<l?s=a+1:o=a;l<t[n[s]]&&(s>0&&(e[r]=n[s-1]),n[s]=r)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}const og=t=>t.__isTeleport,wt=Symbol(void 0),ua=Symbol(void 0),gt=Symbol(void 0),Ss=Symbol(void 0),Mr=[];let ht=null;function ag(t=!1){Mr.push(ht=t?null:[])}function cg(){Mr.pop(),ht=Mr[Mr.length-1]||null}let Wr=1;function vc(t){Wr+=t}function $u(t){return t.dynamicChildren=Wr>0?ht||rr:null,cg(),Wr>0&&ht&&ht.push(t),t}function vT(t,e,n,r,i,s){return $u(ju(t,e,n,r,i,s,!0))}function lg(t,e,n,r,i){return $u(Xe(t,e,n,r,i,!0))}function _o(t){return t?t.__v_isVNode===!0:!1}function Pn(t,e){return t.type===e.type&&t.key===e.key}const fs="__vInternal",Hu=({key:t})=>t!=null?t:null,Ci=({ref:t,ref_key:e,ref_for:n})=>t!=null?Pe(t)||De(t)||X(t)?{i:st,r:t,k:e,f:!!n}:t:null;function ju(t,e=null,n=null,r=0,i=null,s=t===wt?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Hu(e),ref:e&&Ci(e),scopeId:wu,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null};return a?(fa(c,n),s&128&&t.normalize(c)):n&&(c.shapeFlag|=Pe(n)?8:16),Wr>0&&!o&&ht&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&ht.push(c),c}const Xe=ug;function ug(t,e=null,n=null,r=0,i=null,s=!1){if((!t||t===jp)&&(t=gt),_o(t)){const a=mn(t,e,!0);return n&&fa(a,n),Wr>0&&!s&&ht&&(a.shapeFlag&6?ht[ht.indexOf(t)]=a:ht.push(a)),a.patchFlag|=-2,a}if(Eg(t)&&(t=t.__vccOpts),e){e=fg(e);let{class:a,style:c}=e;a&&!Pe(a)&&(e.class=Go(a)),ye(c)&&(cu(c)&&!Y(c)&&(c=Ne({},c)),e.style=qo(c))}const o=Pe(t)?1:Cp(t)?128:og(t)?64:ye(t)?4:X(t)?2:0;return ju(t,e,n,r,i,o,s,!0)}function fg(t){return t?cu(t)||fs in t?Ne({},t):t:null}function mn(t,e,n=!1){const{props:r,ref:i,patchFlag:s,children:o}=t,a=e?hg(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&Hu(a),ref:e&&e.ref?n&&i?Y(i)?i.concat(Ci(e)):[i,Ci(e)]:Ci(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==wt?s===-1?16:s|16:s,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&mn(t.ssContent),ssFallback:t.ssFallback&&mn(t.ssFallback),el:t.el,anchor:t.anchor}}function dg(t=" ",e=0){return Xe(ua,null,t,e)}function bT(t="",e=!1){return e?(ag(),lg(gt,null,t)):Xe(gt,null,t)}function Tt(t){return t==null||typeof t=="boolean"?Xe(gt):Y(t)?Xe(wt,null,t.slice()):typeof t=="object"?Zt(t):Xe(ua,null,String(t))}function Zt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:mn(t)}function fa(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(Y(e))n=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),fa(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!(fs in e)?e._ctx=st:i===3&&st&&(st.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else X(e)?(e={default:e,_ctx:st},n=32):(e=String(e),r&64?(n=16,e=[dg(e)]):n=8);t.children=e,t.shapeFlag|=n}function hg(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=Go([e.class,r.class]));else if(i==="style")e.style=qo([e.style,r.style]);else if(ns(i)){const s=e[i],o=r[i];o&&s!==o&&!(Y(s)&&s.includes(o))&&(e[i]=s?[].concat(s,o):o)}else i!==""&&(e[i]=r[i])}return e}function vt(t,e,n,r=null){lt(t,e,7,[n,r])}const pg=Uu();let gg=0;function _g(t,e,n){const r=t.type,i=(e?e.appContext:t.appContext)||pg,s={uid:gg++,vnode:t,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,scope:new Nh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Mu(r,i),emitsOptions:bu(r,i),emit:null,emitted:null,propsDefaults:he,inheritAttrs:r.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=bp.bind(null,s),t.ce&&t.ce(s),s}let Ce=null;const mg=()=>Ce||st,pr=t=>{Ce=t,t.scope.on()},Fn=()=>{Ce&&Ce.scope.off(),Ce=null};function Vu(t){return t.vnode.shapeFlag&4}let Kr=!1;function yg(t,e=!1){Kr=e;const{props:n,children:r}=t.vnode,i=Vu(t);Xp(t,n,i,e),Zp(t,r);const s=i?vg(t,e):void 0;return Kr=!1,s}function vg(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=lu(new Proxy(t.ctx,zp));const{setup:r}=n;if(r){const i=t.setupContext=r.length>1?wg(t):null;pr(t),Cr();const s=un(r,t,0,[t.props,i]);if(Ar(),Fn(),Gl(s)){if(s.then(Fn,Fn),e)return s.then(o=>{bc(t,o,e)}).catch(o=>{as(o,t,0)});t.asyncDep=s}else bc(t,s,e)}else zu(t,e)}function bc(t,e,n){X(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ye(e)&&(t.setupState=hu(e)),zu(t,n)}let wc;function zu(t,e,n){const r=t.type;if(!t.render){if(!e&&wc&&!r.render){const i=r.template||ca(t).template;if(i){const{isCustomElement:s,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:c}=r,l=Ne(Ne({isCustomElement:s,delimiters:a},o),c);r.render=wc(i,l)}}t.render=r.render||pt}pr(t),Cr(),Wp(t),Ar(),Fn()}function bg(t){return new Proxy(t.attrs,{get(e,n){return Qe(t,"get","$attrs"),e[n]}})}function wg(t){const e=r=>{t.exposed=r||{}};let n;return{get attrs(){return n||(n=bg(t))},slots:t.slots,emit:t.emit,expose:e}}function ds(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(hu(lu(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Fi)return Fi[n](t)}}))}function Tg(t,e=!0){return X(t)?t.displayName||t.name:t.name||e&&t.__name}function Eg(t){return X(t)&&"__vccOpts"in t}const it=(t,e)=>pp(t,e,Kr);function Wu(t,e,n){const r=arguments.length;return r===2?ye(e)&&!Y(e)?_o(e)?Xe(t,null,[e]):Xe(t,e):Xe(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&_o(n)&&(n=[n]),Xe(t,e,n))}const Ig="3.2.41",Sg="http://www.w3.org/2000/svg",On=typeof document<"u"?document:null,Tc=On&&On.createElement("template"),Cg={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const i=e?On.createElementNS(Sg,t):On.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:t=>On.createTextNode(t),createComment:t=>On.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>On.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,i,s){const o=n?n.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===s||!(i=i.nextSibling)););else{Tc.innerHTML=r?`<svg>${t}</svg>`:t;const a=Tc.content;if(r){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function Ag(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function kg(t,e,n){const r=t.style,i=Pe(n);if(n&&!i){for(const s in n)mo(r,s,n[s]);if(e&&!Pe(e))for(const s in e)n[s]==null&&mo(r,s,"")}else{const s=r.display;i?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=s)}}const Ec=/\s*!important$/;function mo(t,e,n){if(Y(n))n.forEach(r=>mo(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Rg(t,e);Ec.test(n)?t.setProperty(Sr(r),n.replace(Ec,""),"important"):t[r]=n}}const Ic=["Webkit","Moz","ms"],Cs={};function Rg(t,e){const n=Cs[e];if(n)return n;let r=Rt(e);if(r!=="filter"&&r in t)return Cs[e]=r;r=ss(r);for(let i=0;i<Ic.length;i++){const s=Ic[i]+r;if(s in t)return Cs[e]=s}return e}const Sc="http://www.w3.org/1999/xlink";function Pg(t,e,n,r,i){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Sc,e.slice(6,e.length)):t.setAttributeNS(Sc,e,n);else{const s=Ih(e);n==null||s&&!Wl(n)?t.removeAttribute(e):t.setAttribute(e,s?"":n)}}function Og(t,e,n,r,i,s,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,i,s),t[e]=n==null?"":n;return}if(e==="value"&&t.tagName!=="PROGRESS"&&!t.tagName.includes("-")){t._value=n;const c=n==null?"":n;(t.value!==c||t.tagName==="OPTION")&&(t.value=c),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=Wl(n):n==null&&c==="string"?(n="",a=!0):c==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Zn(t,e,n,r){t.addEventListener(e,n,r)}function xg(t,e,n,r){t.removeEventListener(e,n,r)}function Dg(t,e,n,r,i=null){const s=t._vei||(t._vei={}),o=s[e];if(r&&o)o.value=r;else{const[a,c]=Mg(e);if(r){const l=s[e]=Fg(r,i);Zn(t,a,l,c)}else o&&(xg(t,a,o,c),s[e]=void 0)}}const Cc=/(?:Once|Passive|Capture)$/;function Mg(t){let e;if(Cc.test(t)){e={};let r;for(;r=t.match(Cc);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Sr(t.slice(2)),e]}let As=0;const Ng=Promise.resolve(),Lg=()=>As||(Ng.then(()=>As=0),As=Date.now());function Fg(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;lt(Ug(r,n.value),e,5,[r])};return n.value=t,n.attached=Lg(),n}function Ug(t,e){if(Y(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Ac=/^on[a-z]/,Bg=(t,e,n,r,i=!1,s,o,a,c)=>{e==="class"?Ag(t,r,i):e==="style"?kg(t,n,r):ns(e)?Yo(e)||Dg(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):$g(t,e,r,i))?Og(t,e,r,s,o,a,c):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Pg(t,e,r,i))};function $g(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&Ac.test(e)&&X(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||Ac.test(e)&&Pe(n)?!1:e in t}const Hg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};Op.props;const kc=t=>{const e=t.props["onUpdate:modelValue"]||!1;return Y(e)?n=>Ti(e,n):e};function jg(t){t.target.composing=!0}function Rc(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const wT={created(t,{modifiers:{lazy:e,trim:n,number:r}},i){t._assign=kc(i);const s=r||i.props&&i.props.type==="number";Zn(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),s&&(a=no(a)),t._assign(a)}),n&&Zn(t,"change",()=>{t.value=t.value.trim()}),e||(Zn(t,"compositionstart",jg),Zn(t,"compositionend",Rc),Zn(t,"change",Rc))},mounted(t,{value:e}){t.value=e==null?"":e},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:i}},s){if(t._assign=kc(s),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(i||t.type==="number")&&no(t.value)===e))return;const o=e==null?"":e;t.value!==o&&(t.value=o)}},Vg=["ctrl","shift","alt","meta"],zg={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Vg.some(n=>t[`${n}Key`]&&!e.includes(n))},TT=(t,e)=>(n,...r)=>{for(let i=0;i<e.length;i++){const s=zg[e[i]];if(s&&s(n,e))return}return t(n,...r)},Wg=Ne({patchProp:Bg},Cg);let Pc;function Kg(){return Pc||(Pc=rg(Wg))}const ET=(...t)=>{const e=Kg().createApp(...t),{mount:n}=e;return e.mount=r=>{const i=qg(r);if(!i)return;const s=e._component;!X(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.innerHTML="";const o=n(i,!1,i instanceof SVGElement);return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function qg(t){return Pe(t)?document.querySelector(t):t}function Lt(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ku(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}/*!
 * GSAP 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Je={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},gr={duration:.5,overwrite:!1,delay:0},da,Ve,Ee,ot=1e8,ue=1/ot,yo=Math.PI*2,Gg=yo/4,Yg=0,qu=Math.sqrt,Xg=Math.cos,Jg=Math.sin,Ae=function(e){return typeof e=="string"},be=function(e){return typeof e=="function"},zt=function(e){return typeof e=="number"},ha=function(e){return typeof e>"u"},Pt=function(e){return typeof e=="object"},ze=function(e){return e!==!1},Gu=function(){return typeof window<"u"},vi=function(e){return be(e)||Ae(e)},Yu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Me=Array.isArray,vo=/(?:-?\.?\d|\.)+/gi,Xu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,tr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ks=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ju=/[+-]=-?[.\d]+/,Qu=/[^,'"\[\]\s]+/gi,Qg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,_e,rt,bo,pa,Ze={},Bi={},Zu,ef=function(e){return(Bi=jn(e,Ze))&&et},ga=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},$i=function(e,n){return!n&&console.warn(e)},tf=function(e,n){return e&&(Ze[e]=n)&&Bi&&(Bi[e]=n)||Ze},qr=function(){return 0},Zg={suppressEvents:!0,isStart:!0,kill:!1},Ai={suppressEvents:!0,kill:!1},e_={suppressEvents:!0},_a={},dn=[],wo={},nf,Ge={},Rs={},Oc=30,ki=[],ma="",ya=function(e){var n=e[0],r,i;if(Pt(n)||be(n)||(e=[e]),!(r=(n._gsap||{}).harness)){for(i=ki.length;i--&&!ki[i].targetTest(n););r=ki[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Sf(e[i],r)))||e.splice(i,1);return e},Un=function(e){return e._gsap||ya(at(e))[0]._gsap},rf=function(e,n,r){return(r=e[n])&&be(r)?e[n]():ha(r)&&e.getAttribute&&e.getAttribute(n)||r},We=function(e,n){return(e=e.split(",")).forEach(n)||e},we=function(e){return Math.round(e*1e5)/1e5||0},Re=function(e){return Math.round(e*1e7)/1e7||0},cr=function(e,n){var r=n.charAt(0),i=parseFloat(n.substr(2));return e=parseFloat(e),r==="+"?e+i:r==="-"?e-i:r==="*"?e*i:e/i},t_=function(e,n){for(var r=n.length,i=0;e.indexOf(n[i])<0&&++i<r;);return i<r},Hi=function(){var e=dn.length,n=dn.slice(0),r,i;for(wo={},dn.length=0,r=0;r<e;r++)i=n[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},sf=function(e,n,r,i){dn.length&&Hi(),e.render(n,r,i||Ve&&n<0&&(e._initted||e._startAt)),dn.length&&Hi()},of=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(Qu).length<2?n:Ae(e)?e.trim():e},af=function(e){return e},ut=function(e,n){for(var r in n)r in e||(e[r]=n[r]);return e},n_=function(e){return function(n,r){for(var i in r)i in n||i==="duration"&&e||i==="ease"||(n[i]=r[i])}},jn=function(e,n){for(var r in n)e[r]=n[r];return e},xc=function t(e,n){for(var r in n)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(e[r]=Pt(n[r])?t(e[r]||(e[r]={}),n[r]):n[r]);return e},ji=function(e,n){var r={},i;for(i in e)i in n||(r[i]=e[i]);return r},Nr=function(e){var n=e.parent||_e,r=e.keyframes?n_(Me(e.keyframes)):ut;if(ze(e.inherit))for(;n;)r(e,n.vars.defaults),n=n.parent||n._dp;return e},r_=function(e,n){for(var r=e.length,i=r===n.length;i&&r--&&e[r]===n[r];);return r<0},cf=function(e,n,r,i,s){r===void 0&&(r="_first"),i===void 0&&(i="_last");var o=e[i],a;if(s)for(a=n[s];o&&o[s]>a;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[r],e[r]=n),n._next?n._next._prev=n:e[i]=n,n._prev=o,n.parent=n._dp=e,n},hs=function(e,n,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var s=n._prev,o=n._next;s?s._next=o:e[r]===n&&(e[r]=o),o?o._prev=s:e[i]===n&&(e[i]=s),n._next=n._prev=n.parent=null},yn=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove(e),e._act=0},Bn=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var r=e;r;)r._dirty=1,r=r.parent;return e},i_=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},To=function(e,n,r,i){return e._startAt&&(Ve?e._startAt.revert(Ai):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,i))},s_=function t(e){return!e||e._ts&&t(e.parent)},Dc=function(e){return e._repeat?_r(e._tTime,e=e.duration()+e._rDelay)*e:0},_r=function(e,n){var r=Math.floor(e/=n);return e&&r===e?r-1:r},Vi=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},ps=function(e){return e._end=Re(e._start+(e._tDur/Math.abs(e._ts||e._rts||ue)||0))},gs=function(e,n){var r=e._dp;return r&&r.smoothChildTiming&&e._ts&&(e._start=Re(r._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),ps(e),r._dirty||Bn(r,e)),e},lf=function(e,n){var r;if((n._time||n._initted&&!n._dur)&&(r=Vi(e.rawTime(),n),(!n._dur||si(0,n.totalDuration(),r)-n._tTime>ue)&&n.render(r,!0)),Bn(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(r=e;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;e._zTime=-ue}},It=function(e,n,r,i){return n.parent&&yn(n),n._start=Re((zt(r)?r:r||e!==_e?nt(e,r,n):e._time)+n._delay),n._end=Re(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),cf(e,n,"_first","_last",e._sort?"_start":0),Eo(n)||(e._recent=n),i||lf(e,n),e._ts<0&&gs(e,e._tTime),e},uf=function(e,n){return(Ze.ScrollTrigger||ga("scrollTrigger",n))&&Ze.ScrollTrigger.create(n,e)},ff=function(e,n,r,i,s){if(ba(e,n,s),!e._initted)return 1;if(!r&&e._pt&&!Ve&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&nf!==Ye.frame)return dn.push(e),e._lazy=[s,i],1},o_=function t(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||t(n))},Eo=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},a_=function(e,n,r,i){var s=e.ratio,o=n<0||!n&&(!e._start&&o_(e)&&!(!e._initted&&Eo(e))||(e._ts<0||e._dp._ts<0)&&!Eo(e))?0:1,a=e._rDelay,c=0,l,u,f;if(a&&e._repeat&&(c=si(0,e._tDur,n),u=_r(c,a),e._yoyo&&u&1&&(o=1-o),u!==_r(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Ve||i||e._zTime===ue||!n&&e._zTime){if(!e._initted&&ff(e,n,i,r,c))return;for(f=e._zTime,e._zTime=n||(r?ue:0),r||(r=n&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=c,l=e._pt;l;)l.r(o,l.d),l=l._next;n<0&&To(e,n,r,!0),e._onUpdate&&!r&&ct(e,"onUpdate"),c&&e._repeat&&!r&&e.parent&&ct(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&yn(e,1),!r&&!Ve&&(ct(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},c_=function(e,n,r){var i;if(r>n)for(i=e._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>n)return i;i=i._next}else for(i=e._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<n)return i;i=i._prev}},mr=function(e,n,r,i){var s=e._repeat,o=Re(n)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Re(o*(s+1)+e._rDelay*s):o,a>0&&!i&&gs(e,e._tTime=e._tDur*a),e.parent&&ps(e),r||Bn(e.parent,e),e},Mc=function(e){return e instanceof je?Bn(e):mr(e,e._dur)},l_={_start:0,endTime:qr,totalDuration:qr},nt=function t(e,n,r){var i=e.labels,s=e._recent||l_,o=e.duration()>=ot?s.endTime(!1):e._dur,a,c,l;return Ae(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)==="%",a=n.indexOf("="),c==="<"||c===">"?(a>=0&&(n=n.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(a<0?s:r).totalDuration()/100:1)):a<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(a-1)+n.substr(a+1)),l&&r&&(c=c/100*(Me(r)?r[0]:r).totalDuration()),a>1?t(e,n.substr(0,a-1),r)+c:o+c)):n==null?o:+n},Lr=function(e,n,r){var i=zt(n[1]),s=(i?2:1)+(e<2?0:1),o=n[s],a,c;if(i&&(o.duration=n[1]),o.parent=r,e){for(a=o,c=r;c&&!("immediateRender"in a);)a=c.vars.defaults||{},c=ze(c.vars.inherit)&&c.parent;o.immediateRender=ze(a.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new Se(n[0],o,n[s+1])},bn=function(e,n){return e||e===0?n(e):n},si=function(e,n,r){return r<e?e:r>n?n:r},xe=function(e,n){return!Ae(e)||!(n=Qg.exec(e))?"":n[1]},u_=function(e,n,r){return bn(r,function(i){return si(e,n,i)})},Io=[].slice,df=function(e,n){return e&&Pt(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&Pt(e[0]))&&!e.nodeType&&e!==rt},f_=function(e,n,r){return r===void 0&&(r=[]),e.forEach(function(i){var s;return Ae(i)&&!n||df(i,1)?(s=r).push.apply(s,at(i)):r.push(i)})||r},at=function(e,n,r){return Ee&&!n&&Ee.selector?Ee.selector(e):Ae(e)&&!r&&(bo||!yr())?Io.call((n||pa).querySelectorAll(e),0):Me(e)?f_(e,r):df(e)?Io.call(e,0):e?[e]:[]},So=function(e){return e=at(e)[0]||$i("Invalid scope")||{},function(n){var r=e.current||e.nativeElement||e;return at(n,r.querySelectorAll?r:r===e?$i("Invalid scope")||pa.createElement("div"):e)}},hf=function(e){return e.sort(function(){return .5-Math.random()})},pf=function(e){if(be(e))return e;var n=Pt(e)?e:{each:e},r=$n(n.ease),i=n.from||0,s=parseFloat(n.base)||0,o={},a=i>0&&i<1,c=isNaN(i)||a,l=n.axis,u=i,f=i;return Ae(i)?u=f={center:.5,edges:.5,end:1}[i]||0:!a&&c&&(u=i[0],f=i[1]),function(d,h,m){var p=(m||n).length,y=o[p],v,b,T,E,A,O,x,S,k;if(!y){if(k=n.grid==="auto"?0:(n.grid||[1,ot])[1],!k){for(x=-ot;x<(x=m[k++].getBoundingClientRect().left)&&k<p;);k--}for(y=o[p]=[],v=c?Math.min(k,p)*u-.5:i%k,b=k===ot?0:c?p*f/k-.5:i/k|0,x=0,S=ot,O=0;O<p;O++)T=O%k-v,E=b-(O/k|0),y[O]=A=l?Math.abs(l==="y"?E:T):qu(T*T+E*E),A>x&&(x=A),A<S&&(S=A);i==="random"&&hf(y),y.max=x-S,y.min=S,y.v=p=(parseFloat(n.amount)||parseFloat(n.each)*(k>p?p-1:l?l==="y"?p/k:k:Math.max(k,p/k))||0)*(i==="edges"?-1:1),y.b=p<0?s-p:s,y.u=xe(n.amount||n.each)||0,r=r&&p<0?Tf(r):r}return p=(y[d]-y.min)/y.max||0,Re(y.b+(r?r(p):p)*y.v)+y.u}},Co=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(r){var i=Re(Math.round(parseFloat(r)/e)*e*n);return(i-i%1)/n+(zt(r)?0:xe(r))}},gf=function(e,n){var r=Me(e),i,s;return!r&&Pt(e)&&(i=r=e.radius||ot,e.values?(e=at(e.values),(s=!zt(e[0]))&&(i*=i)):e=Co(e.increment)),bn(n,r?be(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),c=parseFloat(s?o.y:0),l=ot,u=0,f=e.length,d,h;f--;)s?(d=e[f].x-a,h=e[f].y-c,d=d*d+h*h):d=Math.abs(e[f]-a),d<l&&(l=d,u=f);return u=!i||l<=i?e[u]:o,s||u===o||zt(o)?u:u+xe(o)}:Co(e))},_f=function(e,n,r,i){return bn(Me(e)?!n:r===!0?!!(r=0):!i,function(){return Me(e)?e[~~(Math.random()*e.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((e-r/2+Math.random()*(n-e+r*.99))/r)*r*i)/i})},d_=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(i){return n.reduce(function(s,o){return o(s)},i)}},h_=function(e,n){return function(r){return e(parseFloat(r))+(n||xe(r))}},p_=function(e,n,r){return yf(e,n,0,1,r)},mf=function(e,n,r){return bn(r,function(i){return e[~~n(i)]})},g_=function t(e,n,r){var i=n-e;return Me(e)?mf(e,t(0,e.length),n):bn(r,function(s){return(i+(s-e)%i)%i+e})},__=function t(e,n,r){var i=n-e,s=i*2;return Me(e)?mf(e,t(0,e.length-1),n):bn(r,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Gr=function(e){for(var n=0,r="",i,s,o,a;~(i=e.indexOf("random(",n));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?Qu:vo),r+=e.substr(n,i-n)+_f(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),n=o+1;return r+e.substr(n,e.length-n)},yf=function(e,n,r,i,s){var o=n-e,a=i-r;return bn(s,function(c){return r+((c-e)/o*a||0)})},m_=function t(e,n,r,i){var s=isNaN(e+n)?0:function(h){return(1-h)*e+h*n};if(!s){var o=Ae(e),a={},c,l,u,f,d;if(r===!0&&(i=1)&&(r=null),o)e={p:e},n={p:n};else if(Me(e)&&!Me(n)){for(u=[],f=e.length,d=f-2,l=1;l<f;l++)u.push(t(e[l-1],e[l]));f--,s=function(m){m*=f;var p=Math.min(d,~~m);return u[p](m-p)},r=n}else i||(e=jn(Me(e)?[]:{},e));if(!u){for(c in n)va.call(a,e,c,"get",n[c]);s=function(m){return Ea(m,a)||(o?e.p:e)}}}return bn(r,s)},Nc=function(e,n,r){var i=e.labels,s=ot,o,a,c;for(o in i)a=i[o]-n,a<0==!!r&&a&&s>(a=Math.abs(a))&&(c=o,s=a);return c},ct=function(e,n,r){var i=e.vars,s=i[n],o=Ee,a=e._ctx,c,l,u;if(!!s)return c=i[n+"Params"],l=i.callbackScope||e,r&&dn.length&&Hi(),a&&(Ee=a),u=c?s.apply(l,c):s.call(l),Ee=o,u},xr=function(e){return yn(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Ve),e.progress()<1&&ct(e,"onInterrupt"),e},nr,y_=function(e){e=!e.name&&e.default||e;var n=e.name,r=be(e),i=n&&!r&&e.init?function(){this._props=[]}:e,s={init:qr,render:Ea,add:va,kill:M_,modifier:D_,rawVars:0},o={targetTest:0,get:0,getSetter:Ta,aliases:{},register:0};if(yr(),e!==i){if(Ge[n])return;ut(i,ut(ji(e,s),o)),jn(i.prototype,jn(s,ji(e,o))),Ge[i.prop=n]=i,e.targetTest&&(ki.push(i),_a[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}tf(n,i),e.register&&e.register(et,i,Ke)},fe=255,Dr={aqua:[0,fe,fe],lime:[0,fe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,fe],navy:[0,0,128],white:[fe,fe,fe],olive:[128,128,0],yellow:[fe,fe,0],orange:[fe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[fe,0,0],pink:[fe,192,203],cyan:[0,fe,fe],transparent:[fe,fe,fe,0]},Ps=function(e,n,r){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(r-n)*e*6:e<.5?r:e*3<2?n+(r-n)*(2/3-e)*6:n)*fe+.5|0},vf=function(e,n,r){var i=e?zt(e)?[e>>16,e>>8&fe,e&fe]:0:Dr.black,s,o,a,c,l,u,f,d,h,m;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Dr[e])i=Dr[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&fe,i&fe,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&fe,e&fe]}else if(e.substr(0,3)==="hsl"){if(i=m=e.match(vo),!n)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(l+1):u+l-u*l,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ps(c+1/3,s,o),i[1]=Ps(c,s,o),i[2]=Ps(c-1/3,s,o);else if(~e.indexOf("="))return i=e.match(Xu),r&&i.length<4&&(i[3]=1),i}else i=e.match(vo)||Dr.transparent;i=i.map(Number)}return n&&!m&&(s=i[0]/fe,o=i[1]/fe,a=i[2]/fe,f=Math.max(s,o,a),d=Math.min(s,o,a),u=(f+d)/2,f===d?c=l=0:(h=f-d,l=u>.5?h/(2-f-d):h/(f+d),c=f===s?(o-a)/h+(o<a?6:0):f===o?(a-s)/h+2:(s-o)/h+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),r&&i.length<4&&(i[3]=1),i},bf=function(e){var n=[],r=[],i=-1;return e.split(hn).forEach(function(s){var o=s.match(tr)||[];n.push.apply(n,o),r.push(i+=o.length+1)}),n.c=r,n},Lc=function(e,n,r){var i="",s=(e+i).match(hn),o=n?"hsla(":"rgba(",a=0,c,l,u,f;if(!s)return e;if(s=s.map(function(d){return(d=vf(d,n,1))&&o+(n?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),r&&(u=bf(e),c=r.c,c.join(i)!==u.c.join(i)))for(l=e.replace(hn,"1").split(tr),f=l.length-1;a<f;a++)i+=l[a]+(~c.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:r).shift());if(!l)for(l=e.split(hn),f=l.length-1;a<f;a++)i+=l[a]+s[a];return i+l[f]},hn=function(){var t="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Dr)t+="|"+e+"\\b";return new RegExp(t+")","gi")}(),v_=/hsl[a]?\(/,wf=function(e){var n=e.join(" "),r;if(hn.lastIndex=0,hn.test(n))return r=v_.test(n),e[1]=Lc(e[1],r),e[0]=Lc(e[0],r,bf(e[1])),!0},Yr,Ye=function(){var t=Date.now,e=500,n=33,r=t(),i=r,s=1e3/240,o=s,a=[],c,l,u,f,d,h,m=function p(y){var v=t()-i,b=y===!0,T,E,A,O;if(v>e&&(r+=v-n),i+=v,A=i-r,T=A-o,(T>0||b)&&(O=++f.frame,d=A-f.time*1e3,f.time=A=A/1e3,o+=T+(T>=s?4:s-T),E=1),b||(c=l(p)),E)for(h=0;h<a.length;h++)a[h](A,d,O,y)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(y){return d/(1e3/(y||60))},wake:function(){Zu&&(!bo&&Gu()&&(rt=bo=window,pa=rt.document||{},Ze.gsap=et,(rt.gsapVersions||(rt.gsapVersions=[])).push(et.version),ef(Bi||rt.GreenSockGlobals||!rt.gsap&&rt||{}),u=rt.requestAnimationFrame),c&&f.sleep(),l=u||function(y){return setTimeout(y,o-f.time*1e3+1|0)},Yr=1,m(2))},sleep:function(){(u?rt.cancelAnimationFrame:clearTimeout)(c),Yr=0,l=qr},lagSmoothing:function(y,v){e=y||1/ue,n=Math.min(v,e,0)},fps:function(y){s=1e3/(y||240),o=f.time*1e3+s},add:function(y,v,b){var T=v?function(E,A,O,x){y(E,A,O,x),f.remove(T)}:y;return f.remove(y),a[b?"unshift":"push"](T),yr(),T},remove:function(y,v){~(v=a.indexOf(y))&&a.splice(v,1)&&h>=v&&h--},_listeners:a},f}(),yr=function(){return!Yr&&Ye.wake()},ne={},b_=/^[\d.\-M][\d.\-,\s]/,w_=/["']/g,T_=function(e){for(var n={},r=e.substr(1,e.length-3).split(":"),i=r[0],s=1,o=r.length,a,c,l;s<o;s++)c=r[s],a=s!==o-1?c.lastIndexOf(","):c.length,l=c.substr(0,a),n[i]=isNaN(l)?l.replace(w_,"").trim():+l,i=c.substr(a+1).trim();return n},E_=function(e){var n=e.indexOf("(")+1,r=e.indexOf(")"),i=e.indexOf("(",n);return e.substring(n,~i&&i<r?e.indexOf(")",r+1):r)},I_=function(e){var n=(e+"").split("("),r=ne[n[0]];return r&&n.length>1&&r.config?r.config.apply(null,~e.indexOf("{")?[T_(n[1])]:E_(e).split(",").map(of)):ne._CE&&b_.test(e)?ne._CE("",e):r},Tf=function(e){return function(n){return 1-e(1-n)}},Ef=function t(e,n){for(var r=e._first,i;r;)r instanceof je?t(r,n):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==n&&(r.timeline?t(r.timeline,n):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=n)),r=r._next},$n=function(e,n){return e&&(be(e)?e:ne[e]||I_(e))||n},Gn=function(e,n,r,i){r===void 0&&(r=function(c){return 1-n(1-c)}),i===void 0&&(i=function(c){return c<.5?n(c*2)/2:1-n((1-c)*2)/2});var s={easeIn:n,easeOut:r,easeInOut:i},o;return We(e,function(a){ne[a]=Ze[a]=s,ne[o=a.toLowerCase()]=r;for(var c in s)ne[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=ne[a+"."+c]=s[c]}),s},If=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},Os=function t(e,n,r){var i=n>=1?n:1,s=(r||(e?.3:.45))/(n<1?n:1),o=s/yo*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*Jg((u-o)*s)+1},c=e==="out"?a:e==="in"?function(l){return 1-a(1-l)}:If(a);return s=yo/s,c.config=function(l,u){return t(e,l,u)},c},xs=function t(e,n){n===void 0&&(n=1.70158);var r=function(o){return o?--o*o*((n+1)*o+n)+1:0},i=e==="out"?r:e==="in"?function(s){return 1-r(1-s)}:If(r);return i.config=function(s){return t(e,s)},i};We("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var n=e<5?e+1:e;Gn(t+",Power"+(n-1),e?function(r){return Math.pow(r,n)}:function(r){return r},function(r){return 1-Math.pow(1-r,n)},function(r){return r<.5?Math.pow(r*2,n)/2:1-Math.pow((1-r)*2,n)/2})});ne.Linear.easeNone=ne.none=ne.Linear.easeIn;Gn("Elastic",Os("in"),Os("out"),Os());(function(t,e){var n=1/e,r=2*n,i=2.5*n,s=function(a){return a<n?t*a*a:a<r?t*Math.pow(a-1.5/e,2)+.75:a<i?t*(a-=2.25/e)*a+.9375:t*Math.pow(a-2.625/e,2)+.984375};Gn("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Gn("Expo",function(t){return t?Math.pow(2,10*(t-1)):0});Gn("Circ",function(t){return-(qu(1-t*t)-1)});Gn("Sine",function(t){return t===1?1:-Xg(t*Gg)+1});Gn("Back",xs("in"),xs("out"),xs());ne.SteppedEase=ne.steps=Ze.SteppedEase={config:function(e,n){e===void 0&&(e=1);var r=1/e,i=e+(n?0:1),s=n?1:0,o=1-ue;return function(a){return((i*si(0,o,a)|0)+s)*r}}};gr.ease=ne["quad.out"];We("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return ma+=t+","+t+"Params,"});var Sf=function(e,n){this.id=Yg++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:rf,this.set=n?n.getSetter:Ta},vr=function(){function t(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,mr(this,+n.duration,1,1),this.data=n.data,Ee&&(this._ctx=Ee,Ee.data.push(this)),Yr||Ye.wake()}var e=t.prototype;return e.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},e.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},e.totalDuration=function(r){return arguments.length?(this._dirty=0,mr(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(r,i){if(yr(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(gs(this,r),!s._dp||s.parent||lf(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&It(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ue||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),sf(this,r,i)),this},e.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+Dc(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},e.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},e.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+Dc(this),i):this.duration()?Math.min(1,this._time/this._dur):this.ratio},e.iteration=function(r,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*s,i):this._repeat?_r(this._tTime,s)+1:1},e.timeScale=function(r){if(!arguments.length)return this._rts===-ue?0:this._rts;if(this._rts===r)return this;var i=this.parent&&this._ts?Vi(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-ue?0:this._rts,this.totalTime(si(-this._delay,this._tDur,i),!0),ps(this),i_(this)},e.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(yr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ue&&(this._tTime-=ue)))),this):this._ps},e.startTime=function(r){if(arguments.length){this._start=r;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&It(i,this,r-this._delay),this}return this._start},e.endTime=function(r){return this._start+(ze(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Vi(i.rawTime(r),this):this._tTime:this._tTime},e.revert=function(r){r===void 0&&(r=e_);var i=Ve;return Ve=r,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),Ve=i,this},e.globalTime=function(r){for(var i=this,s=arguments.length?r:i.rawTime();i;)s=i._start+s/(i._ts||1),i=i._dp;return!this.parent&&this.vars.immediateRender?-1:s},e.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,Mc(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,Mc(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},e.seek=function(r,i){return this.totalTime(nt(this,r),ze(i))},e.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,ze(i))},e.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},e.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-ue:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ue,this},e.isActive=function(){var r=this.parent||this._dp,i=this._start,s;return!!(!r||this._ts&&this._initted&&r.isActive()&&(s=r.rawTime(!0))>=i&&s<this.endTime(!0)-ue)},e.eventCallback=function(r,i,s){var o=this.vars;return arguments.length>1?(i?(o[r]=i,s&&(o[r+"Params"]=s),r==="onUpdate"&&(this._onUpdate=i)):delete o[r],this):o[r]},e.then=function(r){var i=this;return new Promise(function(s){var o=be(r)?r:af,a=function(){var l=i.then;i.then=null,be(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=l),s(o),i.then=l};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){xr(this)},t}();ut(vr.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ue,_prom:0,_ps:!1,_rts:1});var je=function(t){Ku(e,t);function e(r,i){var s;return r===void 0&&(r={}),s=t.call(this,r)||this,s.labels={},s.smoothChildTiming=!!r.smoothChildTiming,s.autoRemoveChildren=!!r.autoRemoveChildren,s._sort=ze(r.sortChildren),_e&&It(r.parent||_e,Lt(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),r.scrollTrigger&&uf(Lt(s),r.scrollTrigger),s}var n=e.prototype;return n.to=function(i,s,o){return Lr(0,arguments,this),this},n.from=function(i,s,o){return Lr(1,arguments,this),this},n.fromTo=function(i,s,o,a){return Lr(2,arguments,this),this},n.set=function(i,s,o){return s.duration=0,s.parent=this,Nr(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Se(i,s,nt(this,o),1),this},n.call=function(i,s,o){return It(this,Se.delayedCall(0,i,s),o)},n.staggerTo=function(i,s,o,a,c,l,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=l,o.onCompleteParams=u,o.parent=this,new Se(i,o,nt(this,c)),this},n.staggerFrom=function(i,s,o,a,c,l,u){return o.runBackwards=1,Nr(o).immediateRender=ze(o.immediateRender),this.staggerTo(i,s,o,a,c,l,u)},n.staggerFromTo=function(i,s,o,a,c,l,u,f){return a.startAt=o,Nr(a).immediateRender=ze(a.immediateRender),this.staggerTo(i,s,a,c,l,u,f)},n.render=function(i,s,o){var a=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:Re(i),f=this._zTime<0!=i<0&&(this._initted||!l),d,h,m,p,y,v,b,T,E,A,O,x;if(this!==_e&&u>c&&i>=0&&(u=c),u!==this._tTime||o||f){if(a!==this._time&&l&&(u+=this._time-a,i+=this._time-a),d=u,E=this._start,T=this._ts,v=!T,f&&(l||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(O=this._yoyo,y=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(y*100+i,s,o);if(d=Re(u%y),u===c?(p=this._repeat,d=l):(p=~~(u/y),p&&p===u/y&&(d=l,p--),d>l&&(d=l)),A=_r(this._tTime,y),!a&&this._tTime&&A!==p&&(A=p),O&&p&1&&(d=l-d,x=1),p!==A&&!this._lock){var S=O&&A&1,k=S===(O&&p&1);if(p<A&&(S=!S),a=S?0:l,this._lock=1,this.render(a||(x?0:Re(p*y)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&ct(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1),a&&a!==this._time||v!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,k&&(this._lock=2,a=S?l:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!v)return this;Ef(this,x)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=c_(this,Re(a),Re(d)),b&&(u-=d-(d=b._start))),this._tTime=u,this._time=d,this._act=!T,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&d&&!s&&(ct(this,"onStart"),this._tTime!==u))return this;if(d>=a&&i>=0)for(h=this._first;h;){if(m=h._next,(h._act||d>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(d-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(d-h._start)*h._ts,s,o),d!==this._time||!this._ts&&!v){b=0,m&&(u+=this._zTime=-ue);break}}h=m}else{h=this._last;for(var $=i<0?i:d;h;){if(m=h._prev,(h._act||$<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?($-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+($-h._start)*h._ts,s,o||Ve&&(h._initted||h._startAt)),d!==this._time||!this._ts&&!v){b=0,m&&(u+=this._zTime=$?-ue:ue);break}}h=m}}if(b&&!s&&(this.pause(),b.render(d>=a?0:-ue)._zTime=d>=a?1:-1,this._ts))return this._start=E,ps(this),this.render(i,s,o);this._onUpdate&&!s&&ct(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&a)&&(E===this._start||Math.abs(T)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&yn(this,1),!s&&!(i<0&&!a)&&(u||a||!c)&&(ct(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(i,s){var o=this;if(zt(s)||(s=nt(this,s,i)),!(i instanceof vr)){if(Me(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ae(i))return this.addLabel(i,s);if(be(i))i=Se.delayedCall(0,i);else return this}return this!==i?It(this,i,s):this},n.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ot);for(var c=[],l=this._first;l;)l._start>=a&&(l instanceof Se?s&&c.push(l):(o&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,o)))),l=l._next;return c},n.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},n.remove=function(i){return Ae(i)?this.removeLabel(i):be(i)?this.killTweensOf(i):(hs(this,i),i===this._recent&&(this._recent=this._last),Bn(this))},n.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Re(Ye.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),t.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},n.addLabel=function(i,s){return this.labels[i]=nt(this,s),this},n.removeLabel=function(i){return delete this.labels[i],this},n.addPause=function(i,s,o){var a=Se.delayedCall(0,s||qr,o);return a.data="isPause",this._hasPause=1,It(this,a,nt(this,i))},n.removePause=function(i){var s=this._first;for(i=nt(this,i);s;)s._start===i&&s.data==="isPause"&&yn(s),s=s._next},n.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),c=a.length;c--;)on!==a[c]&&a[c].kill(i,s);return this},n.getTweensOf=function(i,s){for(var o=[],a=at(i),c=this._first,l=zt(s),u;c;)c instanceof Se?t_(c._targets,a)&&(l?(!on||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&o.push(c):(u=c.getTweensOf(a,s)).length&&o.push.apply(o,u),c=c._next;return o},n.tweenTo=function(i,s){s=s||{};var o=this,a=nt(o,i),c=s,l=c.startAt,u=c.onStart,f=c.onStartParams,d=c.immediateRender,h,m=Se.to(o,ut({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale())||ue,onStart:function(){if(o.pause(),!h){var y=s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale());m._dur!==y&&mr(m,y,0,1).render(m._time,!0,!0),h=1}u&&u.apply(m,f||[])}},s));return d?m.render(0):m},n.tweenFromTo=function(i,s,o){return this.tweenTo(s,ut({startAt:{time:nt(this,i)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(i){return i===void 0&&(i=this._time),Nc(this,nt(this,i))},n.previousLabel=function(i){return i===void 0&&(i=this._time),Nc(this,nt(this,i),1)},n.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ue)},n.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,c=this.labels,l;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(l in c)c[l]>=o&&(c[l]+=i);return Bn(this)},n.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return t.prototype.invalidate.call(this,i)},n.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Bn(this)},n.totalDuration=function(i){var s=0,o=this,a=o._last,c=ot,l,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(f=o.parent;a;)l=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>c&&o._sort&&a._ts&&!o._lock?(o._lock=1,It(o,a,u-a._delay,1)._lock=0):c=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),c=0),a._end>s&&a._ts&&(s=a._end),a=l;mr(o,o===_e&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(_e._ts&&(sf(_e,Vi(i,_e)),nf=Ye.frame),Ye.frame>=Oc){Oc+=Je.autoSleep||120;var s=_e._first;if((!s||!s._ts)&&Je.autoSleep&&Ye._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ye.sleep()}}},e}(vr);ut(je.prototype,{_lock:0,_hasPause:0,_forcing:0});var S_=function(e,n,r,i,s,o,a){var c=new Ke(this._pt,e,n,0,1,Of,null,s),l=0,u=0,f,d,h,m,p,y,v,b;for(c.b=r,c.e=i,r+="",i+="",(v=~i.indexOf("random("))&&(i=Gr(i)),o&&(b=[r,i],o(b,e,n),r=b[0],i=b[1]),d=r.match(ks)||[];f=ks.exec(i);)m=f[0],p=i.substring(l,f.index),h?h=(h+1)%5:p.substr(-5)==="rgba("&&(h=1),m!==d[u++]&&(y=parseFloat(d[u-1])||0,c._pt={_next:c._pt,p:p||u===1?p:",",s:y,c:m.charAt(1)==="="?cr(y,m)-y:parseFloat(m)-y,m:h&&h<4?Math.round:0},l=ks.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=a,(Ju.test(i)||v)&&(c.e=0),this._pt=c,c},va=function(e,n,r,i,s,o,a,c,l,u){be(i)&&(i=i(s||0,e,o));var f=e[n],d=r!=="get"?r:be(f)?l?e[n.indexOf("set")||!be(e["get"+n.substr(3)])?n:"get"+n.substr(3)](l):e[n]():f,h=be(f)?l?P_:Rf:wa,m;if(Ae(i)&&(~i.indexOf("random(")&&(i=Gr(i)),i.charAt(1)==="="&&(m=cr(d,i)+(xe(d)||0),(m||m===0)&&(i=m))),!u||d!==i||Ao)return!isNaN(d*i)&&i!==""?(m=new Ke(this._pt,e,n,+d||0,i-(d||0),typeof f=="boolean"?x_:Pf,0,h),l&&(m.fp=l),a&&m.modifier(a,this,e),this._pt=m):(!f&&!(n in e)&&ga(n,i),S_.call(this,e,n,d,i,h,c||Je.stringFilter,l))},C_=function(e,n,r,i,s){if(be(e)&&(e=Fr(e,s,n,r,i)),!Pt(e)||e.style&&e.nodeType||Me(e)||Yu(e))return Ae(e)?Fr(e,s,n,r,i):e;var o={},a;for(a in e)o[a]=Fr(e[a],s,n,r,i);return o},Cf=function(e,n,r,i,s,o){var a,c,l,u;if(Ge[e]&&(a=new Ge[e]).init(s,a.rawVars?n[e]:C_(n[e],i,s,o,r),r,i,o)!==!1&&(r._pt=c=new Ke(r._pt,s,e,0,1,a.render,a,0,a.priority),r!==nr))for(l=r._ptLookup[r._targets.indexOf(s)],u=a._props.length;u--;)l[a._props[u]]=c;return a},on,Ao,ba=function t(e,n,r){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.onUpdateParams,f=i.callbackScope,d=i.runBackwards,h=i.yoyoEase,m=i.keyframes,p=i.autoRevert,y=e._dur,v=e._startAt,b=e._targets,T=e.parent,E=T&&T.data==="nested"?T.vars.targets:b,A=e._overwrite==="auto"&&!da,O=e.timeline,x,S,k,$,z,Q,ie,oe,ae,J,W,K,Ie;if(O&&(!m||!s)&&(s="none"),e._ease=$n(s,gr.ease),e._yEase=h?Tf($n(h===!0?s:h,gr.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!O&&!!i.runBackwards,!O||m&&!i.stagger){if(oe=b[0]?Un(b[0]).harness:0,K=oe&&i[oe.prop],x=ji(i,_a),v&&(v._zTime<0&&v.progress(1),n<0&&d&&a&&!p?v.render(-1,!0):v.revert(d&&y?Ai:Zg),v._lazy=0),o){if(yn(e._startAt=Se.set(b,ut({data:"isStart",overwrite:!1,parent:T,immediateRender:!0,lazy:ze(c),startAt:null,delay:0,onUpdate:l,onUpdateParams:u,callbackScope:f,stagger:0},o))),e._startAt._dp=0,n<0&&(Ve||!a&&!p)&&e._startAt.revert(Ai),a&&y&&n<=0&&r<=0){n&&(e._zTime=n);return}}else if(d&&y&&!v){if(n&&(a=!1),k=ut({overwrite:!1,data:"isFromStart",lazy:a&&ze(c),immediateRender:a,stagger:0,parent:T},x),K&&(k[oe.prop]=K),yn(e._startAt=Se.set(b,k)),e._startAt._dp=0,n<0&&(Ve?e._startAt.revert(Ai):e._startAt.render(-1,!0)),e._zTime=n,!a)t(e._startAt,ue,ue);else if(!n)return}for(e._pt=e._ptCache=0,c=y&&ze(c)||c&&!y,S=0;S<b.length;S++){if(z=b[S],ie=z._gsap||ya(b)[S]._gsap,e._ptLookup[S]=J={},wo[ie.id]&&dn.length&&Hi(),W=E===b?S:E.indexOf(z),oe&&(ae=new oe).init(z,K||x,e,W,E)!==!1&&(e._pt=$=new Ke(e._pt,z,ae.name,0,1,ae.render,ae,0,ae.priority),ae._props.forEach(function(Fe){J[Fe]=$}),ae.priority&&(Q=1)),!oe||K)for(k in x)Ge[k]&&(ae=Cf(k,x,e,W,z,E))?ae.priority&&(Q=1):J[k]=$=va.call(e,z,k,"get",x[k],W,E,0,i.stringFilter);e._op&&e._op[S]&&e.kill(z,e._op[S]),A&&e._pt&&(on=e,_e.killTweensOf(z,J,e.globalTime(n)),Ie=!e.parent,on=0),e._pt&&c&&(wo[ie.id]=1)}Q&&xf(e),e._onInit&&e._onInit(e)}e._onUpdate=l,e._initted=(!e._op||e._pt)&&!Ie,m&&n<=0&&O.render(ot,!0,!0)},A_=function(e,n,r,i,s,o,a){var c=(e._pt&&e._ptCache||(e._ptCache={}))[n],l,u,f,d;if(!c)for(c=e._ptCache[n]=[],f=e._ptLookup,d=e._targets.length;d--;){if(l=f[d][n],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==n&&l.fp!==n;)l=l._next;if(!l)return Ao=1,e.vars[n]="+=0",ba(e,a),Ao=0,1;c.push(l)}for(d=c.length;d--;)u=c[d],l=u._pt||u,l.s=(i||i===0)&&!s?i:l.s+(i||0)+o*l.c,l.c=r-l.s,u.e&&(u.e=we(r)+xe(u.e)),u.b&&(u.b=l.s+xe(u.b))},k_=function(e,n){var r=e[0]?Un(e[0]).harness:0,i=r&&r.aliases,s,o,a,c;if(!i)return n;s=jn({},n);for(o in i)if(o in s)for(c=i[o].split(","),a=c.length;a--;)s[c[a]]=s[o];return s},R_=function(e,n,r,i){var s=n.ease||i||"power1.inOut",o,a;if(Me(n))a=r[e]||(r[e]=[]),n.forEach(function(c,l){return a.push({t:l/(n.length-1)*100,v:c,e:s})});else for(o in n)a=r[o]||(r[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:n[o],e:s})},Fr=function(e,n,r,i,s){return be(e)?e.call(n,r,i,s):Ae(e)&&~e.indexOf("random(")?Gr(e):e},Af=ma+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",kf={};We(Af+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return kf[t]=1});var Se=function(t){Ku(e,t);function e(r,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=t.call(this,o?i:Nr(i))||this;var c=a.vars,l=c.duration,u=c.delay,f=c.immediateRender,d=c.stagger,h=c.overwrite,m=c.keyframes,p=c.defaults,y=c.scrollTrigger,v=c.yoyoEase,b=i.parent||_e,T=(Me(r)||Yu(r)?zt(r[0]):"length"in i)?[r]:at(r),E,A,O,x,S,k,$,z;if(a._targets=T.length?ya(T):$i("GSAP target "+r+" not found. https://greensock.com",!Je.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,m||d||vi(l)||vi(u)){if(i=a.vars,E=a.timeline=new je({data:"nested",defaults:p||{},targets:b&&b.data==="nested"?b.vars.targets:T}),E.kill(),E.parent=E._dp=Lt(a),E._start=0,d||vi(l)||vi(u)){if(x=T.length,$=d&&pf(d),Pt(d))for(S in d)~Af.indexOf(S)&&(z||(z={}),z[S]=d[S]);for(A=0;A<x;A++)O=ji(i,kf),O.stagger=0,v&&(O.yoyoEase=v),z&&jn(O,z),k=T[A],O.duration=+Fr(l,Lt(a),A,k,T),O.delay=(+Fr(u,Lt(a),A,k,T)||0)-a._delay,!d&&x===1&&O.delay&&(a._delay=u=O.delay,a._start+=u,O.delay=0),E.to(k,O,$?$(A,k,T):0),E._ease=ne.none;E.duration()?l=u=0:a.timeline=0}else if(m){Nr(ut(E.vars.defaults,{ease:"none"})),E._ease=$n(m.ease||i.ease||"none");var Q=0,ie,oe,ae;if(Me(m))m.forEach(function(J){return E.to(T,J,">")}),E.duration();else{O={};for(S in m)S==="ease"||S==="easeEach"||R_(S,m[S],O,m.easeEach);for(S in O)for(ie=O[S].sort(function(J,W){return J.t-W.t}),Q=0,A=0;A<ie.length;A++)oe=ie[A],ae={ease:oe.e,duration:(oe.t-(A?ie[A-1].t:0))/100*l},ae[S]=oe.v,E.to(T,ae,Q),Q+=ae.duration;E.duration()<l&&E.to({},{duration:l-E.duration()})}}l||a.duration(l=E.duration())}else a.timeline=0;return h===!0&&!da&&(on=Lt(a),_e.killTweensOf(T),on=0),It(b,Lt(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(f||!l&&!m&&a._start===Re(b._time)&&ze(f)&&s_(Lt(a))&&b.data!=="nested")&&(a._tTime=-ue,a.render(Math.max(0,-u)||0)),y&&uf(Lt(a),y),a}var n=e.prototype;return n.render=function(i,s,o){var a=this._time,c=this._tDur,l=this._dur,u=i<0,f=i>c-ue&&!u?c:i<ue?0:i,d,h,m,p,y,v,b,T,E;if(!l)a_(this,i,s,o);else if(f!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(d=f,T=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+i,s,o);if(d=Re(f%p),f===c?(m=this._repeat,d=l):(m=~~(f/p),m&&m===f/p&&(d=l,m--),d>l&&(d=l)),v=this._yoyo&&m&1,v&&(E=this._yEase,d=l-d),y=_r(this._tTime,p),d===a&&!o&&this._initted)return this._tTime=f,this;m!==y&&(T&&this._yEase&&Ef(T,v),this.vars.repeatRefresh&&!v&&!this._lock&&(this._lock=o=1,this.render(Re(p*m),!0).invalidate()._lock=0))}if(!this._initted){if(ff(this,u?i:d,o,s,f))return this._tTime=0,this;if(a!==this._time)return this;if(l!==this._dur)return this.render(i,s,o)}if(this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(E||this._ease)(d/l),this._from&&(this.ratio=b=1-b),d&&!a&&!s&&(ct(this,"onStart"),this._tTime!==f))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;T&&T.render(i<0?i:!d&&v?-ue:T._dur*T._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&To(this,i,s,o),ct(this,"onUpdate")),this._repeat&&m!==y&&this.vars.onRepeat&&!s&&this.parent&&ct(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&To(this,i,!0,!0),(i||!l)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&yn(this,1),!s&&!(u&&!a)&&(f||a||v)&&(ct(this,f===c?"onComplete":"onReverseComplete",!0),this._prom&&!(f<c&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),t.prototype.invalidate.call(this,i)},n.resetTo=function(i,s,o,a){Yr||Ye.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),l;return this._initted||ba(this,c),l=this._ease(c/this._dur),A_(this,i,s,o,a,l,c)?this.resetTo(i,s,o,a):(gs(this,0),this.parent||cf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?xr(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,on&&on.vars.overwrite!==!0)._first||xr(this),this.parent&&o!==this.timeline.totalDuration()&&mr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,c=i?at(i):a,l=this._ptLookup,u=this._pt,f,d,h,m,p,y,v;if((!s||s==="all")&&r_(a,c))return s==="all"&&(this._pt=0),xr(this);for(f=this._op=this._op||[],s!=="all"&&(Ae(s)&&(p={},We(s,function(b){return p[b]=1}),s=p),s=k_(a,s)),v=a.length;v--;)if(~c.indexOf(a[v])){d=l[v],s==="all"?(f[v]=s,m=d,h={}):(h=f[v]=f[v]||{},m=s);for(p in m)y=d&&d[p],y&&((!("kill"in y.d)||y.d.kill(p)===!0)&&hs(this,y,"_pt"),delete d[p]),h!=="all"&&(h[p]=1)}return this._initted&&!this._pt&&u&&xr(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Lr(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Lr(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return _e.killTweensOf(i,s,o)},e}(vr);ut(Se.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});We("staggerTo,staggerFrom,staggerFromTo",function(t){Se[t]=function(){var e=new je,n=Io.call(arguments,0);return n.splice(t==="staggerFromTo"?5:4,0,0),e[t].apply(e,n)}});var wa=function(e,n,r){return e[n]=r},Rf=function(e,n,r){return e[n](r)},P_=function(e,n,r,i){return e[n](i.fp,r)},O_=function(e,n,r){return e.setAttribute(n,r)},Ta=function(e,n){return be(e[n])?Rf:ha(e[n])&&e.setAttribute?O_:wa},Pf=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},x_=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},Of=function(e,n){var r=n._pt,i="";if(!e&&n.b)i=n.b;else if(e===1&&n.e)i=n.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*e):Math.round((r.s+r.c*e)*1e4)/1e4)+i,r=r._next;i+=n.c}n.set(n.t,n.p,i,n)},Ea=function(e,n){for(var r=n._pt;r;)r.r(e,r.d),r=r._next},D_=function(e,n,r,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,n,r),s=o},M_=function(e){for(var n=this._pt,r,i;n;)i=n._next,n.p===e&&!n.op||n.op===e?hs(this,n,"_pt"):n.dep||(r=1),n=i;return!r},N_=function(e,n,r,i){i.mSet(e,n,i.m.call(i.tween,r,i.mt),i)},xf=function(e){for(var n=e._pt,r,i,s,o;n;){for(r=n._next,i=s;i&&i.pr>n.pr;)i=i._next;(n._prev=i?i._prev:o)?n._prev._next=n:s=n,(n._next=i)?i._prev=n:o=n,n=r}e._pt=s},Ke=function(){function t(n,r,i,s,o,a,c,l,u){this.t=r,this.s=s,this.c=o,this.p=i,this.r=a||Pf,this.d=c||this,this.set=l||wa,this.pr=u||0,this._next=n,n&&(n._prev=this)}var e=t.prototype;return e.modifier=function(r,i,s){this.mSet=this.mSet||this.set,this.set=N_,this.m=r,this.mt=s,this.tween=i},t}();We(ma+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return _a[t]=1});Ze.TweenMax=Ze.TweenLite=Se;Ze.TimelineLite=Ze.TimelineMax=je;_e=new je({sortChildren:!1,defaults:gr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Je.stringFilter=wf;var br=[],Ri={},L_=[],Fc=0,Ds=function(e){return(Ri[e]||L_).map(function(n){return n()})},ko=function(){var e=Date.now(),n=[];e-Fc>2&&(Ds("matchMediaInit"),br.forEach(function(r){var i=r.queries,s=r.conditions,o,a,c,l;for(a in i)o=rt.matchMedia(i[a]).matches,o&&(c=1),o!==s[a]&&(s[a]=o,l=1);l&&(r.revert(),c&&n.push(r))}),Ds("matchMediaRevert"),n.forEach(function(r){return r.onMatch(r)}),Fc=e,Ds("matchMedia"))},Df=function(){function t(n,r){this.selector=r&&So(r),this.data=[],this._r=[],this.isReverted=!1,n&&this.add(n)}var e=t.prototype;return e.add=function(r,i,s){be(r)&&(s=i,i=r,r=be);var o=this,a=function(){var l=Ee,u=o.selector,f;return l&&l!==o&&l.data.push(o),s&&(o.selector=So(s)),Ee=o,f=i.apply(o,arguments),be(f)&&o._r.push(f),Ee=l,o.selector=u,o.isReverted=!1,f};return o.last=a,r===be?a(o):r?o[r]=a:a},e.ignore=function(r){var i=Ee;Ee=null,r(this),Ee=i},e.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof t?r.push.apply(r,i.getTweens()):i instanceof Se&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(r,i){var s=this;if(r){var o=this.getTweens();this.data.forEach(function(c){c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(l){return o.splice(o.indexOf(l),1)}))}),o.map(function(c){return{g:c.globalTime(0),t:c}}).sort(function(c,l){return l.g-c.g||-1}).forEach(function(c){return c.t.revert(r)}),this.data.forEach(function(c){return!(c instanceof vr)&&c.revert&&c.revert(r)}),this._r.forEach(function(c){return c(r,s)}),this.isReverted=!0}else this.data.forEach(function(c){return c.kill&&c.kill()});if(this.clear(),i){var a=br.indexOf(this);~a&&br.splice(a,1)}},e.revert=function(r){this.kill(r||{})},t}(),F_=function(){function t(n){this.contexts=[],this.scope=n}var e=t.prototype;return e.add=function(r,i,s){Pt(r)||(r={matches:r});var o=new Df(0,s||this.scope),a=o.conditions={},c,l,u;this.contexts.push(o),i=o.add("onMatch",i),o.queries=r;for(l in r)l==="all"?u=1:(c=rt.matchMedia(r[l]),c&&(br.indexOf(o)<0&&br.push(o),(a[l]=c.matches)&&(u=1),c.addListener?c.addListener(ko):c.addEventListener("change",ko)));return u&&i(o),this},e.revert=function(r){this.kill(r||{})},e.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},t}(),zi={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];n.forEach(function(i){return y_(i)})},timeline:function(e){return new je(e)},getTweensOf:function(e,n){return _e.getTweensOf(e,n)},getProperty:function(e,n,r,i){Ae(e)&&(e=at(e)[0]);var s=Un(e||{}).get,o=r?af:of;return r==="native"&&(r=""),e&&(n?o((Ge[n]&&Ge[n].get||s)(e,n,r,i)):function(a,c,l){return o((Ge[a]&&Ge[a].get||s)(e,a,c,l))})},quickSetter:function(e,n,r){if(e=at(e),e.length>1){var i=e.map(function(u){return et.quickSetter(u,n,r)}),s=i.length;return function(u){for(var f=s;f--;)i[f](u)}}e=e[0]||{};var o=Ge[n],a=Un(e),c=a.harness&&(a.harness.aliases||{})[n]||n,l=o?function(u){var f=new o;nr._pt=0,f.init(e,r?u+r:u,nr,0,[e]),f.render(1,f),nr._pt&&Ea(1,nr)}:a.set(e,c);return o?l:function(u){return l(e,c,r?u+r:u,a,1)}},quickTo:function(e,n,r){var i,s=et.to(e,jn((i={},i[n]="+=0.1",i.paused=!0,i),r||{})),o=function(c,l,u){return s.resetTo(n,c,l,u)};return o.tween=s,o},isTweening:function(e){return _e.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=$n(e.ease,gr.ease)),xc(gr,e||{})},config:function(e){return xc(Je,e||{})},registerEffect:function(e){var n=e.name,r=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Ge[a]&&!Ze[a]&&$i(n+" effect requires "+a+" plugin.")}),Rs[n]=function(a,c,l){return r(at(a),ut(c||{},s),l)},o&&(je.prototype[n]=function(a,c,l){return this.add(Rs[n](a,Pt(c)?c:(l=c)&&{},this),l)})},registerEase:function(e,n){ne[e]=$n(n)},parseEase:function(e,n){return arguments.length?$n(e,n):ne},getById:function(e){return _e.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var r=new je(e),i,s;for(r.smoothChildTiming=ze(e.smoothChildTiming),_e.remove(r),r._dp=0,r._time=r._tTime=_e._time,i=_e._first;i;)s=i._next,(n||!(!i._dur&&i instanceof Se&&i.vars.onComplete===i._targets[0]))&&It(r,i,i._start-i._delay),i=s;return It(_e,r,0),r},context:function(e,n){return e?new Df(e,n):Ee},matchMedia:function(e){return new F_(e)},matchMediaRefresh:function(){return br.forEach(function(e){var n=e.conditions,r,i;for(i in n)n[i]&&(n[i]=!1,r=1);r&&e.revert()})||ko()},addEventListener:function(e,n){var r=Ri[e]||(Ri[e]=[]);~r.indexOf(n)||r.push(n)},removeEventListener:function(e,n){var r=Ri[e],i=r&&r.indexOf(n);i>=0&&r.splice(i,1)},utils:{wrap:g_,wrapYoyo:__,distribute:pf,random:_f,snap:gf,normalize:p_,getUnit:xe,clamp:u_,splitColor:vf,toArray:at,selector:So,mapRange:yf,pipe:d_,unitize:h_,interpolate:m_,shuffle:hf},install:ef,effects:Rs,ticker:Ye,updateRoot:je.updateRoot,plugins:Ge,globalTimeline:_e,core:{PropTween:Ke,globals:tf,Tween:Se,Timeline:je,Animation:vr,getCache:Un,_removeLinkedListItem:hs,reverting:function(){return Ve},context:function(e){return e&&Ee&&(Ee.data.push(e),e._ctx=Ee),Ee},suppressOverwrites:function(e){return da=e}}};We("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return zi[t]=Se[t]});Ye.add(je.updateRoot);nr=zi.to({},{duration:0});var U_=function(e,n){for(var r=e._pt;r&&r.p!==n&&r.op!==n&&r.fp!==n;)r=r._next;return r},B_=function(e,n){var r=e._targets,i,s,o;for(i in n)for(s=r.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=U_(o,i)),o&&o.modifier&&o.modifier(n[i],e,r[s],i))},Ms=function(e,n){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var c,l;if(Ae(s)&&(c={},We(s,function(u){return c[u]=1}),s=c),n){c={};for(l in s)c[l]=n(s[l]);s=c}B_(a,s)}}}},et=zi.registerPlugin({name:"attr",init:function(e,n,r,i,s){var o,a,c;this.tween=r;for(o in n)c=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(c||0)+"",n[o],i,s,0,0,o),a.op=o,a.b=c,this._props.push(o)},render:function(e,n){for(var r=n._pt;r;)Ve?r.set(r.t,r.p,r.b,r):r.r(e,r.d),r=r._next}},{name:"endArray",init:function(e,n){for(var r=n.length;r--;)this.add(e,r,e[r]||0,n[r],0,0,0,0,0,1)}},Ms("roundProps",Co),Ms("modifiers"),Ms("snap",gf))||zi;Se.version=je.version=et.version="3.11.3";Zu=1;Gu()&&yr();ne.Power0;ne.Power1;ne.Power2;ne.Power3;ne.Power4;ne.Linear;ne.Quad;ne.Cubic;ne.Quart;ne.Quint;ne.Strong;ne.Elastic;ne.Back;ne.SteppedEase;ne.Bounce;ne.Sine;ne.Expo;ne.Circ;/*!
 * CSSPlugin 3.11.3
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Uc,an,lr,Ia,Dn,Bc,Sa,$_=function(){return typeof window<"u"},Wt={},An=180/Math.PI,ur=Math.PI/180,Jn=Math.atan2,$c=1e8,Ca=/([A-Z])/g,H_=/(left|right|width|margin|padding|x)/i,j_=/[\s,\(]\S/,Bt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ro=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},V_=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},z_=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},W_=function(e,n){var r=n.s+n.c*e;n.set(n.t,n.p,~~(r+(r<0?-.5:.5))+n.u,n)},Mf=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},Nf=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},K_=function(e,n,r){return e.style[n]=r},q_=function(e,n,r){return e.style.setProperty(n,r)},G_=function(e,n,r){return e._gsap[n]=r},Y_=function(e,n,r){return e._gsap.scaleX=e._gsap.scaleY=r},X_=function(e,n,r,i,s){var o=e._gsap;o.scaleX=o.scaleY=r,o.renderTransform(s,o)},J_=function(e,n,r,i,s){var o=e._gsap;o[n]=r,o.renderTransform(s,o)},me="transform",_t=me+"Origin",Q_=function(e,n){var r=this,i=this.target,s=i.style;if(e in Wt){if(this.tfm=this.tfm||{},e!=="transform"&&(e=Bt[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return r.tfm[o]=Ut(i,o)}):this.tfm[e]=i._gsap.x?i._gsap[e]:Ut(i,e)),this.props.indexOf(me)>=0)return;i._gsap.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(_t,n,"")),e=me}(s||n)&&this.props.push(e,n,s[e])},Lf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Z_=function(){var e=this.props,n=this.target,r=n.style,i=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?n[e[s]]=e[s+2]:e[s+2]?r[e[s]]=e[s+2]:r.removeProperty(e[s].replace(Ca,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=Sa(),s&&!s.isStart&&!r[me]&&(Lf(r),i.uncache=1)}},Ff=function(e,n){var r={target:e,props:[],revert:Z_,save:Q_};return n&&n.split(",").forEach(function(i){return r.save(i)}),r},Uf,Po=function(e,n){var r=an.createElementNS?an.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):an.createElement(e);return r.style?r:an.createElement(e)},St=function t(e,n,r){var i=getComputedStyle(e);return i[n]||i.getPropertyValue(n.replace(Ca,"-$1").toLowerCase())||i.getPropertyValue(n)||!r&&t(e,wr(n)||n,1)||""},Hc="O,Moz,ms,Ms,Webkit".split(","),wr=function(e,n,r){var i=n||Dn,s=i.style,o=5;if(e in s&&!r)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Hc[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Hc[o]:"")+e},Oo=function(){$_()&&window.document&&(Uc=window,an=Uc.document,lr=an.documentElement,Dn=Po("div")||{style:{}},Po("div"),me=wr(me),_t=me+"Origin",Dn.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Uf=!!wr("perspective"),Sa=et.core.reverting,Ia=1)},Ns=function t(e){var n=Po("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(lr.appendChild(n),n.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=t}catch{}else this._gsapBBox&&(o=this._gsapBBox());return r&&(i?r.insertBefore(this,i):r.appendChild(this)),lr.removeChild(n),this.style.cssText=s,o},jc=function(e,n){for(var r=n.length;r--;)if(e.hasAttribute(n[r]))return e.getAttribute(n[r])},Bf=function(e){var n;try{n=e.getBBox()}catch{n=Ns.call(e,!0)}return n&&(n.width||n.height)||e.getBBox===Ns||(n=Ns.call(e,!0)),n&&!n.width&&!n.x&&!n.y?{x:+jc(e,["x","cx","x1"])||0,y:+jc(e,["y","cy","y1"])||0,width:0,height:0}:n},$f=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Bf(e))},Xr=function(e,n){if(n){var r=e.style;n in Wt&&n!==_t&&(n=me),r.removeProperty?((n.substr(0,2)==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),r.removeProperty(n.replace(Ca,"-$1").toLowerCase())):r.removeAttribute(n)}},cn=function(e,n,r,i,s,o){var a=new Ke(e._pt,n,r,0,1,o?Nf:Mf);return e._pt=a,a.b=i,a.e=s,e._props.push(r),a},Vc={deg:1,rad:1,turn:1},em={grid:1,flex:1},vn=function t(e,n,r,i){var s=parseFloat(r)||0,o=(r+"").trim().substr((s+"").length)||"px",a=Dn.style,c=H_.test(n),l=e.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),f=100,d=i==="px",h=i==="%",m,p,y,v;return i===o||!s||Vc[i]||Vc[o]?s:(o!=="px"&&!d&&(s=t(e,n,r,"px")),v=e.getCTM&&$f(e),(h||o==="%")&&(Wt[n]||~n.indexOf("adius"))?(m=v?e.getBBox()[c?"width":"height"]:e[u],we(h?s/m*f:s/100*m)):(a[c?"width":"height"]=f+(d?o:i),p=~n.indexOf("adius")||i==="em"&&e.appendChild&&!l?e:e.parentNode,v&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===an||!p.appendChild)&&(p=an.body),y=p._gsap,y&&h&&y.width&&c&&y.time===Ye.time&&!y.uncache?we(s/y.width*f):((h||o==="%")&&!em[St(p,"display")]&&(a.position=St(e,"position")),p===e&&(a.position="static"),p.appendChild(Dn),m=Dn[u],p.removeChild(Dn),a.position="absolute",c&&h&&(y=Un(p),y.time=Ye.time,y.width=p[u]),we(d?m*s/f:m&&s?f/m*s:0))))},Ut=function(e,n,r,i){var s;return Ia||Oo(),n in Bt&&n!=="transform"&&(n=Bt[n],~n.indexOf(",")&&(n=n.split(",")[0])),Wt[n]&&n!=="transform"?(s=Qr(e,i),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:Ki(St(e,_t))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Wi[n]&&Wi[n](e,n,r)||St(e,n)||rf(e,n)||(n==="opacity"?1:0))),r&&!~(s+"").trim().indexOf(" ")?vn(e,n,s,r)+r:s},tm=function(e,n,r,i){if(!r||r==="none"){var s=wr(n,e,1),o=s&&St(e,s,1);o&&o!==r?(n=s,r=o):n==="borderColor"&&(r=St(e,"borderTopColor"))}var a=new Ke(this._pt,e.style,n,0,1,Of),c=0,l=0,u,f,d,h,m,p,y,v,b,T,E,A;if(a.b=r,a.e=i,r+="",i+="",i==="auto"&&(e.style[n]=i,i=St(e,n)||i,e.style[n]=r),u=[r,i],wf(u),r=u[0],i=u[1],d=r.match(tr)||[],A=i.match(tr)||[],A.length){for(;f=tr.exec(i);)y=f[0],b=i.substring(c,f.index),m?m=(m+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(m=1),y!==(p=d[l++]||"")&&(h=parseFloat(p)||0,E=p.substr((h+"").length),y.charAt(1)==="="&&(y=cr(h,y)+E),v=parseFloat(y),T=y.substr((v+"").length),c=tr.lastIndex-T.length,T||(T=T||Je.units[n]||E,c===i.length&&(i+=T,a.e+=T)),E!==T&&(h=vn(e,n,p,T)||0),a._pt={_next:a._pt,p:b||l===1?b:",",s:h,c:v-h,m:m&&m<4||n==="zIndex"?Math.round:0});a.c=c<i.length?i.substring(c,i.length):""}else a.r=n==="display"&&i==="none"?Nf:Mf;return Ju.test(i)&&(a.e=0),this._pt=a,a},zc={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},nm=function(e){var n=e.split(" "),r=n[0],i=n[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(e=r,r=i,i=e),n[0]=zc[r]||r,n[1]=zc[i]||i,n.join(" ")},rm=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var r=n.t,i=r.style,s=n.u,o=r._gsap,a,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)a=s[l],Wt[a]&&(c=1,a=a==="transformOrigin"?_t:me),Xr(r,a);c&&(Xr(r,me),o&&(o.svg&&r.removeAttribute("transform"),Qr(r,1),o.uncache=1,Lf(i)))}},Wi={clearProps:function(e,n,r,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Ke(e._pt,n,r,0,0,rm);return o.u=i,o.pr=-10,o.tween=s,e._props.push(r),1}}},Jr=[1,0,0,1,0,0],Hf={},jf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Wc=function(e){var n=St(e,me);return jf(n)?Jr:n.substr(7).match(Xu).map(we)},Aa=function(e,n){var r=e._gsap||Un(e),i=e.style,s=Wc(e),o,a,c,l;return r.svg&&e.getAttribute("transform")?(c=e.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?Jr:s):(s===Jr&&!e.offsetParent&&e!==lr&&!r.svg&&(c=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(l=1,a=e.nextElementSibling,lr.appendChild(e)),s=Wc(e),c?i.display=c:Xr(e,"display"),l&&(a?o.insertBefore(e,a):o?o.appendChild(e):lr.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},xo=function(e,n,r,i,s,o){var a=e._gsap,c=s||Aa(e,!0),l=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,d=a.yOffset||0,h=c[0],m=c[1],p=c[2],y=c[3],v=c[4],b=c[5],T=n.split(" "),E=parseFloat(T[0])||0,A=parseFloat(T[1])||0,O,x,S,k;r?c!==Jr&&(x=h*y-m*p)&&(S=E*(y/x)+A*(-p/x)+(p*b-y*v)/x,k=E*(-m/x)+A*(h/x)-(h*b-m*v)/x,E=S,A=k):(O=Bf(e),E=O.x+(~T[0].indexOf("%")?E/100*O.width:E),A=O.y+(~(T[1]||T[0]).indexOf("%")?A/100*O.height:A)),i||i!==!1&&a.smooth?(v=E-l,b=A-u,a.xOffset=f+(v*h+b*p)-v,a.yOffset=d+(v*m+b*y)-b):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=A,a.smooth=!!i,a.origin=n,a.originIsAbsolute=!!r,e.style[_t]="0px 0px",o&&(cn(o,a,"xOrigin",l,E),cn(o,a,"yOrigin",u,A),cn(o,a,"xOffset",f,a.xOffset),cn(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",E+" "+A)},Qr=function(e,n){var r=e._gsap||new Sf(e);if("x"in r&&!n&&!r.uncache)return r;var i=e.style,s=r.scaleX<0,o="px",a="deg",c=getComputedStyle(e),l=St(e,_t)||"0",u,f,d,h,m,p,y,v,b,T,E,A,O,x,S,k,$,z,Q,ie,oe,ae,J,W,K,Ie,Fe,ke,ve,Dt,$e,C;return u=f=d=p=y=v=b=T=E=0,h=m=1,r.svg=!!(e.getCTM&&$f(e)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[me]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[me]!=="none"?c[me]:"")),i.scale=i.rotate=i.translate="none"),x=Aa(e,r.svg),r.svg&&(r.uncache?(K=e.getBBox(),l=r.xOrigin-K.x+"px "+(r.yOrigin-K.y)+"px",W=""):W=!n&&e.getAttribute("data-svg-origin"),xo(e,W||l,!!W||r.originIsAbsolute,r.smooth!==!1,x)),A=r.xOrigin||0,O=r.yOrigin||0,x!==Jr&&(z=x[0],Q=x[1],ie=x[2],oe=x[3],u=ae=x[4],f=J=x[5],x.length===6?(h=Math.sqrt(z*z+Q*Q),m=Math.sqrt(oe*oe+ie*ie),p=z||Q?Jn(Q,z)*An:0,b=ie||oe?Jn(ie,oe)*An+p:0,b&&(m*=Math.abs(Math.cos(b*ur))),r.svg&&(u-=A-(A*z+O*ie),f-=O-(A*Q+O*oe))):(C=x[6],Dt=x[7],Fe=x[8],ke=x[9],ve=x[10],$e=x[11],u=x[12],f=x[13],d=x[14],S=Jn(C,ve),y=S*An,S&&(k=Math.cos(-S),$=Math.sin(-S),W=ae*k+Fe*$,K=J*k+ke*$,Ie=C*k+ve*$,Fe=ae*-$+Fe*k,ke=J*-$+ke*k,ve=C*-$+ve*k,$e=Dt*-$+$e*k,ae=W,J=K,C=Ie),S=Jn(-ie,ve),v=S*An,S&&(k=Math.cos(-S),$=Math.sin(-S),W=z*k-Fe*$,K=Q*k-ke*$,Ie=ie*k-ve*$,$e=oe*$+$e*k,z=W,Q=K,ie=Ie),S=Jn(Q,z),p=S*An,S&&(k=Math.cos(S),$=Math.sin(S),W=z*k+Q*$,K=ae*k+J*$,Q=Q*k-z*$,J=J*k-ae*$,z=W,ae=K),y&&Math.abs(y)+Math.abs(p)>359.9&&(y=p=0,v=180-v),h=we(Math.sqrt(z*z+Q*Q+ie*ie)),m=we(Math.sqrt(J*J+C*C)),S=Jn(ae,J),b=Math.abs(S)>2e-4?S*An:0,E=$e?1/($e<0?-$e:$e):0),r.svg&&(W=e.getAttribute("transform"),r.forceCSS=e.setAttribute("transform","")||!jf(St(e,me)),W&&e.setAttribute("transform",W))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=p<=0?180:-180,p+=p<=0?180:-180):(m*=-1,b+=b<=0?180:-180)),n=n||r.uncache,r.x=u-((r.xPercent=u&&(!n&&r.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*r.xPercent/100:0)+o,r.y=f-((r.yPercent=f&&(!n&&r.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*r.yPercent/100:0)+o,r.z=d+o,r.scaleX=we(h),r.scaleY=we(m),r.rotation=we(p)+a,r.rotationX=we(y)+a,r.rotationY=we(v)+a,r.skewX=b+a,r.skewY=T+a,r.transformPerspective=E+o,(r.zOrigin=parseFloat(l.split(" ")[2])||0)&&(i[_t]=Ki(l)),r.xOffset=r.yOffset=0,r.force3D=Je.force3D,r.renderTransform=r.svg?sm:Uf?Vf:im,r.uncache=0,r},Ki=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ls=function(e,n,r){var i=xe(n);return we(parseFloat(n)+parseFloat(vn(e,"x",r+"px",i)))+i},im=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,Vf(e,n)},In="0deg",Rr="0px",Sn=") ",Vf=function(e,n){var r=n||this,i=r.xPercent,s=r.yPercent,o=r.x,a=r.y,c=r.z,l=r.rotation,u=r.rotationY,f=r.rotationX,d=r.skewX,h=r.skewY,m=r.scaleX,p=r.scaleY,y=r.transformPerspective,v=r.force3D,b=r.target,T=r.zOrigin,E="",A=v==="auto"&&e&&e!==1||v===!0;if(T&&(f!==In||u!==In)){var O=parseFloat(u)*ur,x=Math.sin(O),S=Math.cos(O),k;O=parseFloat(f)*ur,k=Math.cos(O),o=Ls(b,o,x*k*-T),a=Ls(b,a,-Math.sin(O)*-T),c=Ls(b,c,S*k*-T+T)}y!==Rr&&(E+="perspective("+y+Sn),(i||s)&&(E+="translate("+i+"%, "+s+"%) "),(A||o!==Rr||a!==Rr||c!==Rr)&&(E+=c!==Rr||A?"translate3d("+o+", "+a+", "+c+") ":"translate("+o+", "+a+Sn),l!==In&&(E+="rotate("+l+Sn),u!==In&&(E+="rotateY("+u+Sn),f!==In&&(E+="rotateX("+f+Sn),(d!==In||h!==In)&&(E+="skew("+d+", "+h+Sn),(m!==1||p!==1)&&(E+="scale("+m+", "+p+Sn),b.style[me]=E||"translate(0, 0)"},sm=function(e,n){var r=n||this,i=r.xPercent,s=r.yPercent,o=r.x,a=r.y,c=r.rotation,l=r.skewX,u=r.skewY,f=r.scaleX,d=r.scaleY,h=r.target,m=r.xOrigin,p=r.yOrigin,y=r.xOffset,v=r.yOffset,b=r.forceCSS,T=parseFloat(o),E=parseFloat(a),A,O,x,S,k;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=ur,l*=ur,A=Math.cos(c)*f,O=Math.sin(c)*f,x=Math.sin(c-l)*-d,S=Math.cos(c-l)*d,l&&(u*=ur,k=Math.tan(l-u),k=Math.sqrt(1+k*k),x*=k,S*=k,u&&(k=Math.tan(u),k=Math.sqrt(1+k*k),A*=k,O*=k)),A=we(A),O=we(O),x=we(x),S=we(S)):(A=f,S=d,O=x=0),(T&&!~(o+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(T=vn(h,"x",o,"px"),E=vn(h,"y",a,"px")),(m||p||y||v)&&(T=we(T+m-(m*A+p*x)+y),E=we(E+p-(m*O+p*S)+v)),(i||s)&&(k=h.getBBox(),T=we(T+i/100*k.width),E=we(E+s/100*k.height)),k="matrix("+A+","+O+","+x+","+S+","+T+","+E+")",h.setAttribute("transform",k),b&&(h.style[me]=k)},om=function(e,n,r,i,s){var o=360,a=Ae(s),c=parseFloat(s)*(a&&~s.indexOf("rad")?An:1),l=c-i,u=i+l+"deg",f,d;return a&&(f=s.split("_")[1],f==="short"&&(l%=o,l!==l%(o/2)&&(l+=l<0?o:-o)),f==="cw"&&l<0?l=(l+o*$c)%o-~~(l/o)*o:f==="ccw"&&l>0&&(l=(l-o*$c)%o-~~(l/o)*o)),e._pt=d=new Ke(e._pt,n,r,i,l,V_),d.e=u,d.u="deg",e._props.push(r),d},Kc=function(e,n){for(var r in n)e[r]=n[r];return e},am=function(e,n,r){var i=Kc({},r._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=r.style,a,c,l,u,f,d,h,m;i.svg?(l=r.getAttribute("transform"),r.setAttribute("transform",""),o[me]=n,a=Qr(r,1),Xr(r,me),r.setAttribute("transform",l)):(l=getComputedStyle(r)[me],o[me]=n,a=Qr(r,1),o[me]=l);for(c in Wt)l=i[c],u=a[c],l!==u&&s.indexOf(c)<0&&(h=xe(l),m=xe(u),f=h!==m?vn(r,c,l,m):parseFloat(l),d=parseFloat(u),e._pt=new Ke(e._pt,a,c,f,d-f,Ro),e._pt.u=m||0,e._props.push(c));Kc(a,i)};We("padding,margin,Width,Radius",function(t,e){var n="Top",r="Right",i="Bottom",s="Left",o=(e<3?[n,r,i,s]:[n+s,n+r,i+r,i+s]).map(function(a){return e<2?t+a:"border"+a+t});Wi[e>1?"border"+t:t]=function(a,c,l,u,f){var d,h;if(arguments.length<4)return d=o.map(function(m){return Ut(a,m,l)}),h=d.join(" "),h.split(d[0]).length===5?d[0]:h;d=(u+"").split(" "),h={},o.forEach(function(m,p){return h[m]=d[p]=d[p]||d[(p-1)/2|0]}),a.init(c,h,f)}});var zf={name:"css",register:Oo,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,r,i,s){var o=this._props,a=e.style,c=r.vars.startAt,l,u,f,d,h,m,p,y,v,b,T,E,A,O,x,S;Ia||Oo(),this.styles=this.styles||Ff(e),S=this.styles.props,this.tween=r;for(p in n)if(p!=="autoRound"&&(u=n[p],!(Ge[p]&&Cf(p,n,r,i,e,s)))){if(h=typeof u,m=Wi[p],h==="function"&&(u=u.call(r,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Gr(u)),m)m(this,e,p,u,r)&&(x=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",hn.lastIndex=0,hn.test(l)||(y=xe(l),v=xe(u)),v?y!==v&&(l=vn(e,p,l,v)+v):y&&(u+=y),this.add(a,"setProperty",l,u,i,s,0,0,p),o.push(p),S.push(p,0,a[p]);else if(h!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(r,i,e,s):c[p],Ae(l)&&~l.indexOf("random(")&&(l=Gr(l)),xe(l+"")||(l+=Je.units[p]||xe(Ut(e,p))||""),(l+"").charAt(1)==="="&&(l=Ut(e,p))):l=Ut(e,p),d=parseFloat(l),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),f=parseFloat(u),p in Bt&&(p==="autoAlpha"&&(d===1&&Ut(e,"visibility")==="hidden"&&f&&(d=0),S.push("visibility",0,a.visibility),cn(this,a,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),p!=="scale"&&p!=="transform"&&(p=Bt[p],~p.indexOf(",")&&(p=p.split(",")[0]))),T=p in Wt,T){if(this.styles.save(p),E||(A=e._gsap,A.renderTransform&&!n.parseTransform||Qr(e,n.parseTransform),O=n.smoothOrigin!==!1&&A.smooth,E=this._pt=new Ke(this._pt,a,me,0,1,A.renderTransform,A,0,-1),E.dep=1),p==="scale")this._pt=new Ke(this._pt,A,"scaleY",d,(b?cr(d,b+f):f)-d||0,Ro),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){S.push(_t,0,a[_t]),u=nm(u),A.svg?xo(e,u,0,O,0,this):(v=parseFloat(u.split(" ")[2])||0,v!==A.zOrigin&&cn(this,A,"zOrigin",A.zOrigin,v),cn(this,a,p,Ki(l),Ki(u)));continue}else if(p==="svgOrigin"){xo(e,u,1,O,0,this);continue}else if(p in Hf){om(this,A,p,d,b?cr(d,b+u):u);continue}else if(p==="smoothOrigin"){cn(this,A,"smooth",A.smooth,u);continue}else if(p==="force3D"){A[p]=u;continue}else if(p==="transform"){am(this,u,e);continue}}else p in a||(p=wr(p)||p);if(T||(f||f===0)&&(d||d===0)&&!j_.test(u)&&p in a)y=(l+"").substr((d+"").length),f||(f=0),v=xe(u)||(p in Je.units?Je.units[p]:y),y!==v&&(d=vn(e,p,l,v)),this._pt=new Ke(this._pt,T?A:a,p,d,(b?cr(d,b+f):f)-d,!T&&(v==="px"||p==="zIndex")&&n.autoRound!==!1?W_:Ro),this._pt.u=v||0,y!==v&&v!=="%"&&(this._pt.b=l,this._pt.r=z_);else if(p in a)tm.call(this,e,p,l,b?b+u:u);else if(p in e)this.add(e,p,l||e[p],b?b+u:u,i,s);else{ga(p,u);continue}T||(p in a?S.push(p,0,a[p]):S.push(p,1,l||e[p])),o.push(p)}}x&&xf(this)},render:function(e,n){if(n.tween._time||!Sa())for(var r=n._pt;r;)r.r(e,r.d),r=r._next;else n.styles.revert()},get:Ut,aliases:Bt,getSetter:function(e,n,r){var i=Bt[n];return i&&i.indexOf(",")<0&&(n=i),n in Wt&&n!==_t&&(e._gsap.x||Ut(e,"x"))?r&&Bc===r?n==="scale"?Y_:G_:(Bc=r||{})&&(n==="scale"?X_:J_):e.style&&!ha(e.style[n])?K_:~n.indexOf("-")?q_:Ta(e,n)},core:{_removeProperty:Xr,_getMatrix:Aa}};et.utils.checkPrefix=wr;et.core.getStyleSaver=Ff;(function(t,e,n,r){var i=We(t+","+e+","+n,function(s){Wt[s]=1});We(e,function(s){Je.units[s]="deg",Hf[s]=1}),Bt[i[13]]=t+","+e,We(r,function(s){var o=s.split(":");Bt[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");We("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){Je.units[t]="px"});et.registerPlugin(zf);var cm=et.registerPlugin(zf)||et;cm.core.Tween;/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const er=typeof window<"u";function lm(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const ce=Object.assign;function Fs(t,e){const n={};for(const r in e){const i=e[r];n[r]=mt(i)?i.map(t):t(i)}return n}const Ur=()=>{},mt=Array.isArray,um=/\/$/,fm=t=>t.replace(um,"");function Us(t,e,n="/"){let r,i={},s="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=e.slice(0,c),s=e.slice(c+1,a>-1?a:e.length),i=t(s)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=gm(r!=null?r:e,n),{fullPath:r+(s&&"?")+s+o,path:r,query:i,hash:o}}function dm(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function qc(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function hm(t,e,n){const r=e.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&Tr(e.matched[r],n.matched[i])&&Wf(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Tr(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Wf(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!pm(t[n],e[n]))return!1;return!0}function pm(t,e){return mt(t)?Gc(t,e):mt(e)?Gc(e,t):t===e}function Gc(t,e){return mt(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function gm(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/");let i=n.length-1,s,o;for(s=0;s<r.length;s++)if(o=r[s],o!==".")if(o==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var Zr;(function(t){t.pop="pop",t.push="push"})(Zr||(Zr={}));var Br;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Br||(Br={}));function _m(t){if(!t)if(er){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),fm(t)}const mm=/^[^#]+#/;function ym(t,e){return t.replace(mm,"#")+e}function vm(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const _s=()=>({left:window.pageXOffset,top:window.pageYOffset});function bm(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=vm(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Yc(t,e){return(history.state?history.state.position-e:-1)+t}const Do=new Map;function wm(t,e){Do.set(t,e)}function Tm(t){const e=Do.get(t);return Do.delete(t),e}let Em=()=>location.protocol+"//"+location.host;function Kf(t,e){const{pathname:n,search:r,hash:i}=e,s=t.indexOf("#");if(s>-1){let a=i.includes(t.slice(s))?t.slice(s).length:1,c=i.slice(a);return c[0]!=="/"&&(c="/"+c),qc(c,"")}return qc(n,t)+r+i}function Im(t,e,n,r){let i=[],s=[],o=null;const a=({state:d})=>{const h=Kf(t,location),m=n.value,p=e.value;let y=0;if(d){if(n.value=h,e.value=d,o&&o===m){o=null;return}y=p?d.position-p.position:0}else r(h);i.forEach(v=>{v(n.value,m,{delta:y,type:Zr.pop,direction:y?y>0?Br.forward:Br.back:Br.unknown})})};function c(){o=n.value}function l(d){i.push(d);const h=()=>{const m=i.indexOf(d);m>-1&&i.splice(m,1)};return s.push(h),h}function u(){const{history:d}=window;!d.state||d.replaceState(ce({},d.state,{scroll:_s()}),"")}function f(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u),{pauseListeners:c,listen:l,destroy:f}}function Xc(t,e,n,r=!1,i=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:i?_s():null}}function Sm(t){const{history:e,location:n}=window,r={value:Kf(t,n)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(c,l,u){const f=t.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+c:Em()+t+c;try{e[u?"replaceState":"pushState"](l,"",d),i.value=l}catch(h){console.error(h),n[u?"replace":"assign"](d)}}function o(c,l){const u=ce({},e.state,Xc(i.value.back,c,i.value.forward,!0),l,{position:i.value.position});s(c,u,!0),r.value=c}function a(c,l){const u=ce({},i.value,e.state,{forward:c,scroll:_s()});s(u.current,u,!0);const f=ce({},Xc(r.value,c,null),{position:u.position+1},l);s(c,f,!1),r.value=c}return{location:r,state:i,push:a,replace:o}}function IT(t){t=_m(t);const e=Sm(t),n=Im(t,e.state,e.location,e.replace);function r(s,o=!0){o||n.pauseListeners(),history.go(s)}const i=ce({location:"",base:t,go:r,createHref:ym.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function Cm(t){return typeof t=="string"||t&&typeof t=="object"}function qf(t){return typeof t=="string"||typeof t=="symbol"}const Jt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Gf=Symbol("");var Jc;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Jc||(Jc={}));function Er(t,e){return ce(new Error,{type:t,[Gf]:!0},e)}function Mt(t,e){return t instanceof Error&&Gf in t&&(e==null||!!(t.type&e))}const Qc="[^/]+?",Am={sensitive:!1,strict:!1,start:!0,end:!0},km=/[.+*?^${}()[\]/\\]/g;function Rm(t,e){const n=ce({},Am,e),r=[];let i=n.start?"^":"";const s=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(i+="/");for(let f=0;f<l.length;f++){const d=l[f];let h=40+(n.sensitive?.25:0);if(d.type===0)f||(i+="/"),i+=d.value.replace(km,"\\$&"),h+=40;else if(d.type===1){const{value:m,repeatable:p,optional:y,regexp:v}=d;s.push({name:m,repeatable:p,optional:y});const b=v||Qc;if(b!==Qc){h+=10;try{new RegExp(`(${b})`)}catch(E){throw new Error(`Invalid custom RegExp for param "${m}" (${b}): `+E.message)}}let T=p?`((?:${b})(?:/(?:${b}))*)`:`(${b})`;f||(T=y&&l.length<2?`(?:/${T})`:"/"+T),y&&(T+="?"),i+=T,h+=20,y&&(h+=-8),p&&(h+=-20),b===".*"&&(h+=-50)}u.push(h)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function a(l){const u=l.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const h=u[d]||"",m=s[d-1];f[m.name]=h&&m.repeatable?h.split("/"):h}return f}function c(l){let u="",f=!1;for(const d of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const h of d)if(h.type===0)u+=h.value;else if(h.type===1){const{value:m,repeatable:p,optional:y}=h,v=m in l?l[m]:"";if(mt(v)&&!p)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const b=mt(v)?v.join("/"):v;if(!b)if(y)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${m}"`);u+=b}}return u||"/"}return{re:o,score:r,keys:s,parse:a,stringify:c}}function Pm(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function Om(t,e){let n=0;const r=t.score,i=e.score;for(;n<r.length&&n<i.length;){const s=Pm(r[n],i[n]);if(s)return s;n++}if(Math.abs(i.length-r.length)===1){if(Zc(r))return 1;if(Zc(i))return-1}return i.length-r.length}function Zc(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const xm={type:0,value:""},Dm=/[a-zA-Z0-9_]/;function Mm(t){if(!t)return[[]];if(t==="/")return[[xm]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(h){throw new Error(`ERR (${n})/"${l}": ${h}`)}let n=0,r=n;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,c,l="",u="";function f(){!l||(n===0?s.push({type:0,value:l}):n===1||n===2||n===3?(s.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(l&&f(),o()):c===":"?(f(),n=1):d();break;case 4:d(),n=r;break;case 1:c==="("?n=2:Dm.test(c)?d():(f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:f(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),i}function Nm(t,e,n){const r=Rm(Mm(t.path),n),i=ce(r,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function Lm(t,e){const n=[],r=new Map;e=nl({strict:!1,end:!0,sensitive:!1},e);function i(u){return r.get(u)}function s(u,f,d){const h=!d,m=Fm(u);m.aliasOf=d&&d.record;const p=nl(e,u),y=[m];if("alias"in u){const T=typeof u.alias=="string"?[u.alias]:u.alias;for(const E of T)y.push(ce({},m,{components:d?d.record.components:m.components,path:E,aliasOf:d?d.record:m}))}let v,b;for(const T of y){const{path:E}=T;if(f&&E[0]!=="/"){const A=f.record.path,O=A[A.length-1]==="/"?"":"/";T.path=f.record.path+(E&&O+E)}if(v=Nm(T,f,p),d?d.alias.push(v):(b=b||v,b!==v&&b.alias.push(v),h&&u.name&&!tl(v)&&o(u.name)),m.children){const A=m.children;for(let O=0;O<A.length;O++)s(A[O],v,d&&d.children[O])}d=d||v,(v.record.components&&Object.keys(v.record.components).length||v.record.name||v.record.redirect)&&c(v)}return b?()=>{o(b)}:Ur}function o(u){if(qf(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return n}function c(u){let f=0;for(;f<n.length&&Om(u,n[f])>=0&&(u.record.path!==n[f].record.path||!Yf(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!tl(u)&&r.set(u.record.name,u)}function l(u,f){let d,h={},m,p;if("name"in u&&u.name){if(d=r.get(u.name),!d)throw Er(1,{location:u});p=d.record.name,h=ce(el(f.params,d.keys.filter(b=>!b.optional).map(b=>b.name)),u.params&&el(u.params,d.keys.map(b=>b.name))),m=d.stringify(h)}else if("path"in u)m=u.path,d=n.find(b=>b.re.test(m)),d&&(h=d.parse(m),p=d.record.name);else{if(d=f.name?r.get(f.name):n.find(b=>b.re.test(f.path)),!d)throw Er(1,{location:u,currentLocation:f});p=d.record.name,h=ce({},f.params,u.params),m=d.stringify(h)}const y=[];let v=d;for(;v;)y.unshift(v.record),v=v.parent;return{name:p,path:m,params:h,matched:y,meta:Bm(y)}}return t.forEach(u=>s(u)),{addRoute:s,resolve:l,removeRoute:o,getRoutes:a,getRecordMatcher:i}}function el(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Fm(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Um(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Um(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="boolean"?n:n[r];return e}function tl(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Bm(t){return t.reduce((e,n)=>ce(e,n.meta),{})}function nl(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function Yf(t,e){return e.children.some(n=>n===t||Yf(t,n))}const Xf=/#/g,$m=/&/g,Hm=/\//g,jm=/=/g,Vm=/\?/g,Jf=/\+/g,zm=/%5B/g,Wm=/%5D/g,Qf=/%5E/g,Km=/%60/g,Zf=/%7B/g,qm=/%7C/g,ed=/%7D/g,Gm=/%20/g;function ka(t){return encodeURI(""+t).replace(qm,"|").replace(zm,"[").replace(Wm,"]")}function Ym(t){return ka(t).replace(Zf,"{").replace(ed,"}").replace(Qf,"^")}function Mo(t){return ka(t).replace(Jf,"%2B").replace(Gm,"+").replace(Xf,"%23").replace($m,"%26").replace(Km,"`").replace(Zf,"{").replace(ed,"}").replace(Qf,"^")}function Xm(t){return Mo(t).replace(jm,"%3D")}function Jm(t){return ka(t).replace(Xf,"%23").replace(Vm,"%3F")}function Qm(t){return t==null?"":Jm(t).replace(Hm,"%2F")}function qi(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function Zm(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<r.length;++i){const s=r[i].replace(Jf," "),o=s.indexOf("="),a=qi(o<0?s:s.slice(0,o)),c=o<0?null:qi(s.slice(o+1));if(a in e){let l=e[a];mt(l)||(l=e[a]=[l]),l.push(c)}else e[a]=c}return e}function rl(t){let e="";for(let n in t){const r=t[n];if(n=Xm(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(mt(r)?r.map(s=>s&&Mo(s)):[r&&Mo(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+n,s!=null&&(e+="="+s))})}return e}function ey(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=mt(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const ty=Symbol(""),il=Symbol(""),Ra=Symbol(""),td=Symbol(""),No=Symbol("");function Pr(){let t=[];function e(r){return t.push(r),()=>{const i=t.indexOf(r);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t,reset:n}}function en(t,e,n,r,i){const s=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((o,a)=>{const c=f=>{f===!1?a(Er(4,{from:n,to:e})):f instanceof Error?a(f):Cm(f)?a(Er(2,{from:e,to:f})):(s&&r.enterCallbacks[i]===s&&typeof f=="function"&&s.push(f),o())},l=t.call(r&&r.instances[i],e,n,c);let u=Promise.resolve(l);t.length<3&&(u=u.then(c)),u.catch(f=>a(f))})}function Bs(t,e,n,r){const i=[];for(const s of t)for(const o in s.components){let a=s.components[o];if(!(e!=="beforeRouteEnter"&&!s.instances[o]))if(ny(a)){const l=(a.__vccOpts||a)[e];l&&i.push(en(l,n,r,s,o))}else{let c=a();i.push(()=>c.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${s.path}"`));const u=lm(l)?l.default:l;s.components[o]=u;const d=(u.__vccOpts||u)[e];return d&&en(d,n,r,s,o)()}))}}return i}function ny(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function sl(t){const e=fn(Ra),n=fn(td),r=it(()=>e.resolve(or(t.to))),i=it(()=>{const{matched:c}=r.value,{length:l}=c,u=c[l-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(Tr.bind(null,u));if(d>-1)return d;const h=ol(c[l-2]);return l>1&&ol(u)===h&&f[f.length-1].path!==h?f.findIndex(Tr.bind(null,c[l-2])):d}),s=it(()=>i.value>-1&&oy(n.params,r.value.params)),o=it(()=>i.value>-1&&i.value===n.matched.length-1&&Wf(n.params,r.value.params));function a(c={}){return sy(c)?e[or(t.replace)?"replace":"push"](or(t.to)).catch(Ur):Promise.resolve()}return{route:r,href:it(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}const ry=Cu({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:sl,setup(t,{slots:e}){const n=ii(sl(t)),{options:r}=fn(Ra),i=it(()=>({[al(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[al(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=e.default&&e.default(n);return t.custom?s:Wu("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},s)}}}),iy=ry;function sy(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function oy(t,e){for(const n in e){const r=e[n],i=t[n];if(typeof r=="string"){if(r!==i)return!1}else if(!mt(i)||i.length!==r.length||r.some((s,o)=>s!==i[o]))return!1}return!0}function ol(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const al=(t,e,n)=>t!=null?t:e!=null?e:n,ay=Cu({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=fn(No),i=it(()=>t.route||r.value),s=fn(il,0),o=it(()=>{let l=or(s);const{matched:u}=i.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),a=it(()=>i.value.matched[o.value]);Ei(il,it(()=>o.value+1)),Ei(ty,a),Ei(No,i);const c=lp();return Ii(()=>[c.value,a.value,t.name],([l,u,f],[d,h,m])=>{u&&(u.instances[f]=l,h&&h!==u&&l&&l===d&&(u.leaveGuards.size||(u.leaveGuards=h.leaveGuards),u.updateGuards.size||(u.updateGuards=h.updateGuards))),l&&u&&(!h||!Tr(u,h)||!d)&&(u.enterCallbacks[f]||[]).forEach(p=>p(l))},{flush:"post"}),()=>{const l=i.value,u=t.name,f=a.value,d=f&&f.components[u];if(!d)return cl(n.default,{Component:d,route:l});const h=f.props[u],m=h?h===!0?l.params:typeof h=="function"?h(l):h:null,y=Wu(d,ce({},m,e,{onVnodeUnmounted:v=>{v.component.isUnmounted&&(f.instances[u]=null)},ref:c}));return cl(n.default,{Component:y,route:l})||y}}});function cl(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const cy=ay;function ST(t){const e=Lm(t.routes,t),n=t.parseQuery||Zm,r=t.stringifyQuery||rl,i=t.history,s=Pr(),o=Pr(),a=Pr(),c=up(Jt);let l=Jt;er&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Fs.bind(null,C=>""+C),f=Fs.bind(null,Qm),d=Fs.bind(null,qi);function h(C,U){let L,H;return qf(C)?(L=e.getRecordMatcher(C),H=U):H=C,e.addRoute(H,L)}function m(C){const U=e.getRecordMatcher(C);U&&e.removeRoute(U)}function p(){return e.getRoutes().map(C=>C.record)}function y(C){return!!e.getRecordMatcher(C)}function v(C,U){if(U=ce({},U||c.value),typeof C=="string"){const g=Us(n,C,U.path),_=e.resolve({path:g.path},U),w=i.createHref(g.fullPath);return ce(g,_,{params:d(_.params),hash:qi(g.hash),redirectedFrom:void 0,href:w})}let L;if("path"in C)L=ce({},C,{path:Us(n,C.path,U.path).path});else{const g=ce({},C.params);for(const _ in g)g[_]==null&&delete g[_];L=ce({},C,{params:f(C.params)}),U.params=f(U.params)}const H=e.resolve(L,U),re=C.hash||"";H.params=u(d(H.params));const ge=dm(r,ce({},C,{hash:Ym(re),path:H.path})),Z=i.createHref(ge);return ce({fullPath:ge,hash:re,query:r===rl?ey(C.query):C.query||{}},H,{redirectedFrom:void 0,href:Z})}function b(C){return typeof C=="string"?Us(n,C,c.value.path):ce({},C)}function T(C,U){if(l!==C)return Er(8,{from:U,to:C})}function E(C){return x(C)}function A(C){return E(ce(b(C),{replace:!0}))}function O(C){const U=C.matched[C.matched.length-1];if(U&&U.redirect){const{redirect:L}=U;let H=typeof L=="function"?L(C):L;return typeof H=="string"&&(H=H.includes("?")||H.includes("#")?H=b(H):{path:H},H.params={}),ce({query:C.query,hash:C.hash,params:"path"in H?{}:C.params},H)}}function x(C,U){const L=l=v(C),H=c.value,re=C.state,ge=C.force,Z=C.replace===!0,g=O(L);if(g)return x(ce(b(g),{state:typeof g=="object"?ce({},re,g.state):re,force:ge,replace:Z}),U||L);const _=L;_.redirectedFrom=U;let w;return!ge&&hm(r,H,L)&&(w=Er(16,{to:_,from:H}),Fe(H,H,!0,!1)),(w?Promise.resolve(w):k(_,H)).catch(I=>Mt(I)?Mt(I,2)?I:Ie(I):W(I,_,H)).then(I=>{if(I){if(Mt(I,2))return x(ce({replace:Z},b(I.to),{state:typeof I.to=="object"?ce({},re,I.to.state):re,force:ge}),U||_)}else I=z(_,H,!0,Z,re);return $(_,H,I),I})}function S(C,U){const L=T(C,U);return L?Promise.reject(L):Promise.resolve()}function k(C,U){let L;const[H,re,ge]=ly(C,U);L=Bs(H.reverse(),"beforeRouteLeave",C,U);for(const g of H)g.leaveGuards.forEach(_=>{L.push(en(_,C,U))});const Z=S.bind(null,C,U);return L.push(Z),Qn(L).then(()=>{L=[];for(const g of s.list())L.push(en(g,C,U));return L.push(Z),Qn(L)}).then(()=>{L=Bs(re,"beforeRouteUpdate",C,U);for(const g of re)g.updateGuards.forEach(_=>{L.push(en(_,C,U))});return L.push(Z),Qn(L)}).then(()=>{L=[];for(const g of C.matched)if(g.beforeEnter&&!U.matched.includes(g))if(mt(g.beforeEnter))for(const _ of g.beforeEnter)L.push(en(_,C,U));else L.push(en(g.beforeEnter,C,U));return L.push(Z),Qn(L)}).then(()=>(C.matched.forEach(g=>g.enterCallbacks={}),L=Bs(ge,"beforeRouteEnter",C,U),L.push(Z),Qn(L))).then(()=>{L=[];for(const g of o.list())L.push(en(g,C,U));return L.push(Z),Qn(L)}).catch(g=>Mt(g,8)?g:Promise.reject(g))}function $(C,U,L){for(const H of a.list())H(C,U,L)}function z(C,U,L,H,re){const ge=T(C,U);if(ge)return ge;const Z=U===Jt,g=er?history.state:{};L&&(H||Z?i.replace(C.fullPath,ce({scroll:Z&&g&&g.scroll},re)):i.push(C.fullPath,re)),c.value=C,Fe(C,U,L,Z),Ie()}let Q;function ie(){Q||(Q=i.listen((C,U,L)=>{if(!$e.listening)return;const H=v(C),re=O(H);if(re){x(ce(re,{replace:!0}),H).catch(Ur);return}l=H;const ge=c.value;er&&wm(Yc(ge.fullPath,L.delta),_s()),k(H,ge).catch(Z=>Mt(Z,12)?Z:Mt(Z,2)?(x(Z.to,H).then(g=>{Mt(g,20)&&!L.delta&&L.type===Zr.pop&&i.go(-1,!1)}).catch(Ur),Promise.reject()):(L.delta&&i.go(-L.delta,!1),W(Z,H,ge))).then(Z=>{Z=Z||z(H,ge,!1),Z&&(L.delta&&!Mt(Z,8)?i.go(-L.delta,!1):L.type===Zr.pop&&Mt(Z,20)&&i.go(-1,!1)),$(H,ge,Z)}).catch(Ur)}))}let oe=Pr(),ae=Pr(),J;function W(C,U,L){Ie(C);const H=ae.list();return H.length?H.forEach(re=>re(C,U,L)):console.error(C),Promise.reject(C)}function K(){return J&&c.value!==Jt?Promise.resolve():new Promise((C,U)=>{oe.add([C,U])})}function Ie(C){return J||(J=!C,ie(),oe.list().forEach(([U,L])=>C?L(C):U()),oe.reset()),C}function Fe(C,U,L,H){const{scrollBehavior:re}=t;if(!er||!re)return Promise.resolve();const ge=!L&&Tm(Yc(C.fullPath,0))||(H||!L)&&history.state&&history.state.scroll||null;return _u().then(()=>re(C,U,ge)).then(Z=>Z&&bm(Z)).catch(Z=>W(Z,C,U))}const ke=C=>i.go(C);let ve;const Dt=new Set,$e={currentRoute:c,listening:!0,addRoute:h,removeRoute:m,hasRoute:y,getRoutes:p,resolve:v,options:t,push:E,replace:A,go:ke,back:()=>ke(-1),forward:()=>ke(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:ae.add,isReady:K,install(C){const U=this;C.component("RouterLink",iy),C.component("RouterView",cy),C.config.globalProperties.$router=U,Object.defineProperty(C.config.globalProperties,"$route",{enumerable:!0,get:()=>or(c)}),er&&!ve&&c.value===Jt&&(ve=!0,E(i.location).catch(re=>{}));const L={};for(const re in Jt)L[re]=it(()=>c.value[re]);C.provide(Ra,U),C.provide(td,ii(L)),C.provide(No,c);const H=C.unmount;Dt.add(C),C.unmount=function(){Dt.delete(C),Dt.size<1&&(l=Jt,Q&&Q(),Q=null,c.value=Jt,ve=!1,J=!1),H()}}};return $e}function Qn(t){return t.reduce((e,n)=>e.then(()=>n()),Promise.resolve())}function ly(t,e){const n=[],r=[],i=[],s=Math.max(e.matched.length,t.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(t.matched.find(l=>Tr(l,a))?r.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(l=>Tr(l,c))||i.push(c))}return[n,r,i]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},uy=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},rd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=s>>2,f=(s&3)<<4|a>>4;let d=(a&15)<<2|l>>6,h=l&63;c||(h=64,o||(d=64)),r.push(n[u],n[f],n[d],n[h])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(nd(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):uy(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const f=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||f==null)throw new fy;const d=s<<2|a>>4;if(r.push(d),l!==64){const h=a<<4&240|l>>2;if(r.push(h),f!==64){const m=l<<6&192|f;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class fy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const dy=function(t){const e=nd(t);return rd.encodeByteArray(e,!0)},id=function(t){return dy(t).replace(/\./g,"")},sd=function(t){try{return rd.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=()=>hy().__FIREBASE_DEFAULTS__,gy=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_y=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&sd(t[1]);return e&&JSON.parse(e)},Pa=()=>{try{return py()||gy()||_y()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},my=t=>{var e,n;return(n=(e=Pa())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},od=()=>{var t;return(t=Pa())===null||t===void 0?void 0:t.config},ad=t=>{var e;return(e=Pa())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Le())}function by(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function wy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ty(){const t=Le();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function cd(){try{return typeof indexedDB=="object"}catch{return!1}}function ld(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function Ey(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iy="FirebaseError";class Yt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Iy,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yn.prototype.create)}}class Yn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Sy(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Yt(i,a,r)}}function Sy(t,e){return t.replace(Cy,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Cy=/\{\$([^}]+)}/g;function Ay(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Gi(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(ll(s)&&ll(o)){if(!Gi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ll(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ky(t,e){const n=new Ry(t,e);return n.subscribe.bind(n)}class Ry{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Py(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=$s),i.error===void 0&&(i.error=$s),i.complete===void 0&&(i.complete=$s);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Py(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function $s(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(t){return t&&t._delegate?t._delegate:t}class Ot{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new yy;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dy(e))try{this.getOrInitializeService({instanceIdentifier:kn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=kn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=kn){return this.instances.has(e)}getOptions(e=kn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xy(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=kn){return this.component?this.component.multipleInstances?e:kn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xy(t){return t===kn?void 0:t}function Dy(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Oy(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(de||(de={}));const Ny={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},Ly=de.INFO,Fy={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},Uy=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Fy[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ud{constructor(e){this.name=e,this._logLevel=Ly,this._logHandler=Uy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ny[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}const By=(t,e)=>e.some(n=>t instanceof n);let ul,fl;function $y(){return ul||(ul=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hy(){return fl||(fl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fd=new WeakMap,Lo=new WeakMap,dd=new WeakMap,Hs=new WeakMap,Oa=new WeakMap;function jy(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(pn(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fd.set(n,t)}).catch(()=>{}),Oa.set(e,t),e}function Vy(t){if(Lo.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Lo.set(t,e)}let Fo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Lo.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dd.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return pn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zy(t){Fo=t(Fo)}function Wy(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(js(this),e,...n);return dd.set(r,e.sort?e.sort():[e]),pn(r)}:Hy().includes(t)?function(...e){return t.apply(js(this),e),pn(fd.get(this))}:function(...e){return pn(t.apply(js(this),e))}}function Ky(t){return typeof t=="function"?Wy(t):(t instanceof IDBTransaction&&Vy(t),By(t,$y())?new Proxy(t,Fo):t)}function pn(t){if(t instanceof IDBRequest)return jy(t);if(Hs.has(t))return Hs.get(t);const e=Ky(t);return e!==t&&(Hs.set(t,e),Oa.set(e,t)),e}const js=t=>Oa.get(t);function qy(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=pn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(pn(o.result),c.oldVersion,c.newVersion,pn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Gy=["get","getKey","getAll","getAllKeys","count"],Yy=["put","add","delete","clear"],Vs=new Map;function dl(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Vs.get(e))return Vs.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Yy.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Gy.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return Vs.set(e,s),s}zy(t=>({...t,get:(e,n,r)=>dl(e,n)||t.get(e,n,r),has:(e,n)=>!!dl(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Jy(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Jy(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Uo="@firebase/app",hl="0.9.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=new ud("@firebase/app"),Qy="@firebase/app-compat",Zy="@firebase/analytics-compat",e0="@firebase/analytics",t0="@firebase/app-check-compat",n0="@firebase/app-check",r0="@firebase/auth",i0="@firebase/auth-compat",s0="@firebase/database",o0="@firebase/database-compat",a0="@firebase/functions",c0="@firebase/functions-compat",l0="@firebase/installations",u0="@firebase/installations-compat",f0="@firebase/messaging",d0="@firebase/messaging-compat",h0="@firebase/performance",p0="@firebase/performance-compat",g0="@firebase/remote-config",_0="@firebase/remote-config-compat",m0="@firebase/storage",y0="@firebase/storage-compat",v0="@firebase/firestore",b0="@firebase/firestore-compat",w0="firebase",T0="9.22.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="[DEFAULT]",E0={[Uo]:"fire-core",[Qy]:"fire-core-compat",[e0]:"fire-analytics",[Zy]:"fire-analytics-compat",[n0]:"fire-app-check",[t0]:"fire-app-check-compat",[r0]:"fire-auth",[i0]:"fire-auth-compat",[s0]:"fire-rtdb",[o0]:"fire-rtdb-compat",[a0]:"fire-fn",[c0]:"fire-fn-compat",[l0]:"fire-iid",[u0]:"fire-iid-compat",[f0]:"fire-fcm",[d0]:"fire-fcm-compat",[h0]:"fire-perf",[p0]:"fire-perf-compat",[g0]:"fire-rc",[_0]:"fire-rc-compat",[m0]:"fire-gcs",[y0]:"fire-gcs-compat",[v0]:"fire-fst",[b0]:"fire-fst-compat","fire-js":"fire-js",[w0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi=new Map,$o=new Map;function I0(t,e){try{t.container.addComponent(e)}catch(n){Vn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kt(t){const e=t.name;if($o.has(e))return Vn.debug(`There were multiple attempts to register component ${e}.`),!1;$o.set(e,t);for(const n of Yi.values())I0(n,t);return!0}function ai(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S0={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},gn=new Yn("app","Firebase",S0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=T0;function A0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Bo,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw gn.create("bad-app-name",{appName:String(i)});if(n||(n=od()),!n)throw gn.create("no-options");const s=Yi.get(i);if(s){if(Gi(n,s.options)&&Gi(r,s.config))return s;throw gn.create("duplicate-app",{appName:i})}const o=new My(i);for(const c of $o.values())o.addComponent(c);const a=new C0(n,r,o);return Yi.set(i,a),a}function hd(t=Bo){const e=Yi.get(t);if(!e&&t===Bo&&od())return A0();if(!e)throw gn.create("no-app",{appName:t});return e}function Ct(t,e,n){var r;let i=(r=E0[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vn.warn(a.join(" "));return}Kt(new Ot(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0="firebase-heartbeat-database",R0=1,ei="firebase-heartbeat-store";let zs=null;function pd(){return zs||(zs=qy(k0,R0,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ei)}}}).catch(t=>{throw gn.create("idb-open",{originalErrorMessage:t.message})})),zs}async function P0(t){try{return await(await pd()).transaction(ei).objectStore(ei).get(gd(t))}catch(e){if(e instanceof Yt)Vn.warn(e.message);else{const n=gn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vn.warn(n.message)}}}async function pl(t,e){try{const r=(await pd()).transaction(ei,"readwrite");await r.objectStore(ei).put(e,gd(t)),await r.done}catch(n){if(n instanceof Yt)Vn.warn(n.message);else{const r=gn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Vn.warn(r.message)}}}function gd(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O0=1024,x0=30*24*60*60*1e3;class D0{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new N0(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=gl();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const s=new Date(i.date).valueOf();return Date.now()-s<=x0}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=gl(),{heartbeatsToSend:n,unsentEntries:r}=M0(this._heartbeatsCache.heartbeats),i=id(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function gl(){return new Date().toISOString().substring(0,10)}function M0(t,e=O0){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),_l(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),_l(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class N0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cd()?ld().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await P0(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return pl(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return pl(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function _l(t){return id(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L0(t){Kt(new Ot("platform-logger",e=>new Xy(e),"PRIVATE")),Kt(new Ot("heartbeat",e=>new D0(e),"PRIVATE")),Ct(Uo,hl,t),Ct(Uo,hl,"esm2017"),Ct("fire-js","")}L0("");var F0="firebase",U0="9.22.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ct(F0,U0,"app");const B0=(t,e)=>e.some(n=>t instanceof n);let ml,yl;function $0(){return ml||(ml=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function H0(){return yl||(yl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _d=new WeakMap,Ho=new WeakMap,md=new WeakMap,Ws=new WeakMap,xa=new WeakMap;function j0(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(jt(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_d.set(n,t)}).catch(()=>{}),xa.set(e,t),e}function V0(t){if(Ho.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Ho.set(t,e)}let jo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ho.get(t);if(e==="objectStoreNames")return t.objectStoreNames||md.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return jt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function z0(t){jo=t(jo)}function W0(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ks(this),e,...n);return md.set(r,e.sort?e.sort():[e]),jt(r)}:H0().includes(t)?function(...e){return t.apply(Ks(this),e),jt(_d.get(this))}:function(...e){return jt(t.apply(Ks(this),e))}}function K0(t){return typeof t=="function"?W0(t):(t instanceof IDBTransaction&&V0(t),B0(t,$0())?new Proxy(t,jo):t)}function jt(t){if(t instanceof IDBRequest)return j0(t);if(Ws.has(t))return Ws.get(t);const e=K0(t);return e!==t&&(Ws.set(t,e),xa.set(e,t)),e}const Ks=t=>xa.get(t);function Da(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=jt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(jt(o.result),c.oldVersion,c.newVersion,jt(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}function qs(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",()=>e()),jt(n).then(()=>{})}const q0=["get","getKey","getAll","getAllKeys","count"],G0=["put","add","delete","clear"],Gs=new Map;function vl(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Gs.get(e))return Gs.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=G0.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||q0.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return Gs.set(e,s),s}z0(t=>({...t,get:(e,n,r)=>vl(e,n)||t.get(e,n,r),has:(e,n)=>!!vl(e,n)||t.has(e,n)}));const yd="@firebase/installations",Ma="0.6.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd=1e4,bd=`w:${Ma}`,wd="FIS_v2",Y0="https://firebaseinstallations.googleapis.com/v1",X0=60*60*1e3,J0="installations",Q0="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z0={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},zn=new Yn(J0,Q0,Z0);function Td(t){return t instanceof Yt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed({projectId:t}){return`${Y0}/projects/${t}/installations`}function Id(t){return{token:t.token,requestStatus:2,expiresIn:tv(t.expiresIn),creationTime:Date.now()}}async function Sd(t,e){const r=(await e.json()).error;return zn.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Cd({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ev(t,{refreshToken:e}){const n=Cd(t);return n.append("Authorization",nv(e)),n}async function Ad(t){const e=await t();return e.status>=500&&e.status<600?t():e}function tv(t){return Number(t.replace("s","000"))}function nv(t){return`${wd} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rv({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Ed(t),i=Cd(t),s=e.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={fid:n,authVersion:wd,appId:t.appId,sdkVersion:bd},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await Ad(()=>fetch(r,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Id(l.authToken)}}else throw await Sd("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sv=/^[cdef][\w-]{21}$/,Vo="";function ov(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=av(t);return sv.test(n)?n:Vo}catch{return Vo}}function av(t){return iv(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=new Map;function Pd(t,e){const n=ms(t);Od(n,e),cv(n,e)}function Od(t,e){const n=Rd.get(t);if(!!n)for(const r of n)r(e)}function cv(t,e){const n=lv();n&&n.postMessage({key:t,fid:e}),uv()}let Mn=null;function lv(){return!Mn&&"BroadcastChannel"in self&&(Mn=new BroadcastChannel("[Firebase] FID Change"),Mn.onmessage=t=>{Od(t.data.key,t.data.fid)}),Mn}function uv(){Rd.size===0&&Mn&&(Mn.close(),Mn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fv="firebase-installations-database",dv=1,Wn="firebase-installations-store";let Ys=null;function Na(){return Ys||(Ys=Da(fv,dv,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Wn)}}})),Ys}async function Xi(t,e){const n=ms(t),i=(await Na()).transaction(Wn,"readwrite"),s=i.objectStore(Wn),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&Pd(t,e.fid),e}async function xd(t){const e=ms(t),r=(await Na()).transaction(Wn,"readwrite");await r.objectStore(Wn).delete(e),await r.done}async function ys(t,e){const n=ms(t),i=(await Na()).transaction(Wn,"readwrite"),s=i.objectStore(Wn),o=await s.get(n),a=e(o);return a===void 0?await s.delete(n):await s.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&Pd(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function La(t){let e;const n=await ys(t.appConfig,r=>{const i=hv(r),s=pv(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===Vo?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function hv(t){const e=t||{fid:ov(),registrationStatus:0};return Dd(e)}function pv(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(zn.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=gv(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:_v(t)}:{installationEntry:e}}async function gv(t,e){try{const n=await rv(t,e);return Xi(t.appConfig,n)}catch(n){throw Td(n)&&n.customData.serverCode===409?await xd(t.appConfig):await Xi(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function _v(t){let e=await bl(t.appConfig);for(;e.registrationStatus===1;)await kd(100),e=await bl(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await La(t);return r||n}return e}function bl(t){return ys(t,e=>{if(!e)throw zn.create("installation-not-found");return Dd(e)})}function Dd(t){return mv(t)?{fid:t.fid,registrationStatus:0}:t}function mv(t){return t.registrationStatus===1&&t.registrationTime+vd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yv({appConfig:t,heartbeatServiceProvider:e},n){const r=vv(t,n),i=ev(t,n),s=e.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={installation:{sdkVersion:bd,appId:t.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await Ad(()=>fetch(r,a));if(c.ok){const l=await c.json();return Id(l)}else throw await Sd("Generate Auth Token",c)}function vv(t,{fid:e}){return`${Ed(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fa(t,e=!1){let n;const r=await ys(t.appConfig,s=>{if(!Md(s))throw zn.create("not-registered");const o=s.authToken;if(!e&&Tv(o))return s;if(o.requestStatus===1)return n=bv(t,e),s;{if(!navigator.onLine)throw zn.create("app-offline");const a=Iv(s);return n=wv(t,a),a}});return n?await n:r.authToken}async function bv(t,e){let n=await wl(t.appConfig);for(;n.authToken.requestStatus===1;)await kd(100),n=await wl(t.appConfig);const r=n.authToken;return r.requestStatus===0?Fa(t,e):r}function wl(t){return ys(t,e=>{if(!Md(e))throw zn.create("not-registered");const n=e.authToken;return Sv(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function wv(t,e){try{const n=await yv(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Xi(t.appConfig,r),n}catch(n){if(Td(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await xd(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Xi(t.appConfig,r)}throw n}}function Md(t){return t!==void 0&&t.registrationStatus===2}function Tv(t){return t.requestStatus===2&&!Ev(t)}function Ev(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+X0}function Iv(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Sv(t){return t.requestStatus===1&&t.requestTime+vd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cv(t){const e=t,{installationEntry:n,registrationPromise:r}=await La(e);return r?r.catch(console.error):Fa(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Av(t,e=!1){const n=t;return await kv(n),(await Fa(n,e)).token}async function kv(t){const{registrationPromise:e}=await La(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rv(t){if(!t||!t.options)throw Xs("App Configuration");if(!t.name)throw Xs("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Xs(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Xs(t){return zn.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="installations",Pv="installations-internal",Ov=t=>{const e=t.getProvider("app").getImmediate(),n=Rv(e),r=ai(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},xv=t=>{const e=t.getProvider("app").getImmediate(),n=ai(e,Nd).getImmediate();return{getId:()=>Cv(n),getToken:i=>Av(n,i)}};function Dv(){Kt(new Ot(Nd,Ov,"PUBLIC")),Kt(new Ot(Pv,xv,"PRIVATE"))}Dv();Ct(yd,Ma);Ct(yd,Ma,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv="/firebase-messaging-sw.js",Nv="/firebase-cloud-messaging-push-scope",Ld="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Lv="https://fcmregistrations.googleapis.com/v1",Fd="google.c.a.c_id",Fv="google.c.a.c_l",Uv="google.c.a.ts",Bv="google.c.a.e";var Tl;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Tl||(Tl={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var ti;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(ti||(ti={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function $v(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js="fcm_token_details_db",Hv=5,El="fcm_token_object_Store";async function jv(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(Js))return null;let e=null;return(await Da(Js,Hv,{upgrade:async(r,i,s,o)=>{var a;if(i<2||!r.objectStoreNames.contains(El))return;const c=o.objectStore(El),l=await c.index("fcmSenderId").get(t);if(await c.clear(),!!l){if(i===2){const u=l;if(!u.auth||!u.p256dh||!u.endpoint)return;e={token:u.fcmToken,createTime:(a=u.createTime)!==null&&a!==void 0?a:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:Ft(u.vapidKey)}}}else if(i===3){const u=l;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:Ft(u.auth),p256dh:Ft(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:Ft(u.vapidKey)}}}else if(i===4){const u=l;e={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:Ft(u.auth),p256dh:Ft(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:Ft(u.vapidKey)}}}}}})).close(),await qs(Js),await qs("fcm_vapid_details_db"),await qs("undefined"),Vv(e)?e:null}function Vv(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv="firebase-messaging-database",Wv=1,Kn="firebase-messaging-store";let Qs=null;function Ua(){return Qs||(Qs=Da(zv,Wv,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Kn)}}})),Qs}async function Ud(t){const e=$a(t),r=await(await Ua()).transaction(Kn).objectStore(Kn).get(e);if(r)return r;{const i=await jv(t.appConfig.senderId);if(i)return await Ba(t,i),i}}async function Ba(t,e){const n=$a(t),i=(await Ua()).transaction(Kn,"readwrite");return await i.objectStore(Kn).put(e,n),await i.done,e}async function Kv(t){const e=$a(t),r=(await Ua()).transaction(Kn,"readwrite");await r.objectStore(Kn).delete(e),await r.done}function $a({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["only-available-in-window"]:"This method is available in a Window context.",["only-available-in-sw"]:"This method is available in a service worker context.",["permission-default"]:"The notification permission was not granted and dismissed instead.",["permission-blocked"]:"The notification permission was not granted and blocked instead.",["unsupported-browser"]:"This browser doesn't support the API's required to use the Firebase SDK.",["indexed-db-unsupported"]:"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",["failed-service-worker-registration"]:"We are unable to register the default service worker. {$browserErrorMessage}",["token-subscribe-failed"]:"A problem occurred while subscribing the user to FCM: {$errorInfo}",["token-subscribe-no-token"]:"FCM returned no token when subscribing the user to push.",["token-unsubscribe-failed"]:"A problem occurred while unsubscribing the user from FCM: {$errorInfo}",["token-update-failed"]:"A problem occurred while updating the user from FCM: {$errorInfo}",["token-update-no-token"]:"FCM returned no token when updating the user to push.",["use-sw-after-get-token"]:"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",["invalid-sw-registration"]:"The input to useServiceWorker() must be a ServiceWorkerRegistration.",["invalid-bg-handler"]:"The input to setBackgroundMessageHandler() must be a function.",["invalid-vapid-key"]:"The public VAPID key must be a string.",["use-vapid-key-after-get-token"]:"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Be=new Yn("messaging","Messaging",qv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gv(t,e){const n=await ja(t),r=$d(e),i={method:"POST",headers:n,body:JSON.stringify(r)};let s;try{s=await(await fetch(Ha(t.appConfig),i)).json()}catch(o){throw Be.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw Be.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw Be.create("token-subscribe-no-token");return s.token}async function Yv(t,e){const n=await ja(t),r=$d(e.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let s;try{s=await(await fetch(`${Ha(t.appConfig)}/${e.token}`,i)).json()}catch(o){throw Be.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw Be.create("token-update-failed",{errorInfo:o})}if(!s.token)throw Be.create("token-update-no-token");return s.token}async function Bd(t,e){const r={method:"DELETE",headers:await ja(t)};try{const s=await(await fetch(`${Ha(t.appConfig)}/${e}`,r)).json();if(s.error){const o=s.error.message;throw Be.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw Be.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function Ha({projectId:t}){return`${Lv}/projects/${t}/registrations`}async function ja({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function $d({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:e,p256dh:t}};return r!==Ld&&(i.web.applicationPubKey=r),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=7*24*60*60*1e3;async function Jv(t){const e=await eb(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Ft(e.getKey("auth")),p256dh:Ft(e.getKey("p256dh"))},r=await Ud(t.firebaseDependencies);if(r){if(tb(r.subscriptionOptions,n))return Date.now()>=r.createTime+Xv?Zv(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Bd(t.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Il(t.firebaseDependencies,n)}else return Il(t.firebaseDependencies,n)}async function Qv(t){const e=await Ud(t.firebaseDependencies);e&&(await Bd(t.firebaseDependencies,e.token),await Kv(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function Zv(t,e){try{const n=await Yv(t.firebaseDependencies,e),r=Object.assign(Object.assign({},e),{token:n,createTime:Date.now()});return await Ba(t.firebaseDependencies,r),n}catch(n){throw await Qv(t),n}}async function Il(t,e){const r={token:await Gv(t,e),createTime:Date.now(),subscriptionOptions:e};return await Ba(t,r),r.token}async function eb(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:$v(e)})}function tb(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,i=e.auth===t.auth,s=e.p256dh===t.p256dh;return n&&r&&i&&s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return nb(e,t),rb(e,t),ib(e,t),e}function nb(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const i=e.notification.image;i&&(t.notification.image=i);const s=e.notification.icon;s&&(t.notification.icon=s)}function rb(t,e){!e.data||(t.data=e.data)}function ib(t,e){var n,r,i,s,o;if(!e.fcmOptions&&!(!((n=e.notification)===null||n===void 0)&&n.click_action))return;t.fcmOptions={};const a=(i=(r=e.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(s=e.notification)===null||s===void 0?void 0:s.click_action;a&&(t.fcmOptions.link=a);const c=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label;c&&(t.fcmOptions.analyticsLabel=c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sb(t){return typeof t=="object"&&!!t&&Fd in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hd("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");Hd("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function Hd(t,e){const n=[];for(let r=0;r<t.length;r++)n.push(t.charAt(r)),r<e.length&&n.push(e.charAt(r));return n.join("")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ob(t){if(!t||!t.options)throw Zs("App Configuration Object");if(!t.name)throw Zs("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw Zs(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Zs(t){return Be.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=ob(e);this.firebaseDependencies={app:e,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cb(t){try{t.swRegistration=await navigator.serviceWorker.register(Mv,{scope:Nv}),t.swRegistration.update().catch(()=>{})}catch(e){throw Be.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lb(t,e){if(!e&&!t.swRegistration&&await cb(t),!(!e&&!!t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Be.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ub(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Ld)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jd(t,e){if(!navigator)throw Be.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Be.create("permission-blocked");return await ub(t,e==null?void 0:e.vapidKey),await lb(t,e==null?void 0:e.serviceWorkerRegistration),Jv(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fb(t,e,n){const r=db(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[Fd],message_name:n[Fv],message_time:n[Uv],message_device_time:Math.floor(Date.now()/1e3)})}function db(t){switch(t){case ti.NOTIFICATION_CLICKED:return"notification_open";case ti.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hb(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===ti.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Sl(n)):t.onMessageHandler.next(Sl(n)));const r=n.data;sb(r)&&r[Bv]==="1"&&await fb(t,n.messageType,r)}const Cl="@firebase/messaging",Al="0.12.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=t=>{const e=new ab(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>hb(e,n)),e},gb=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:r=>jd(e,r)}};function _b(){Kt(new Ot("messaging",pb,"PUBLIC")),Kt(new Ot("messaging-internal",gb,"PRIVATE")),Ct(Cl,Al),Ct(Cl,Al,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mb(){try{await ld()}catch{return!1}return typeof window<"u"&&cd()&&Ey()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(t=hd()){return mb().then(e=>{if(!e)throw Be.create("unsupported-browser")},e=>{throw Be.create("indexed-db-unsupported")}),ai(wn(t),"messaging").getImmediate()}async function AT(t,e){return t=wn(t),jd(t,e)}_b();function Va(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function Vd(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const yb=Vd,zd=new Yn("auth","Firebase",Vd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji=new ud("@firebase/auth");function vb(t,...e){Ji.logLevel<=de.WARN&&Ji.warn(`Auth (${ci}): ${t}`,...e)}function Pi(t,...e){Ji.logLevel<=de.ERROR&&Ji.error(`Auth (${ci}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t,...e){throw za(t,...e)}function At(t,...e){return za(t,...e)}function Wd(t,e,n){const r=Object.assign(Object.assign({},yb()),{[e]:n});return new Yn("auth","Firebase",r).create(e,{appName:t.name})}function bb(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&xt(t,"argument-error"),Wd(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function za(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return zd.create(t,...e)}function G(t,e,...n){if(!t)throw za(e,...n)}function $t(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Pi(e),new Error(e)}function qt(t,e){t||$t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function wb(){return kl()==="http:"||kl()==="https:"}function kl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wb()||by()||"connection"in navigator)?navigator.onLine:!0}function Eb(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,n){this.shortDelay=e,this.longDelay=n,qt(n>e,"Short delay should be less than long delay!"),this.isMobile=vy()||wy()}get(){return Tb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(t,e){qt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;$t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;$t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;$t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ib={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb=new li(3e4,6e4);function qd(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ui(t,e,n,r,i={}){return Gd(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=oi(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Kd.fetch()(Yd(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function Gd(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Ib),e);try{const i=new Ab(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw bi(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw bi(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw bi(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw bi(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Wd(t,u,l);xt(t,u)}}catch(i){if(i instanceof Yt)throw i;xt(t,"network-request-failed",{message:String(i)})}}async function Cb(t,e,n,r,i={}){const s=await ui(t,e,n,r,i);return"mfaPendingCredential"in s&&xt(t,"multi-factor-auth-required",{_serverResponse:s}),s}function Yd(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Wa(t.config,i):`${t.config.apiScheme}://${i}`}class Ab{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(At(this.auth,"network-request-failed")),Sb.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function bi(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=At(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kb(t,e){return ui(t,"POST","/v1/accounts:delete",e)}async function Rb(t,e){return ui(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Pb(t,e=!1){const n=wn(t),r=await n.getIdToken(e),i=Ka(r);G(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:$r(eo(i.auth_time)),issuedAtTime:$r(eo(i.iat)),expirationTime:$r(eo(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function eo(t){return Number(t)*1e3}function Ka(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Pi("JWT malformed, contained fewer than 3 sections"),null;try{const i=sd(n);return i?JSON.parse(i):(Pi("Failed to decode base64 JWT payload"),null)}catch(i){return Pi("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ob(t){const e=Ka(t);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ni(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Yt&&xb(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function xb({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=$r(this.lastLoginAt),this.creationTime=$r(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qi(t){var e;const n=t.auth,r=await t.getIdToken(),i=await ni(t,Rb(n,{idToken:r}));G(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Lb(s.providerUserInfo):[],a=Nb(t.providerData,o),c=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),u=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Xd(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(t,f)}async function Mb(t){const e=wn(t);await Qi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Nb(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Lb(t){return t.map(e=>{var{providerId:n}=e,r=Va(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fb(t,e){const n=await Gd(t,{},async()=>{const r=oi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=Yd(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Kd.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ob(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return G(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await Fb(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ri;return r&&(G(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(G(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(G(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ri,this.toJSON())}_performRefresh(){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(t,e){G(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Hn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Va(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Db(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Xd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await ni(this,this.stsTokenManager.getToken(this.auth,e));return G(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Pb(this,e)}reload(){return Mb(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Hn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Qi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ni(this,kb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,c,l,u;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(i=n.email)!==null&&i!==void 0?i:void 0,h=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,m=(o=n.photoURL)!==null&&o!==void 0?o:void 0,p=(a=n.tenantId)!==null&&a!==void 0?a:void 0,y=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,v=(l=n.createdAt)!==null&&l!==void 0?l:void 0,b=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:T,emailVerified:E,isAnonymous:A,providerData:O,stsTokenManager:x}=n;G(T&&x,e,"internal-error");const S=ri.fromJSON(this.name,x);G(typeof T=="string",e,"internal-error"),Qt(f,e.name),Qt(d,e.name),G(typeof E=="boolean",e,"internal-error"),G(typeof A=="boolean",e,"internal-error"),Qt(h,e.name),Qt(m,e.name),Qt(p,e.name),Qt(y,e.name),Qt(v,e.name),Qt(b,e.name);const k=new Hn({uid:T,auth:e,email:d,emailVerified:E,displayName:f,isAnonymous:A,photoURL:m,phoneNumber:h,tenantId:p,stsTokenManager:S,createdAt:v,lastLoginAt:b});return O&&Array.isArray(O)&&(k.providerData=O.map($=>Object.assign({},$))),y&&(k._redirectEventId=y),k}static async _fromIdTokenResponse(e,n,r=!1){const i=new ri;i.updateFromServerResponse(n);const s=new Hn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Qi(s),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl=new Map;function Ht(t){qt(t instanceof Function,"Expected a class definition");let e=Rl.get(t);return e?(qt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Rl.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Jd.type="NONE";const Pl=Jd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(t,e,n){return`firebase:${t}:${e}:${n}`}class fr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Oi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Oi("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Hn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new fr(Ht(Pl),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||Ht(Pl);const o=Oi(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){const f=Hn._fromJSON(e,u);l!==s&&(a=f),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new fr(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new fr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(eh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Qd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(nh(e))return"Blackberry";if(rh(e))return"Webos";if(qa(e))return"Safari";if((e.includes("chrome/")||Zd(e))&&!e.includes("edge/"))return"Chrome";if(th(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Qd(t=Le()){return/firefox\//i.test(t)}function qa(t=Le()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zd(t=Le()){return/crios\//i.test(t)}function eh(t=Le()){return/iemobile/i.test(t)}function th(t=Le()){return/android/i.test(t)}function nh(t=Le()){return/blackberry/i.test(t)}function rh(t=Le()){return/webos/i.test(t)}function vs(t=Le()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ub(t=Le()){var e;return vs(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Bb(){return Ty()&&document.documentMode===10}function ih(t=Le()){return vs(t)||th(t)||rh(t)||nh(t)||/windows phone/i.test(t)||eh(t)}function $b(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(t,e=[]){let n;switch(t){case"Browser":n=Ol(Le());break;case"Worker":n=`${Ol(Le())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ci}/${r}`}async function oh(t,e){return ui(t,"GET","/v2/recaptchaConfig",qd(t,e))}function xl(t){return t!==void 0&&t.enterprise!==void 0}class ah{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hb(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function ch(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=At("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",Hb().appendChild(r)})}function jb(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Vb="https://www.google.com/recaptcha/enterprise.js?render=",zb="recaptcha-enterprise",Wb="NO_RECAPTCHA";class Kb{constructor(e){this.type=zb,this.auth=fi(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{oh(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new ah(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;xl(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(Wb)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!n&&xl(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}ch(Vb+a).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Dl(this),this.idTokenSubscription=new Dl(this),this.beforeStateQueue=new qb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ht(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await fr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c==null?void 0:c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Qi(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Eb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?wn(e):null;return n&&G(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Ht(e))})}async initializeRecaptchaConfig(){const e=await oh(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new ah(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Kb(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Yn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ht(e)||this._popupRedirectResolver;G(n,this,"argument-error"),this.redirectPersistenceManager=await fr.create(this,[Ht(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return G(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof n=="function"?e.addObserver(n,r,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=sh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&vb(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function fi(t){return wn(t)}class Dl{constructor(e){this.auth=e,this.observer=null,this.addObserver=ky(n=>this.observer=n)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yb(t,e){const n=ai(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Gi(s,e!=null?e:{}))return i;xt(i,"already-initialized")}return n.initialize({options:e})}function Xb(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Ht);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Jb(t,e,n){const r=fi(t);G(r._canInitEmulator,r,"emulator-config-failed"),G(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),s=lh(e),{host:o,port:a}=Qb(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Zb()}function lh(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Qb(t){const e=lh(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Ml(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Ml(o)}}}function Ml(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Zb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return $t("not implemented")}_getIdTokenResponse(e){return $t("not implemented")}_linkToIdToken(e,n){return $t("not implemented")}_getReauthenticationResolver(e){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dr(t,e){return Cb(t,"POST","/v1/accounts:signInWithIdp",qd(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ew="http://localhost";class qn extends uh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new qn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):xt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Va(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new qn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return dr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,dr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,dr(e,n)}buildRequest(){const e={requestUri:ew,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=oi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di extends Ga{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends di{constructor(){super("facebook.com")}static credential(e){return qn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tn.credential(e.oauthAccessToken)}catch{return null}}}tn.FACEBOOK_SIGN_IN_METHOD="facebook.com";tn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends di{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return qn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return nn.credential(n,r)}catch{return null}}}nn.GOOGLE_SIGN_IN_METHOD="google.com";nn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends di{constructor(){super("github.com")}static credential(e){return qn._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rn.credential(e.oauthAccessToken)}catch{return null}}}rn.GITHUB_SIGN_IN_METHOD="github.com";rn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends di{constructor(){super("twitter.com")}static credential(e,n){return qn._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return sn.credential(n,r)}catch{return null}}}sn.TWITTER_SIGN_IN_METHOD="twitter.com";sn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Hn._fromIdTokenResponse(e,r,i),o=Nl(r);return new Ir({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Nl(r);return new Ir({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Nl(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi extends Yt{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Zi.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Zi(e,n,r,i)}}function fh(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Zi._fromErrorAndOperation(t,s,e,r):s})}async function tw(t,e,n=!1){const r=await ni(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ir._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nw(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const s=await ni(t,fh(r,i,e,t),n);G(s.idToken,r,"internal-error");const o=Ka(s.idToken);G(o,r,"internal-error");const{sub:a}=o;return G(t.uid===a,r,"user-mismatch"),Ir._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&xt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rw(t,e,n=!1){const r="signIn",i=await fh(t,r,e),s=await Ir._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function iw(t,e,n,r){return wn(t).onIdTokenChanged(e,n,r)}function sw(t,e,n){return wn(t).beforeAuthStateChanged(e,n)}const es="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(es,"1"),this.storage.removeItem(es),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ow(){const t=Le();return qa(t)||vs(t)}const aw=1e3,cw=10;class hh extends dh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=ow()&&$b(),this.fallbackToPolling=ih(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Bb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,cw):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},aw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}hh.type="LOCAL";const lw=hh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph extends dh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ph.type="SESSION";const gh=ph;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uw(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new bs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await uw(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}bs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Ya("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const d=f;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(){return window}function dw(t){kt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h(){return typeof kt().WorkerGlobalScope<"u"&&typeof kt().importScripts=="function"}async function hw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function pw(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function gw(){return _h()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="firebaseLocalStorageDb",_w=1,ts="firebaseLocalStorage",yh="fbase_key";class hi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ws(t,e){return t.transaction([ts],e?"readwrite":"readonly").objectStore(ts)}function mw(){const t=indexedDB.deleteDatabase(mh);return new hi(t).toPromise()}function Wo(){const t=indexedDB.open(mh,_w);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ts,{keyPath:yh})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ts)?e(r):(r.close(),await mw(),e(await Wo()))})})}async function Ll(t,e,n){const r=ws(t,!0).put({[yh]:e,value:n});return new hi(r).toPromise()}async function yw(t,e){const n=ws(t,!1).get(e),r=await new hi(n).toPromise();return r===void 0?null:r.value}function Fl(t,e){const n=ws(t,!0).delete(e);return new hi(n).toPromise()}const vw=800,bw=3;class vh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Wo(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>bw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _h()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=bs._getInstance(gw()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await hw(),!this.activeServiceWorker)return;this.sender=new fw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||pw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wo();return await Ll(e,es,"1"),await Fl(e,es),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ll(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>yw(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fl(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ws(i,!1).getAll();return new hi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),vw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vh.type="LOCAL";const ww=vh;new li(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(t,e){return e?Ht(e):(G(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa extends uh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return dr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return dr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return dr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Tw(t){return rw(t.auth,new Xa(t),t.bypassAuthState)}function Ew(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),nw(n,new Xa(t),t.bypassAuthState)}async function Iw(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),tw(n,new Xa(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Tw;case"linkViaPopup":case"linkViaRedirect":return Iw;case"reauthViaPopup":case"reauthViaRedirect":return Ew;default:xt(this.auth,"internal-error")}}resolve(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=new li(2e3,1e4);async function kT(t,e,n){const r=fi(t);bb(t,e,Ga);const i=bh(r,n);return new Nn(r,"signInViaPopup",e,i).executeNotNull()}class Nn extends wh{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Nn.currentPopupAction&&Nn.currentPopupAction.cancel(),Nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){qt(this.filter.length===1,"Popup operations only handle one event");const e=Ya();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(At(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(At(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(At(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Sw.get())};e()}}Nn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw="pendingRedirect",xi=new Map;class Aw extends wh{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=xi.get(this.auth._key());if(!e){try{const r=await kw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}xi.set(this.auth._key(),e)}return this.bypassAuthState||xi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function kw(t,e){const n=Ow(e),r=Pw(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Rw(t,e){xi.set(t._key(),e)}function Pw(t){return Ht(t._redirectPersistence)}function Ow(t){return Oi(Cw,t.config.apiKey,t.name)}async function xw(t,e,n=!1){const r=fi(t),i=bh(r,e),o=await new Aw(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dw=10*60*1e3;class Mw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Nw(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Th(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(At(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Dw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ul(e))}saveEventToCache(e){this.cachedEventUids.add(Ul(e)),this.lastProcessedEventTime=Date.now()}}function Ul(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Th({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Nw(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Th(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lw(t,e={}){return ui(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Uw=/^https?/;async function Bw(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Lw(t);for(const n of e)try{if($w(n))return}catch{}xt(t,"unauthorized-domain")}function $w(t){const e=zo(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Uw.test(n))return!1;if(Fw.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=new li(3e4,6e4);function Bl(){const t=kt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function jw(t){return new Promise((e,n)=>{var r,i,s;function o(){Bl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bl(),n(At(t,"network-request-failed"))},timeout:Hw.get()})}if(!((i=(r=kt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=kt().gapi)===null||s===void 0)&&s.load)o();else{const a=jb("iframefcb");return kt()[a]=()=>{gapi.load?o():n(At(t,"network-request-failed"))},ch(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Di=null,e})}let Di=null;function Vw(t){return Di=Di||jw(t),Di}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zw=new li(5e3,15e3),Ww="__/auth/iframe",Kw="emulator/auth/iframe",qw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Gw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yw(t){const e=t.config;G(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Wa(e,Kw):`https://${t.config.authDomain}/${Ww}`,r={apiKey:e.apiKey,appName:t.name,v:ci},i=Gw.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${oi(r).slice(1)}`}async function Xw(t){const e=await Vw(t),n=kt().gapi;return G(n,t,"internal-error"),e.open({where:document.body,url:Yw(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qw,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=At(t,"network-request-failed"),a=kt().setTimeout(()=>{s(o)},zw.get());function c(){kt().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qw=500,Zw=600,eT="_blank",tT="http://localhost";class $l{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nT(t,e,n,r=Qw,i=Zw){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Jw),{width:r.toString(),height:i.toString(),top:s,left:o}),l=Le().toLowerCase();n&&(a=Zd(l)?eT:n),Qd(l)&&(e=e||tT,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[h,m])=>`${d}${h}=${m},`,"");if(Ub(l)&&a!=="_self")return rT(e||"",a),new $l(null);const f=window.open(e||"",a,u);G(f,t,"popup-blocked");try{f.focus()}catch{}return new $l(f)}function rT(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT="__/auth/handler",sT="emulator/auth/handler",oT=encodeURIComponent("fac");async function Hl(t,e,n,r,i,s){G(t.config.authDomain,t,"auth-domain-config-required"),G(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ci,eventId:i};if(e instanceof Ga){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ay(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,f]of Object.entries(s||{}))o[u]=f}if(e instanceof di){const u=e.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${oT}=${encodeURIComponent(c)}`:"";return`${aT(t)}?${oi(a).slice(1)}${l}`}function aT({config:t}){return t.emulator?Wa(t,sT):`https://${t.authDomain}/${iT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="webStorageSupport";class cT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gh,this._completeRedirectFn=xw,this._overrideRedirectResult=Rw}async _openPopup(e,n,r,i){var s;qt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Hl(e,n,r,zo(),i);return nT(e,o,Ya())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Hl(e,n,r,zo(),i);return dw(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(qt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Xw(e),r=new Mw(e);return n.register("authEvent",i=>(G(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(to,{type:to},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[to];o!==void 0&&n(!!o),xt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Bw(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ih()||qa()||vs()}}const lT=cT;var jl="@firebase/auth",Vl="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fT(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function dT(t){Kt(new Ot("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:sh(t)},l=new Gb(r,i,s,c);return Xb(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new Ot("auth-internal",e=>{const n=fi(e.getProvider("auth").getImmediate());return(r=>new uT(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ct(jl,Vl,fT(t)),Ct(jl,Vl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT=5*60,pT=ad("authIdTokenMaxAge")||hT;let zl=null;const gT=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>pT)return;const i=n==null?void 0:n.token;zl!==i&&(zl=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function RT(t=hd()){const e=ai(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Yb(t,{popupRedirectResolver:lT,persistence:[ww,lw,gh]}),r=ad("authTokenSyncURL");if(r){const s=gT(r);sw(n,s,()=>s(n.currentUser)),iw(n,o=>s(o))}const i=my("auth");return i&&Jb(n,`http://${i}`),n}dT("Browser");export{wt as F,nn as G,ag as a,ju as b,vT as c,Xe as d,ST as e,IT as f,cm as g,CT as h,A0 as i,AT as j,ET as k,RT as l,lp as m,bT as n,ku as o,TT as p,yT as r,kT as s,_T as t,wT as v,mT as w};
