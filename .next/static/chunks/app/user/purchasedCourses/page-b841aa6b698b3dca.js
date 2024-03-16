(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[591],{6072:function(e,s,r){Promise.resolve().then(r.bind(r,7954))},1112:function(e,s,r){"use strict";var t=r(7437),l=r(4033);r(2265),s.Z=e=>{let{thumbnail:s,description:r,title:n,navigateTo:o}=e,i=(0,l.useRouter)();return(0,t.jsx)("div",{className:"w-full sm:w-1/2 md:w-[250px] lg:w-[300px]",children:(0,t.jsxs)("article",{className:"flex flex-col h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-transform transform hover:shadow-lg hover:scale-[1.01]",children:[(0,t.jsx)("img",{alt:"Office",src:s,className:"h-56 w-full object-cover hover:scale-[1.05]"}),(0,t.jsxs)("div",{className:"p-4 sm:p-6 flex-grow",children:[(0,t.jsx)("a",{href:"#",children:(0,t.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:n})}),(0,t.jsx)("p",{className:"mt-2 line-clamp-3 text-sm/relaxed text-gray-500",children:r}),(0,t.jsxs)("button",{onClick:()=>i.push(o),className:"mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600",children:[o.startsWith("/user/purchasedCourses")?"View Course":"Find Out More",(0,t.jsx)("span",{"aria-hidden":"true",className:"block transition-all group-hover:ms-0.5 rtl:rotate-180",children:"→"})]})]})]})})}},4970:function(e,s,r){"use strict";var t=r(7437);s.Z=()=>(0,t.jsx)("div",{className:"flex items-center justify-center animate-spin",children:(0,t.jsx)("div",{className:"h-8 w-8",children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"h-full w-full text-blue-500",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12H4M12 4v16l8-8-8-8z"})})})})},7954:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return c}});var t=r(7437),l=r(2265),n=r(3046),o=r(1112);let i=async e=>{let s=await fetch("http://localhost:3000/api/user/purchasedCourses",{method:"GET",headers:{"Content-Type":"application/json",userId:e}});if(!s.ok){console.log(s.statusText);return}return s.json()};var a=r(4970),c=e=>{let s=(0,n.v9)(e=>{var s;return null===(s=e.user.user)||void 0===s?void 0:s.id}),[r,c]=(0,l.useState)([]),[u,d]=(0,l.useState)(!1);return((0,l.useEffect)(()=>{let e=async()=>{d(!0),c((await i(s)).purchasedCourses.purchases),d(!1)};e()},[s]),u)?(0,t.jsxs)("div",{className:"h-full flex flex-col justify-center gap-4 items-center",children:[(0,t.jsx)(a.Z,{})," Getting Purchased Courses.."]}):(0,t.jsxs)(t.Fragment,{children:[(null==r?void 0:r.length)!==0&&(0,t.jsx)("div",{className:"p-32 grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 ",children:null==r?void 0:r.map(e=>(0,t.jsx)(o.Z,{navigateTo:"/user/purchasedCourses/".concat(e.course.id),thumbnail:e.course.thumbnail,description:e.course.description,title:e.course.title}))}),(null==r?void 0:r.length)===0&&(0,t.jsx)("div",{style:{border:"5px solid blue"},className:"h-screen flex justify-center items-center",children:"No Purchased Courses."})]})}},622:function(e,s,r){"use strict";var t=r(2265),l=Symbol.for("react.element"),n=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,i=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,s,r){var t,n={},c=null,u=null;for(t in void 0!==r&&(c=""+r),void 0!==s.key&&(c=""+s.key),void 0!==s.ref&&(u=s.ref),s)o.call(s,t)&&!a.hasOwnProperty(t)&&(n[t]=s[t]);if(e&&e.defaultProps)for(t in s=e.defaultProps)void 0===n[t]&&(n[t]=s[t]);return{$$typeof:l,type:e,key:c,ref:u,props:n,_owner:i.current}}s.Fragment=n,s.jsx=c,s.jsxs=c},7437:function(e,s,r){"use strict";e.exports=r(622)},4033:function(e,s,r){e.exports=r(94)}},function(e){e.O(0,[46,971,472,744],function(){return e(e.s=6072)}),_N_E=e.O()}]);