const express = require("express");
const path = require("path");
const fs = require("fs");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const router = express.Router();

// Pixel → PDF coordinate conversion
function pdfX(px, imgWidth) {
  return (px / imgWidth) * 842; // Landscape A4 width
}
function pdfY(px, imgHeight) {
  return (1 - (px / imgHeight)) * 595; // Landscape A4 height
}
function centerX(pageWidth, text, font, size) {
  return pageWidth / 2 - font.widthOfTextAtSize(text, size) / 2;
}

router.post("/generate", async (req, res) => {
  try {
    const { userName, planName, startDate, expiryDate } = req.body;

    // Template image path
    const templatePath = path.join(__dirname, "../uploads/templates.png");

    // File name
    const fileName = `${userName.replace(/\s+/g, "_")}_certificate.pdf`;
    const filePath = path.join(__dirname, "../uploads/certificates", fileName);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // Landscape A4

    // Fonts
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Load template image
    const templateImage = fs.readFileSync(templatePath);
    const templateEmbed = await pdfDoc.embedPng(templateImage);
    const imgWidth = templateEmbed.width;
    const imgHeight = templateEmbed.height;

    // Draw template background
    page.drawImage(templateEmbed, { x: 0, y: 0, width: 842, height: 595 });

    // === Professional Certificate Text Positions (in PX) ===
    const positions = {
      title: { px: { x: imgWidth / -164, y: -266 }, size: 34, font: titleFont, text: "CERTIFICATE OF SUBSCRIPTION", color: rgb(0.1, 0.1, 0.1), center: true },
      subtitle: { px: { x: imgWidth / 608, y: 401 }, size: 20, font: normalFont, text: "This is to certify that", color: rgb(0, 0, 0), center: true },
      userName: { px: { x: imgWidth / 2, y: 320 }, size: 28, font: titleFont, text: userName, color: rgb(0.1, 0.3, 0.6), center: true },
      subscribedText: { px: { x: imgWidth / 2, y: 360 }, size: 18, font: normalFont, text: "has successfully subscribed to", color: rgb(0, 0, 0), center: true },
      planName: { px: { x: imgWidth / 2, y: 400 }, size: 24, font: titleFont, text: planName, color: rgb(0.9, 0.2, 0.2), center: true },
      dateLine: { px: { x: imgWidth / 2, y: 440 }, size: 16, font: normalFont, text: `on ${startDate} and is entitled to all benefits until ${expiryDate}`, color: rgb(0, 0, 0), center: true },
      footer: { px: { x: imgWidth / 2, y: imgHeight - 80 }, size: 14, font: normalFont, text: "Issued by Golden Bird - Authorised Signatory", color: rgb(0, 0, 0), center: true }
    };

    // Draw text dynamically
    Object.values(positions).forEach(pos => {
      let finalX = pdfX(pos.px.x, imgWidth);
      const finalY = pdfY(pos.px.y, imgHeight);

      if (pos.center) {
        finalX = centerX(842, pos.text, pos.font, pos.size);
      }

      page.drawText(pos.text, {
        x: finalX,
        y: finalY,
        size: pos.size,
        font: pos.font,
        color: pos.color
      });
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);

    res.json({
      success: true,
      message: "Certificate generated successfully",
      fileName
    });

  } catch (err) {
    console.error("Certificate generation error:", err);
    res.status(500).json({ error: "Failed to generate certificate" });
  }
});

module.exports = router;




// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

// const router = express.Router();

// // Helper functions for coordinate conversion
// function pdfX(px, imgWidth) {
//   return (px / imgWidth) * 842; // Landscape A4 width
// }
// function pdfY(px, imgHeight) {
//   return (1 - (px / imgHeight)) * 595; // Landscape A4 height
// }

// // Center align calculation
// function centerX(pageWidth, text, font, size) {
//   return pageWidth / 2 - font.widthOfTextAtSize(text, size) / 2;
// }

// router.post("/generate", async (req, res) => {
//   try {
//     const { userName, planName, startDate, expiryDate } = req.body;

//     // Template image ka path
//     const templatePath = path.join(__dirname, "../uploads/templates.png");

//     // Certificate PDF ka file name
//     const fileName = `${userName.replace(/\s+/g, "_")}_certificate.pdf`;
//     const filePath = path.join(__dirname, "../uploads/certificates", fileName);

//     // PDF create
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([842, 595]); // A4 Landscape

//     // Fonts
//     const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // Background image embed
//     const templateImageBytes = fs.readFileSync(templatePath);
//     const templateEmbed = await pdfDoc.embedPng(templateImageBytes);
//     const imgWidth = templateEmbed.width;
//     const imgHeight = templateEmbed.height;

//     page.drawImage(templateEmbed, {
//       x: 0,
//       y: 0,
//       width: 842,
//       height: 595,
//     });

//     // Positions in PIXELS from your design software (Photoshop/Figma)
//     const positions = {
//       title: { px: { x: 328, y: 241 }, size: 36, font: titleFont, text: "CERTIFICATE OF ACHIEVEMENT", color: rgb(0.1, 0.1, 0.1), center: true },
//       subtitle: { px: { x: 413, y: 278 }, size: 32, font: normalFont, text: "This is to certify that", color: rgb(0, 0, 0), center: true },
//       userName: { px: { x: 520, y: 335 }, size: 32, font: titleFont, text: userName, color: rgb(0.1, 0.3, 0.6), center: true },
//       subscribedText: { px: { x: 354, y: 366 }, size: 32, font: normalFont, text: "has successfully subscribed to", color: rgb(0, 0, 0), center: true },
//       planName: { px: { x: 413, y: 428 }, size: 33, font: titleFont, text: planName, color: rgb(0.9, 0.2, 0.2), center: true },
//       startDate: { px: { x: 130, y: 664 }, size: 24, font: normalFont, text: `Start Date: ${startDate}`, color: rgb(0, 0, 0) },
//       expiryDate: { px: { x: 128, y: 695 }, size: 24, font: normalFont, text: `Expiry Date: ${expiryDate}`, color: rgb(0, 0, 0) },
//     };

//     // Draw text from positions config
//     Object.values(positions).forEach(pos => {
//       let finalX = pdfX(pos.px.x, imgWidth);
//       const finalY = pdfY(pos.px.y, imgHeight);

//       // If centered, recalculate X
//       if (pos.center) {
//         finalX = centerX(842, pos.text, pos.font, pos.size);
//       }

//       // Optional: Shrink font size if text is too long
//       let size = pos.size;
//       while (pos.font.widthOfTextAtSize(pos.text, size) > 700 && size > 8) {
//         size -= 1;
//       }

//       page.drawText(pos.text, {
//         x: finalX,
//         y: finalY,
//         size,
//         font: pos.font,
//         color: pos.color,
//       });
//     });

//     // Save PDF
//     const pdfBytes = await pdfDoc.save();
//     fs.writeFileSync(filePath, pdfBytes);

//     res.json({
//       success: true,
//       message: "Certificate generated successfully",
//       fileName,
//     });

//   } catch (err) {
//     console.error("Certificate generation error:", err);
//     res.status(500).json({ error: "Failed to generate certificate" });
//   }
// });

// module.exports = router;


