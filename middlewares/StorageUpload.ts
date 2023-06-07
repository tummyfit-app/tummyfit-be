import { Storage } from "@google-cloud/storage";
import { NextFunction, Request, Response } from "express";
import path from "path";
import AppError from "../utils/AppError";

const pathKey = path.resolve("./credentials.json");

export const gcsStorage = new Storage({
  projectId: "test-project-388616",
  keyFilename: pathKey,
});

const bucketName = process.env.BUCKET || "tummy-bucket";
const bucket = gcsStorage.bucket(bucketName);

function publicUrl(filename: string) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

function uploadToGcs(req: Request, response: Response, next: NextFunction) {
  if (!req.file) return next();

  const gcsname = "assets/" + Date.now() + "";
  const file = bucket.file(gcsname);

  const streamData = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  streamData.on("error", (err) => {
    (req.file as any).cloudError = err;
    next(new AppError(err.message, "400"));
  });
  streamData.on("finish", () => {
    (req.file as any).cloudStorageObject = gcsname;
    (req.file as any).cloudUrl = publicUrl(gcsname);
    next();
  });
  streamData.end(req.file.buffer);
}

export default uploadToGcs;
