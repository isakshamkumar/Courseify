"use strict";(()=>{var e={};e.id=876,e.ids=[876],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},73837:e=>{e.exports=require("util")},64312:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>v,originalPathname:()=>x,patchFetch:()=>g,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>k,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>w});var o={};r.r(o),r.d(o,{POST:()=>c});var s=r(10884),i=r(16132),a=r(21040),p=r(95798),n=r(19283);let u=new n.Z("sk_test_51OIvAGSD2kCc8s2SYDHpuMhpgVK2IU1uVauX7vMa9Ry6MDOaHrI5cisyya3ap9WYm5G0IHf35qwAU5untJdqUTPB00iM4uhOTN",{apiVersion:"2023-10-16"});async function c(e){let t;let r=await e.text(),o=e.headers["stripe-signature"];try{t=u.webhooks.constructEvent(r,o,"whsec_0geP2FgFZeEsAQSUeQ9jmsfLzBeIFEHR")}catch(e){return console.log(e),p.Z.json({msg:`Webhook Error: ${e.message}`})}if("checkout.session.completed"===t.type){let e=t.data.object;h(e)}return p.Z.json({received:!0})}async function h(e){let t=await u.checkout.sessions.retrieve(e.id,{expand:["line_items"]});t.line_items.data}let d=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/stripe-webhook/route",pathname:"/api/stripe-webhook",filename:"route",bundlePath:"app/api/stripe-webhook/route"},resolvedPagePath:"D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\api\\stripe-webhook\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:k,headerHooks:v,staticGenerationBailout:w}=d,x="/api/stripe-webhook/route";function g(){return(0,a.patchFetch)({serverHooks:k,staticGenerationAsyncStorage:m})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[271,107,283],()=>r(64312));module.exports=o})();