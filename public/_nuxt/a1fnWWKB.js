import{q as n,x as u}from"./nWBr_nlk.js";import{c}from"./BneovxEs.js";const g=e=>e?e.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/):!1,i=e=>({numUpper:e.length-e.replace(/[A-Z]/g,"").length,numLower:e.length-e.replace(/[a-z]/g,"").length,numDigit:e.length-e.replace(/d/g,"").length,numSpecial:e.length-e.replace(/\W|_/g,"").length}),f=e=>{if(!e)return 0;const o=i(e),r=o.numUpper>0?1:0,t=o.numLower>0?1:0,s=o.numDigit>0?1:0,a=o.numSpecial>0?1:0;return r+t+s+a},T=async({username:e,password:o})=>{var r,t;try{const s=await c.post("/auth/login",{username:e,password:o});return l((r=s==null?void 0:s.data)==null?void 0:r.tokens),k((t=s==null?void 0:s.data)==null?void 0:t.user),s}catch(s){throw Error(s)}},m=async e=>{try{await c.post("/auth/logout",{accessToken:e});const o=n("accessTokenValue"),r=n("accessTokenExpires"),t=n("refreshTokenValue"),s=n("refreshTokenExpires");o.value=null,r.value=null,t.value=null,s.value=null,u("/login")}catch(o){throw o.response&&o.response.data.message==="Token not found"?new Error("Token not found during logout:",o||"Unknown"):new Error("Logout error:",o||"Unknown")}},l=e=>{const o=n("accessTokenValue"),r=n("accessTokenExpires"),t=n("refreshTokenValue"),s=n("refreshTokenExpires");o.value=e.access.token,r.value=e.access.expires,t.value=e.refresh.token,s.value=e.refresh.expires},k=e=>{const o=n("user");o.value=e};export{m as a,f as s,T as u,g as v};