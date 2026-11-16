# Manual Browser Testing Steps - Diaspora Form Submission

## Quick Start

**URL:** http://localhost:3000/membership

**Test Email:** diaspora-test-001@udandiaspora.org (or any unique email)

**Expected Success Message:** "Congratulations! You are now a member of UDAN"

---

## Step-by-Step Testing Guide

### Step 1: Navigate to Form
1. Open browser and go to http://localhost:3000/membership
2. Scroll down to "Join UDAN Today" section
3. You should see a white form box on the right side with "Personal Information" heading
4. Verify the form shows "Step 1 of 9" at the top right
5. Verify a progress bar is visible below the step counter

**Form Elements Expected:**
- Full Name field (text input)
- Surname field (text input)
- Date of Birth field (date picker)
- Gender dropdown
- Address field (text area)
- Email field (text input)
- Phone field (text input)
- Country dropdown
- Home District field
- Diaspora Association checkbox
- Diaspora Network checkbox
- Agribusiness Network checkbox

---

### Step 2: Fill Personal Information
1. **Full Name:** Type "John"
2. **Surname:** Type "Nakibuule"
3. **Date of Birth:** Click date field, select June 15, 1985
4. **Gender:** Select "Male" from dropdown
5. **Address:** Type "123 Buganda Avenue, Kampala"
6. **Email:** Type "diaspora-test-001@udandiaspora.org"
7. **Phone:** Type "+256701234567"
8. **Country:** Select "United States of America" from dropdown
9. **Home District:** Type "Kampala"
10. **Part of Diaspora Association:** Check the box (✓)
11. **Active in Diaspora Network:** Check the box (✓)
12. **Diaspora Network Name:** Type "UDAN Chapter - New York"
13. **Part of Agribusiness Network:** Check the box (✓)
14. **Agribusiness Network Name:** Type "African Agricultural Alliance"

**Verify:**
- All required fields marked with * are filled
- No red error messages appear
- "Next" button is clickable (should not be grayed out)

**Click "Next" button to proceed to Step 2**

---

### Step 3: Fill Education Information
**Expected Step Title:** "Education"

1. **Education Level:** Select "University Degree" from dropdown
2. **Agriculture Training:** Select "Yes" from dropdown

**Verify:**
- All required fields are filled
- Form data appears to auto-save (you should see a brief "saved" notification)

**Click "Next" button to proceed to Step 3**

---

### Step 4: Select Expertise Areas
**Expected Step Title:** "Expertise"

1. **Check the following boxes:**
   - ✓ Crops
   - ✓ Horticulture
   
   (Leave unchecked: Livestock, Aquaculture, Forestry, Services, Other)

2. **Crop Commodity Focus:** Type "Coffee, Vanilla, Cocoa"

**Verify:**
- At least one expertise area is checked
- Form shows no validation errors

**Click "Next" button to proceed to Step 4**

---

### Step 5: Fill Business Details
**Expected Step Title:** "Business Description"

1. **Do you have a business:** Select "Yes" from dropdown
   - New fields should appear below

2. **Business Name:** Type "Nakibuule Coffee Ventures"
3. **Business Registration Number:** Type "UG-BIZ-2023-0001"
4. **Business Location Type:** Select "Urban" from dropdown

5. **Enterprise Types (Check these):**
   - ✓ Crop Production
   - ✓ Processing
   
6. **Value Chain Involvement (Check these):**
   - ✓ Production
   - ✓ Processing
   - ✓ Distribution

7. **Your Role(s) (Check these):**
   - ✓ Owner
   - ✓ Financier

8. **Years of Experience:** Select "12" from dropdown
9. **Permanent Employees:** Type "25"
10. **Temporary Employees:** Type "8"

**Verify:**
- All required fields have values
- Conditional fields appeared when "Yes" was selected
- No validation errors

**Click "Next" button to proceed to Step 5**

---

### Step 6: Fill Business Model Details
**Expected Step Title:** "Business Model"

1. **Business Description:** Paste or type:
   ```
   We are a specialty coffee aggregation and processing company focused on premium 
   Arabica beans from Ugandan smallholder farmers. We provide quality management, 
   traceability, and direct market linkage to international buyers.
   ```

