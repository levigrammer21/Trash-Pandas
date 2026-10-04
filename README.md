# Trash Pandas — GitHub website

Your Google Sheet is already configured and connected:
https://docs.google.com/spreadsheets/d/1wynIcn-tvmHJ4YwggY2LIoK5Ay3KT8fzAbuO_lFUCRU/edit

## Publish from your phone

1. Extract this ZIP using your phone's Files app.
2. In your GitHub repository, upload `index.html`, `styles.css`, `config.js`, `data.js`, `app.js`, `README.md`, and `FONT-LICENSES.txt` directly to the repository root. Do not upload the ZIP itself or an enclosing folder.
3. Create the root `images` folder and upload `trash-pandas.jpg` inside it. If GitHub's mobile upload screen cannot make a folder, use **Add file → Create new file**, type `images/README.txt`, enter `Team images`, and commit. Open that folder and upload the JPG. The small README placeholder can then be deleted.
4. In the repository's **Settings → Pages**, select **Deploy from a branch**, choose **main**, and choose **/(root)**. Save. The GitHub website may require your browser's Desktop site mode for these controls.
5. Open the Pages address GitHub provides after deployment finishes. No API key, Firebase, npm, Actions workflow, or build command is needed.

Every site file stays at the root. Images are the only nested assets, in `images/`. Fonts are embedded inside `styles.css` so they do not need separate uploads or outside font servers.

## First five minutes in the sheet

- **Teams:** Paste your GameChanger URL into the Trash Pandas row. For multiple teams, add and publish one row per team with its own link. Label can be an age group or division.
- **Schedule:** Add a row, choose the team/type, enter the date, time, opponent or event title, and location, then check **Publish**. Blank Team means the event is shared across all teams.
- **Roster:** Enter the public display name and jersey number, choose Player or Coach, and check Publish. Positions, photos and sort order are optional.
- **Announcements:** Add a title and message, then check Publish. Optional start/end dates schedule when it appears. Choose Pinned or Urgent for important updates.
- **Settings:** Edit Value cells. Use the Yes/No dropdowns to show or hide roster, record, and photos.

Dates: `2027-04-17`. Times: `18:30` for 6:30 PM. Times use America/Chicago, including daylight-saving changes. Blank time shows **Time TBD**.

Keep the tab names and column headers unchanged. Header edits trigger a warning. Team dropdowns use the Teams list automatically; named rows belonging to unpublished teams are hidden. Blank Team applies to everyone.

500 rows per content tab have controls and formatting. Copy an existing blank row when you need more; the site reads through row 5000.

## Scores, schedules and calendars

- To post a result, set **Status = Final** and enter **both scores**, including zero. Only Game rows count toward the win/loss/tie record.
- Record includes all published Final games. Uncheck Publish on previous-season games to reset it, or keep them as an archive and turn Show record to No. The Season setting is a label; it does not filter records.
- Past games and practices move out of Upcoming automatically. Timed events remain upcoming until End time, or two hours after their start if End time is blank. Date-only events remain until that day's end.
- Canceled/Postponed events keep their notices in the schedule but do not become the next event or appear in calendar downloads.
- A Live event stays featured until you change its status. A past game without a final score displays Awaiting result.
- Visitors can filter by team and event type, view results, open directions, and download a single event or the current upcoming schedule as an `.ics` file.
- Calendar downloads are snapshots, not live subscriptions. Download again after changes; avoid importing duplicate copies. Events without a time are marked as all-day with Time TBD in their description.
- GameChanger buttons link to your supplied team/game pages. Scores and schedules are managed in this sheet; the site does not scrape or automatically import GameChanger data.

## Optional content

**Links:** GameChanger, registration, social accounts, store or documents. Use full `https://` links. Add multiple GameChanger links here if desired.

**Gallery:** Direct image URL, optional caption and team. Photos open in a keyboard-accessible dialog. Use `images/team-photo.jpg` for files you upload to your repository. Standard Google Drive sharing links are not direct image URLs.

**Sponsors:** Name, optional logo and website. Names still show if no logo is provided.

**Roster photos:** Use a direct image URL or `images/player-photo.jpg`. Numbers and names remain visible if a photo fails to load.

Empty optional sections and their navigation links are hidden automatically. No invented games, players, announcements or sponsors are included in live mode.

## Sheet access and updates

The sheet was supplied with **Anyone with the link → Editor** access. Change that to **Anyone with the link → Viewer**, keeping yourself as owner/editor. The site needs public read access, never public edit access. Publishing to the web and Apps Script are not required for this configuration.

This sheet supplies a public website. Unchecked Publish rows are hidden from the website, but remain readable in the public sheet. Do not store private phone numbers, birth dates, addresses, or other private player data in it.

The site loads the sheet at startup and refreshes every two minutes while visible. Google's cache may delay changes briefly. Refresh retries a failed connection. If a request fails, a previously loaded snapshot can be used for up to 24 hours on the next visit, with a visible saved-info notice. The website files themselves are not an offline app.

If team data will not load, confirm public Viewer access and original tab/header names, then check your connection and press Refresh. An ad blocker may need to allow the Google Sheets data script. A missing content tab prevents a complete update; restore its original name.

## Design preview

Add `?preview=1` to your website address to see the complete layout with clearly labeled sample players/events. This mode never writes anything to the sheet. Use the normal address for real team content.

## Accessibility and maintenance

Keyboard navigation, skip link, visible focus indicators, reduced-motion support, optional motion pause, responsive layouts and readable contrast are included. The original raccoon image is included unchanged; CSS blends its white background into baby blue.

To change code later, replace the relevant root file in GitHub. To change content, edit the sheet. If you duplicate the sheet, update only its ID in `config.js` and preserve the tab/column names.

Third-party fonts and their licenses are in `FONT-LICENSES.txt`. Website version: 1.0.0.
