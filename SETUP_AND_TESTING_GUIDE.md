# Research Freelance Marketplace - Setup & Testing Guide

## 🚀 Quick Start

### Backend Setup

1. **Navigate to Backend directory:**
   ```bash
   cd Back-End
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `Back-End` directory with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key_here
   ADMIN_EMAIL=admin@researchhub.com
   ADMIN_PASSWORD=your_admin_password
   EMAIL_USER=av457508@gmail.com
   EMAIL_PASS=iwvm hvvk zwjt woeg
   FRONTEND_URL=http://localhost:5173
   PORT=8000
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

---

## 📧 Email Configuration

The system uses Gmail SMTP with the provided credentials:
- **Email:** av457508@gmail.com
- **App Password:** iwvm hvvk zwjt woeg

These are already configured in the code. Just add them to your `.env` file.

---

## 🧪 Testing the Complete Workflow

### Test Scenario: From Bid Acceptance to Payment Release

#### Step 1: Create Test Accounts

1. **Create Client Account**
   - Sign up as Client
   - Email: client@test.com
   - Login to client dashboard

2. **Create Freelancer Account**
   - Sign up as Freelancer
   - Email: freelancer@test.com
   - Add bank account details in profile:
     - Account Holder Name
     - Bank Name
     - Account Number
     - IFSC Code
     - UPI ID

#### Step 2: Post a Project (as Client)

1. Login as Client
2. Click "Post New Project"
3. Fill in project details:
   - Title: "Test Research Project"
   - Budget: $500 - $1000
   - Skills required
   - Deadline
4. Submit project

#### Step 3: Submit Bid (as Freelancer)

1. Login as Freelancer
2. Go to "Projects" or "Find Projects"
3. Find the test project
4. Click "Submit Proposal"
5. Enter bid amount: $750
6. Write proposal
7. Submit bid

#### Step 4: Accept Bid (as Client) ⭐ NEW WORKFLOW STARTS HERE

1. Login as Client
2. Go to Client Dashboard
3. Find your project
4. Click "View Bids"
5. Review the freelancer's bid
6. Click "Accept Bid"
7. Confirm acceptance

**✅ Expected Result:**
- Automatically redirects to `/escrow` page
- Shows escrow payment page with project details

#### Step 5: Complete Escrow Payment

1. On escrow page, review:
   - Project title
   - Freelancer name
   - Bid amount: $750
   - Platform commission (10%): $75
   - Total escrow amount: $825

2. Check the agreement checkbox

3. Click **"Pay Now"** button

**✅ Expected Results:**
- Shows "Payment Successful!" screen
- Admin project record created in database
- Email sent to freelancer (check inbox: freelancer@test.com)
- PDF attachment included in email

#### Step 6: Check Freelancer Email

Check the freelancer's email inbox for:
- **Subject:** "Congratulations! Your Proposal Has Been Accepted"
- **PDF Attachment:** Proposal_Acceptance.pdf
- Email contains:
  - Project details
  - Budget information
  - Instructions to begin work

#### Step 7: Update Project Progress (as Freelancer)

1. Login as Freelancer
2. Go to Freelancer Dashboard
3. Find the active project
4. Update progress to various percentages:
   - 25%
   - 50%
   - 75%
5. Finally set progress to **100%**

**✅ Expected Result:**
- Project status changes to "completed"
- Progress bar shows 100%

#### Step 8: Client Approval Popup

1. Login as Client
2. Go to Client Dashboard

**✅ Expected Result:**
- Popup automatically appears: "Your project is completed. Are you satisfied?"
- Shows project and freelancer details
- Two options:
  - "Yes, I'm Satisfied - Approve"
  - "Review Later"

#### Step 9: Approve Project Completion

1. Click **"Yes, I'm Satisfied - Approve"**

**✅ Expected Results:**
- Success message: "Project approved! Admin has been notified."
- Automatically redirects to `/freelancer-account-details` page
- Admin receives email notification

#### Step 10: View Freelancer Account Details

On the Freelancer Account Details page, verify:
- ✅ Payment approval message
- ✅ Project summary
- ✅ Payment amount: $750
- ✅ Freelancer's bank account details:
  - Account Holder Name
  - Bank Name
  - Account Number
  - IFSC Code
  - UPI ID
- ✅ Copy buttons for each field
- ✅ Download details button

#### Step 11: Check Admin Email

Check admin email (from ADMIN_EMAIL in .env) for:
- **Subject:** "Project Completed – Release Payment"
- Email contains:
  - Project title
  - Client name
  - Freelancer name
  - Payment amount: $750
  - Complete bank account details

#### Step 12: Admin Dashboard

1. Login as Admin (use ADMIN_EMAIL and ADMIN_PASSWORD)
2. Navigate to Admin Dashboard
3. Click on "Payment Management" section

**✅ Expected Results:**
- See the project in admin projects table
- View details:
  - Client name and photo
  - Freelancer name and photo
  - Project title
  - Bid amount: $750
  - Escrow amount: $825
  - Platform commission: $75
  - Payment status: "ESCROW DEPOSITED"
  - Project status: "APPROVED"
  - Bank account preview (last 4 digits)
- Summary statistics:
  - Total projects
  - Total escrow amount
  - Platform fees
  - Pending releases count

---

## 🔍 Verification Checklist

### Backend Verification

- [ ] Server starts without errors
- [ ] MongoDB connected successfully
- [ ] Email service initialized
- [ ] All routes registered properly

### Email Verification

- [ ] Freelancer receives proposal acceptance email
- [ ] PDF attachment is included
- [ ] Admin receives payment release email
- [ ] Bank details are included in admin email

### Database Verification

Check MongoDB collections:

1. **projects collection:**
   ```javascript
   // After bid acceptance
   {
     status: "in-progress",
     assignedFreelancer: freelancerId,
     bids: [{
       status: "accepted"
     }]
   }
   
   // After completion
   {
     status: "completed",
     progress: 100
   }
   ```

2. **adminprojects collection:**
   ```javascript
   {
     clientName: "...",
     freelancerName: "...",
     projectTitle: "...",
     bidAmount: 750,
     escrowAmount: 825,
     platformCommission: 75,
     paymentStatus: "escrow_deposited",
     projectStatus: "approved",
     clientApproval: {
       approved: true,
       approvedAt: Date
     },
     emailNotifications: {
       proposalAcceptedSent: true,
       paymentReleaseSent: true
     }
   }
   ```

### Frontend Verification

- [ ] Bid acceptance redirects to escrow page
- [ ] Escrow payment shows correct amounts
- [ ] Payment success screen displays
- [ ] Completion popup appears automatically
- [ ] Approval redirects to account details page
- [ ] Bank details display correctly
- [ ] Copy buttons work
- [ ] Admin dashboard shows projects

---

## 🐛 Troubleshooting

### Email Not Sending

1. Check `.env` file has correct EMAIL_USER and EMAIL_PASS
2. Verify Gmail allows "Less secure app access" or using App Password
3. Check server logs for email errors
4. Ensure internet connection is active

### PDF Not Generating

1. Check `pdfkit` package is installed
2. Verify `Back-End/temp` directory is created
3. Check write permissions
4. Look for PDF generation errors in server logs

### Popup Not Appearing

1. Check project status is "completed"
2. Verify progress is exactly 100
3. Ensure client is logged in
4. Check browser console for errors

### Redirect Not Working

1. Verify react-router-dom is properly configured
2. Check navigation state is passed correctly
3. Look for console errors in browser

---

## 📁 Important Files

### Backend
- `models/adminProject.model.js` - Admin project schema
- `controllers/project.controller.js` - Payment flow logic
- `routes/project.route.js` - API endpoints
- `utils/email.js` - Email service
- `utils/pdfGenerator.js` - PDF generation

### Frontend
- `pages/EscrowPaymentPage/index.tsx` - Escrow payment
- `pages/FreelancerAccountDetailsPage/index.tsx` - Bank details
- `components/shared/ProjectCompletionPopup.tsx` - Approval popup
- `pages/Dashboard/Admin/components/AdminProjectsTable.tsx` - Admin view
- `services/projectApi.ts` - API service functions

---

## 📊 Admin Dashboard Access

**Default Admin Login:**
- Navigate to `/admin/login` or `/admin`
- Use credentials from `.env`:
  - Email: ADMIN_EMAIL
  - Password: ADMIN_PASSWORD

**Admin Features:**
- View all escrow projects
- See payment statuses
- Access freelancer bank details
- Monitor platform revenue

---

## 💡 Tips

1. **Keep backend running** during testing
2. **Check email inbox** after bid acceptance and project approval
3. **Use different browsers** or incognito mode for different user roles
4. **Check MongoDB** to verify data persistence
5. **Monitor server console** for logs and errors

---

## 🎯 Success Criteria

The workflow is working correctly if:

✅ Client can accept bid and get redirected to escrow
✅ Payment processing creates admin record
✅ Freelancer receives email with PDF
✅ Project progress can be updated to 100%
✅ Completion popup appears for client
✅ Client approval sends admin email
✅ Freelancer bank details are displayed
✅ Admin can view all projects in dashboard
✅ All emails are sent successfully

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review WORKFLOW_DOCUMENTATION.md
3. Check server logs for errors
4. Verify environment variables
5. Test with simple project first