2. **Target Customers:** Paste or type:
   ```
   International specialty coffee retailers, café chains, e-commerce platforms, 
   and direct-to-consumer segments
   ```

3. **Major Suppliers:** Paste or type:
   ```
   Smallholder farmers in Fort Portal, Mubende, and Kasese districts; 
   equipment suppliers in Kampala
   ```

4. **Partners:** Paste or type:
   ```
   Uganda Coffee Development Authority (UCDA), local farmer cooperatives, 
   logistics providers
   ```

5. **Target Market:** Type "USA, UK, EU, Canada"

**Verify:**
- All text areas accept multi-line input
- No validation errors

**Click "Next" button to proceed to Step 6**

---

### Step 7: Fill Strategy & Plans
**Expected Step Title:** "Strategy & Plans"

1. **Do you have a business plan document:** Select "Yes"

2. **Growth Plans:** Paste or type:
   ```
   Expand to 3 new districts; establish processing facility; launch own export brand; 
   train 500 additional farmers in quality standards
   ```

**Verify:**
- Selection made successfully
- Text accepted in growth plans field

**Click "Next" button to proceed to Step 7**

---

### Step 8: Fill Network & Investment Interests
**Expected Step Title:** "Interests"

1. **Why do you want to join UDAN:** Paste or type:
   ```
   To access curated investment opportunities; connect with international diaspora capital; 
   participate in knowledge exchange on export standards
   ```

2. **What are your expectations:** Paste or type:
   ```
   Direct linkage to verified buyers; technical advisory on international compliance; 
   peer mentoring on scaling; investment readiness support
   ```

3. **Are you willing to invest:** Select "Yes"

4. **Investment Subsectors (Check these):**
   - ✓ Crops
   - ✓ Processing

5. **Are you interested in collaboration:** Select "Yes"

6. **Collaboration Types (Check these):**
   - ✓ Suppliers
   - ✓ Customers
   - ✓ Mentorship

**Verify:**
- All selections made
- Form data appears to auto-save

**Click "Next" button to proceed to Step 8**

---

### Step 9: Fill Mentorship Information
**Expected Step Title:** "Mentorship"

1. **Are you willing to mentor others:** Select "Yes"
   - More fields should appear

2. **Mentorship Subsector:** Type "Crop Processing and Export Quality"

3. **Areas you can provide mentorship (Check these):**
   - ✓ Crop Processing
   - ✓ Business Management
   - ✓ Market Access

4. **Have you provided mentorship before:** Select "Yes"

5. **Mentorship Hours per Month:** Select or type "10"

6. **Mentorship Frequency:** Select "Weekly"

**Verify:**
- All required fields filled
- No validation errors

**Click "Next" button to proceed to Step 9**

---

### Step 10: Upload Files & Links (Final Step)
**Expected Step Title:** "Files & Links"
**Expected:** "Step 9 of 9" indicator

1. **Business Plan File:** 
   - Click "Choose File" or drag-and-drop a PDF
   - You can use the test file or any PDF (not required for test)
   - If uploading: Wait for upload to complete

2. **Website URL:** Type "https://nakibuulecoffee.example.com"

3. **Other Useful Links:** Type "https://www.ucda.or.ug, https://www.coffeeguide.org"

**Verify:**
- Fields accept input
- File upload is optional (no red error if skipped)
- All form data has been entered correctly

---

### Step 11: Submit the Form

1. **Review all fields** - Scroll through the form to verify all data is correct
2. **Check the "I agree to terms" checkbox** if present
3. **Click the "Submit" button**

**Expected Behavior:**
- Button shows loading state (spinner or disabled state)
- API call processes (check Network tab in DevTools if desired)
- Page shows success screen within 1-2 seconds

---

## Success Screen Verification

**Expected Display:**

