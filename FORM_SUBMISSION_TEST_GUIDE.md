# Diaspora Form End-to-End Testing Guide

## Test Execution Summary

**Date:** November 16, 2024
**Application URL:** http://localhost:3000/membership
**Test Type:** Manual end-to-end form submission

---

## Test Data Package

Use the following test data to complete the 9-step form submission:

### TEST EMAIL: diaspora-test-001@udandiaspora.org

### Step 1: Personal Information
- **Full Name:** John
- **Surname:** Nakibuule
- **Date of Birth:** 1985-06-15
- **Gender:** Male
- **Address:** 123 Buganda Avenue, Kampala
- **Email:** diaspora-test-001@udandiaspora.org
- **Phone:** +256701234567
- **Country:** United States of America
- **Home District:** Kampala
- **Part of Diaspora Association:** Yes
- **Active in Diaspora Network:** Yes
- **Diaspora Network Name:** UDAN Chapter - New York
- **Part of Agribusiness Network:** Yes
- **Agribusiness Network Name:** African Agricultural Alliance

### Step 2: Education & Training
- **Education Level:** University Degree
- **Agriculture Training:** Yes

### Step 3: Expertise & Specialization
Check the following expertise areas:
- ✓ Crops
- ✓ Horticulture
- **Crop Commodity Focus:** Coffee, Vanilla, Cocoa

### Step 4: Business/Professional Details
- **Do you have a business:** Yes
- **Business Name:** Nakibuule Coffee Ventures
- **Business Registration:** UG-BIZ-2023-0001
- **Business Location Type:** Urban
- **Enterprise Types:** 
  - ✓ Crop Production
  - ✓ Processing
- **Value Chain Involvement:**
  - ✓ Production
  - ✓ Processing
  - ✓ Distribution
- **Your Role(s):**
  - ✓ Owner
  - ✓ Financier
- **Years of Experience:** 12
- **Permanent Employees:** 25
- **Temporary Employees:** 8

### Step 5: Business Model & Description
- **Business Description:** We are a specialty coffee aggregation and processing company focused on premium Arabica beans from Ugandan smallholder farmers. We provide quality management, traceability, and direct market linkage to international buyers.
- **Target Customers:** International specialty coffee retailers, café chains, e-commerce platforms, and direct-to-consumer segments
- **Major Suppliers:** Smallholder farmers in Fort Portal, Mubende, and Kasese districts; equipment suppliers in Kampala
- **Partners:** Uganda Coffee Development Authority (UCDA), local farmer cooperatives, logistics providers
- **Target Market:** USA, UK, EU, Canada

### Step 6: Strategy & Business Plans
- **Do you have a business plan document:** Yes
- **Growth Plans:** Expand to 3 new districts; establish processing facility; launch own export brand; train 500 additional farmers in quality standards

### Step 7: Interests & Collaboration
- **Why join UDAN:** To access curated investment opportunities; connect with international diaspora capital; participate in knowledge exchange on export standards
- **Network Expectations:** Direct linkage to verified buyers; technical advisory on international compliance; peer mentoring on scaling; investment readiness support
- **Willing to Invest:** Yes
- **Investment Subsectors:** 
  - ✓ Crops
  - ✓ Processing
- **Interest in Collaboration:** Yes
- **Collaboration Types:**
  - ✓ Suppliers
  - ✓ Customers
  - ✓ Mentorship
- **Willing to Mentor Others:** Yes
- **Mentor Subsector:** Crop Processing and Export Quality
- **Mentorship Engagement Areas:**
  - ✓ Crop Processing
  - ✓ Market Access
  - ✓ Business Management
- **Past Mentorship Experience:** Yes
- **Mentorship Hours per Month:** 10
- **Mentorship Frequency:** Weekly

### Step 8: Files & Links
- **Business Plan File:** Create a test PDF named "Nakibuule_Coffee_Ventures_Business_Plan.pdf" with sample content
- **Website URL:** https://nakibuulecoffee.example.com
- **Useful Links:** https://www.ucda.or.ug, https://www.coffeeguide.org

### Step 9: Terms & Conditions
- ✓ Accept all terms and conditions checkboxes
- Click "Submit Application"

---

## Testing Checklist

### Pre-Test Verification
- [ ] Development server running on localhost:3000
- [ ] Supabase is configured and accessible
- [ ] Storage bucket "diaspora-forms" exists in Supabase
- [ ] Database table "members" is properly migrated
- [ ] All 9 form steps are visible and functional
- [ ] Form has no section headings (A, B, C removed per requirements)
- [ ] Each field has proper labels above it

