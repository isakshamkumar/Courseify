(()=>{var e={};e.id=478,e.ids=[478],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},55885:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>d,originalPathname:()=>p,pages:()=>u,routeModule:()=>m,tree:()=>l});var r=s(67096),a=s(16132),o=s(37284),n=s.n(o),i=s(32564),c={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>i[e]);s.d(t,c);let l=["",{children:["payment",{children:["success",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,7094)),"D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\payment\\success\\page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,96101)),"D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(s.bind(s,68056)),"D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\payment\\success\\page.tsx"],p="/payment/success/page",d={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/payment/success/page",pathname:"/payment/success",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},90628:(e,t,s)=>{Promise.resolve().then(s.bind(s,27808))},78625:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(53854);let a=()=>r.jsx("div",{className:"flex items-center justify-center animate-spin",children:r.jsx("div",{className:"h-8 w-8",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"h-full w-full text-blue-500",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12H4M12 4v16l8-8-8-8z"})})})})},27808:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(53854),a=s(34218),o=s(51018),n=s(78625),i=s(48157),c=s(19650);function l(){let e=(0,o.useRouter)(),[t,s]=(0,a.useState)(!1),l=(0,o.useSearchParams)(),u=l.get("session_id"),p=(0,i.v9)(e=>e.user.user.id);return(0,i.v9)(e=>e.user.user.email),(0,a.useEffect)(()=>{let r=localStorage.getItem("paymentCount");if(!t&&!r){s(!0);let e=async()=>{let e=await fetch("http://localhost:3000/api/payment",{method:"POST",body:JSON.stringify({session_id:u,userId:p})});await e.json(),s(!1)};e(),s(!1),localStorage.setItem("paymentCount","1")}setTimeout(()=>{localStorage.removeItem("paymentCount"),e.push("/user/purchasedCourses")},5e3)},[]),r.jsx("div",{className:"h-screen flex justify-center items-center",children:t?r.jsx(n.Z,{}):(0,r.jsxs)("div",{className:"h-36 flex flex-col w-52 ",children:["Payment Successful! Redirecting You to Purchased Courses...",r.jsx(c.Z,{})]})})}},7094:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>n,__esModule:()=>o,default:()=>c});var r=s(95153);let a=(0,r.createProxy)(String.raw`D:\harkirat\courseApp_complete_without_monorepo\courseify\src\app\payment\success\page.tsx`),{__esModule:o,$$typeof:n}=a,i=a.default,c=i},73881:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(31323);let a=e=>{let t=(0,r.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[271,588,323,705],()=>s(55885));module.exports=r})();