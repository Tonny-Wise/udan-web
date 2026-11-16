# Admin Portal Setup & Usage Guide

## Overview
A secure admin portal has been set up for managing UDAN registrations with export capabilities in CSV, Excel, and PDF formats.

## Quick Start

### 1. Access Admin Portal
Navigate to: `http://localhost:3000/admin`

### 2. Login
- **URL**: `http://localhost:3000/admin`
- **Default Password**: `udan@admin2026` (change this in `.env.local`)
- Click "Sign In" button

### 3. View & Export Registrations
- **URL**: `http://localhost:3000/admin/registrations`
- View all member registrations in a table
- Search by name or email
- Filter by status (Pending, Approved, Rejected)
- Export data in three formats:
  - 📊 **CSV** - Lightweight, universal format
  - 📈 **Excel** - Formatted spreadsheet with styling
  - 📄 **PDF** - Professional report layout

## File Structure
```
app/
├── admin/
│   ├── page.tsx (login page)
│   ├── layout.tsx (admin layout)
│   └── registrations/
│       └── page.tsx (registrations dashboard)
└── api/
    ├── admin/
    │   └── login/
    │       └── route.ts (login endpoint)
    └── registrations/
        └── export/
            └── route.ts (export endpoint)
```

## Security Features
- Simple password-based authentication
- Secure httpOnly cookies (24-hour session)
- Server-side password validation
- Logout functionality

## Environment Variables
Add to `.env.local`:
```
ADMIN_PASSWORD=your_secure_password_here
```

Current default: `udan@admin2026`

## How to Change Admin Password
1. Edit `.env.local`
2. Update `ADMIN_PASSWORD=` with your new password
3. Restart the development server (`npm run dev`)
4. The new password will be required for all logins

## Registration Data Exported
Each export includes:
- Full Name
- Email
- Phone
- Gender
- Region / Country
- Occupation / Company
- Agri Interests
- Membership Type
- Registration Type (Buyer/Seller/Other)
- Status (Pending/Approved/Rejected)
- Registration Date

## Features

### Dashboard Statistics
- **Total**: All registrations
- **Pending**: Awaiting approval
- **Approved**: Verified members
- **Rejected**: Declined applications

### Search & Filter
- **Search Box**: Find by name or email
- **Status Filter**: View specific registration statuses
- **Real-time Updates**: Registrations load from Supabase

### Export Formats

#### CSV
- Universal spreadsheet format
- Opens in Excel, Google Sheets, etc.
- File: `udan-registrations-YYYY-MM-DD.csv`
- Lightweight and fast to download

#### Excel (.xlsx)
- Professional spreadsheet with formatting
- Dark header row with white text
- Auto-fitted columns for readability
- File: `udan-registrations-YYYY-MM-DD.xlsx`
- Best for detailed analysis

#### PDF
- Professional report layout
- Includes generation timestamp
- Table format with alternating row colors
- File: `udan-registrations-YYYY-MM-DD.pdf`
- Great for sharing and archiving

## API Endpoints

### Admin Login
```bash
POST /api/admin/login
Content-Type: application/json

{
  "password": "your_password"
}

Response:
{
  "success": true,
  "token": "base64_encoded_token"
}
```

### Export Registrations
```bash
GET /api/registrations/export?format=csv|excel|pdf

# Examples:
curl "http://localhost:3000/api/registrations/export?format=csv"
curl "http://localhost:3000/api/registrations/export?format=excel"
curl "http://localhost:3000/api/registrations/export?format=pdf"
```

## Workflow

### As Admin
1. Visit `/admin` (login page)
2. Enter the admin password
3. Click "Sign In"
4. Redirected to `/admin/registrations`
5. View all registrations in table
6. Use search/filter to narrow results
7. Click export button for desired format
8. File downloads automatically
9. Click "Logout" when done (optional)

### Session Management
- **Duration**: 24 hours
- **Storage**: HttpOnly cookie (secure, not accessible via JavaScript)
- **Logout**: Clears cookie and redirects to login

## Production Considerations

### Security Improvements
1. Use environment-based secrets (not hardcoded passwords)
2. Implement role-based access control (RBAC)
3. Add audit logging for admin actions
4. Use strong, unique passwords
5. Implement rate limiting on login attempts
6. Consider adding 2FA (two-factor authentication)

### Performance
1. Add pagination for large datasets (>10k records)
2. Implement lazy loading for tables
3. Add caching for frequently accessed data
4. Consider background jobs for large exports

### Scalability
1. Add database indexing on frequently filtered columns
2. Implement data archival for old registrations
3. Add scheduled exports via email
4. Consider API rate limiting

## Troubleshooting

### "Invalid password" error
- Check that `ADMIN_PASSWORD` is set in `.env.local`
- Ensure there are no leading/trailing spaces in the password
- Restart the dev server after changing the password

### Export button not working
- Ensure you're on the registrations page (not login page)
- Check browser console for errors
- Verify Supabase connection is working
- Try a different export format

### Table is empty
- Check that registrations exist in the Supabase `members` table
- Verify Supabase credentials in `.env.local`
- Try refreshing the page

### Logout not working
- Clear browser cookies manually: F12 > Application > Cookies > Delete admin_token
- Try logging in again

## Future Enhancements

### Possible Features
- [ ] User management (multiple admin accounts)
- [ ] Role-based permissions
- [ ] Scheduled automated exports
- [ ] Email export delivery
- [ ] Data visualization/charts
- [ ] Bulk status updates
- [ ] Custom column selection for exports
- [ ] Date range filtering
- [ ] Advanced search (by region, membership type, etc.)
- [ ] Audit logs for all admin actions
- [ ] Email templates for status changes
- [ ] Approval workflows

## Support
For issues or questions about the admin portal, check:
1. Browser console (F12) for JavaScript errors
2. Server logs for API errors
3. Supabase dashboard for database connection issues

---

**Last Updated**: 2026-11-16
**Admin Portal Version**: 1.0.0
