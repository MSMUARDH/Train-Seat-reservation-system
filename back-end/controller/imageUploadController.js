var admin = require("firebase-admin");
const uuid = require("uuid-v4");

// CHANGE: The path to your service account
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "railway-24455.appspot.com",
});

var bucket = admin.storage().bucket();

const uploadFile = async (req, res) => {
  console.log(req.file);
  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;

  const metadata = {
    metadata: {
      // This line is very important. It's to create a download token.
      // !psss the userid here
      firebaseStorageDownloadTokens: "thisisforthetest",
    },
    contentType: "image/png", // Adjust the content type based on your file type
    cacheControl: "public, max-age=31536000",
  };

  // Uploads a file buffer to the bucket
  await bucket.file(fileName).save(fileBuffer, {
    metadata: metadata,
  });

  return res
    .status(200)
    .json({ message: `${fileName} has been uploaded succesfully.` });
};

module.exports = {
  uploadFile,
};
