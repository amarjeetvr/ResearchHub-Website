import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Create transporter with provided SMTP credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "av457508@gmail.com",
    pass: process.env.EMAIL_PASS || "iwvm hvvk zwjt woeg",
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

/**
 * Send proposal acceptance email to client with PDF attachment
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.clientName - Client's full name
 * @param {string} options.freelancerName - Freelancer's full name
 * @param {string} options.projectTitle - Project title
 * @param {number} options.bidAmount - Accepted bid amount
 * @param {string} options.pdfPath - Path to PDF attachment
 */
export const sendProposalAcceptedEmail = async ({
  to,
  clientName,
  freelancerName,
  projectTitle,
  bidAmount,
  pdfPath,
}) => {
  try {
    const mailOptions = {
      from: `"ResearchHub" <${process.env.EMAIL_USER || "av457508@gmail.com"}>`,
      to: to,
      subject: "Congratulations! Your Proposal Has Been Accepted",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2D6CDF 0%, #1F1F1F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #2D6CDF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2D6CDF; margin: 20px 0; }
            .amount { font-size: 24px; font-weight: bold; color: #2D6CDF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Congratulations!</h1>
              <p>Your proposal has been accepted</p>
            </div>
            <div class="content">
              <p>Dear ${freelancerName},</p>
              
              <p>We are pleased to inform you that your proposal for the project "<strong>${projectTitle}</strong>" has been accepted by ${clientName}.</p>
              
              <div class="highlight">
                <p><strong>Project Budget:</strong> <span class="amount">$${bidAmount}</span></p>
              </div>
              
              <h3>Important Information:</h3>
              <ul>
                <li>✓ Your proposal has been selected</li>
                <li>✓ The client has deposited funds into escrow</li>
                <li>✓ You can now begin working on the project</li>
                <li>✓ You will receive <strong>full payment</strong> after the project is completed and approved</li>
              </ul>
              
              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Log in to your ResearchHub dashboard</li>
                <li>Review the project requirements carefully</li>
                <li>Communicate with the client if you need any clarifications</li>
                <li>Begin working on the project deliverables</li>
                <li>Update project progress regularly</li>
              </ol>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/freelancer-dashboard" class="button">Go to Dashboard</a>
              </div>
              
              <p style="margin-top: 30px;">Best regards,<br><strong>ResearchHub Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 ResearchHub. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: pdfPath
        ? [
            {
              filename: "Proposal_Acceptance.pdf",
              path: pdfPath,
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Proposal acceptance email sent:", info.messageId);

    // Delete the PDF file after sending
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
      console.log("✅ Temporary PDF file deleted");
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending proposal acceptance email:", error);
    throw error;
  }
};

/**
 * Send payment release notification to admin
 * @param {Object} options - Email options
 * @param {string} options.clientName - Client's full name
 * @param {string} options.freelancerName - Freelancer's full name
 * @param {string} options.projectTitle - Project title
 * @param {number} options.bidAmount - Bid amount
 * @param {Object} options.freelancerAccount - Freelancer's bank account details
 */
export const sendPaymentReleaseToAdmin = async ({
  clientName,
  freelancerName,
  projectTitle,
  bidAmount,
  freelancerAccount,
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL not configured in environment variables");
    }

    const accountDetails = freelancerAccount
      ? `
      <h3>Freelancer Payment Details:</h3>
      <ul>
        <li><strong>Account Holder:</strong> ${freelancerAccount.accountHolderName || "N/A"}</li>
        <li><strong>Bank Name:</strong> ${freelancerAccount.bankName || "N/A"}</li>
        <li><strong>Account Number:</strong> ${freelancerAccount.accountNumber || "N/A"}</li>
        <li><strong>IFSC Code:</strong> ${freelancerAccount.ifscCode || "N/A"}</li>
        <li><strong>Account Type:</strong> ${freelancerAccount.accountType || "N/A"}</li>
        <li><strong>UPI ID:</strong> ${freelancerAccount.upiId || "N/A"}</li>
      </ul>
    `
      : "<p><strong>Note:</strong> Freelancer has not provided bank account details yet.</p>";

    const mailOptions = {
      from: `"ResearchHub System" <${process.env.EMAIL_USER || "av457508@gmail.com"}>`,
      to: adminEmail,
      subject: "Project Completed – Release Payment",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666; }
            .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .info-box { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .amount { font-size: 28px; font-weight: bold; color: #28a745; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Payment Release Request</h1>
              <p>Project completed and approved by client</p>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚠️ Action Required:</strong> One project has been completed. Please release the payment.
              </div>
              
              <h3>Project Details:</h3>
              <ul>
                <li><strong>Project Title:</strong> ${projectTitle}</li>
                <li><strong>Client Name:</strong> ${clientName}</li>
                <li><strong>Freelancer Name:</strong> ${freelancerName}</li>
                <li><strong>Payment Amount:</strong> <span class="amount">$${bidAmount}</span></li>
              </ul>
              
              ${accountDetails}
              
              <div class="info-box">
                <p><strong>Status:</strong> Client has approved the completed work</p>
                <p><strong>Next Step:</strong> Process payment to freelancer's account</p>
              </div>
              
              <p style="margin-top: 30px;">Please process this payment at your earliest convenience.</p>
              
              <p>Best regards,<br><strong>ResearchHub Automated System</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 ResearchHub. All rights reserved.</p>
              <p>This is an automated notification from the ResearchHub platform.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Payment release email sent to admin:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending payment release email to admin:", error);
    throw error;
  }
};

/**
 * Send payment release confirmation email to freelancer with PDF
 * @param {Object} options - Email options
 * @param {string} options.to - Freelancer email
 * @param {string} options.freelancerName - Freelancer's full name
 * @param {string} options.clientName - Client's full name
 * @param {string} options.projectTitle - Project title
 * @param {number} options.amount - Payment amount
 * @param {string} options.pdfPath - Path to PDF attachment
 * @param {Object} options.bankAccount - Freelancer's bank account details
 */
export const sendPaymentReleasedEmail = async ({
  to,
  freelancerName,
  clientName,
  projectTitle,
  amount,
  pdfPath,
  bankAccount,
}) => {
  try {
    const accountSummary = bankAccount
      ? `
      <div class="account-info">
        <h3>Payment Details:</h3>
        <p><strong>Bank:</strong> ${bankAccount.bankName || "N/A"}</p>
        <p><strong>Account Number:</strong> ${bankAccount.accountNumber ? "****" + bankAccount.accountNumber.slice(-4) : "N/A"}</p>
        <p><strong>Account Holder:</strong> ${bankAccount.accountHolderName || "N/A"}</p>
      </div>
    `
      : "";

    const mailOptions = {
      from: `"ResearchHub" <${process.env.EMAIL_USER || "av457508@gmail.com"}>`,
      to: to,
      subject: "🎉 Payment Released – Project Completed Successfully",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666; }
            .success-box { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
            .amount { font-size: 32px; font-weight: bold; color: #28a745; text-align: center; margin: 20px 0; }
            .account-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Congratulations!</h1>
              <p>Your payment has been released</p>
            </div>
            <div class="content">
              <p>Dear ${freelancerName},</p>
              
              <div class="success-box">
                <p style="margin:0;"><strong>✓ Payment Successfully Released</strong></p>
              </div>
              
              <p>We are delighted to inform you that the payment for your successfully completed project has been released!</p>
              
              <h3>Project Details:</h3>
              <ul>
                <li><strong>Project:</strong> ${projectTitle}</li>
                <li><strong>Client:</strong> ${clientName}</li>
                <li><strong>Status:</strong> Completed & Approved</li>
              </ul>
              
              <div class="amount">$${amount}</div>
              
              ${accountSummary}
              
              <p><strong>Payment Timeline:</strong></p>
              <ul>
                <li>✓ Payment released from escrow</li>
                <li>✓ Transfer initiated to your account</li>
                <li>⏱ Funds should arrive within 3-5 business days</li>
              </ul>
              
              <p style="margin-top: 30px;"><strong>What's Next?</strong></p>
              <p>Thank you for delivering excellent work! We encourage you to:</p>
              <ul>
                <li>Continue building your profile on ResearchHub</li>
                <li>Apply for more exciting projects</li>
                <li>Maintain your excellent reputation</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/freelancer-dashboard" class="button">View Dashboard</a>
              </div>
              
              <p style="margin-top: 30px;">Thank you for being a valued member of ResearchHub!</p>
              
              <p>Best regards,<br><strong>ResearchHub Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 ResearchHub. All rights reserved.</p>
              <p>For payment inquiries, please contact support@researchhub.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: pdfPath
        ? [
            {
              filename: "Payment_Release_Confirmation.pdf",
              path: pdfPath,
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Payment release email sent to freelancer:", info.messageId);

    // Delete the PDF file after sending
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
      console.log("✅ Temporary PDF file deleted");
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending payment release email:", error);
    throw error;
  }
};

export default transporter;