```
┌─────────────────────────────────────┐
│                                     │
│            [Green ✓]                │
│        Congratulations!             │
│   You are now a member of UDAN      │
│                                     │
│  Welcome to the Uganda Diaspora     │
│  Agribusiness Network.              │
│                                     │
│  A confirmation email has been sent │
│  to diaspora-test-001@...org        │
│                                     │
│  You now have access to the UDAN    │
│  B2B platform, regional chapter     │
│  resources, and member-exclusive    │
│  opportunities.                     │
│                                     │
│  [Start New Application Button]     │
│                                     │
└─────────────────────────────────────┘
```

**Verify:**
- ✓ Success message is clearly visible
- ✓ Green background color (light green gradient)
- ✓ Checkmark icon is displayed
- ✓ Email address is shown correctly
- ✓ "Start New Application" button is clickable
- ✓ No error messages are visible
- ✓ Form is no longer visible

---

## Browser Console Check

Open DevTools (F12 or Cmd+Option+I):

1. Click on "Console" tab
2. Verify **NO red error messages**
3. Look for successful API response (should show success: true)

**Expected Console Output:**
```
[HMR] connected
✓ No errors
✓ POST /api/diaspora-application 200 OK
```

**Unexpected (Watch for):**
- Red error messages with 500 status
- CORS errors
- File upload failures
- Uncaught promise rejections

---

## Test "Start New Application" Button

1. Click the "Start New Application" button
2. Verify the form resets to Step 1
3. Check that ALL fields are now empty
4. Verify localStorage was cleared:
   - Open DevTools → Application → LocalStorage
   - Search for "udan_diaspora_form_draft"
   - Should be empty or removed

---

## Admin Portal Verification

After successful submission:

1. Open http://localhost:3000/admin
2. Log in with admin credentials
3. Navigate to applicants or members list
4. Search for email: diaspora-test-001@udandiaspora.org
5. Click "View Full Details"
6. Verify all submitted data is displayed:
   - ✓ Personal Information section shows all fields
   - ✓ Business details are complete
   - ✓ All selections are preserved
   - ✓ Status shows "submitted"

---

## Database Direct Query

To verify in Supabase Dashboard:

1. Go to https://supabase.com/projects
2. Open your project
3. Click "SQL Editor"
4. Create new query with this SQL:

```sql
SELECT * FROM members 
WHERE email = 'diaspora-test-001@udandiaspora.org'
LIMIT 1;
```

5. Run query (Ctrl+Enter)
6. Verify record appears with all submitted data

---

## Common Issues & Solutions

### Issue: Form won't proceed to next step
**Solution:** Make sure ALL required fields (marked with *) are filled. Look for red error messages above the "Next" button.

### Issue: Success screen doesn't appear after submit
**Solution:** 
1. Check browser console for errors (F12)
2. Check Network tab - POST request should return 200 OK
3. Wait 2-3 seconds for page to respond
4. Refresh page and try again

### Issue: Fields not auto-saving
**Solution:** 
1. Check browser DevTools → Application → LocalStorage
2. Make sure localStorage is not disabled
3. Try a different browser if issue persists

### Issue: File upload fails
**Solution:** 
1. This is expected - Supabase storage needs configuration
2. Form can still be submitted without files
3. Files can be uploaded manually from admin portal

### Issue: Email not received
**Solution:** 
1. Email sending may not be configured on dev environment
2. Check Supabase email provider settings
3. Emails might be in spam folder

---

## Test Completion Checklist

After completing all steps above, verify:

- [ ] Filled all 9 form steps with test data
- [ ] Form accepted submission without errors
- [ ] Success screen displayed with correct message
- [ ] Email address shown on success screen
- [ ] "Start New Application" button clicked
- [ ] Form reset to empty state (Step 1)
- [ ] localStorage cleared after reset
- [ ] Record appears in admin portal
- [ ] Record appears in database query
- [ ] All submitted data matches what was entered
- [ ] No console errors during entire process

---

## Test Complete! ✅

When all checks pass, the diaspora form is working correctly end-to-end.

**Summary of Form Submission:**
- Email: diaspora-test-001@udandiaspora.org
- Name: John Nakibuule
- Status: Successfully Submitted
- Location: Database members table

**Next Steps:**
1. Notify user that form testing is complete
2. Check admin portal displays all data correctly
3. Verify export functions work (CSV, XLS, PDF)
4. Test with different browsers if needed
