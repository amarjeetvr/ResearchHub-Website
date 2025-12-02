import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate PDF for proposal acceptance
 * @param {Object} details - PDF content details
 * @param {string} details.clientName - Client's full name
 * @param {string} details.freelancerName - Freelancer's full name
 * @param {string} details.projectTitle - Project title
 * @param {number} details.bidAmount - Accepted bid amount
 * @param {string} details.projectDescription - Project description
 * @returns {Promise<string>} Path to generated PDF
 */
export const generateProposalAcceptancePDF = async ({
  clientName,
  freelancerName,
  projectTitle,
  bidAmount,
  projectDescription = "",
}) => {
  return new Promise((resolve, reject) => {
    try {
      // Create temp directory if it doesn't exist
      const tempDir = path.join(__dirname, "..", "temp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const filename = `proposal_acceptance_${Date.now()}.pdf`;
      const filepath = path.join(tempDir, filename);

      // Create a PDF document
      const doc = new PDFDocument({
        size: "A4",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });

      // Pipe to file
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header - Logo/Title
      doc
        .fontSize(28)
        .fillColor("#2D6CDF")
        .font("Helvetica-Bold")
        .text("ResearchHub", { align: "center" });

      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .fillColor("#666666")
        .font("Helvetica")
        .text("Research Freelance Marketplace", { align: "center" });

      doc.moveDown(2);

      // Main Title
      doc
        .fontSize(24)
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .text("Congratulations!", { align: "center" });

      doc.moveDown(0.5);
      doc
        .fontSize(18)
        .fillColor("#2D6CDF")
        .text("Your Proposal Has Been Accepted", { align: "center" });

      doc.moveDown(2);

      // Divider line
      doc
        .strokeColor("#2D6CDF")
        .lineWidth(2)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(2);

      // Content
      doc.fontSize(12).fillColor("#333333").font("Helvetica");

      doc.text(`Dear ${freelancerName},`, { align: "left" });
      doc.moveDown();

      doc.text(
        `We are pleased to inform you that your proposal has been accepted for the following project:`,
        { align: "left" }
      );
      doc.moveDown(1.5);

      // Project Details Box
      const boxY = doc.y;
      doc
        .rect(50, boxY, 495, 140)
        .fillAndStroke("#E3F2FD", "#2D6CDF")
        .fill();

      doc.fillColor("#1F1F1F").font("Helvetica-Bold").fontSize(14);
      doc.text("Project Details", 70, boxY + 20);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      doc.text(`Project Title:`, 70, boxY + 45);
      doc.font("Helvetica-Bold").text(projectTitle, 170, boxY + 45);

      doc.font("Helvetica").text(`Client Name:`, 70, boxY + 65);
      doc.font("Helvetica-Bold").text(clientName, 170, boxY + 65);

      doc.font("Helvetica").text(`Freelancer:`, 70, boxY + 85);
      doc.font("Helvetica-Bold").text(freelancerName, 170, boxY + 85);

      doc.font("Helvetica").text(`Project Budget:`, 70, boxY + 105);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#28a745")
        .text(`$${bidAmount}`, 170, boxY + 103);

      doc.moveDown(12);

      // Important Information
      doc
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Important Information:", { align: "left" });
      doc.moveDown(0.5);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      const bulletPoints = [
        "Your proposal has been accepted by the client.",
        "The client has deposited the payment into secure escrow.",
        "You can now begin working on the project deliverables.",
        "You will receive full payment after the project is completed and approved by the client.",
        "Please maintain regular communication with the client through the platform.",
      ];

      bulletPoints.forEach((point) => {
        doc.text(`• ${point}`, 70, doc.y, { width: 475 });
        doc.moveDown(0.3);
      });

      doc.moveDown(1);

      // Next Steps
      doc
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Next Steps:", { align: "left" });
      doc.moveDown(0.5);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      const steps = [
        "Log in to your ResearchHub dashboard",
        "Review the complete project requirements",
        "Contact the client if you need any clarifications",
        "Begin working on the project deliverables",
        "Update project progress regularly in your dashboard",
      ];

      steps.forEach((step, index) => {
        doc.text(`${index + 1}. ${step}`, 70, doc.y, { width: 475 });
        doc.moveDown(0.3);
      });

      doc.moveDown(2);

      // Footer message
      doc
        .fontSize(11)
        .fillColor("#666666")
        .text(
          "Thank you for being a valued member of ResearchHub. We look forward to your successful project completion.",
          { align: "left", width: 495 }
        );

      doc.moveDown(2);

      doc
        .fontSize(10)
        .fillColor("#333333")
        .text("Best regards,", { align: "left" });
      doc
        .font("Helvetica-Bold")
        .text("The ResearchHub Team", { align: "left" });

      // Bottom border
      doc.moveDown(3);
      doc
        .strokeColor("#CCCCCC")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(0.5);
      doc
        .fontSize(9)
        .fillColor("#999999")
        .font("Helvetica")
        .text(
          `Generated on ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
          { align: "center" }
        );
      doc.text("© 2025 ResearchHub. All rights reserved.", { align: "center" });

      // Finalize PDF
      doc.end();

      stream.on("finish", () => {
        console.log("✅ PDF generated successfully:", filepath);
        resolve(filepath);
      });

      stream.on("error", (error) => {
        console.error("❌ Error generating PDF:", error);
        reject(error);
      });
    } catch (error) {
      console.error("❌ Error in PDF generation:", error);
      reject(error);
    }
  });
};

/**
 * Generate PDF for payment release confirmation
 * @param {Object} details - PDF content details
 * @param {string} details.freelancerName - Freelancer's full name
 * @param {string} details.clientName - Client's full name
 * @param {string} details.projectTitle - Project title
 * @param {number} details.amount - Payment amount
 * @param {Object} details.bankAccount - Bank account details
 * @param {string} details.transactionId - Transaction reference ID
 * @returns {Promise<string>} Path to generated PDF
 */
export const generatePaymentReleasePDF = async ({
  freelancerName,
  clientName,
  projectTitle,
  amount,
  bankAccount,
  transactionId,
}) => {
  return new Promise((resolve, reject) => {
    try {
      // Create temp directory if it doesn't exist
      const tempDir = path.join(__dirname, "..", "temp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const filename = `payment_release_${Date.now()}.pdf`;
      const filepath = path.join(tempDir, filename);

      // Create a PDF document
      const doc = new PDFDocument({
        size: "A4",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });

      // Pipe to file
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header - Logo/Title
      doc
        .fontSize(28)
        .fillColor("#28a745")
        .font("Helvetica-Bold")
        .text("ResearchHub", { align: "center" });

      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .fillColor("#666666")
        .font("Helvetica")
        .text("Payment Release Confirmation", { align: "center" });

      doc.moveDown(2);

      // Main Title
      doc
        .fontSize(24)
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .text("Payment Released", { align: "center" });

      doc.moveDown(0.5);
      doc
        .fontSize(16)
        .fillColor("#28a745")
        .text("Transaction Completed Successfully", { align: "center" });

      doc.moveDown(2);

      // Divider line
      doc
        .strokeColor("#28a745")
        .lineWidth(2)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(2);

      // Transaction ID
      doc
        .fontSize(10)
        .fillColor("#666666")
        .font("Helvetica")
        .text(`Transaction ID: ${transactionId || `TXN${Date.now()}`}`, {
          align: "right",
        });
      doc.moveDown();
      doc.text(
        `Date: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        { align: "right" }
      );

      doc.moveDown(2);

      // Content
      doc.fontSize(12).fillColor("#333333").font("Helvetica");

      doc.text(`Dear ${freelancerName},`, { align: "left" });
      doc.moveDown();

      doc.text(
        `This document confirms that the payment for your completed project has been successfully released from escrow.`,
        { align: "left" }
      );
      doc.moveDown(1.5);

      // Project Details Box
      const boxY = doc.y;
      doc
        .rect(50, boxY, 495, 120)
        .fillAndStroke("#d4edda", "#28a745")
        .fill();

      doc.fillColor("#1F1F1F").font("Helvetica-Bold").fontSize(14);
      doc.text("Project Information", 70, boxY + 20);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      doc.text(`Project Title:`, 70, boxY + 45);
      doc.font("Helvetica-Bold").text(projectTitle, 170, boxY + 45, {
        width: 360,
      });

      doc.font("Helvetica").text(`Client Name:`, 70, boxY + 65);
      doc.font("Helvetica-Bold").text(clientName, 170, boxY + 65);

      doc.font("Helvetica").text(`Freelancer:`, 70, boxY + 85);
      doc.font("Helvetica-Bold").text(freelancerName, 170, boxY + 85);

      doc.moveDown(10);

      // Payment Amount - Large and prominent
      doc
        .fontSize(18)
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .text("Payment Amount:", { align: "center" });
      doc
        .fontSize(36)
        .fillColor("#28a745")
        .text(`$${amount}`, { align: "center" });

      doc.moveDown(2);

      // Bank Account Details Box (if provided)
      if (bankAccount) {
        const accountBoxY = doc.y;
        doc
          .rect(50, accountBoxY, 495, 140)
          .fillAndStroke("#f8f9fa", "#dee2e6")
          .stroke();

        doc.fillColor("#1F1F1F").font("Helvetica-Bold").fontSize(13);
        doc.text("Payment Details", 70, accountBoxY + 20);

        doc.fillColor("#333333").font("Helvetica").fontSize(11);

        if (bankAccount.bankName) {
          doc.text(`Bank Name:`, 70, accountBoxY + 45);
          doc.font("Helvetica-Bold").text(bankAccount.bankName, 200, accountBoxY + 45);
        }

        if (bankAccount.accountHolderName) {
          doc.font("Helvetica").text(`Account Holder:`, 70, accountBoxY + 65);
          doc
            .font("Helvetica-Bold")
            .text(bankAccount.accountHolderName, 200, accountBoxY + 65);
        }

        if (bankAccount.accountNumber) {
          doc.font("Helvetica").text(`Account Number:`, 70, accountBoxY + 85);
          doc
            .font("Helvetica-Bold")
            .text(
              "****" + bankAccount.accountNumber.slice(-4),
              200,
              accountBoxY + 85
            );
        }

        if (bankAccount.accountType) {
          doc.font("Helvetica").text(`Account Type:`, 70, accountBoxY + 105);
          doc
            .font("Helvetica-Bold")
            .text(bankAccount.accountType, 200, accountBoxY + 105);
        }

        doc.moveDown(11);
      }

      // Payment Timeline
      doc
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Payment Timeline:", { align: "left" });
      doc.moveDown(0.5);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      const timeline = [
        "✓ Payment released from secure escrow",
        "✓ Transfer initiated to your registered bank account",
        "⏱ Funds should arrive within 3-5 business days",
        "📧 You will receive a confirmation once the transfer is complete",
      ];

      timeline.forEach((item) => {
        doc.text(item, 70, doc.y, { width: 475 });
        doc.moveDown(0.4);
      });

      doc.moveDown(1.5);

      // Important Notes
      doc
        .fillColor("#1F1F1F")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Important Notes:", { align: "left" });
      doc.moveDown(0.5);

      doc.fillColor("#333333").font("Helvetica").fontSize(11);
      const notes = [
        "This payment is final and cannot be reversed.",
        "Please verify the payment receipt in your bank account.",
        "Keep this document for your records.",
        "For any payment queries, contact our support team.",
      ];

      notes.forEach((note) => {
        doc.text(`• ${note}`, 70, doc.y, { width: 475 });
        doc.moveDown(0.3);
      });

      doc.moveDown(2);

      // Footer message
      doc
        .fontSize(11)
        .fillColor("#666666")
        .text(
          "Thank you for your excellent work and for being a valued member of the ResearchHub community. We look forward to working with you on future projects!",
          { align: "left", width: 495 }
        );

      doc.moveDown(2);

      doc
        .fontSize(10)
        .fillColor("#333333")
        .text("Best regards,", { align: "left" });
      doc
        .font("Helvetica-Bold")
        .text("The ResearchHub Team", { align: "left" });

      // Bottom border
      doc.moveDown(3);
      doc
        .strokeColor("#CCCCCC")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(0.5);
      doc
        .fontSize(9)
        .fillColor("#999999")
        .font("Helvetica")
        .text(`This is an official payment confirmation document`, {
          align: "center",
        });
      doc.text("© 2025 ResearchHub. All rights reserved.", { align: "center" });

      // Finalize PDF
      doc.end();

      stream.on("finish", () => {
        console.log("✅ Payment release PDF generated successfully:", filepath);
        resolve(filepath);
      });

      stream.on("error", (error) => {
        console.error("❌ Error generating payment release PDF:", error);
        reject(error);
      });
    } catch (error) {
      console.error("❌ Error in payment release PDF generation:", error);
      reject(error);
    }
  });
};

export default { generateProposalAcceptancePDF, generatePaymentReleasePDF };
