import{_ as P}from"./Daomt7G3.js";import{_ as C,u as U,o as a,I as q,w as B,a as r,h as c,s as D,e as G,c as l,M as H,m as S,E as J,F as E,J as M,t as i,b as A,P as O,H as $,i as y,d as ct,r as w,g as nt,j as ut,N as dt,k as mt}from"./Bra6A4mU.js";import{u as Y}from"./By-zEHk8.js";import{u as yt}from"./C1jnsaub.js";import{u as _t}from"./DBBUTBPB.js";import{u as gt}from"./CfjJ7iNU.js";import{u as ht}from"./Dr10A1eW.js";import"./C8YHhs51.js";const ft={__name:"CoreButtonNewArticl",setup(t){const o=U();return(d,n)=>{var b,u,_,g;const m=P;return a(),q(m,{to:{name:"resource-slug-articls-create",query:{articlType:((u=(b=c(o))==null?void 0:b.params)==null?void 0:u.articlType)||"",slug:((g=(_=c(o))==null?void 0:_.params)==null?void 0:g.slug)||"0"}}},{default:B(()=>n[0]||(n[0]=[r("button",{class:"modern-button"},"Add Articl",-1)])),_:1},8,["to"])}}},pt=C(ft,[["__scopeId","data-v-a97e60eb"]]),vt={class:"nav-tabs nav-tabs-inner-margin"},bt=["onClick","onKeyup"],kt={__name:"ResourceArticlTypeTabs",setup(t){const o=Y(),{setArticlType:d}=o,{articlType:n,articlTypes:m,slug:b}=D(o),u=G(),_=g=>{d(g),u.push({name:"resource-slug-articls",query:{articlType:n.value}})};return(g,k)=>{const N=pt;return a(),l("div",null,[r("ul",vt,[r("li",{class:H({active:!c(n)})},[r("a",{href:"#",onClick:k[0]||(k[0]=S(h=>_(""),["prevent"])),onKeyup:k[1]||(k[1]=J(S(h=>_(""),["prevent"]),["enter"]))}," All ",32)],2),(a(!0),l(E,null,M(c(m),h=>(a(),l("li",{key:h,class:H({active:h===c(n)})},[r("a",{href:"#",onClick:S(I=>_(h),["prevent"]),onKeyup:J(S(I=>_(h),["prevent"]),["enter"])},i(h),41,bt)],2))),128))]),A(N)])}}},At=C(kt,[["__scopeId","data-v-00f61941"]]),xt={class:"row-admin-box"},Tt={role:"button",class:"handle",href:"#"},$t={__name:"ResourceArticlActions",props:{id:{type:[String,Number],required:!0}},setup(t){return(o,d)=>{const n=P;return a(),l("div",xt,[A(n,{role:"button",to:{name:"resource-slug-articls-create",query:{editId:t.id}}},{default:B(()=>[A(c(O),{size:"0.7rem",type:"edit","aria-label":"Edit articl"})]),_:1},8,["to"]),A(n,{role:"button",to:{name:"resource-slug-articls-delete",query:{id:t.id}}},{default:B(()=>[A(c(O),{size:"0.7rem",type:"delete","aria-label":"Delete articl"})]),_:1},8,["to"]),r("a",Tt,[d[0]||(d[0]=r("div",{class:"sr"},"Reorder articl",-1)),A(c(O),{size:"0.7rem",type:"move","aria-label":"Drag to reorder"})])])}}},Ct=C($t,[["__scopeId","data-v-6430de16"]]),Nt={key:0},It={key:1},Rt={__name:"ResourceArticlAuthor",props:{key:{type:Number,required:!0,default:0},author:{type:[Object,String],required:!0,default:()=>({})},last:{type:Boolean,required:!0,default:!1}},setup(t){const o=t,d=$(()=>typeof o.author=="string"),n=$(()=>o.last?"":", "),m=$(()=>`${o.author.nameFirst} ${o.author.nameLast}`);return(b,u)=>(a(),l("span",null,[c(d)?(a(),l("span",Nt,i(t.author)+i(c(n)),1)):(a(),l("span",It,i(c(m)),1))]))}},St={class:"articl"},wt={class:"articl-title"},qt=["href"],Lt={class:"articl-details"},Ot={key:0,class:"articl-details"},Bt=["href"],Dt={key:1,class:"articl-details"},Et={key:2,class:"articl-details"},Mt={key:3,class:"articl-details"},jt={key:5,class:"articl-details"},Vt={key:6,class:"articl-details"},Ft=["src","alt"],Kt={key:7,class:"articl-details"},zt=["src","alt"],Ht={key:8,class:"articl-details"},Jt="Click to view more details",Pt=",",Ut="",Gt=",",Yt={__name:"ResourceArticlListItem",props:{articl:{type:Object,default:null}},setup(t){const{isLoggedInMixin:o}=yt(),d=_t();return D(d),(n,m)=>{const b=Ct,u=Rt;return a(),l("li",St,[r("ul",null,[r("li",wt,[r("a",{"data-tooltip":Jt,href:t.articl.url,class:"box",target:"_blank"}," title - "+i(t.articl.title),9,qt),c(o)?(a(),q(b,{key:0,id:t.articl.id,class:"box",title:t.articl.title,slug:t.articl.slug,type:t.articl.type},null,8,["id","title","slug","type"])):y("",!0)]),r("li",Lt,[(a(!0),l(E,null,M(t.articl.authors,(_,g)=>(a(),q(u,{author:_,key:g,last:g===t.articl.authors.length-1},null,8,["author","last"]))),128))]),t.articl.journal?(a(),l("li",Ot,[r("a",{"data-tooltip":"linkMessage",href:t.articl.url,target:"_blank"},i(t.articl.journal),9,Bt),ct(" "+i(Pt)+" "+i(Ut)+i(Gt)+i(t.articl.year),1)])):y("",!0),t.articl.authorsOrig?(a(),l("li",Dt,i(t.articl.authorsOrig),1)):y("",!0),t.articl.affiliations?(a(),l("li",Et," Affiliations: "+i(t.articl.affiliations),1)):y("",!0),t.articl.source?(a(),l("li",Mt,i(t.articl.source),1)):y("",!0),y("",!0),t.articl.fullText?(a(),l("li",jt,[r("details",null,[m[1]||(m[1]=r("summary",null,"Full text",-1)),r("div",null,i(t.articl.fullText),1)])])):y("",!0),t.articl.thumbnailImage?(a(),l("li",Vt,[r("img",{src:t.articl.thumbnailImage,alt:t.articl.title},null,8,Ft)])):y("",!0),t.articl.url&&t.articl.articlType==="Images"?(a(),l("li",Kt,[r("img",{src:t.articl.url,alt:t.articl.title},null,8,zt)])):y("",!0),t.articl.imageCaption?(a(),l("li",Ht," Caption: "+i(t.articl.imageCaption),1)):y("",!0)])])}}},Qt=C(Yt,[["__scopeId","data-v-b9560741"]]),Wt={class:"sort-container"},Xt={class:"nav-inner-content"},Zt={key:0},te={__name:"index",setup(t){const o=Y(),d=ht(),{articlType:n,articlTypes:m,slug:b,articls:u,notes:_}=D(o),{sortArticlsByAnyKey:g,setCategories:k,setBreadcrumbs:N,setArticls:h,setNotes:I,setSlug:Q,setArticlType:W,setHtmlTitle:X}=o,{setError:j}=d,x=w("title"),V=w(!1),Z=w(""),F=w(""),tt=G(),L=U(),et=gt(),at=$(()=>rt(n.value,x.value));m.value=$(()=>u.value.map(s=>s.articlType)||[]),nt(()=>{lt(L.params.slug),Q(L.params.slug),W(L.params.articlType)});const rt=(s,e)=>{const f=s?u.value.filter(p=>p.articlType===s):u.value;return e&&f.sort((p,v)=>e==="year"||e==="createdAt"?v[e]-p[e]:p[e].localeCompare(v[e])),f},st=()=>{g({articlType:m.value,key:x.value}),tt.push({query:{sortBy:x.value}})},lt=async s=>{try{V.value=!0;const e=await ot(s);it(e)}catch(e){j(e)}finally{V.value=!1}},ot=async s=>{const e=await et({method:"GET",url:`/resource/${s||""}`}),f=e.articls?Object.keys(e.data.articls):[];return{breadcrumbs:e.data.breadcrumbs,categories:e.data.categories,category:e.data.category,articlTypes:f,articls:e.data.articls,notes:e.data.notes}},it=async s=>{var e,f,p,v,T,R,K;try{(e=s.categories)!=null&&e.length?k(s.categories):k([]),(f=s.breadcrumbs)!=null&&f.length?N(s.breadcrumbs):N([]),(p=s.articls)!=null&&p.length?h(s.articls):h([]),(v=s.notes)!=null&&v.length?I(s.notes):I([]),Z.value=(T=s.category[0])==null?void 0:T.title,F.value=(R=s.category[0])==null?void 0:R.titleHtml;const z=(K=s.category[0])==null?void 0:K.description;X(F.value)}catch(z){j(z)}};return(s,e)=>{var v;const f=At,p=Qt;return a(),l("div",null,[A(f),r("div",Wt,[e[2]||(e[2]=r("label",{for:"sort-select"},"Sort By:",-1)),ut(r("select",{id:"sort-select","onUpdate:modelValue":e[0]||(e[0]=T=>mt(x)?x.value=T:null),onChange:st},e[1]||(e[1]=[r("option",{value:"title"},"Title",-1),r("option",{value:"year"},"Year Published",-1),r("option",{value:"createdAt"},"Date Added",-1)]),544),[[dt,c(x)]])]),r("ul",Xt,[(a(!0),l(E,null,M(c(at),(T,R)=>(a(),q(p,{key:R,articl:T},null,8,["articl"]))),128))]),(v=c(u))!=null&&v.length?y("",!0):(a(),l("div",Zt,"No entries yet."))])}}},ne=C(te,[["__scopeId","data-v-d23c5bc7"]]);export{ne as default};
