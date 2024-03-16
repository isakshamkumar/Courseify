import { Queue } from "bullmq";

const myQueue = new Queue("email-queue", {
  connection: {
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT),
  },
});

export async function addJobs(email:string, subject:string, message:string) {
    
    const job = await myQueue.add("email-queue", {
        email,
        subject,
        message,
    });
    // console.log('Job Added to Email Queue');
}
// addJobs();
