var p=e=>{throw TypeError(e)};var I=(e,t,r)=>t.has(e)||p("Cannot "+r);var u=(e,t,r)=>(I(e,t,"read from private field"),r?r.call(e):t.get(e)),f=(e,t,r)=>t.has(e)?p("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);import{a6 as T,i as v,a5 as b}from"./index-client.jNqP-yUK.js";import{a as C}from"./props.6OPtkU23.js";const a={current:void 0},l={current:new Uint8Array},w=1024,P=async()=>{const e=await navigator.mediaDevices.getUserMedia({audio:!0}),t=new AudioContext,r=t.createMediaStreamSource(e);a.current=t.createAnalyser(),a.current.fftSize=w,r.connect(a.current)},z=async()=>{try{await P()}catch(r){console.error("Error accessing microphone:",r)}if(!a.current){console.error("No audio analyser!");return}const e=a.current.frequencyBinCount;l.current=new Uint8Array(e);const t=()=>{requestAnimationFrame(t),a.current!==void 0&&a.current.getByteFrequencyData(l.current)};t()},J=()=>({fttSize:w,frequencyData:l,startAnalyser:z}),d="c80e549f03864691a94b026c06619501",h="http://localhost:5173",D="https://accounts.spotify.com/authorize",m="https://accounts.spotify.com/api/token",L=["user-read-private","user-read-email","user-read-playback-state","user-read-currently-playing"].join(" "),i={get access(){return localStorage.getItem("access_token")??""},get refresh(){return localStorage.getItem("refresh_token")??""},get expiresIn(){return localStorage.getItem("refresh_in")??""},get expires(){return localStorage.getItem("expires")??""}},y=e=>{const{access_token:t,refresh_token:r,expires_in:n}=e;localStorage.setItem("access_token",t),localStorage.setItem("refresh_token",r),localStorage.setItem("expires_in",n);const o=Date.now(),s=new Date(o+Number(n)*1e3);localStorage.setItem("expires",s.toString())},R=async()=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=crypto.getRandomValues(new Uint8Array(64)).reduce((A,U)=>A+e[U%e.length],""),o=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",o),k=btoa(String.fromCharCode(...new Uint8Array(s))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");window.localStorage.setItem("code_verifier",n);const g=new URL(D),x={response_type:"code",client_id:d,scope:L,code_challenge_method:"S256",code_challenge:k,redirect_uri:h};g.search=new URLSearchParams(x).toString(),window.location.href=g.toString()},q=async e=>{const t=localStorage.getItem("code_verifier");return await(await fetch(m,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:d,grant_type:"authorization_code",code:e,redirect_uri:h,code_verifier:t??""})})).json()},j=async()=>{const t=await(await fetch(m,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:d,grant_type:"refresh_token",refresh_token:i.refresh??""})})).json();if(t.error)return!0;y(t)},B=async()=>(await fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${i.access}`}})).json(),E=async e=>new Promise(t=>{setTimeout(t,e)}),S=async()=>{var r;const t=new URLSearchParams(window.location.search).get("code");if(t){const n=await q(t);y(n);const o=new URL(window.location.href);o.searchParams.delete("code");const s=o.search?o.href:o.href.replace("?","");window.history.replaceState({},document.title,s)}if(i.access){const n=await B();return((r=n.error)==null?void 0:r.status)===401?await j()?{state:"logged-out"}:(await E(2e3),S()):{state:"logged-in",userData:n}}return{state:"logged-out"}},V=()=>R(),F=async()=>{localStorage.clear(),window.location.href=h};var c;class M{constructor(){f(this,c,T("pending"))}get current(){return v(u(this,c))}set current(t){b(u(this,c),C(t))}}c=new WeakMap;const _=new M;S().then(({state:e})=>{_.current=e});const N={token:i,authenticated:_,login:V,logout:F},K=()=>N;export{J as a,K as u};
