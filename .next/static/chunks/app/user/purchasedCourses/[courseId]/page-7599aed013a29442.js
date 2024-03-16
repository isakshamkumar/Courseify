(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[698],{8664:function(e,s,t){Promise.resolve().then(t.bind(t,8810))},6308:function(e,s,t){"use strict";var l=t(7437);s.Z=()=>(0,l.jsxs)("svg",{className:"animate-spin h-8 w-8 mr-3",viewBox:"0 0 24 24",children:[(0,l.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,l.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})},4970:function(e,s,t){"use strict";var l=t(7437);s.Z=()=>(0,l.jsx)("div",{className:"flex items-center justify-center animate-spin",children:(0,l.jsx)("div",{className:"h-8 w-8",children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"h-full w-full text-blue-500",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12H4M12 4v16l8-8-8-8z"})})})})},8810:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return j}});var l=t(7437);let r=async(e,s)=>{let t=await fetch("http://localhost:3000/api/video",{headers:{"Content-Type":"application/json",courseId:e,userId:s}});return t.ok||alert("hi"),t.json()};var i=t(6308),a=t(4970),n=t(2265),c=t(429),o=t(5925);let d=async e=>{let s=await e,t=await Promise.all(s.courseVideos.map(e=>u(e)));return t};async function u(e){let s=await fetch("http://localhost:3000/api/video/".concat(e.videoUrl)),t=await s.json();return{id:e.id,title:e.title,url:t.url,description:e.course.description,completed:e.userProgress.length>0&&e.userProgress[0].completed}}var h=t(3046),m=t(4033),x=e=>{let{setselectedVideo:s,videos:t,setvideos:r,selectedVideo:i}=e,{courseId:u}=(0,m.useParams)(),x=(0,h.v9)(e=>{var s;return null===(s=e.user.user)||void 0===s?void 0:s.id}),[f,p]=(0,n.useState)(null),[j,v]=(0,n.useState)(!1);if((0,n.useEffect)(()=>{v(!0);let e=async()=>{let e=await d(t);p(e)};e()},[]),j&&!f)return(0,l.jsx)("div",{className:"h-screen justify-center items-center",children:(0,l.jsx)(a.Z,{})});if(j&&f){let e=f[i],t=async()=>{if(!e.completed){o.Am.success("Updating Video and Course Progress");let t=await fetch("/api/user/updateVideoProgress",{method:"POST",body:JSON.stringify({videoId:e.id,userId:x,courseId:u.toString()})}),l=await t.json();s(e=>e+1);let i=async e=>e,a=i(l);r(a);let n=await d(a);p(n),o.Am.success("Successfully Updated Course and Video Progress!")}};return(0,l.jsxs)("div",{className:"flex flex-col gap-8",children:[(0,l.jsx)(o.x7,{}),(0,l.jsx)("div",{className:"relative aspect-[16/9] max-h-[500px] overflow-hidden",children:(0,l.jsx)(c.Z,{url:null==e?void 0:e.url,controls:!0,width:"100%",height:"100%",className:"absolute top-0 left-0 w-full h-full",onEnded:t})}),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{type:"button",onClick:t,className:"".concat(e.completed?"bg-red-700":"bg-green-500"," text-white px-4 py-2 rounded-md mb-2   "),children:e.completed?"Completed":"Mark as Complete"}),(0,l.jsx)("p",{className:"text-gray-600 mb-2",children:e.description})]})]})}},f=t(8920),p=e=>{var s;let{videos:t,selectedVideo:r,setselectedVideo:i}=e,[a,c]=(0,n.useState)([]);if((0,n.useEffect)(()=>{let e=async()=>{let e=await t;c(e)};e()},[t]),(null===(s=a.courseVideos)||void 0===s?void 0:s.length)>0)return(0,l.jsxs)("div",{className:"col-span-3 p-4 bg-white border border-gray-300 shadow-md",children:[(0,l.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"Course Name"}),(0,l.jsx)("div",{className:"text-center",children:(0,l.jsxs)("span",{className:"font-bold text-sm",children:[parseInt(a.courseProgress),"%"]})}),(0,l.jsx)("div",{className:"flex items-center mb-4",children:(0,l.jsx)("div",{className:"flex items-center w-full bg-gray-200 rounded-full",children:(0,l.jsx)("div",{className:"h-4 bg-indigo-600 flex items-center justify-center text-center text-white rounded-lg transition-all duration-500 ease-in-out",style:{width:"".concat(a.courseProgress,"%")}})})}),(0,l.jsx)("ul",{className:"flex flex-col gap-2",children:a.courseVideos.map((e,s)=>(0,l.jsxs)("li",{className:"p-2 border border-slate-400 rounded-md cursor-pointer hover:bg-slate-300 ".concat(r===s?"bg-slate-300":"","\n            \n              "),onClick:()=>i(s),children:[e.userProgress.length>0&&e.userProgress[0].completed?(0,l.jsx)(f._rq,{className:"mr-2 inline text-green-700   "}):(0,l.jsx)(f.HwW,{className:"mr-2 inline"}),(0,l.jsx)("span",{className:e.userProgress.length>0&&e.userProgress[0].completed?"text-green-700 font":"text-inherit",children:e.title})]},s))})]})},j=e=>{let{params:{courseId:s}}=e,[t,c]=(0,n.useState)(null),[o,d]=(0,n.useState)(0),u=(0,h.v9)(e=>{var s;return null===(s=e.user.user)||void 0===s?void 0:s.id});if((0,n.useEffect)(()=>{let e=r(s,u);c(e)},[]),t)return(0,l.jsx)(n.Suspense,{fallback:(0,l.jsx)("div",{className:"w-full h-full flex justify-center items-center",children:(0,l.jsx)(a.Z,{})}),children:(0,l.jsxs)("div",{className:"px-8 ml-12 grid h-screen grid-cols-12",children:[(0,l.jsx)(n.Suspense,{fallback:(0,l.jsx)("div",{className:"flex h-full w-full col-span-3 justify-center items-center",children:(0,l.jsx)(i.Z,{})}),children:(0,l.jsx)(p,{videos:t,selectedVideo:o,setselectedVideo:d})}),(0,l.jsx)("div",{className:"col-span-9 p-4 bg-white border border-gray-300 shadow-md",children:(0,l.jsx)("div",{className:"col-span-9",children:(0,l.jsx)(n.Suspense,{fallback:(0,l.jsx)("div",{className:"flex h-full justify-center items-center",children:(0,l.jsx)(a.Z,{})}),children:(0,l.jsx)("div",{className:"mb-4 ",children:(0,l.jsx)(x,{setselectedVideo:d,selectedVideo:o,setvideos:c,videos:t})})})})})]})})}}},function(e){e.O(0,[46,726,435,971,472,744],function(){return e(e.s=8664)}),_N_E=e.O()}]);