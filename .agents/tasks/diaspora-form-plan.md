# UDAN Diaspora Application Form - Implementation Plan

## Project Overview
Replace the existing registration form at `/website/app/account/page.tsx` with a comprehensive multi-step UDAN Diaspora Application Form based on the specification in `/website/application.md`. The form will be organized into 9 sections (A-I), save progress to localStorage, support file uploads to Supabase storage, and store individual database columns for each checkbox option.

## Key Decisions Made

### 1. Form Architecture: Multi-Step with Collapsible Tab Interface
- **Decision**: Implement as a React component with 9 sections (A-I) rendered as collapsible accordion tabs
- **Reasoning**: Allows users to navigate between sections easily, see their progress, and return to edit previous sections without overwhelming the UI. Matches the specification's organized structure while maintaining usability.

### 2. Progress Persistence: Browser localStorage with Auto-save
- **Decision**: Auto-save form data to localStorage on every field change
- **Reasoning**: Users can close the browser, restart the computer, and return to find their progress intact. No server calls needed for saves, improving UX and reducing server load. localStorage key: `udan_diaspora_form_draft_v1`

### 3. File Uploads: Both URLs and Direct File Uploads to Supabase
- **Decision**: Support both URL-based links (business website, articles, videos) and direct file uploads to Supabase Storage
- **Reasoning**: Provides flexibility for users who have existing links vs. those who need to upload files. URL uploads reference external sources; file uploads go to `udan-diaspora-files/applications/{memberId}/{timestamp}_{filename}` bucket.

### 4. Database Schema: Individual Columns for Each Checkbox
- **Decision**: Create dedicated boolean/text columns for every checkbox option instead of JSON arrays
- **Reasoning**: User requirement, simplifies admin queries, enables granular analytics (e.g., "How many applicants have expertise in crop production?"), and avoids JSON parsing in exports.

### 5. Export Field Mapping: All 9 Sections Included
- **Decision**: Update export routes to map all new diaspora application fields
- **Reasoning**: Admin portal export (CSV/Excel/PDF) must reflect the complete application form for proper review and reporting.

---

## Database Schema Changes

### Migration: Add Diaspora Application Columns to `members` Table

**New columns (130+ fields total across sections A-I):**

#### Section A: Personal Information (13 fields)
```
- name_of_applicant: text (rename from full_name)
- surname: text
- date_of_birth: date
- gender: text (keep existing, standardize values)
- address: text
- email: text (keep existing)
- telephone_number: text (rename from phone)
- current_country_residence: text (rename from country)
- current_city_residence: text
- home_district_uganda: text
- diaspora_association_name: text
- diaspora_network_member: boolean
- diaspora_network_name: text
- agribusiness_network_member: boolean
- agribusiness_network_name: text
```

#### Section B: Education (2 fields)
```
- education_level: text
- agriculture_training_5years: text
```

#### Section C: Area of Expertise (8 fields)
```
- expertise_crop: boolean
- expertise_livestock: boolean
- expertise_aquaculture: boolean
- expertise_horticulture: boolean
- expertise_forestry: boolean
- expertise_services: boolean
- expertise_services_specify: text
- expertise_other: boolean
- expertise_other_specify: text
- crop_commodity_specify: text
```

#### Section D: Business Description (31 fields)
```
- has_business: boolean
- business_name: text
- business_registration_number: text
- business_location_type: text (Town, District)
- enterprise_type_crop: boolean
- enterprise_type_livestock: boolean
- enterprise_type_fish: boolean
- enterprise_type_forestry: boolean
- enterprise_type_tech: boolean
- enterprise_type_other: boolean
- enterprise_type_other_specify: text
- value_chain_production: boolean
- value_chain_aggregation: boolean
- value_chain_processing: boolean
- value_chain_distribution: boolean
- value_chain_inputs: boolean
- value_chain_services: boolean
- value_chain_services_specify: text
- role_owner_ceo: boolean
- role_financier: boolean
- role_permanent_employee: boolean
- role_temporary_employee: boolean
- role_cooperative_member: boolean
- role_other: boolean
- role_other_specify: text
- years_experience: text (1-2, 3-5, 5-10, Over 10)
- employees_permanent_number: integer
- employees_permanent_age_gender: text
- employees_temporary_number: integer
- employees_temporary_age_gender: text
```

