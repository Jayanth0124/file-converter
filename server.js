const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const PORT = 3000;

// Set up multer to store uploaded files in the "uploads" folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder for storing files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint: Convert Image to PNG
app.post('/convert-image', upload.single('image'), async (req, res) => {
    const inputFile = req.file.path; // Path of the uploaded file
    const outputFile = `uploads/converted-${Date.now()}.png`;

    try {
        // Convert image using sharp
        await sharp(inputFile).toFormat('png').toFile(outputFile);

        // Send the converted file to the client for download
        res.download(outputFile, 'converted.png', (err) => {
            if (err) throw err;
            console.log('File sent!');
        });
    } catch (error) {
        console.error('Error during conversion:', error);
        res.status(500).send('An error occurred during conversion.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
