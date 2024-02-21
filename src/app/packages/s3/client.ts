import { S3Client } from "@aws-sdk/client-s3";


const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIAYU6NUHDAU3RROFGT",
        secretAccessKey: "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"

    }
})
export default s3Client;