#### Section E: Business & Operating Model (5 fields)
```
- business_description: text
- target_customers: text
- major_suppliers: text
- other_partners: text
- target_market_size_description: text
```

#### Section F: Strategy (2 fields)
```
- has_business_plan: boolean
- growth_plans_3years: text
```

#### Section G: Motivating Areas of Interest (30+ fields)
```
- join_network_interested: boolean
- join_network_reason_if_no: text
- network_expectations: text
- willing_invest: boolean
- invest_subsector_crop: boolean
- invest_subsector_livestock: boolean
- invest_subsector_fish: boolean
- invest_subsector_forestry: boolean
- invest_subsector_tech: boolean
- invest_subsector_other: boolean
- invest_subsector_other_specify: text
- interest_collaboration: boolean
- collab_suppliers_access: boolean
- collab_customers_identify: boolean
- collab_youth_monitoring: boolean
- collab_community_investment: boolean
- collab_mentorship: boolean
- collab_other: boolean
- collab_other_specify: text
- willing_mentor: boolean
- mentor_subsector_crop: boolean
- mentor_subsector_livestock: boolean
- mentor_subsector_fish: boolean
- mentor_subsector_forestry: boolean
- mentor_subsector_tech: boolean
- mentor_subsector_other: boolean
- mentor_subsector_other_specify: text
- mentor_engagement_crop: boolean
- mentor_engagement_processing: boolean
- mentor_engagement_management: boolean
- mentor_engagement_market: boolean
- mentor_engagement_staff: boolean
- mentor_engagement_tech: boolean
- mentor_engagement_other: boolean
- mentor_engagement_other_specify: text
- past_mentorship: boolean
- mentorship_experience_years: text
- mentorship_frequency: text (Regular in-person, Regular online, Both)
- mentorship_hours_monthly: text (1-2, 3-4, 5-6, Other)
```

#### Section H-I: Files & Links (4 fields)
```
- business_plan_file_url: text
- other_documents_url: text
- useful_links: text
- website_url: text
```

#### Form Progress Tracking (2 fields)
```
- form_progress_current_section: text (A-I or null)
- form_saved_at: timestamp with timezone
- form_completed_at: timestamp with timezone (null until final submit)
```

---

## Component Architecture

### New Component: `UDANDiasporaApplicationForm`
- **Location**: `/website/app/account/components/UDANDiasporaApplicationForm.tsx`
- **Type**: Client component (uses hooks and localStorage)
- **Size**: Modular with section sub-components

### Section Components (one per section A-I)
- **Location**: `/website/app/account/components/sections/SectionA.tsx`, `SectionB.tsx`, etc.
- **Pattern**: Each receives `formData` and `updateField` as props, manages its own state locally for immediate UI feedback
- **Responsibilities**: Render section questions, validate inputs, maintain field state

### Hooks & Utilities
- **Location**: `/website/app/account/hooks/useFormProgress.ts`
  - Manages localStorage persistence
  - Handles auto-save throttling (debounced 1s to avoid excessive updates)
  - Tracks which sections have unsaved changes
  - Provides methods: `saveProgress()`, `loadProgress()`, `clearProgress()`

- **Location**: `/website/app/account/hooks/useFileUpload.ts`
  - Handles file upload to Supabase Storage
  - Generates signed URLs after upload
  - Returns file URL for storage in database

### Types/Interfaces
- **Location**: `/website/app/account/types/diasporaForm.ts`
  - TypeScript interface for all form fields
  - Validation schemas

---

## Implementation Steps

### Phase 1: Database Schema & Backend Preparation (1 item)

