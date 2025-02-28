import{B as _,K as S,M as j,Ra as L,Va as B,_a as P,ab as R,ba as D,ca as A,ea as T,g as I,j as M,la as p,ma as b,qa as a,rd as k,x as y,y as N,ya as g}from"./chunk-UI7FGHJG.js";function Z(t){return t!=null&&`${t}`!="false"}function J(t,n=0){return K(t)?Number(t):arguments.length===2?n:0}function K(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function E(t){return Array.isArray(t)?t:[t]}function Y(t){return t==null?"":typeof t=="string"?t:`${t}px`}function tt(t){return t instanceof B?t.nativeElement:t}var x;try{x=typeof Intl<"u"&&Intl.v8BreakIterator}catch{x=!1}var F=(()=>{class t{constructor(e){this._platformId=e,this.isBrowser=this._platformId?k(this._platformId):typeof document=="object"&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!!(window.chrome||x)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}static{this.\u0275fac=function(i){return new(i||t)(a(P))}}static{this.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var u,O=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function at(){if(u)return u;if(typeof document!="object"||!document)return u=new Set(O),u;let t=document.createElement("input");return u=new Set(O.filter(n=>(t.setAttribute("type",n),t.type===n))),u}var l;function Q(){if(l==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>l=!0}))}finally{l=l||!1}return l}function dt(t){return Q()?t:!!t.capture}var m=function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t}(m||{}),w,d;function ct(){if(d==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return d=!1,d;if("scrollBehavior"in document.documentElement.style)d=!0;else{let t=Element.prototype.scrollTo;t?d=!/\{\s*\[native code\]\s*\}/.test(t.toString()):d=!1}}return d}function ut(){if(typeof document!="object"||!document)return m.NORMAL;if(w==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),w=m.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,w=t.scrollLeft===0?m.NEGATED:m.INVERTED),t.remove()}return w}var v;function $(){if(v==null){let t=typeof document<"u"?document.head:null;v=!!(t&&(t.createShadowRoot||t.attachShadow))}return v}function pt(t){if($()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function lt(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function mt(t){return t.composedPath?t.composedPath()[0]:t.target}function ft(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var It=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=g({type:t})}static{this.\u0275inj=b({})}}return t})(),C=new Set,c,z=(()=>{class t{constructor(e,i){this._platform=e,this._nonce=i,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):X}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&H(e,this._nonce),this._matchMedia(e)}static{this.\u0275fac=function(i){return new(i||t)(a(F),a(R,8))}}static{this.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function H(t,n){if(!C.has(t))try{c||(c=document.createElement("style"),n&&c.setAttribute("nonce",n),c.setAttribute("type","text/css"),document.head.appendChild(c)),c.sheet&&(c.sheet.insertRule(`@media ${t} {body{ }}`,0),C.add(t))}catch(e){console.error(e)}}function X(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var Mt=(()=>{class t{constructor(e,i){this._mediaMatcher=e,this._zone=i,this._queries=new Map,this._destroySubject=new M}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return W(E(e)).some(f=>this._registerQuery(f).mql.matches)}observe(e){let f=W(E(e)).map(r=>this._registerQuery(r).observable),o=N(f);return o=_(o.pipe(j(1)),o.pipe(D(1),S(0))),o.pipe(y(r=>{let s={matches:!1,breakpoints:{}};return r.forEach(({matches:h,query:V})=>{s.matches=s.matches||h,s.breakpoints[V]=h}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new I(r=>{let s=h=>this._zone.run(()=>r.next(h));return i.addListener(s),()=>{i.removeListener(s)}}).pipe(A(i),y(({matches:r})=>({query:e,matches:r})),T(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static{this.\u0275fac=function(i){return new(i||t)(a(z),a(L))}}static{this.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function W(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var Nt={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};export{Z as a,J as b,K as c,E as d,Y as e,tt as f,F as g,at as h,dt as i,m as j,ct as k,ut as l,pt as m,lt as n,mt as o,ft as p,It as q,z as r,Mt as s,Nt as t};
