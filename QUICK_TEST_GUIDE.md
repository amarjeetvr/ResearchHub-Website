# Quick Test Guide - Workflow Verification

## ✅ Prerequisites
- Backend server running on port 8000
- Frontend server running on port 5173
- MongoDB connected
- Email credentials configured in .env

## 🧪 Testing Steps

### Step 1: Accept a Bid
1. Login as a **Client**
2. Go to your project with bids
3. Click "Accept Bid" on a freelancer's proposal
4. **Expected:** Redirects to `/escrow` page

### Step 2: Process Payment
1. On escrow page, review details
2. Click **"Pay Now"** button
3. **Expected:** 
   - ✅ "Payment Successful!" message appears
   - Admin project record created in database
   - Email sent to freelancer with PDF attachment

### Step 3: Check Email
1. Check freelancer's email (the one in their profile)
2. **Expected:**
   - Email subject: "Congratulations! Your Proposal Has Been Accepted"
   - PDF attachment included
   - Message about payment after completion

### Step 4: Complete Project
1. Login as **Freelancer**
2. Go to active project
3. Update progress to **100%**
4. **Expected:** Project marked as completed

### Step 5: Client Approval
1. Login as **Client**
2. Open dashboard
3. **Expected:** Automatic popup appears
   - "Your project is completed. Are you satisfied?"
4. Click **"Yes, I'm Satisfied - Approve"**
5. **Expected:**
   - Email sent to admin (deepiotics@gmail.com)
   - Redirects to Freelancer Account Details page
   - Shows bank info, UPI, etc.

### Step 6: Check Admin Email
1. Check admin email (deepiotics@gmail.com)
2. **Expected:**
   - Subject: "Project Completed – Release Payment"
   - Message: "One project has been completed. Please release the payment."
   - Freelancer bank details included

### Step 7: Admin Dashboard
1. Login as **Admin**
2. Go to "Payment Management" section
3. **Expected:**
   - See all projects in escrow
   - View payment status
   - See freelancer bank details

## 🐛 Troubleshooting

### Email not sending?
Check console for email errors. Verify:
- EMAIL_USER and EMAIL_PASS in .env
- Gmail account allows "Less secure app access" or uses App Password

### PDF not generating?
- Check temp folder permissions
- Verify pdfkit is installed: `npm list pdfkit`

### Popup not showing?
- Ensure project progress is exactly 100%
- Check project status is "completed"

## 📊 Expected Database Records

### AdminProjects Collection:
```javascript
{
  projectId: ObjectId,
  clientName: "John Doe",
  freelancerName: "Jane Smith",
  bidAmount: 950,
  escrowAmount: 1045, // +10% commission
  platformCommission: 95,
  paymentStatus: "escrow_deposited",
  projectStatus: "in-progress",
  emailNotifications: {
    proposalAcceptedSent: true
  }
}
```

After client approval:
```javascript
{
  clientApproval: {
    approved: true,
    approvedAt: Date
  },
  projectStatus: "approved",
  emailNotifications: {
    proposalAcceptedSent: true,
    paymentReleaseSent: true
  }
}
```

## ✅ Success Criteria
- [x] Escrow redirect works
- [x] Payment creates admin record
- [x] Freelancer receives email + PDF
- [x] Progress reaches 100%
- [x] Client sees popup
- [x] Admin receives email
- [x] Bank details displayed
- [x] Admin dashboard shows project

## 🎯 All Features Working
If all steps above work, your complete workflow is functional!
