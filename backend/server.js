require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const vision = require("@google-cloud/vision");
const fs = require("fs");
const pdf = require("pdf-poppler");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Vision client
let client;
try {
  const keyPath = path.join(__dirname, "credentials/handwritten-reader-key.json");
  
  // Verify credentials file exists
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Credentials file not found at: ${keyPath}`);
  }
  
  client = new vision.ImageAnnotatorClient({
    keyFilename: keyPath,
  });
  console.log("✅ Google Cloud Vision client initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Google Cloud Vision client:", error.message);
  process.exit(1);
}

// Ensure required directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const outputsDir = path.join(__dirname, 'outputs');
[uploadsDir, outputsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// File upload setup with file filter
const upload = multer({
  dest: uploadsDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Helper: Convert PDF to PNGs
async function pdfToImages(pdfPath) {
  try {
    console.log(`Converting PDF to images: ${pdfPath}`);
    const opts = {
      format: "png",
      out_dir: path.dirname(pdfPath),
      out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
      page: null,
    };

    await pdf.convert(pdfPath, opts);

    const imageFiles = fs
      .readdirSync(path.dirname(pdfPath))
      .filter(
        (f) =>
          f.startsWith(path.basename(pdfPath, ".pdf")) &&
          f.endsWith(".png")
      )
      .map((f) => path.join(path.dirname(pdfPath), f));

    console.log(`Generated ${imageFiles.length} images from PDF`);
    return imageFiles;
  } catch (error) {
    console.error('Error in PDF to image conversion:', error);
    throw new Error('Failed to convert PDF to images');
  }
}

// Helper: Clean up files
function cleanupFiles(files) {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Cleaned up: ${file}`);
      }
    } catch (error) {
      console.error(`Error cleaning up file ${file}:`, error);
    }
  });
}

// --- OCR route ---
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const filesToCleanup = [filePath];
  let imagePaths = [];

  try {
    console.log(`Processing file: ${req.file.originalname} (${req.file.mimetype})`);

    // Step 1: Convert PDF to images if it's a PDF
    if (req.file.mimetype === 'application/pdf') {
      imagePaths = await pdfToImages(filePath);
      filesToCleanup.push(...imagePaths);
    } else {
      // For image files, use the uploaded file directly
      imagePaths = [filePath];
    }

    // Step 2: Process each image with Google Cloud Vision
    let allText = "";
    for (const [index, imgPath] of imagePaths.entries()) {
      try {
        console.log(`Processing image ${index + 1}/${imagePaths.length}: ${path.basename(imgPath)}`);
        const [result] = await client.documentTextDetection({
          image: { content: fs.readFileSync(imgPath) },
        });
        
        const text = result.fullTextAnnotation?.text || "";
        allText += `\n--- Page ${index + 1} ---\n${text}\n`;
      } catch (error) {
        console.error(`Error processing image ${imgPath}:`, error);
        throw new Error(`Failed to process image ${index + 1}: ${error.message}`);
      }
    }

    // Step 3: Save extracted text to a file
    const timestamp = Date.now();
    const outputFilename = `output_${timestamp}.txt`;
    const outputPath = path.join(outputsDir, outputFilename);
    
    fs.writeFileSync(outputPath, allText, "utf-8");
    console.log(`Text extracted and saved to: ${outputPath}`);

    // Step 4: Send response
    res.json({
      success: true,
      message: "File processed successfully",
      filename: req.file.originalname,
      pages: imagePaths.length,
      characterCount: allText.length,
      downloadUrl: `http://localhost:5000/download/${outputFilename}`,
      extractedText: allText,
    });

  } catch (error) {
    console.error("Processing error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process file",
    });
  } finally {
    // Clean up temporary files
    cleanupFiles(filesToCleanup);
  }
});

// Serve output files for download
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(outputsDir, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Error downloading file' });
      }
    });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Smart Grading OCR Service',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`📂 Outputs directory: ${outputsDir}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health\n`);
});
