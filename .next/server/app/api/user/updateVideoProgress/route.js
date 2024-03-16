"use strict";(()=>{var e={};e.id=522,e.ids=[522],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},68062:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>m,originalPathname:()=>P,patchFetch:()=>v,requestAsyncStorage:()=>l,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>h});var o={};t.r(o),t.d(o,{POST:()=>n});var s=t(10884),a=t(16132),i=t(21040),u=t(95798),d=t(57916);async function n(e){try{let{videoId:r,userId:t,courseId:o}=await e.json(),s=await d.Z.video.findUnique({where:{id:r}});if(!s)return u.Z.json({msg:"No video Found"},{status:404});await d.Z.userVideoProgress.upsert({where:{userId_videoId:{userId:t,videoId:r}},update:{completed:!0},create:{userId:t,videoId:r,completed:!0}});let a=await d.Z.video.findMany({where:{courseId:o},include:{course:!0,userProgress:{where:{userId:t}}}}),i=a.filter(e=>e.userProgress[0]?.completed).length,n=a.length;return u.Z.json({courseVideos:a,courseProgress:n>0?i/n*100:0})}catch(e){return console.error("Error in POST request:",e),u.Z.json({msg:"Internal Server Error"},{status:500})}}let p=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/user/updateVideoProgress/route",pathname:"/api/user/updateVideoProgress",filename:"route",bundlePath:"app/api/user/updateVideoProgress/route"},resolvedPagePath:"D:\\harkirat\\courseApp_complete_without_monorepo\\courseify\\src\\app\\api\\user\\updateVideoProgress\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:c,serverHooks:g,headerHooks:m,staticGenerationBailout:h}=p,P="/api/user/updateVideoProgress/route";function v(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:c})}},57916:(e,r,t)=>{t.d(r,{Z:()=>a});let o=require("@prisma/client"),s=global.prisma||new o.PrismaClient;global.prisma=s;let a=s}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[271,107],()=>t(68062));module.exports=o})();