import{l as h,G as v,s as g,m as i,a as c,c as r,b as e,t as d,n as m,w as f,v as x,p as y,F as w}from"./.pnpm-3f2ce773.js";const b=h(),k=new v,L=()=>new Promise((a,t)=>{console.log("loginWithGoogle"),g(b,k).then(s=>{a(s.user)}).catch(s=>{t(s)})});const N=e("h1",null,"\u7BC4\u4F8B",-1),C={class:"py-6 flex flex-col gap-4"},G=e("h2",null,"\u4F7F\u7528 Firebase Login",-1),R={class:"flex mb-4"},U={class:"flex justify-between w-1/3"},A=["src"],B={class:"w-1/3"},E={action:"",class:"flex flex-col gap-4"},F=e("h2",null,"\u4F7F\u7528Enter",-1),I=["onClick"],T={__name:"Index",setup(a){const t=i({}),s=i(""),u=()=>{L().then(o=>{const{email:n,photoURL:l,displayName:p}=o;t.value={displayName:p,email:n,photoURL:l}})},_=()=>{let o="in handleTest "+s.value;window.alert(o)};return(o,n)=>(c(),r(w,null,[N,e("div",C,[G,e("button",{onClick:u,class:"w-1/3 px-2 py-3 bg-gray-600 text-white rounded-4"}," Login "),e("div",R,[e("div",U,[e("div",null,[e("p",null,"displayName:"+d(t.value.displayName),1),e("p",null,"email:"+d(t.value.email),1)]),t.value.photoURL?(c(),r("img",{key:0,class:"rounded-full",src:t.value.photoURL,alt:"avatar"},null,8,A)):m("",!0)])])]),e("div",B,[e("form",E,[F,f(e("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=l=>s.value=l)},null,512),[[x,s.value]]),e("button",{onClick:y(_,["prevent"]),class:"px-2 py-3 bg-gray-600 text-white rounded-4"}," test Enter ",8,I)])])],64))}};export{T as default};