- [ ] 1. Create and execute Supabase migration to add 130+ columns to `members` table.
      Add individual boolean/text columns for all Section A-G checkboxes, text fields for descriptions, file URL columns, and progress tracking fields (form_progress_current_section, form_saved_at, form_completed_at).
      Files: (Execute via Supabase SQL editor or migrations folder if migrations setup exists)
      Verify: Connect to Supabase console and confirm all columns exist in members table schema. No need for test suite since this is schema-only.

### Phase 2: Component Development (5 items)

- [ ] 2. Create TypeScript types and interfaces for the diaspora form.
      Define `DiasporaFormData` interface with all 130+ fields, `SectionValidationRules` for each section, and field metadata (labels, placeholders, help text). Set up type definitions for form state shape matching the database schema.
      Files: `/website/app/account/types/diasporaForm.ts`
      Verify: `npm run build` completes without TypeScript errors. Check that all form sections can import and use the types.

- [ ] 3. Create form progress management hook (`useFormProgress`).
      Implement localStorage persistence with auto-save on field changes (debounced 1s). Include methods: `loadProgress()`, `saveProgress(data)`, `clearProgress()`, and getter for `isDirty`. Use localStorage key `udan_diaspora_form_draft_v1`.
      Files: `/website/app/account/hooks/useFormProgress.ts`
      Verify: Add basic Jest/Vitest unit tests (if test suite exists) or run manual test: open form, change a field, close browser, reopen page, confirm data persists. Run `npm run build`.

- [ ] 4. Create file upload hook (`useFileUpload`) and Supabase storage configuration.
      Implement async file upload to Supabase Storage bucket `udan-diaspora-files` under path `applications/{userId}/{timestamp}_{filename}`. Return public file URL. Support both direct file uploads and URL references. Validate file type and size (max 10MB per file).
      Files: `/website/app/account/hooks/useFileUpload.ts`, `/website/app/account/lib/fileUploadConfig.ts`
      Verify: `npm run build`. Manual test: upload a file from the form, confirm it appears in Supabase Storage console.

- [ ] 5. Build Section A-I sub-components with form fields and validation.
      Create 9 section components (SectionA through SectionI) in `/website/app/account/components/sections/`. Each section renders its questions as form inputs, textareas, checkboxes, or select dropdowns per the application.md spec. Implement real-time field validation and error messaging. Pass `formData` and `updateField` as props from parent.
      Files: `/website/app/account/components/sections/SectionA.tsx` through `/website/app/account/components/sections/SectionI.tsx`
      Verify: `npm run build` passes. Render each section individually in a test page to confirm fields display and accept input without errors.

- [ ] 6. Create main `UDANDiasporaApplicationForm` component with accordion/tab UI.
      Render all 9 sections as collapsible accordion tabs (using Tailwind CSS, no external accordion library). Display section headers, icons, and completion status (checkmark if section has data). Implement step-by-step navigation with Previous/Next buttons between sections. Show progress bar at the top indicating current section. Hook up form state to localStorage via `useFormProgress`. On form submit, validate all sections, save to database via API call, and display success message.
      Files: `/website/app/account/components/UDANDiasporaApplicationForm.tsx`
      Verify: `npm run build`. Manual test: navigate through all sections, verify accordion toggle, confirm Previous/Next work, check progress bar updates.

### Phase 3: API Integration (2 items)

- [ ] 7. Update `/website/app/api/membership/route.ts` to accept diaspora application data.
      Extend the POST endpoint to accept all 130+ diaspora form fields. Validate required fields (name, email, at least Section A basics). Map request body fields to database columns. Set initial form_progress_current_section to "submitted" and form_saved_at to current timestamp. Handle file URLs storage.
      Files: `/website/app/api/membership/route.ts`
      Verify: `npm run build`. Manual test: submit a populated form from the UI and verify the data appears in Supabase members table.

- [ ] 8. Create new API route to save form progress (draft save without submission).
      Create `/website/app/api/membership/draft/route.ts` to save in-progress form data to the database. This route receives partial form data and user email/phone as identifier (for anonymous users). Upsert form data into members table, update form_progress_current_section and form_saved_at. Return updated form data with any server-calculated fields. Used by the form during auto-save before final submission.
      Files: `/website/app/api/membership/draft/route.ts`
      Verify: `npm run build`. Manual test: change fields in the form, confirm auto-save calls the API, check data updates in database.

