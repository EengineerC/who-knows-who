import{S as j,i as H,s as R,k as p,a as I,M as U,l as _,h as c,c as S,m as v,n as u,F as n,b as P,G,q as k,r as A,u as Y,N as z}from"../chunks/index.cc8e466b.js";const X=!1,te=Object.freeze(Object.defineProperty({__proto__:null,prerender:X},Symbol.toStringTag,{value:"Module"}));function N(h){let e,r=h[1].error+"",o;return{c(){e=p("div"),o=k(r),this.h()},l(s){e=_(s,"DIV",{class:!0,role:!0});var t=v(e);o=A(t,r),t.forEach(c),this.h()},h(){u(e,"class","bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"),u(e,"role","alert")},m(s,t){P(s,e,t),n(e,o)},p(s,t){t&2&&r!==(r=s[1].error+"")&&Y(o,r)},d(s){s&&c(e)}}}function J(h){let e,r,o=h[3]===1?"Correct!":"Incorrect",s,t,d,m=h[3]===1?"You knew the insider detail!":"You might need to learn more about this person.",a,y,l,i,f,x;return{c(){e=p("div"),r=p("h2"),s=k(o),t=I(),d=p("p"),a=k(m),y=I(),l=p("button"),i=k("Try Another Question"),this.h()},l(g){e=_(g,"DIV",{class:!0});var b=v(e);r=_(b,"H2",{class:!0});var w=v(r);s=A(w,o),w.forEach(c),t=S(b),d=_(b,"P",{class:!0});var O=v(d);a=A(O,m),O.forEach(c),y=S(b),l=_(b,"BUTTON",{class:!0});var E=v(l);i=A(E,"Try Another Question"),E.forEach(c),b.forEach(c),this.h()},h(){u(r,"class","text-2xl font-bold mb-4"),u(d,"class","mb-4"),u(l,"class","bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"),u(e,"class","bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center")},m(g,b){P(g,e,b),n(e,r),n(r,s),n(e,t),n(e,d),n(d,a),n(e,y),n(e,l),n(l,i),f||(x=z(l,"click",h[4]),f=!0)},p(g,b){b&8&&o!==(o=g[3]===1?"Correct!":"Incorrect")&&Y(s,o),b&8&&m!==(m=g[3]===1?"You knew the insider detail!":"You might need to learn more about this person.")&&Y(a,m)},d(g){g&&c(e),f=!1,x()}}}function K(h){let e,r,o=(h[0].question||"Loading...")+"",s,t,d,m,a=h[0].questionType+"",y,l,i,f,x,g,b,w,O,E,Q="Submit Answer",L;return{c(){e=p("div"),r=p("h1"),s=k(o),t=I(),d=p("p"),m=k("Question Type: "),y=k(a),l=I(),i=p("form"),f=p("div"),x=p("label"),g=k("Your Answer"),b=I(),w=p("textarea"),O=I(),E=p("button"),L=k(Q),this.h()},l(q){e=_(q,"DIV",{class:!0});var T=v(e);r=_(T,"H1",{class:!0});var B=v(r);s=A(B,o),B.forEach(c),t=S(T),d=_(T,"P",{class:!0});var M=v(d);m=A(M,"Question Type: "),y=A(M,a),M.forEach(c),l=S(T),i=_(T,"FORM",{method:!0});var D=v(i);f=_(D,"DIV",{class:!0});var V=v(f);x=_(V,"LABEL",{for:!0,class:!0});var C=v(x);g=A(C,"Your Answer"),C.forEach(c),b=S(V),w=_(V,"TEXTAREA",{id:!0,name:!0,rows:!0,class:!0}),v(w).forEach(c),V.forEach(c),O=S(D),E=_(D,"BUTTON",{type:!0,class:!0});var F=v(E);L=A(F,Q),F.forEach(c),D.forEach(c),T.forEach(c),this.h()},h(){u(r,"class","text-2xl font-bold mb-4"),u(d,"class","text-sm text-gray-600 mb-4"),u(x,"for","answer"),u(x,"class","block text-gray-700 text-sm font-bold mb-2"),u(w,"id","answer"),u(w,"name","answer"),u(w,"rows","5"),w.required=!0,u(w,"class","shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"),u(f,"class","mb-4"),u(E,"type","submit"),E.disabled=Z,u(E,"class","bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"),u(i,"method","POST"),u(e,"class","bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4")},m(q,T){P(q,e,T),n(e,r),n(r,s),n(e,t),n(e,d),n(d,m),n(d,y),n(e,l),n(e,i),n(i,f),n(f,x),n(x,g),n(f,b),n(f,w),n(i,O),n(i,E),n(E,L)},p(q,T){T&1&&o!==(o=(q[0].question||"Loading...")+"")&&Y(s,o),T&1&&a!==(a=q[0].questionType+"")&&Y(y,a)},d(q){q&&c(e)}}}function W(h){var y;let e,r,o,s,t=((y=h[1])==null?void 0:y.error)&&N(h);function d(l,i){return l[2]?J:K}let m=d(h),a=m(h);return{c(){e=p("meta"),r=I(),o=p("div"),t&&t.c(),s=I(),a.c(),this.h()},l(l){const i=U("svelte-1epkogd",document.head);e=_(i,"META",{name:!0,content:!0}),i.forEach(c),r=S(l),o=_(l,"DIV",{class:!0});var f=v(o);t&&t.l(f),s=S(f),a.l(f),f.forEach(c),this.h()},h(){document.title="Personal Trivia Game",u(e,"name","description"),u(e,"content","Guess the personal trivia"),u(o,"class","container max-w-md mx-auto p-4")},m(l,i){n(document.head,e),P(l,r,i),P(l,o,i),t&&t.m(o,null),n(o,s),a.m(o,null)},p(l,[i]){var f;(f=l[1])!=null&&f.error?t?t.p(l,i):(t=N(l),t.c(),t.m(o,s)):t&&(t.d(1),t=null),m===(m=d(l))&&a?a.p(l,i):(a.d(1),a=m(l),a&&(a.c(),a.m(o,null)))},i:G,o:G,d(l){c(e),l&&c(r),l&&c(o),t&&t.d(),a.d()}}}let Z=!1;function $(h,e,r){let{data:o={}}=e,{form:s={}}=e,t=!1,d=null;function m(){r(2,t=!1),r(3,d=null)}return h.$$set=a=>{"data"in a&&r(0,o=a.data),"form"in a&&r(1,s=a.form)},h.$$.update=()=>{h.$$.dirty&2&&s!=null&&s.success&&(r(2,t=!0),r(3,d=s.score??null))},[o,s,t,d,m]}class re extends j{constructor(e){super(),H(this,e,$,W,R,{data:0,form:1})}}export{re as component,te as universal};