### Form Submission Steps
- [ ] **Step 1** - Personal Information filled completely with no errors
- [ ] **Step 2** - Education information selected
- [ ] **Step 3** - At least one expertise area selected
- [ ] **Step 4** - Business details filled for existing business
- [ ] **Step 5** - Business model description provided
- [ ] **Step 6** - Business plan status and growth plans filled
- [ ] **Step 7** - Network interests and collaboration options selected
- [ ] **Step 8** - Files uploaded successfully (if files provided)
- [ ] **Step 9** - Terms accepted and form ready for submission
- [ ] Form data auto-saves to localStorage between steps
- [ ] No validation errors prevent progression

### File Upload Verification
- [ ] Business plan file uploads without errors
- [ ] File upload shows progress/confirmation
- [ ] File URL is returned and stored correctly

### Submission & Success Screen
- [ ] Submit button successfully posts form data to API
- [ ] API returns 200 OK response
- [ ] Success screen displays with message: "Congratulations! You are now a member of UDAN"
- [ ] Success message has proper styling and is clearly visible
- [ ] Email confirmation message displayed on success screen
- [ ] "Start New Application" button is visible and clickable

### Post-Submission Verification

#### 1. Database Check
```sql
-- Run in Supabase SQL Editor
SELECT id, full_name, email, phone, country, has_business, 
       years_experience, status, created_at 
FROM members 
WHERE email = 'diaspora-test-001@udandiaspora.org' 
ORDER BY created_at DESC LIMIT 1;
```
- [ ] Record appears in members table
- [ ] All submitted data is correctly stored
- [ ] Status is "submitted"
- [ ] Timestamps are correct

#### 2. Admin Portal Access
- [ ] Log in to admin portal at http://localhost:3000/admin
- [ ] Navigate to applicants/members list
- [ ] Search for the test email: diaspora-test-001@udandiaspora.org
- [ ] View full details popup shows all form data
- [ ] All fields are displayed correctly
- [ ] Documents section shows uploaded files
- [ ] Export functionality works for CSV/XLS

#### 3. localStorage Verification
After clicking "Start New Application":
- [ ] localStorage is cleared (no previous form data)
- [ ] New form submission starts fresh
- [ ] Field values are empty
- [ ] Form can be filled and submitted again

---

## Expected Results

### Success Criteria
1. ✅ Form submits without errors
2. ✅ Data appears in database immediately
3. ✅ Admin portal displays all submitted information
4. ✅ Success screen shows congratulations message
5. ✅ File uploads work correctly
6. ✅ localStorage clearing works on "Start New Application"

### Browser Console
- [ ] No JavaScript errors (console should be clean)
- [ ] No 500 API errors
- [ ] Network tab shows successful POST requests
- [ ] Supabase client initializes correctly

---

## Potential Issues to Watch

### Common Errors to Check For
1. **API Error 500** - Check Supabase connection and environment variables
2. **File Upload Failures** - Verify storage bucket name and permissions
3. **Form Validation Errors** - Ensure all required fields are filled
4. **localStorage Issues** - Check browser storage settings
5. **Success Screen Not Appearing** - Check browser console for errors

### Database Verification Commands

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;

-- Check for the test submission
SELECT COUNT(*) FROM members 
WHERE email = 'diaspora-test-001@udandiaspora.org';

-- View complete record
SELECT * FROM members 
WHERE email = 'diaspora-test-001@udandiaspora.org' 
LIMIT 1;
```

---

## Test Execution Log

**Tester Name:** [Your Name]
**Date & Time:** [Date/Time of Test]
**Browser:** [Chrome/Safari/Firefox]
**Browser Version:** [Version Number]

### Execution Notes
- Form submission completed: **[Y/N]**
- Success message displayed: **[Y/N]**
- Data stored in database: **[Y/N]**
- Admin portal access: **[Y/N]**
- File uploads successful: **[Y/N]**
- localStorage clear works: **[Y/N]**

### Issues Encountered
```
[Record any issues, error messages, or bugs found]
```

### Browser Console Output
```
[Paste any relevant console logs or errors]
```

### Screenshots
- [ ] Form Step 1 completed
- [ ] Form Step 9 before submission
- [ ] Success screen after submission
- [ ] Admin portal showing record
- [ ] Database record screenshot

---

## Cleanup After Testing

- [ ] Verify test record appears in database
- [ ] Keep test record for regression testing
- [ ] Clear localStorage if needed for next test
- [ ] Note any bugs in issue tracker

---

## Contact & Support

For issues or questions about the form:
1. Check browser console for errors
2. Verify Supabase connection in dashboard
3. Confirm all environment variables are set
4. Review API logs in Supabase

**Test Completed:** [Date & Time]
**Tester Signature:** _________________