### Phase 4: UI and Page Replacement (2 items)

- [ ] 9. Replace registration form in `/website/app/account/page.tsx`.
      Remove the old registration form code. Import and render the new `UDANDiasporaApplicationForm` component. Keep the banner and page layout structure. Remove old form state (regData, etc.). Maintain success state display after form submission.
      Files: `/website/app/account/page.tsx`
      Verify: `npm run build`. Visit `/account` in browser, confirm new form renders, old form is gone, accordion sections display.

- [ ] 10. Update export mapping in `/website/app/api/registrations/export/route.ts`.
      Extend the `exportData` mapping to include all 130+ diaspora application fields. Map database column names to human-readable export headers (e.g., `expertise_crop` → "Expertise: Crop Production"). Ensure CSV, Excel, and PDF export include all new fields. Update the admin export page to show all columns in table view.
      Files: `/website/app/api/registrations/export/route.ts`
      Verify: `npm run build`. Manual test: submit a complete diaspora application, go to admin registrations page, export as CSV/Excel/PDF, verify all diaspora fields appear with correct data.

### Phase 5: Admin Portal Updates (1 item)

- [ ] 11. Update `/website/app/admin/registrations/page.tsx` to display diaspora form data.
      Add a detail view modal or collapsible row that shows all diaspora application fields when an admin clicks on a registration. Display sections A-I with the applicant's answers. Allow admin to review, approve/reject, and add notes. Update the registrations table to show form_progress_current_section status (e.g., "Section F" for incomplete, "Submitted" for complete).
      Files: `/website/app/admin/registrations/page.tsx`
      Verify: `npm run build`. Manual test: as admin, view a diaspora application record, confirm all fields display, try the approve/reject flow.

### Phase 6: Testing & Verification (1 item)

- [ ] 12. End-to-end test: Complete application flow.
      Test the full user journey: (1) Start a new diaspora application, fill sections A-C, close browser, (2) Return and verify data persists from localStorage, (3) Continue filling sections D-I, (4) Submit form, (5) Verify submission to database, (6) Check admin portal sees new record with all data, (7) Test export (CSV/Excel/PDF) includes all diaspora fields. Verify file uploads work if user provides business plan PDF or other documents.
      Files: Manual testing (no new files)
      Verify: All tests pass. Form submission works end-to-end. Admin can view and export complete diaspora applications.

---

## Digest: Database Schema Changes (No files to modify; SQL executed directly)

