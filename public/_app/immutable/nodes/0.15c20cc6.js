import{S as Oe,i as Ue,s as We,k as h,a as $,C as X,q as x,l as m,m as p,h as d,c as B,D as Y,r as G,E as Ce,n as i,b as qe,F as c,G as ze,H as xe,I as Xe,y as Ye,z as Qe,A as et,J as tt,K as at,L as nt,g as Ie,d as ke,B as rt}from"../chunks/index.fb970b68.js";import{p as Ge}from"../chunks/stores.acb871fc.js";var F,Z,Ke,Q,je=-1,K=function(t){addEventListener("pageshow",function(e){e.persisted&&(je=e.timeStamp,t(e))},!0)},ce=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},te=function(){var t=ce();return t&&t.activationStart||0},S=function(t,e){var a=ce(),r="navigate";return je>=0?r="back-forward-cache":a&&(document.prerendering||te()>0?r="prerender":document.wasDiscarded?r="restore":a.type&&(r=a.type.replace(/_/g,"-"))),{name:t,value:e===void 0?-1:e,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},ae=function(t,e,a){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){var r=new PerformanceObserver(function(n){Promise.resolve().then(function(){e(n.getEntries())})});return r.observe(Object.assign({type:t,buffered:!0},a||{})),r}}catch{}},A=function(t,e,a,r){var n,l;return function(o){e.value>=0&&(o||r)&&((l=e.value-(n||0))||n===void 0)&&(n=e.value,e.delta=l,e.rating=function(s,u){return s>u[1]?"poor":s>u[0]?"needs-improvement":"good"}(e.value,a),t(e))}},ue=function(t){requestAnimationFrame(function(){return requestAnimationFrame(function(){return t()})})},fe=function(t){var e=function(a){a.type!=="pagehide"&&document.visibilityState!=="hidden"||t(a)};addEventListener("visibilitychange",e,!0),addEventListener("pagehide",e,!0)},de=function(t){var e=!1;return function(a){e||(t(a),e=!0)}},q=-1,De=function(){return document.visibilityState!=="hidden"||document.prerendering?1/0:0},ee=function(t){document.visibilityState==="hidden"&&q>-1&&(q=t.type==="visibilitychange"?t.timeStamp:0,st())},$e=function(){addEventListener("visibilitychange",ee,!0),addEventListener("prerenderingchange",ee,!0)},st=function(){removeEventListener("visibilitychange",ee,!0),removeEventListener("prerenderingchange",ee,!0)},ve=function(){return q<0&&(q=De(),$e(),K(function(){setTimeout(function(){q=De(),$e()},0)})),{get firstHiddenTime(){return q}}},ne=function(t){document.prerendering?addEventListener("prerenderingchange",function(){return t()},!0):t()},Be=[1800,3e3],Ne=function(t,e){e=e||{},ne(function(){var a,r=ve(),n=S("FCP"),l=ae("paint",function(o){o.forEach(function(s){s.name==="first-contentful-paint"&&(l.disconnect(),s.startTime<r.firstHiddenTime&&(n.value=Math.max(s.startTime-te(),0),n.entries.push(s),a(!0)))})});l&&(a=A(t,n,Be,e.reportAllChanges),K(function(o){n=S("FCP"),a=A(t,n,Be,e.reportAllChanges),ue(function(){n.value=performance.now()-o.timeStamp,a(!0)})}))})},Fe=[.1,.25],it=function(t,e){e=e||{},Ne(de(function(){var a,r=S("CLS",0),n=0,l=[],o=function(u){u.forEach(function(f){if(!f.hadRecentInput){var C=l[0],_=l[l.length-1];n&&f.startTime-_.startTime<1e3&&f.startTime-C.startTime<5e3?(n+=f.value,l.push(f)):(n=f.value,l=[f])}}),n>r.value&&(r.value=n,r.entries=l,a())},s=ae("layout-shift",o);s&&(a=A(t,r,Fe,e.reportAllChanges),fe(function(){o(s.takeRecords()),a(!0)}),K(function(){n=0,r=S("CLS",0),a=A(t,r,Fe,e.reportAllChanges),ue(function(){return a()})}),setTimeout(a,0))}))},N={passive:!0,capture:!0},ot=new Date,He=function(t,e){F||(F=e,Z=t,Ke=new Date,Je(removeEventListener),Ze())},Ze=function(){if(Z>=0&&Z<Ke-ot){var t={entryType:"first-input",name:F.type,target:F.target,cancelable:F.cancelable,startTime:F.timeStamp,processingStart:F.timeStamp+Z};Q.forEach(function(e){e(t)}),Q=[]}},lt=function(t){if(t.cancelable){var e=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;t.type=="pointerdown"?function(a,r){var n=function(){He(a,r),o()},l=function(){o()},o=function(){removeEventListener("pointerup",n,N),removeEventListener("pointercancel",l,N)};addEventListener("pointerup",n,N),addEventListener("pointercancel",l,N)}(e,t):He(e,t)}},Je=function(t){["mousedown","keydown","touchstart","pointerdown"].forEach(function(e){return t(e,lt,N)})},Me=[100,300],ct=function(t,e){e=e||{},ne(function(){var a,r=ve(),n=S("FID"),l=function(u){u.startTime<r.firstHiddenTime&&(n.value=u.processingStart-u.startTime,n.entries.push(u),a(!0))},o=function(u){u.forEach(l)},s=ae("first-input",o);a=A(t,n,Me,e.reportAllChanges),s&&fe(de(function(){o(s.takeRecords()),s.disconnect()})),s&&K(function(){var u;n=S("FID"),a=A(t,n,Me,e.reportAllChanges),Q=[],Z=-1,F=null,Je(addEventListener),u=l,Q.push(u),Ze()})})},Pe=[2500,4e3],le={},ut=function(t,e){e=e||{},ne(function(){var a,r=ve(),n=S("LCP"),l=function(u){var f=u[u.length-1];f&&f.startTime<r.firstHiddenTime&&(n.value=Math.max(f.startTime-te(),0),n.entries=[f],a())},o=ae("largest-contentful-paint",l);if(o){a=A(t,n,Pe,e.reportAllChanges);var s=de(function(){le[n.id]||(l(o.takeRecords()),o.disconnect(),le[n.id]=!0,a(!0))});["keydown","click"].forEach(function(u){addEventListener(u,function(){return setTimeout(s,0)},!0)}),fe(s),K(function(u){n=S("LCP"),a=A(t,n,Pe,e.reportAllChanges),ue(function(){n.value=performance.now()-u.timeStamp,le[n.id]=!0,a(!0)})})}})},Re=[800,1800],ft=function t(e){document.prerendering?ne(function(){return t(e)}):document.readyState!=="complete"?addEventListener("load",function(){return t(e)},!0):setTimeout(e,0)},dt=function(t,e){e=e||{};var a=S("TTFB"),r=A(t,a,Re,e.reportAllChanges);ft(function(){var n=ce();if(n){var l=n.responseStart;if(l<=0||l>performance.now())return;a.value=Math.max(l-te(),0),a.entries=[n],r(!0),K(function(){a=S("TTFB",0),(r=A(t,a,Re,e.reportAllChanges))(!0)})}})};const Ve="https://vitals.vercel-analytics.com/v1/vitals";function vt(){var t;return((t=navigator==null?void 0:navigator.connection)==null?void 0:t.effectiveType)??""}function j(t,e){const a=Object.entries(e.params).reduce((l,[o,s])=>l.replace(s,`[${o}]`),e.path),r={dsn:e.analyticsId,id:t.id,page:a,href:location.href,event_name:t.name,value:t.value.toString(),speed:vt()};e.debug&&console.log("[Web Vitals]",t.name,JSON.stringify(r,null,2));const n=new Blob([new URLSearchParams(r).toString()],{type:"application/x-www-form-urlencoded"});navigator.sendBeacon?navigator.sendBeacon(Ve,n):fetch(Ve,{body:n,method:"POST",credentials:"omit",keepalive:!0})}function pt(t){try{console.log(`[Web Vitals] for page ${t.path}`),ct(e=>j(e,t)),dt(e=>j(e,t)),ut(e=>j(e,t)),it(e=>j(e,t)),Ne(e=>j(e,t))}catch(e){console.error(`[Web Vitals] for page ${t.path}`,e)}}const ht=""+new URL("../assets/svelte-logo.87df40b8.svg",import.meta.url).href,mt=""+new URL("../assets/github.1ea8d62e.svg",import.meta.url).href;function gt(t){let e,a,r,n,l,o,s,u,f,C,_,E,w,g,v,y,L,T,I,H,re,k,M,se,J,ie,D,V,oe,O,P,R,pe;return{c(){e=h("header"),a=h("div"),r=h("a"),n=h("img"),o=$(),s=h("nav"),u=X("svg"),f=X("path"),C=$(),_=h("ul"),E=h("li"),w=h("a"),g=x("Home"),y=$(),L=h("li"),T=h("a"),I=x("About"),re=$(),k=h("li"),M=h("a"),se=x("Sverdle"),ie=$(),D=X("svg"),V=X("path"),oe=$(),O=h("div"),P=h("a"),R=h("img"),this.h()},l(z){e=m(z,"HEADER",{class:!0});var b=p(e);a=m(b,"DIV",{class:!0});var he=p(a);r=m(he,"A",{href:!0,class:!0});var me=p(r);n=m(me,"IMG",{src:!0,alt:!0,class:!0}),me.forEach(d),he.forEach(d),o=B(b),s=m(b,"NAV",{class:!0});var U=p(s);u=Y(U,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var ge=p(u);f=Y(ge,"path",{d:!0,class:!0}),p(f).forEach(d),ge.forEach(d),C=B(U),_=m(U,"UL",{class:!0});var W=p(_);E=m(W,"LI",{"aria-current":!0,class:!0});var _e=p(E);w=m(_e,"A",{href:!0,class:!0});var Ee=p(w);g=G(Ee,"Home"),Ee.forEach(d),_e.forEach(d),y=B(W),L=m(W,"LI",{"aria-current":!0,class:!0});var ye=p(L);T=m(ye,"A",{href:!0,class:!0});var be=p(T);I=G(be,"About"),be.forEach(d),ye.forEach(d),re=B(W),k=m(W,"LI",{"aria-current":!0,class:!0});var we=p(k);M=m(we,"A",{href:!0,class:!0});var Le=p(M);se=G(Le,"Sverdle"),Le.forEach(d),we.forEach(d),W.forEach(d),ie=B(U),D=Y(U,"svg",{viewBox:!0,"aria-hidden":!0,class:!0});var Te=p(D);V=Y(Te,"path",{d:!0,class:!0}),p(V).forEach(d),Te.forEach(d),U.forEach(d),oe=B(b),O=m(b,"DIV",{class:!0});var Se=p(O);P=m(Se,"A",{href:!0,class:!0});var Ae=p(P);R=m(Ae,"IMG",{src:!0,alt:!0,class:!0}),Ae.forEach(d),Se.forEach(d),b.forEach(d),this.h()},h(){Ce(n.src,l=ht)||i(n,"src",l),i(n,"alt","SvelteKit"),i(n,"class","svelte-1u9z1tp"),i(r,"href","https://kit.svelte.dev"),i(r,"class","svelte-1u9z1tp"),i(a,"class","corner svelte-1u9z1tp"),i(f,"d","M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"),i(f,"class","svelte-1u9z1tp"),i(u,"viewBox","0 0 2 3"),i(u,"aria-hidden","true"),i(u,"class","svelte-1u9z1tp"),i(w,"href","/"),i(w,"class","svelte-1u9z1tp"),i(E,"aria-current",v=t[0].url.pathname==="/"?"page":void 0),i(E,"class","svelte-1u9z1tp"),i(T,"href","/about"),i(T,"class","svelte-1u9z1tp"),i(L,"aria-current",H=t[0].url.pathname==="/about"?"page":void 0),i(L,"class","svelte-1u9z1tp"),i(M,"href","/sverdle"),i(M,"class","svelte-1u9z1tp"),i(k,"aria-current",J=t[0].url.pathname.startsWith("/sverdle")?"page":void 0),i(k,"class","svelte-1u9z1tp"),i(_,"class","svelte-1u9z1tp"),i(V,"d","M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"),i(V,"class","svelte-1u9z1tp"),i(D,"viewBox","0 0 2 3"),i(D,"aria-hidden","true"),i(D,"class","svelte-1u9z1tp"),i(s,"class","svelte-1u9z1tp"),Ce(R.src,pe=mt)||i(R,"src",pe),i(R,"alt","GitHub"),i(R,"class","svelte-1u9z1tp"),i(P,"href","https://github.com/sveltejs/kit"),i(P,"class","svelte-1u9z1tp"),i(O,"class","corner svelte-1u9z1tp"),i(e,"class","svelte-1u9z1tp")},m(z,b){qe(z,e,b),c(e,a),c(a,r),c(r,n),c(e,o),c(e,s),c(s,u),c(u,f),c(s,C),c(s,_),c(_,E),c(E,w),c(w,g),c(_,y),c(_,L),c(L,T),c(T,I),c(_,re),c(_,k),c(k,M),c(M,se),c(s,ie),c(s,D),c(D,V),c(e,oe),c(e,O),c(O,P),c(P,R)},p(z,[b]){b&1&&v!==(v=z[0].url.pathname==="/"?"page":void 0)&&i(E,"aria-current",v),b&1&&H!==(H=z[0].url.pathname==="/about"?"page":void 0)&&i(L,"aria-current",H),b&1&&J!==(J=z[0].url.pathname.startsWith("/sverdle")?"page":void 0)&&i(k,"aria-current",J)},i:ze,o:ze,d(z){z&&d(e)}}}function _t(t,e,a){let r;return xe(t,Ge,n=>a(0,r=n)),[r]}class Et extends Oe{constructor(e){super(),Ue(this,e,_t,gt,We,{})}}function yt(t){let e,a,r,n,l,o,s,u,f,C,_,E;a=new Et({});const w=t[3].default,g=Xe(w,t,t[2],null);return{c(){e=h("div"),Ye(a.$$.fragment),r=$(),n=h("main"),g&&g.c(),l=$(),o=h("footer"),s=h("p"),u=x("visit "),f=h("a"),C=x("kit.svelte.dev"),_=x(" to learn SvelteKit"),this.h()},l(v){e=m(v,"DIV",{class:!0});var y=p(e);Qe(a.$$.fragment,y),r=B(y),n=m(y,"MAIN",{class:!0});var L=p(n);g&&g.l(L),L.forEach(d),l=B(y),o=m(y,"FOOTER",{class:!0});var T=p(o);s=m(T,"P",{});var I=p(s);u=G(I,"visit "),f=m(I,"A",{href:!0,class:!0});var H=p(f);C=G(H,"kit.svelte.dev"),H.forEach(d),_=G(I," to learn SvelteKit"),I.forEach(d),T.forEach(d),y.forEach(d),this.h()},h(){i(n,"class","svelte-8o1gnw"),i(f,"href","https://kit.svelte.dev"),i(f,"class","svelte-8o1gnw"),i(o,"class","svelte-8o1gnw"),i(e,"class","app svelte-8o1gnw")},m(v,y){qe(v,e,y),et(a,e,null),c(e,r),c(e,n),g&&g.m(n,null),c(e,l),c(e,o),c(o,s),c(s,u),c(s,f),c(f,C),c(s,_),E=!0},p(v,[y]){g&&g.p&&(!E||y&4)&&tt(g,w,v,v[2],E?nt(w,v[2],y,null):at(v[2]),null)},i(v){E||(Ie(a.$$.fragment,v),Ie(g,v),E=!0)},o(v){ke(a.$$.fragment,v),ke(g,v),E=!1},d(v){v&&d(e),rt(a),g&&g.d(v)}}}function bt(t,e,a){let r;xe(t,Ge,s=>a(1,r=s));let{$$slots:n={},$$scope:l}=e,{data:o}=e;return t.$$set=s=>{"data"in s&&a(0,o=s.data),"$$scope"in s&&a(2,l=s.$$scope)},t.$$.update=()=>{t.$$.dirty&3&&o!=null&&o.analyticsId&&pt({path:r.url.pathname,params:r.params,analyticsId:o.analyticsId})},[o,r,l,n]}class Tt extends Oe{constructor(e){super(),Ue(this,e,bt,yt,We,{data:0})}}export{Tt as component};
