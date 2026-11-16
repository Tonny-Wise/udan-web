# UDAN Diaspora Form - Quick Start (5 Min)

## TL;DR - What Was Built

A **9-step diaspora application form** at `/account` that collects 88 fields of information across 9 sections, auto-saves progress, uploads files, and stores everything in the database.

## 3 Quick Setup Steps

### 1️⃣ Create Storage Bucket (Supabase Console)
```
Storage → Buckets → New Bucket
- Name: diaspora-forms
- Privacy: Public
- Size: 50MB
```

### 2️⃣ Run Database Migration
Copy contents of `/website/database/migrations/002_add_diaspora_form_columns.sql` and run in Supabase SQL Editor

### 3️⃣ Deploy & Test
```bash
npm run build   # ✅ Verify (0 errors)
npm start       # Start local
# Visit http://localhost:3000/account
```

---

## Form Flow (30 seconds)

```
User fills form
    ↓
Auto-saves to browser
    ↓
Step 1-8: Validate before advancing
    ↓
Step 9: Upload files + Submit
    ↓
Database saves all data
    ↓
Success! ✅
```

---

## Key Details

**Form Location:** `/website/app/account/page.tsx` (1,800 lines)

**Database:** 88 new columns in `members` table

**APIs Created:**
- `POST /api/upload-diaspora-file` - File storage
- `POST /api/diaspora-application` - Form submission

**Storage:** Files → `diaspora-forms/<email>/<type>_<timestamp>_<name>`

**Export:** Admin can download with all new fields (CSV/Excel/PDF)

---

## Testing Checklist (2 minutes)

- [ ] Form loads at `/account`
- [ ] Fill one section, refresh → data persists ✅
- [ ] Click Next/Previous → works ✅
- [ ] Required field empty → can't advance ✅
- [ ] Upload file → shows filename ✅
- [ ] Submit → success page ✅
- [ ] Check Supabase → data in table ✅
- [ ] Export CSV → includes diaspora fields ✅

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Form looks broken | Run `npm run build` first |
| File upload fails | Create storage bucket (Step 1) |
| Can't submit | Run database migration (Step 2) |
| Export missing fields | Ensure migration ran |

---

## Files Changed/Created

**New:**
- `/website/app/account/page.tsx` - Form component
- `/website/app/api/diaspora-application/route.ts` - Submission API
- `/website/app/api/upload-diaspora-file/route.ts` - Upload API
- `/website/database/migrations/002_add_diaspora_form_columns.sql` - Schema

**Updated:**
- `/website/app/api/registrations/export/route.ts` - Export endpoint

---

## Form Sections at a Glance

| # | Section | Key Fields | Skip? |
|---|---------|-----------|-------|
| 1 | Personal | Name, Email, Phone, Country | No* |
| 2 | Education | Level, Training | No* |
| 3 | Expertise | Crop/Livestock/etc | No* |
| 4 | Business | Company, Location, Role | No* |
| 5 | Model | Description, Customers | No* |
| 6 | Strategy | Business Plan, Growth | No* |
| 7 | Interests | Network, Investment | No* |
| 8 | Mentorship | Willing?, Areas | No* |
| 9 | Files | Business Plan, Links | Yes |

*= Required field must be completed

---

## Next Steps

1. Run 3 setup steps (5 min)
2. Test form (2 min)
3. Check admin export includes diaspora fields
4. Deploy to production when ready

**Questions?** See `DIASPORA_FORM_SETUP.md` or `IMPLEMENTATION_SUMMARY.md`

---

**Status:** ✅ Production Ready (pending setup steps above)