| Column Name | Type | Purpose | Verification |
|---|---|---|---|
| name_of_applicant | text | Section A: applicant name | Check exists in members table schema |
| surname | text | Section A: surname | Check exists |
| date_of_birth | date | Section A: DOB | Check exists |
| address | text | Section A: address | Check exists |
| current_country_residence | text | Section A: country | Check exists |
| current_city_residence | text | Section A: city | Check exists |
| home_district_uganda | text | Section A: home district | Check exists |
| diaspora_association_name | text | Section A: diaspora association | Check exists |
| diaspora_network_member | boolean | Section A: member of network | Check exists |
| diaspora_network_name | text | Section A: network name | Check exists |
| agribusiness_network_member | boolean | Section A: member of agri network | Check exists |
| agribusiness_network_name | text | Section A: agri network name | Check exists |
| education_level | text | Section B: education | Check exists |
| agriculture_training_5years | text | Section B: training | Check exists |
| expertise_crop | boolean | Section C: crop expertise | Check exists |
| expertise_livestock | boolean | Section C: livestock | Check exists |
| expertise_aquaculture | boolean | Section C: aquaculture | Check exists |
| expertise_horticulture | boolean | Section C: horticulture | Check exists |
| expertise_forestry | boolean | Section C: forestry | Check exists |
| expertise_services | boolean | Section C: services | Check exists |
| expertise_services_specify | text | Section C: services detail | Check exists |
| expertise_other | boolean | Section C: other | Check exists |
| expertise_other_specify | text | Section C: other detail | Check exists |
| crop_commodity_specify | text | Section C: commodity type | Check exists |
| has_business | boolean | Section D: has business | Check exists |
| business_name | text | Section D: business name | Check exists |
| business_registration_number | text | Section D: registration number | Check exists |
| business_location_type | text | Section D: location type | Check exists |
| enterprise_type_* (5 booleans) | boolean | Section D: enterprise types | Check all exist |
| enterprise_type_other_specify | text | Section D: other type detail | Check exists |
| value_chain_* (6 booleans) | boolean | Section D: value chain positions | Check all exist |
| value_chain_services_specify | text | Section D: services detail | Check exists |
| role_owner_ceo | boolean | Section D: owner role | Check exists |
| role_financier | boolean | Section D: financier role | Check exists |
| role_permanent_employee | boolean | Section D: permanent employee | Check exists |
| role_temporary_employee | boolean | Section D: temporary employee | Check exists |
| role_cooperative_member | boolean | Section D: cooperative member | Check exists |
| role_other | boolean | Section D: other role | Check exists |
| role_other_specify | text | Section D: other role detail | Check exists |
| years_experience | text | Section D: experience level | Check exists |
| employees_permanent_number | integer | Section D: permanent staff count | Check exists |
| employees_permanent_age_gender | text | Section D: staff details | Check exists |
| employees_temporary_number | integer | Section D: temp staff count | Check exists |
| employees_temporary_age_gender | text | Section D: temp staff details | Check exists |
| business_description | text | Section E: business description | Check exists |
| target_customers | text | Section E: target customers | Check exists |
| major_suppliers | text | Section E: suppliers | Check exists |
| other_partners | text | Section E: partners | Check exists |
| target_market_size_description | text | Section E: market size | Check exists |
| has_business_plan | boolean | Section F: has plan | Check exists |
| growth_plans_3years | text | Section F: growth plans | Check exists |
| join_network_interested | boolean | Section G: network interest | Check exists |
| join_network_reason_if_no | text | Section G: reason not interested | Check exists |
| network_expectations | text | Section G: expectations | Check exists |
| willing_invest | boolean | Section G: willing to invest | Check exists |
| invest_subsector_* (5 booleans) | boolean | Section G: investment sectors | Check all exist |
| invest_subsector_other_specify | text | Section G: other sector detail | Check exists |
| interest_collaboration | boolean | Section G: collaboration interest | Check exists |
| collab_suppliers_access | boolean | Section G: supplier collab | Check exists |
| collab_customers_identify | boolean | Section G: customer collab | Check exists |
| collab_youth_monitoring | boolean | Section G: youth monitoring | Check exists |
| collab_community_investment | boolean | Section G: community investment | Check exists |
| collab_mentorship | boolean | Section G: mentorship collab | Check exists |
| collab_other | boolean | Section G: other collab | Check exists |
| collab_other_specify | text | Section G: other collab detail | Check exists |
| willing_mentor | boolean | Section G: willing to mentor | Check exists |
| mentor_subsector_* (5 booleans) | boolean | Section G: mentorship sectors | Check all exist |
| mentor_subsector_other_specify | text | Section G: other mentor sector | Check exists |
| mentor_engagement_* (6 booleans) | boolean | Section G: engagement areas | Check all exist |
| mentor_engagement_other_specify | text | Section G: other engagement detail | Check exists |
| past_mentorship | boolean | Section G: past mentorship | Check exists |
| mentorship_experience_years | text | Section G: mentorship experience | Check exists |
| mentorship_frequency | text | Section G: mentorship frequency | Check exists |
| mentorship_hours_monthly | text | Section G: monthly hours | Check exists |
| business_plan_file_url | text | Section H: business plan file URL | Check exists |
| other_documents_url | text | Section H: other documents URL | Check exists |
| useful_links | text | Section I: useful links | Check exists |
| website_url | text | Section I: website URL | Check exists |
| form_progress_current_section | text | Form progress tracking | Check exists |
| form_saved_at | timestamp with timezone | Last auto-save timestamp | Check exists |
| form_completed_at | timestamp with timezone | Final submission timestamp | Check exists |

