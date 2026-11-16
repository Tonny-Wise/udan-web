# Admin Portal - Registration Export Feature

## What's New

The admin portal (http://localhost:3001) now has **three export buttons** for member registrations:

### Export Buttons
Located in the **Registrations** tab, in the header next to "Member Registrations":

- **📊 CSV** - Comma-separated values (lightweight, opens in any spreadsheet)
- **📈 Excel** - Formatted .xlsx file with styled headers
- **📄 PDF** - Professional PDF report

## How to Use

### Step 1: Access Admin Portal
Go to: `http://localhost:3001`

### Step 2: Login
- Click "Sign In" (authentication may be required depending on your setup)

### Step 3: View Registrations
- You'll see all member registrations in the "Registrations" tab
- The table displays:
  - Name
  - Role (Buyer/Seller)
  - Company
  - Email
  - Region
  - Status
  - Actions (Approve/Delete)

### Step 4: Export Data
Click any export button to download:

**CSV Format**
- File: `udan-registrations-YYYY-MM-DD.csv`
- Best for: Importing to other systems, lightweight file
- Opens in: Excel, Google Sheets, any spreadsheet app

**Excel Format**
- File: `udan-registrations-YYYY-MM-DD.xlsx`
- Best for: Analysis, detailed spreadsheet work, professional use
- Features: Styled headers, auto-fitted columns

**PDF Format**
- File: `udan-registrations-YYYY-MM-DD.pdf`
- Best for: Archiving, sharing, printing
- Features: Professional layout, page numbers, summary

## Exported Data

Each export includes:
- Full Name
- Email
- Phone
- Gender
- Region / Country
- Occupation / Company
- Agri Interests
- Membership Type
- Registration Type
- Status
- Registration Date

## Technical Details

### Files Added
- `app/api/export-registrations/route.ts` - Backend export API
- UI export buttons added to `app/page.tsx`

### Dependencies
- `exceljs` - Excel file generation
- `pdfkit` - PDF generation
- `papaparse` - CSV formatting

### API Endpoint
```
GET /api/export-registrations?format=csv|excel|pdf
```

## Features

✓ One-click export in three formats
✓ Auto-generated filenames with dates
✓ Download directly to your computer
✓ All registrations exported
✓ Professional formatting
✓ No server storage (generated on-demand)

## Troubleshooting

### Export button is disabled
- Check if there are registrations in the database
- Verify you're on the Registrations tab
- Refresh the page

### Download doesn't start
- Check browser console (F12) for errors
- Try a different export format
- Verify internet connection

### File is corrupted
- Try a different format (CSV is most compatible)
- Ensure you have the correct file viewer installed
- Re-download and try again

## Future Enhancements

Possible additions:
- Filter exports by date range
- Select specific columns to export
- Scheduled automated exports via email
- Export history/archive
- Custom report templates

---

**Version**: 1.0.0  
**Last Updated**: 2026-11-16
