import AWS, { S3 } from 'aws-sdk';
import short from 'short-uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function uploadFile(data: Buffer): Promise<string> {
  console.log('Uploading to AWS');
  console.log('data', data);

  const params: S3.Types.PutObjectRequest = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: short.generate(),
    Body: data,
    ContentType: 'image/jpeg',
  };

  const result = await s3.upload(params).promise();
  console.log('Uploaded file:', result.Key);
  return result.Location;
}

export { uploadFile };
