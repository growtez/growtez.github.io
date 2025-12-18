// Google Apps Script - Deploy this in your Google Sheet
// Go to: Extensions > Apps Script > Paste this > Deploy as Web App

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents);

        sheet.appendRow([
            new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            data.name,
            data.email,
            data.phone,
            data.position,
            data.linkedin || '',
            data.portfolio || '',
            data.resume,
            data.message
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// DEPLOYMENT INSTRUCTIONS:
// 1. Create new Google Sheet with headers: Timestamp | Name | Email | Phone | Position | LinkedIn | Portfolio | Resume | Message
// 2. Go to Extensions > Apps Script
// 3. Delete default code and paste this entire script
// 4. Click Deploy > New Deployment
// 5. Select Type: Web App
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy and copy the Web App URL
// 9. Paste URL in careers.html where indicated
