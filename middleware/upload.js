const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the media directory exists
const uploadPath = './media';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Set storage engine for local upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    // cb(null, `${Date.now()}${ext}`); // Save with timestamp to prevent name conflicts
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`); // Ensure unique filename for every upload
  }
});

// Filter for allowed image types (e.g., JPG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
  }
};

// Multer upload configuration
const upload = multer({ 
  storage,
  // fileFilter
});

module.exports = upload;
