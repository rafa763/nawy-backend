// import AWS, { S3 } from 'aws-sdk';
// import short from 'short-uuid';
// // import dotenv from "dotenv";

// // dotenv.config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// interface S3DeleteParams {
//   Bucket: string;
//   Delete: {
//     Objects: { Key: string }[];
//   };
// }

// async function uploadFile(data: Buffer) {
//   try {
//     console.log('Uploading to AWS');
//     console.log('data', data);
//     const params: S3.Types.PutObjectRequest = {
//       Bucket: process.env.BUCKET_NAME as string,
//       Key: short.generate(),
//       Body: data,
//       ContentType: 'image/jpeg',
//     };
//     s3.upload(params, (err, data) => {
//       if (err) {
//         throw new Error('Error uploading to bucket: ' + err);
//       }
//       console.log('Data', data.Key);
//       return data.Location as string;
//     });
//   } catch (error) {
//     throw new Error('Error in toAws: ' + error);
//   }
// }

// async function deleteFile(objectKeys: string[]): Promise<void> {
//   try {
//     const params: S3DeleteParams = {
//       Bucket: process.env.BUCKET_NAME as string,
//       Delete: {
//         Objects: objectKeys.map((key) => ({ Key: key })),
//       },
//     };
//     s3.deleteObjects(params, (err, data) => {
//       if (err) {
//         throw new Error('Error deleting objects from bucket: ' + err);
//       }
//       console.log('Deleted objects', data);
//     });
//   } catch (error) {
//     throw new Error('Error deleting objects from bucket: ' + error);
//   }
// }

// export { uploadFile, deleteFile };
