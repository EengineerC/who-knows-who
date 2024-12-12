import{S as He,i as Me,s as Ne,k as W,a as X,q as j,e as ae,Q as Pe,l as A,h as p,c as C,m as G,r as T,n as b,U as M,F as y,b as E,O as $,R as Ee,V as Se,G as re,P as Xe,H as Ce,W as Oe,X as We,p as J,T as ze,u as ee,Y as Ae,Z as Ge,_ as oe}from"../chunks/index.1eb2484a.js";import{e as De}from"../chunks/forms.f21909fe.js";import{r as Ie}from"../chunks/index.2783d2dd.js";const Ve=(s,e={})=>{de(e);let{colors:t=["#FFC700","#FF0000","#2E3191","#41BBC7"],duration:l=3500,force:o=.5,particleCount:c=150,particleShape:r="mix",particleSize:a=12,destroyAfterDone:i=!0,stageHeight:g=800,stageWidth:m=1600}=e;(function(n){const _=Y("style");_.dataset.neoconfetti="",_.textContent='@keyframes fk9XWG_y-axis{to{transform:translate3d(0,var(--stage-height),0)}}@keyframes fk9XWG_x-axis{to{transform:translate3d(var(--x-landing-point),0,0)}}@keyframes fk9XWG_rotation{50%{transform:rotate3d(var(--half-rotation),180deg)}to{transform:rotate3d(var(--rotation),360deg)}}.fk9XWG_container{width:0;height:0;z-index:1200;position:relative;overflow:visible}.fk9XWG_particle{animation:x-axis var(--duration-chaos)forwards cubic-bezier(var(--x1),var(--x2),var(--x3),var(--x4));animation-name:fk9XWG_x-axis}.fk9XWG_particle>div{animation:y-axis var(--duration-chaos)forwards cubic-bezier(var(--y1),var(--y2),var(--y3),var(--y4));width:var(--width);height:var(--height);animation-name:fk9XWG_y-axis;position:absolute;top:0;left:0}.fk9XWG_particle>div:before{height:100%;width:100%;content:"";background-color:var(--bgcolor);animation:rotation var(--rotation-duration)infinite linear;border-radius:var(--border-radius);animation-name:fk9XWG_rotation;display:block}',Z(document.head,_)})(),s.classList.add("fk9XWG_container"),s.style.setProperty("--stage-height",g+"px");let v,h=fe(c,t),f=ne(s,h);function u(n,_){const S=L(O()*(Ue-1)),z=r!=="rectangles"&&(r==="circles"||Re(S)),w=(I,N)=>n.style.setProperty(I,N+"");w("--x-landing-point",K(U(ue(_,90)-180),0,180,-m/2,m/2)+"px"),w("--duration-chaos",l-L(1e3*O())+"ms");const D=O()<Be?q(O()*Fe,2):0;w("--x1",D),w("--x2",-1*D),w("--x3",D),w("--x4",q(U(K(U(ue(_,90)-180),0,180,-1,1)),4)),w("--y1",q(O()*ce,4)),w("--y2",q(O()*o*(je()?1:-1),4)),w("--y3",ce),w("--y4",q(Le(K(U(_-180),0,180,o,-o),0),4)),w("--width",(z?a:L(4*O())+a/2)+"px"),w("--height",(z?a:L(2*O())+a)+"px");const F=S.toString(2).padStart(3,"0").split("");w("--half-rotation",F.map(I=>+I/2+"")),w("--rotation",F),w("--rotation-duration",q(O()*(qe-ie)+ie)+"ms"),w("--border-radius",z?"50%":0)}for(const[n,_]of Object.entries(f))u(_,h[+n].degree);return Promise.resolve().then(()=>v=setTimeout(()=>i&&(s.innerHTML=""),l)),{update(n){de(n);const _=n.particleCount??c,S=n.colors??t,z=n.stageHeight??g;if(h=fe(_,S),_===c&&JSON.stringify(t)!==JSON.stringify(S))for(const[w,{color:D}]of Object.entries(h))f[+w].style.setProperty("--bgcolor",D);_!==c&&(s.innerHTML="",f=ne(s,h)),i&&!n.destroyAfterDone&&clearTimeout(v),s.style.setProperty("--stage-height",z+"px"),t=S,l=n.duration??l,o=n.force??o,c=_,r=n.particleShape??r,a=n.particleSize??a,i=n.destroyAfterDone??i,g=z,m=n.stageWidth??m},destroy(){clearTimeout(v)}}};function ne(s,e=[]){const t=[];for(const{color:l}of e){const o=Y("div");o.className="fk9XWG_particle",o.style.setProperty("--bgcolor",l);const c=Y("div");Z(o,c),Z(s,o),t.push(o)}return t}const ie=200,qe=800,Be=.1,Fe=.3,ce=.5,U=Math.abs,O=Math.random,L=Math.round,Le=Math.max,Y=s=>document.createElement(s),Z=(s,e)=>s.appendChild(e),fe=(s,e)=>Array.from({length:s},(t,l)=>({color:e[l%e.length],degree:360*l/s})),q=(s,e=2)=>L((s+Number.EPSILON)*10**e)/10**e,K=(s,e,t,l,o)=>(s-e)*(o-l)/(t-e)+l,ue=(s,e)=>s+e>360?s+e-360:s+e,je=()=>O()>.5,Ue=6,Re=s=>s!==1&&je(),x=s=>s===void 0,B=(s,e)=>{if(!x(s)&&Number.isSafeInteger(s)&&s<0)throw new Error(e+" must be a positive integer")},de=({particleCount:s,duration:e,colors:t,particleSize:l,force:o,stageHeight:c,stageWidth:r,particleShape:a})=>{if(B(s,"particleCount"),B(e,"duration"),B(l,"particleSize"),B(o,"force"),B(c,"stageHeight"),B(r,"stageWidth"),!x(a)&&!/^(mix|circles|rectangles)$/i.test(a))throw new Error('particlesShape should be either "mix" or "circles" or "rectangle"');if(!x(t)&&!Array.isArray(t))throw new Error("colors must be an array of strings");if(o>1)throw new Error("force must be within 0 and 1")},Te="(prefers-reduced-motion: reduce)",Je=()=>window.matchMedia(Te).matches,Ke=Ie(Je(),s=>{{const e=l=>{s(l.matches)},t=window.matchMedia(Te);return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}}});const{document:Q,window:Qe}=Oe;function he(s,e,t){const l=s.slice();return l[9]=e[t],l}function _e(s,e,t){const l=s.slice();return l[12]=e[t],l}function pe(s,e,t){const l=s.slice();l[9]=e[t];const o=l[9]===l[3];return l[15]=o,l}function me(s,e,t){var m,v;const l=s.slice();l[18]=e[t];const o=(m=l[0].answers[l[9]])==null?void 0:m[l[18]];l[19]=o;const c=((v=l[0].guesses[l[9]])==null?void 0:v[l[18]])??"";l[20]=c;const r=l[15]&&l[18]===l[0].guesses[l[9]].length;l[21]=r;const a=l[19]==="x";l[22]=a;const i=l[19]==="c";l[23]=i;const g=l[19]==="_";return l[24]=g,l}function Ye(s){let e;return{c(){e=j("empty")},l(t){e=T(t,"empty")},m(t,l){E(t,e,l)},d(t){t&&p(e)}}}function Ze(s){let e;return{c(){e=j("(absent)")},l(t){e=T(t,"(absent)")},m(t,l){E(t,e,l)},d(t){t&&p(e)}}}function xe(s){let e;return{c(){e=j("(present)")},l(t){e=T(t,"(present)")},m(t,l){E(t,e,l)},d(t){t&&p(e)}}}function $e(s){let e;return{c(){e=j("(correct)")},l(t){e=T(t,"(correct)")},m(t,l){E(t,e,l)},d(t){t&&p(e)}}}function ge(s,e){let t,l=e[20]+"",o,c,r,a,i,g,m;function v(u,n){return u[22]?$e:u[23]?xe:u[24]?Ze:Ye}let h=v(e),f=h(e);return{key:s,first:null,c(){t=W("div"),o=j(l),c=X(),r=W("span"),f.c(),a=X(),i=W("input"),this.h()},l(u){t=A(u,"DIV",{class:!0});var n=G(t);o=T(n,l),c=C(n),r=A(n,"SPAN",{class:!0});var _=G(r);f.l(_),_.forEach(p),a=C(n),i=A(n,"INPUT",{name:!0,type:!0}),n.forEach(p),this.h()},h(){b(r,"class","visually-hidden"),b(i,"name","guess"),i.disabled=g=!e[15],b(i,"type","hidden"),i.value=m=e[20],b(t,"class","letter svelte-1pg2j5l"),M(t,"exact",e[22]),M(t,"close",e[23]),M(t,"missing",e[24]),M(t,"selected",e[21]),this.first=t},m(u,n){E(u,t,n),y(t,o),y(t,c),y(t,r),f.m(r,null),y(t,a),y(t,i)},p(u,n){e=u,n&1&&l!==(l=e[20]+"")&&ee(o,l),h!==(h=v(e))&&(f.d(1),f=h(e),f&&(f.c(),f.m(r,null))),n&8&&g!==(g=!e[15])&&(i.disabled=g),n&1&&m!==(m=e[20])&&(i.value=m),n&1&&M(t,"exact",e[22]),n&1&&M(t,"close",e[23]),n&1&&M(t,"missing",e[24]),n&9&&M(t,"selected",e[21])},d(u){u&&p(t),f.d()}}}function be(s,e){let t,l,o=e[9]+1+"",c,r,a,i=[],g=new Map,m,v=Array.from(Array(5).keys());const h=f=>f[18];for(let f=0;f<v.length;f+=1){let u=me(e,v,f),n=h(u);g.set(n,i[f]=ge(n,u))}return{key:s,first:null,c(){t=W("h2"),l=j("Row "),c=j(o),r=X(),a=W("div");for(let f=0;f<i.length;f+=1)i[f].c();m=X(),this.h()},l(f){t=A(f,"H2",{class:!0});var u=G(t);l=T(u,"Row "),c=T(u,o),u.forEach(p),r=C(f),a=A(f,"DIV",{class:!0});var n=G(a);for(let _=0;_<i.length;_+=1)i[_].l(n);m=C(n),n.forEach(p),this.h()},h(){b(t,"class","visually-hidden"),b(a,"class","row svelte-1pg2j5l"),M(a,"current",e[15]),this.first=t},m(f,u){E(f,t,u),y(t,l),y(t,c),E(f,r,u),E(f,a,u);for(let n=0;n<i.length;n+=1)i[n]&&i[n].m(a,null);y(a,m)},p(f,u){e=f,u&9&&(v=Array.from(Array(5).keys()),i=Se(i,u,h,1,e,v,g,a,We,ge,m,me)),u&8&&M(a,"current",e[15])},d(f){f&&p(t),f&&p(r),f&&p(a);for(let u=0;u<i.length;u+=1)i[u].d()}}}function et(s){let e,t,l,o,c,r,a,i,g,m,v=["qwertyuiop","asdfghjkl","zxcvbnm"],h=[];for(let f=0;f<3;f+=1)h[f]=ye(he(s,v,f));return{c(){e=W("div"),t=W("button"),l=j("enter"),c=X(),r=W("button"),a=j("back"),i=X();for(let f=0;f<3;f+=1)h[f].c();this.h()},l(f){e=A(f,"DIV",{class:!0});var u=G(e);t=A(u,"BUTTON",{"data-key":!0,class:!0});var n=G(t);l=T(n,"enter"),n.forEach(p),c=C(u),r=A(u,"BUTTON",{"data-key":!0,formaction:!0,name:!0,class:!0});var _=G(r);a=T(_,"back"),_.forEach(p),i=C(u);for(let S=0;S<3;S+=1)h[S].l(u);u.forEach(p),this.h()},h(){b(t,"data-key","enter"),t.disabled=o=!s[6],b(t,"class","svelte-1pg2j5l"),M(t,"selected",s[6]),b(r,"data-key","backspace"),b(r,"formaction","?/update"),b(r,"name","key"),r.value="backspace",b(r,"class","svelte-1pg2j5l"),b(e,"class","keyboard svelte-1pg2j5l")},m(f,u){E(f,e,u),y(e,t),y(t,l),y(e,c),y(e,r),y(r,a),y(e,i);for(let n=0;n<3;n+=1)h[n]&&h[n].m(e,null);g||(m=$(r,"click",Ae(s[8])),g=!0)},p(f,u){if(u&64&&o!==(o=!f[6])&&(t.disabled=o),u&64&&M(t,"selected",f[6]),u&301){v=["qwertyuiop","asdfghjkl","zxcvbnm"];let n;for(n=0;n<3;n+=1){const _=he(f,v,n);h[n]?h[n].p(_,u):(h[n]=ye(_),h[n].c(),h[n].m(e,null))}for(;n<3;n+=1)h[n].d(1)}},d(f){f&&p(e),Ge(h,f),g=!1,m()}}}function tt(s){let e,t,l=s[4]?"you won :)":"game over :(",o,c,r=!s[4]&&s[0].answer&&ke(s);return{c(){r&&r.c(),e=X(),t=W("button"),o=j(l),c=j(" play again?"),this.h()},l(a){r&&r.l(a),e=C(a),t=A(a,"BUTTON",{"data-key":!0,class:!0,formaction:!0});var i=G(t);o=T(i,l),c=T(i," play again?"),i.forEach(p),this.h()},h(){b(t,"data-key","enter"),b(t,"class","restart selected svelte-1pg2j5l"),b(t,"formaction","?/restart")},m(a,i){r&&r.m(a,i),E(a,e,i),E(a,t,i),y(t,o),y(t,c)},p(a,i){!a[4]&&a[0].answer?r?r.p(a,i):(r=ke(a),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),i&16&&l!==(l=a[4]?"you won :)":"game over :(")&&ee(o,l)},d(a){r&&r.d(a),a&&p(e),a&&p(t)}}}function ve(s){let e,t,l,o,c,r,a;return{c(){e=W("button"),t=j(s[12]),this.h()},l(i){e=A(i,"BUTTON",{"data-key":!0,class:!0,formaction:!0,name:!0,"aria-label":!0});var g=G(e);t=T(g,s[12]),g.forEach(p),this.h()},h(){b(e,"data-key",s[12]),b(e,"class",l=oe(s[2][s[12]])+" svelte-1pg2j5l"),e.disabled=o=s[0].guesses[s[3]].length===5,b(e,"formaction","?/update"),b(e,"name","key"),e.value=s[12],b(e,"aria-label",c=s[12]+" "+(s[5][s[12]]||""))},m(i,g){E(i,e,g),y(e,t),r||(a=$(e,"click",Ae(s[8])),r=!0)},p(i,g){g&4&&l!==(l=oe(i[2][i[12]])+" svelte-1pg2j5l")&&b(e,"class",l),g&9&&o!==(o=i[0].guesses[i[3]].length===5)&&(e.disabled=o),g&32&&c!==(c=i[12]+" "+(i[5][i[12]]||""))&&b(e,"aria-label",c)},d(i){i&&p(e),r=!1,a()}}}function ye(s){let e,t,l=s[9],o=[];for(let c=0;c<l.length;c+=1)o[c]=ve(_e(s,l,c));return{c(){e=W("div");for(let c=0;c<o.length;c+=1)o[c].c();t=X(),this.h()},l(c){e=A(c,"DIV",{class:!0});var r=G(e);for(let a=0;a<o.length;a+=1)o[a].l(r);t=C(r),r.forEach(p),this.h()},h(){b(e,"class","row svelte-1pg2j5l")},m(c,r){E(c,e,r);for(let a=0;a<o.length;a+=1)o[a]&&o[a].m(e,null);y(e,t)},p(c,r){if(r&301){l=c[9];let a;for(a=0;a<l.length;a+=1){const i=_e(c,l,a);o[a]?o[a].p(i,r):(o[a]=ve(i),o[a].c(),o[a].m(e,t))}for(;a<o.length;a+=1)o[a].d(1);o.length=l.length}},d(c){c&&p(e),Ge(o,c)}}}function ke(s){let e,t,l=s[0].answer+"",o,c;return{c(){e=W("p"),t=j('the answer was "'),o=j(l),c=j('"')},l(r){e=A(r,"P",{});var a=G(e);t=T(a,'the answer was "'),o=T(a,l),c=T(a,'"'),a.forEach(p)},m(r,a){E(r,e,a),y(e,t),y(e,o),y(e,c)},p(r,a){a&1&&l!==(l=r[0].answer+"")&&ee(o,l)},d(r){r&&p(e)}}}function we(s){let e,t,l,o;return{c(){e=W("div"),this.h()},l(c){e=A(c,"DIV",{style:!0}),G(e).forEach(p),this.h()},h(){J(e,"position","absolute"),J(e,"left","50%"),J(e,"top","30%")},m(c,r){E(c,e,r),l||(o=Ee(t=Ve.call(null,e,{particleCount:s[7]?0:void 0,force:.7,stageWidth:window.innerWidth,stageHeight:window.innerHeight,colors:["#ff3e00","#40b3ff","#676778"]})),l=!0)},p(c,r){t&&ze(t.update)&&r&128&&t.update.call(null,{particleCount:c[7]?0:void 0,force:.7,stageWidth:window.innerWidth,stageHeight:window.innerHeight,colors:["#ff3e00","#40b3ff","#676778"]})},d(c){c&&p(e),l=!1,o()}}}function lt(s){let e,t,l,o,c,r,a,i,g,m,v=[],h=new Map,f,u,n,_,S,z,w=Array.from(Array(6).keys());const D=d=>d[9];for(let d=0;d<w.length;d+=1){let k=pe(s,w,d),P=D(k);h.set(P,v[d]=be(P,k))}function F(d,k){return d[4]||d[0].answers.length>=6?tt:et}let I=F(s),N=I(s),H=s[4]&&we(s);return{c(){e=W("meta"),t=X(),l=W("h1"),o=j("Sverdle"),c=X(),r=W("form"),a=W("a"),i=j("How to play"),g=X(),m=W("div");for(let d=0;d<v.length;d+=1)v[d].c();f=X(),u=W("div"),N.c(),n=X(),H&&H.c(),_=ae(),this.h()},l(d){const k=Pe("svelte-18lvto8",Q.head);e=A(k,"META",{name:!0,content:!0}),k.forEach(p),t=C(d),l=A(d,"H1",{class:!0});var P=G(l);o=T(P,"Sverdle"),P.forEach(p),c=C(d),r=A(d,"FORM",{method:!0,action:!0,class:!0});var V=G(r);a=A(V,"A",{class:!0,href:!0});var te=G(a);i=T(te,"How to play"),te.forEach(p),g=C(V),m=A(V,"DIV",{class:!0});var le=G(m);for(let R=0;R<v.length;R+=1)v[R].l(le);le.forEach(p),f=C(V),u=A(V,"DIV",{class:!0});var se=G(u);N.l(se),se.forEach(p),V.forEach(p),n=C(d),H&&H.l(d),_=ae(),this.h()},h(){var d;Q.title="Sverdle",b(e,"name","description"),b(e,"content","A Wordle clone written in SvelteKit"),b(l,"class","visually-hidden"),b(a,"class","how-to-play svelte-1pg2j5l"),b(a,"href","/sverdle/how-to-play"),b(m,"class","grid svelte-1pg2j5l"),M(m,"playing",!s[4]),M(m,"bad-guess",(d=s[1])==null?void 0:d.badGuess),b(u,"class","controls svelte-1pg2j5l"),b(r,"method","POST"),b(r,"action","?/enter"),b(r,"class","svelte-1pg2j5l")},m(d,k){y(Q.head,e),E(d,t,k),E(d,l,k),y(l,o),E(d,c,k),E(d,r,k),y(r,a),y(a,i),y(r,g),y(r,m);for(let P=0;P<v.length;P+=1)v[P]&&v[P].m(m,null);y(r,f),y(r,u),N.m(u,null),E(d,n,k),H&&H.m(d,k),E(d,_,k),S||(z=[$(Qe,"keydown",st),Ee(De.call(null,r,at))],S=!0)},p(d,[k]){var P;k&9&&(w=Array.from(Array(6).keys()),v=Se(v,k,D,1,d,w,h,m,We,be,null,pe)),k&16&&M(m,"playing",!d[4]),k&2&&M(m,"bad-guess",(P=d[1])==null?void 0:P.badGuess),I===(I=F(d))&&N?N.p(d,k):(N.d(1),N=I(d),N&&(N.c(),N.m(u,null))),d[4]?H?H.p(d,k):(H=we(d),H.c(),H.m(_.parentNode,_)):H&&(H.d(1),H=null)},i:re,o:re,d(d){p(e),d&&p(t),d&&p(l),d&&p(c),d&&p(r);for(let k=0;k<v.length;k+=1)v[k].d();N.d(),d&&p(n),H&&H.d(d),d&&p(_),S=!1,Xe(z)}}}function st(s){var e;s.metaKey||(e=document.querySelector(`[data-key="${s.key}" i]`))==null||e.dispatchEvent(new MouseEvent("click",{cancelable:!0}))}const at=()=>({update:s})=>{s({reset:!1})};function rt(s,e,t){let l,o,c,r;Ce(s,Ke,h=>t(7,r=h));let{data:a}=e,{form:i}=e,g,m;function v(h){const f=a.guesses[o],u=h.target.getAttribute("data-key");u==="backspace"?(t(0,a.guesses[o]=f.slice(0,-1),a),i!=null&&i.badGuess&&t(1,i.badGuess=!1,i)):f.length<5&&t(0,a.guesses[o]+=u,a)}return s.$$set=h=>{"data"in h&&t(0,a=h.data),"form"in h&&t(1,i=h.form)},s.$$.update=()=>{var h;s.$$.dirty&1&&t(4,l=a.answers.at(-1)==="xxxxx"),s.$$.dirty&17&&t(3,o=l?-1:a.answers.length),s.$$.dirty&13&&(t(2,g={}),t(5,m={}),a.answers.forEach((f,u)=>{const n=a.guesses[u];for(let _=0;_<5;_+=1){const S=n[_];f[_]==="x"?(t(2,g[S]="exact",g),t(5,m[S]="correct",m)):g[S]||(t(2,g[S]=f[_]==="c"?"close":"missing",g),t(5,m[S]=f[_]==="c"?"present":"absent",m))}})),s.$$.dirty&9&&t(6,c=((h=a.guesses[o])==null?void 0:h.length)===5)},[a,i,g,o,l,m,c,r,v]}class ct extends He{constructor(e){super(),Me(this,e,rt,lt,Ne,{data:0,form:1})}}export{ct as component};
