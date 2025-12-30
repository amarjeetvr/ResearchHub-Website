import multer from "multer";

// Store uploaded file in memory as Buffer
const storage = multer.memoryStorage();

export const singleupload = multer({ storage }).single("file");

// Multiple file upload (up to 10 files)
export const multipleUpload = multer({ 
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
  }
}).array("files", 10);
