# Capacity page and Google Sheets

The `/capacity` page includes every distinct offering from the reference's first (Leased) table, alongside the existing GB200 and L40S options. Repeated inventory listings are consolidated into one row per offering, with unconfirmed details marked on request. It does not publish another provider's stock. It works without a spreadsheet.

To manage the table without code, use **Google Sheets**, rather than a Google Doc. Only publish information intended for everyone visiting your website. Never put customer details, supplier contracts or internal notes in the published tab.

1. Create a Google Sheet and a tab called `Website capacity`.
2. Put these exact headers in row 1: `gpu`, `quantity`, `location`, `term`, `ready`. Header order may vary; all five are required.
3. Add one row per configuration. For example: `H100`, `On request`, `On request`, `Flexible`, `Confirm with us`. Replace these details only with inventory you can confirm. Do not add a price column.
4. In **File → Share → Publish to web**, select only that tab and choose **Comma-separated values (.csv)**. Click Publish. Keep **Automatically republish when changes are made** enabled.
5. Copy the published CSV link. It looks like `https://docs.google.com/spreadsheets/d/e/PUBLISHED_ID/pub?gid=0&single=true&output=csv`. An ordinary editing or sharing link will not work.
6. In the Netlify project, add environment variable `CAPACITY_SHEET_CSV_URL` with that link, available to **Functions** in production. Redeploy once to activate it.
7. Visit `/capacity`. The note below the table changes to “Capacity details refresh automatically.” Edit a cell in Sheets and verify it appears after Google's publishing delay and the website refresh interval.

After connection, edits need no GitHub commit or deployment. The website checks every 60 seconds while the page is visible; Google may take a few minutes to publish edits. Netlify also caches the feed for up to 60 seconds. This is a periodically refreshed table, not a real-time stock reservation system.

Rows must have all five cells filled, with a maximum of 120 characters per cell and 100 rows total. To show that inventory needs confirmation, keep a row with “On request” details: an empty feed is treated as a configuration error. Remove the environment variable and redeploy to return to the default overview.

If the feed fails validation or cannot be fetched, the page keeps its last displayed rows (or the default overview after a new visit) and explicitly asks visitors to confirm details. It never labels the fallback as live inventory. Requests use the existing form and email delivery mechanism; viewing the table does not send email.

The Netlify function fetches only published CSV URLs on `docs.google.com`, validates the response, and returns plain text values rendered through React. No Google account credentials are needed. This URL-based integration does not read private Sheets.

Local `npm run dev` uses the default overview. To exercise the connection locally, run Netlify Dev with the environment variable set. The automated tests cover parsing, URL restrictions, missing configuration and upstream failures without sending any email.

Google's publishing instructions: https://support.google.com/docs/answer/183965
