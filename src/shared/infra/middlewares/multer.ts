import { Request } from 'express';
import { S3 } from 'aws-sdk';
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
import { randomBytes } from 'crypto';

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export const multerConfig = {
  storage: multerS3({
    s3: new S3(),
    acl: 'public-read',
    bucket: process.env.BUCKET_NAME as string,
    contentType: AUTO_CONTENT_TYPE,
    key: (_: Request, file: IFile, cb) => {
      randomBytes(16, (err, buf) => {
        if (err) cb(err);
        const fileName = `${buf.toString('hex')}/${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
  limits: {
    fileSize: 3 * 1024 * 1024
  }
};
