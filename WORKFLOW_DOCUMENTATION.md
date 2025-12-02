# Research Freelance Marketplace - Complete Workflow Documentation

## Overview
This document outlines the complete workflow for the Research Freelance Marketplace, from bid acceptance to payment release.

---

## Workflow Steps

### 1. Client Accepts a Bid

**Frontend Flow:**
- Client views bids on their project in the Client Dashboard
- Client clicks "Accept Bid" button
- Confirmation dialog appears
- Upon confirmation, API call to `/api/v1/project/:projectId/bid/:bidId/accept`

**Backend Actions:**
- Updates bid status to "accepted"
- Assigns freelancer to project
- Sets project status to "in-progress"
- Rejects all other pending bids
- Returns escrow redirect data

**Response:**
```json
{
  "success": true,
  "message": "Proposal accepted successfully. Please proceed to payment.",
  "redirectTo": "/escrow",
  "escrowData": {
    "projectId": "...",
    "bidId": "...",
    "projectTitle": "...",
    "freelancerName": "...",
    "agreedAmount": 950
  }
}
```

**Frontend Redirect:**
- Automatically redirects to `/escrow` page with project details

---

### 2. Escrow Payment Page

**Display:**
- Shows project summary
- Displays agreed amount
- Shows 10% platform commission
- Calculates total escrow amount
- Payment form (dummy for now)
- "Pay Now" button

**When Client Clicks "Pay Now":**

**API Call:** `POST /api/v1/project/escrow/process-payment`

**Request Body:**
```json
{
  "projectId": "...",
  "bidId": "..."
}
```

**Backend Actions:**
1. Verifies client authorization
2. Creates Admin Project record in database:
   ```javascript
   {
     projectId,
     clientId,
     freelancerId,
     clientName,
     freelancerName,
     projectTitle,
     bidAmount,
     escrowAmount,
     platformCommission,
     paymentStatus: "escrow_deposited",
     projectStatus: "in-progress"
   }
   ```

3. Generates PDF with acceptance message
4. Sends email to freelancer with PDF attachment
   - **From:** av457508@gmail.com
   - **Subject:** "Congratulations! Your Proposal Has Been Accepted"
   - **Body:** Acceptance message + payment details
   - **Attachment:** PDF file

5. Updates email notification flag

**Frontend Display:**
- Shows "Payment Successful!" screen
- Displays success message
- Options to:
  - Go to Dashboard
  - Message Freelancer

---

### 3. Freelancer Receives Email

**Email Content:**
- Congratulations message
- Project details
- Budget information
- Instructions to begin work
- PDF attachment with same information

---

### 4. Freelancer Works on Project

**Progress Updates:**
- Freelancer can update project progress (0-100%)
- Progress visible to client in dashboard
- When freelancer sets progress to 100%, project status becomes "completed"

---

### 5. Client Sees Completion Popup

**Trigger:**
- Client opens their dashboard
- System detects project with `status: "completed"` and `progress: 100`
- Popup automatically appears

**Popup Content:**
- "Your project is completed. Are you satisfied?"
- Project details
- Warning to review work before approving
- Two options:
  - "Yes, I'm Satisfied - Approve"
  - "Review Later"

---

### 6. Client Approves Completion

**When Client Clicks "Approve":**

**API Call:** `POST /api/v1/project/:projectId/approve-completion`

**Backend Actions:**
1. Verifies client authorization
2. Verifies project is 100% complete
3. Updates Admin Project record:
   ```javascript
   {
     clientApproval: {
       approved: true,
       approvedAt: new Date()
     },
     projectStatus: "approved"
   }
   ```

4. Sends email to admin
   - **To:** ADMIN_EMAIL (from .env)
   - **Subject:** "Project Completed – Release Payment"
   - **Body:** 
     - Project details
     - Client and freelancer names
     - Payment amount
     - Freelancer's bank account details

5. Returns freelancer account details

**Frontend Action:**
- Redirects to `/freelancer-account-details` page
- Passes freelancer payment info

---

### 7. Freelancer Account Details Page

**Display:**
- Success message: "Payment Approved!"
- Project summary
- **Freelancer Bank Account Information:**
  - Account Holder Name
  - Bank Name
  - Account Number
  - IFSC Code
  - Account Type
  - UPI ID (if available)
- Copy buttons for each field
- Download details button
- Navigation options

---

### 8. Admin Receives Notification

**Email to Admin:**
- **Subject:** "Project Completed – Release Payment"
- **Content:**
  - Alert that project is completed
  - Client name
  - Freelancer name
  - Project title
  - Payment amount
  - Complete bank account details

