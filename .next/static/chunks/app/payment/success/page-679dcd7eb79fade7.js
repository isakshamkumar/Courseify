(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[478],{9190:function(e,t,s){Promise.resolve().then(s.bind(s,6585))},6308:function(e,t,s){"use strict";var r=s(7437);t.Z=()=>(0,r.jsxs)("svg",{className:"animate-spin h-8 w-8 mr-3",viewBox:"0 0 24 24",children:[(0,r.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,r.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})},4970:function(e,t,s){"use strict";var r=s(7437);t.Z=()=>(0,r.jsx)("div",{className:"flex items-center justify-center animate-spin",children:(0,r.jsx)("div",{className:"h-8 w-8",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"h-full w-full text-blue-500",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12H4M12 4v16l8-8-8-8z"})})})})},6585:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return l}});var r=s(7437),n=s(2265),o=s(4033),c=s(4970),a=s(3046),i=s(6308);function l(){let e=(0,o.useRouter)(),[t,s]=(0,n.useState)(!1),l=(0,o.useSearchParams)(),u=l.get("session_id"),f=(0,a.v9)(e=>e.user.user.id);return(0,a.v9)(e=>e.user.user.email),(0,n.useEffect)(()=>{let r=localStorage.getItem("paymentCount");if(!t&&!r){s(!0);let e=async()=>{let e=await fetch("http://localhost:3000/api/payment",{method:"POST",body:JSON.stringify({session_id:u,userId:f})});await e.json(),s(!1)};e(),s(!1),localStorage.setItem("paymentCount","1")}setTimeout(()=>{localStorage.removeItem("paymentCount"),e.push("/user/purchasedCourses")},5e3)},[]),(0,r.jsx)("div",{className:"h-screen flex justify-center items-center",children:t?(0,r.jsx)(c.Z,{}):(0,r.jsxs)("div",{className:"h-36 flex flex-col w-52 ",children:["Payment Successful! Redirecting You to Purchased Courses...",(0,r.jsx)(i.Z,{})]})})}},622:function(e,t,s){"use strict";var r=s(2265),n=Symbol.for("react.element"),o=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,s){var r,o={},l=null,u=null;for(r in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)c.call(t,r)&&!i.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:n,type:e,key:l,ref:u,props:o,_owner:a.current}}t.Fragment=o,t.jsx=l,t.jsxs=l},7437:function(e,t,s){"use strict";e.exports=s(622)},4033:function(e,t,s){e.exports=s(94)}},function(e){e.O(0,[46,971,472,744],function(){return e(e.s=9190)}),_N_E=e.O()}]);