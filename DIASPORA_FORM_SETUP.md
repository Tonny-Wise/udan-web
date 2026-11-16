# UDAN Diaspora Application Form - Setup Guide

This document explains how to set up the UDAN Diaspora Application Form system.

## Components Implemented

### 1. Frontend Form Component
**Location:** `/website/app/account/page.tsx`

A comprehensive 9-step multi-section form with:
- **Section A:** Personal Information (Full Name, Email, Phone, Country, etc.)
- **Section B:** Education & Training  
- **Section C:** Area of Expertise (Crop, Livestock, Aquaculture, etc.)
- **Section D:** Business Description (Business type, location, role, employees)
- **Section E:** Business & Operating Model (Description, customers, suppliers, market)
- **Section F:** Strategy & Future Plans (Business plan status, growth plans)
- **Section G:** Interests & Collaboration (Network joining, investment, collaboration)
- **Section H:** Mentorship Engagement (Willingness, areas, frequency)
- **Section I:** Files & Links (Business plan upload, website URL, useful links)

**Features:**
- Auto-save to localStorage with key: `udan_diaspora_form_<user_email>`
- Form progress indicator (Step X of 9)
- Validation before advancing sections
- File upload support for business plans and documents
- Responsive design with UDAN branding colors

### 2. API Endpoints

#### File Upload Endpoint
**Location:** `/website/app/api/upload-diaspora-file/route.ts`

- Accepts file uploads (PDF, Word, Excel)
- Stores files in Supabase storage at `diaspora-forms/<email>/`
- Returns public file URL for database storage

#### Application Submission Endpoint
**Location:** `/website/app/api/diaspora-application/route.ts`

- Receives complete form data from frontend
- Validates required fields (name, email)
- Inserts all form data into `members` table
- Stores file URLs, links, and metadata
- Returns success/error response

### 3. Database Schema Changes

**Location:** `/website/database/migrations/002_add_diaspora_form_columns.sql`

Added 88 new columns to the `members` table organized by section:

**Section A (13 columns):** Personal info, diaspora/agribusiness networks
**Section B (2 columns):** Education level, agriculture training
**Section C (10 columns):** Expertise checkboxes, crop commodity
**Section D (32 columns):** Business details, enterprise type, value chain, roles, employees
**Section E (5 columns):** Business description, customers, suppliers, partners, market
**Section F (2 columns):** Business plan status, growth plans
**Section G (25 columns):** Network interests, investment, collaboration, mentorship
**Section H-I (5 columns):** File paths and URLs

All boolean fields default to `false`, text fields default to `null`.

### 4. Export Functionality

**Updated:** `/website/app/api/registrations/export/route.ts`

The admin portal export now includes all new diaspora form fields, organized logically by section:
- Supports CSV, Excel, and PDF formats
- Shows Yes/No for boolean fields
- Maintains backward compatibility with legacy fields
- Includes summary statistics

## Setup Instructions

### Step 1: Create Supabase Storage Bucket

1. Log in to Supabase Console: https://app.supabase.com
2. Navigate to Storage → Buckets
3. Create a new bucket:
   - **Name:** `diaspora-forms`
   - **Privacy:** Public
   - **File size limit:** 50MB

### Step 2: Run Database Migration

Execute the SQL migration to add new columns to the members table:

```bash
# Option A: Via Supabase Console
# Go to SQL Editor and paste the contents of:
# /website/database/migrations/002_add_diaspora_form_columns.sql

# Option B: Via Supabase CLI
supabase db push --project-id <PROJECT_ID>
```

### Step 3: Deploy Frontend & API

```bash
cd /website
npm install
npm run build
npm start
# Or deploy to your hosting platform (Vercel, Netlify, etc.)
```

### Step 4: Test the Form

1. Navigate to `/account` page
2. Fill out each section
3. Verify:
   - Auto-save to localStorage works (check browser DevTools Storage)
   - Form validation prevents advancing with incomplete sections
   - File uploads work (creates files in Supabase storage)
   - Form submission succeeds
   - Data appears in Supabase `members` table

### Step 5: Test Export Functionality

1. Go to admin portal `/admin/registrations`
2. Download registrations as CSV/Excel/PDF
3. Verify all new diaspora form fields are included

## Environment Variables Required

Ensure these are in `/website/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://akcpppgfytrztkpyysvg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
```

## Form Flow

1. **Start:** User lands on `/account`
2. **Step 1-9:** User fills out each section, with localStorage auto-save
3. **Validation:** Required fields marked with `*` must be completed
4. **Navigation:** Previous/Next buttons allow moving between steps
5. **File Upload:** Optional file uploads via API before submission
6. **Submit:** Final submit sends all data to database
7. **Confirmation:** Success page shows confirmation message
8. **Export:** Admin can download all applications via export endpoint

## Data Storage

All form data is stored in the `members` table with:
- Individual columns for each form field
- Boolean fields for checkboxes
- Text fields for descriptions
- File URL fields for document storage
- Metadata: `form_progress` (100 when complete), `form_saved_at` (submission timestamp)

## File Storage

Files are stored in Supabase Storage at:
```
diaspora-forms/<sanitized_email>/<file_type>_<timestamp>_<filename>
```

Example:
```
diaspora-forms/john_doe@example_com/business_plan_1701234567890_business_plan.pdf
```

## Troubleshooting

**Issue:** "Failed to upload file"
- Verify storage bucket exists and is public
- Check file size limit (50MB default)
- Ensure SUPABASE_SERVICE_ROLE_KEY has storage permissions

**Issue:** Form data not saving to database
- Verify all required fields are filled
- Check Supabase table has all new columns
- Check service role key permissions

**Issue:** Export shows incomplete data
- Ensure migration SQL was run
- Check all columns exist in members table
- Verify data was submitted after migration

## API Response Codes

| Endpoint | Method | Status | Meaning |
|----------|--------|--------|---------|
| `/api/diaspora-application` | POST | 200 | Success |
| `/api/diaspora-application` | POST | 400 | Missing required fields |
| `/api/diaspora-application` | POST | 500 | Database error |
| `/api/upload-diaspora-file` | POST | 200 | File uploaded |
| `/api/upload-diaspora-file` | POST | 400 | Missing file/type/email |
| `/api/upload-diaspora-file` | POST | 500 | Storage error |

## Future Enhancements

- Email confirmation after submission
- Application review workflow (pending → approved → rejected)
- Admin dashboard for viewing/filtering applications
- Real-time notifications for new applications
- Application status tracking in user portal
- Document preview in admin panel
