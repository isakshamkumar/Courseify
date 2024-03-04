import { Worker } from "bullmq";
import { sendEmail } from "./Mailer";

const worker = new Worker(
  "email-queue",
  async (job) => {
    const { email, subject, message } = job.data;
    console.log(`Sending Email to ${email} of Job Id ${job.id}`);
    await sendEmail(email, subject, message);
   
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: Number(process.env.REDIS_PORT),
    },
  }
);
