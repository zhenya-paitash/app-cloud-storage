import { diskStorage } from 'multer';

/**
 * The function generates a random 18-character hexadecimal ID.
 */
const generateId = () =>
  Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

/**
 * This function generates a normalized file name with a unique ID and the original
 * file extension.
 *
 * @param req The `req` parameter is not used in this function and is therefore
 * unnecessary. It is likely included as a parameter due to the function being used
 * as middleware in a Node.js application, where the `req` parameter is often
 * included by default.
 * @param file The `file` parameter is an object that represents the uploaded file.
 * It contains information about the file such as its original name, size, and
 * type. In this code snippet, the `file` object is used to extract the file
 * extension from the original name of the file.
 * @param cb `cb` stands for "callback" and is a function that is called once the
 * file name has been normalized. It takes two parameters: an error object (if any)
 * and the normalized file name. The purpose of the callback is to pass control
 * back to the multer middleware so that it can continue
 */
const normalizeFileName = (req, file, cb) => {
  const fileExtName = file.originalname.split('.').pop();
  cb(null, `${generateId()}.${fileExtName}`);
};

/* This code exports a `fileStorage` object that is created using the `diskStorage`
function from the `multer` library. The `diskStorage` function takes an object
with two properties: `destination` and `filename`. */
export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFileName,
});