**Tests for Schema Changes**: Connect to Supabase console, run `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'members';` and verify all 130+ new columns are present with correct data types.

---

## Build & Test Commands

**Project**: Next.js 16.4.2 TypeScript with Tailwind CSS  
**Build command**: `npm run build`  
**No automated test suite found** (no vitest/jest config); verification is manual + browser testing.

---

## File Summary

| File | Action | Purpose |
|---|---|---|
| `/website/app/account/types/diasporaForm.ts` | Create | TypeScript interfaces for all 130+ form fields |
| `/website/app/account/hooks/useFormProgress.ts` | Create | localStorage persistence + auto-save logic |
| `/website/app/account/hooks/useFileUpload.ts` | Create | Supabase file upload handling |
| `/website/app/account/lib/fileUploadConfig.ts` | Create | File upload config (bucket, path, limits) |
| `/website/app/account/components/sections/SectionA.tsx` | Create | Personal Information section |
| `/website/app/account/components/sections/SectionB.tsx` | Create | Education section |
| `/website/app/account/components/sections/SectionC.tsx` | Create | Expertise section |
| `/website/app/account/components/sections/SectionD.tsx` | Create | Business Description section |
| `/website/app/account/components/sections/SectionE.tsx` | Create | Business Model section |
| `/website/app/account/components/sections/SectionF.tsx` | Create | Strategy section |
| `/website/app/account/components/sections/SectionG.tsx` | Create | Interest Areas section |
| `/website/app/account/components/sections/SectionH.tsx` | Create | Files section |
| `/website/app/account/components/sections/SectionI.tsx` | Create | Links section |
| `/website/app/account/components/UDANDiasporaApplicationForm.tsx` | Create | Main form component with accordion UI |
| `/website/app/account/page.tsx` | Modify | Replace old registration form with new diaspora form |
| `/website/app/api/membership/route.ts` | Modify | Extend to accept all diaspora fields |
| `/website/app/api/membership/draft/route.ts` | Create | Auto-save draft progress endpoint |
| `/website/app/api/registrations/export/route.ts` | Modify | Update export mapping for all diaspora fields |
| `/website/app/admin/registrations/page.tsx` | Modify | Add diaspora form detail view modal |

---

## Key Implementation Notes

1. **No Breaking Changes**: Old registrations without diaspora fields will display empty strings/nulls in exports. New registrations populate diaspora columns.

2. **localStorage Persistence**: Form data syncs to Supabase on final submit only. Drafts stay in localStorage until explicitly submitted. This provides fast UX without server round-trips during editing.

3. **File Upload Flow**:
   - User selects file → `useFileUpload` uploads to Supabase Storage
   - Returns public URL → stored in form state and sent to API
   - Business plan, other documents, and links all stored as URLs (text columns)

4. **Validation**: Client-side validation on field changes + server-side re-validation on API submit. Required fields: name, email, Section A basics.

5. **Admin Export**: All diaspora fields included in CSV/Excel/PDF exports with human-readable column headers. Export logic in `/website/app/api/registrations/export/route.ts`.

6. **Styling**: Use existing Tailwind classes from the codebase (text colors, spacing, buttons). Accordion built with Tailwind (no new dependencies).

7. **Backwards Compatibility**: Existing registration routes (`/membership`, `/api/membership`) continue to work for simple registrations. Diaspora form is at `/account` with extended data model.

---

## Success Criteria

✓ All 130+ diaspora form fields render in the UI across 9 sections  
✓ Form progress auto-saves to localStorage and persists across page reloads  
✓ File uploads to Supabase Storage work and return public URLs  
✓ Final form submission saves all data to `members` table in database  
✓ Admin portal displays diaspora application data with export functionality  
✓ CSV/Excel/PDF exports include all diaspora fields with correct mappings  
✓ Form validation prevents submission with invalid/incomplete data  
✓ User can save progress, leave, and return to continue  
✓ Old registration form completely replaced at `/account`