**Admin Dashboard:**
- Admin logs in to dashboard
- Navigates to "Payment Management" section
- Sees all admin projects with status
- Can view:
  - Projects in escrow
  - Pending payment releases
  - Completed payments
  - Freelancer bank details

---

## Database Schema

### AdminProject Model

```javascript
{
  projectId: ObjectId (ref: Project),
  clientId: ObjectId (ref: User),
  freelancerId: ObjectId (ref: User),
  clientName: String,
  freelancerName: String,
  projectTitle: String,
  projectBudget: Number,
  bidAmount: Number,
  escrowAmount: Number,
  platformCommission: Number,
  paymentStatus: ["pending", "escrow_deposited", "released", "refunded"],
  projectStatus: ["in-progress", "completed", "approved", "disputed"],
  clientApproval: {
    approved: Boolean,
    approvedAt: Date
  },
  emailNotifications: {
    proposalAcceptedSent: Boolean,
    paymentReleaseSent: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Email Configuration

### SMTP Credentials (Gmail)
```
EMAIL_USER=av457508@gmail.com
EMAIL_PASS=iwvm hvvk zwjt woeg
```

### Admin Email
```
ADMIN_EMAIL=[from .env file]
```

---

## API Endpoints

### 1. Accept Bid
```
POST /api/v1/project/:projectId/bid/:bidId/accept
Auth: Required (Client only)
```

### 2. Process Escrow Payment
```
POST /api/v1/project/escrow/process-payment
Auth: Required (Client only)
Body: { projectId, bidId }
```

### 3. Update Project Progress
```
PATCH /api/v1/project/:projectId/update-progress
Auth: Required (Freelancer only)
Body: { progress: Number (0-100) }
```

### 4. Approve Project Completion
```
POST /api/v1/project/:projectId/approve-completion
Auth: Required (Client only)
```

### 5. Get Admin Projects
```
GET /api/v1/project/admin-projects
Auth: Required (Admin only)
```

---

## Frontend Routes

- `/escrow` - Escrow payment page
- `/freelancer-account-details` - Shows freelancer bank details after approval
- `/client-dashboard` - Client dashboard with project management
- `/freelancer-dashboard` - Freelancer dashboard
- `/admin-dashboard` - Admin panel with payment management

---

## Component Structure

### New Components Created:
1. **ProjectCompletionPopup** - Shows when project is 100% complete
2. **FreelancerAccountDetailsPage** - Displays bank account info
3. **AdminProjectsTable** - Admin view of all escrow projects

### Modified Components:
1. **EscrowPaymentPage** - Added payment processing
2. **ClientDashboard** - Added completion popup trigger
3. **BidsList** - Added escrow redirect after acceptance
4. **AdminDashboard** - Added projects section

---

## Utilities Created

### 1. Email Service (`utils/email.js`)
- `sendProposalAcceptedEmail()` - Sends acceptance email to freelancer
- `sendPaymentReleaseToAdmin()` - Notifies admin of payment release

### 2. PDF Generator (`utils/pdfGenerator.js`)
- `generateProposalAcceptancePDF()` - Creates PDF attachment for freelancer

---

## Testing the Workflow

### Step-by-Step Test:

1. **Create a project as Client**
2. **Submit bid as Freelancer**
3. **Accept bid as Client** - Should redirect to escrow
4. **Click "Pay Now"** - Should:
   - Create admin record
   - Send email to freelancer
   - Show success message
5. **Update progress to 100%** as Freelancer
6. **Login as Client** - Should see completion popup
7. **Click "Approve"** - Should:
   - Send email to admin
   - Redirect to account details page
8. **Check Admin Dashboard** - Should see project in Payment Management

---

## Environment Variables Required

```env
# Backend (.env)
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
ADMIN_EMAIL=admin@researchhub.com
ADMIN_PASSWORD=your_admin_password
EMAIL_USER=av457508@gmail.com
EMAIL_PASS=iwvm hvvk zwjt woeg
FRONTEND_URL=http://localhost:5173
PORT=8000
NODE_ENV=development
```

---

## Notes

- Payment is currently simulated (dummy)
- Emails are sent automatically through Gmail SMTP
- PDF attachments are generated and deleted after sending
- Bank account details come from User model's `bankAccount` field
- Platform takes 10% commission on all projects
- All monetary amounts are in USD

---

## Future Enhancements

1. Integrate real payment gateway (Stripe/Razorpay)
2. Add payment status tracking
3. Implement refund mechanism
4. Add milestone-based payments
5. Create payment history section
6. Add automated payment release after approval period
