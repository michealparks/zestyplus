var p=e=>{throw TypeError(e)};var x=(e,t,o)=>t.has(e)||p("Cannot "+o);var i=(e,t,o)=>(x(e,t,"read from private field"),o?o.call(e):t.get(e)),g=(e,t,o)=>t.has(e)?p("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o);import{K as I,g as U,L as T}from"./runtime.BAh1p-zl.js";import{p as b}from"./proxy.DG7b0xtK.js";const l="c80e549f03864691a94b026c06619501",d="http://localhost:5173",A="https://accounts.spotify.com/authorize",u="https://accounts.spotify.com/api/token",v=["user-read-private","user-read-email","user-read-playback-state","user-read-currently-playing"].join(" "),c={get access(){return localStorage.getItem("access_token")??""},get refresh(){return localStorage.getItem("refresh_token")??""},get expiresIn(){return localStorage.getItem("refresh_in")??""},get expires(){return localStorage.getItem("expires")??""}},w=e=>{const{access_token:t,refresh_token:o,expires_in:r}=e;localStorage.setItem("access_token",t),localStorage.setItem("refresh_token",o),localStorage.setItem("expires_in",r);const n=Date.now(),a=new Date(n+Number(r)*1e3);localStorage.setItem("expires",a.toString())},L=async()=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=crypto.getRandomValues(new Uint8Array(64)).reduce((S,k)=>S+e[k%e.length],""),n=new TextEncoder().encode(r),a=await crypto.subtle.digest("SHA-256",n),_=btoa(String.fromCharCode(...new Uint8Array(a))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");window.localStorage.setItem("code_verifier",r);const h=new URL(A),y={response_type:"code",client_id:l,scope:v,code_challenge_method:"S256",code_challenge:_,redirect_uri:d};h.search=new URLSearchParams(y).toString(),window.location.href=h.toString()},P=async e=>{const t=localStorage.getItem("code_verifier");return await(await fetch(u,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:l,grant_type:"authorization_code",code:e,redirect_uri:d,code_verifier:t??""})})).json()},R=async()=>{const t=await(await fetch(u,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:l,grant_type:"refresh_token",refresh_token:c.refresh??""})})).json();return w(t),t},z=async()=>(await fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${c.access}`}})).json(),m=async()=>{var o;const t=new URLSearchParams(window.location.search).get("code");if(t){const r=await P(t);w(r);const n=new URL(window.location.href);n.searchParams.delete("code");const a=n.search?n.href:n.href.replace("?","");window.history.replaceState({},document.title,a)}if(c.access){const r=await z();return((o=r.error)==null?void 0:o.status)===401?(await R(),m()):{state:"logged-in",userData:r}}return{state:"logged-out"}},C=()=>L(),j=async()=>{localStorage.clear(),window.location.href=d};var s;class D{constructor(){g(this,s,I("pending"))}get current(){return U(i(this,s))}set current(t){T(i(this,s),b(t))}}s=new WeakMap;const f=new D;m().then(({state:e})=>{f.current=e});const V={token:c,authenticated:f,login:C,logout:j},H=()=>V;export{H as u};