# Trash Pandas — GitHub website

Your Google Sheet is already configured and connected:
https://docs.google.com/spreadsheets/d/1wynIcn-tvmHJ4YwggY2LIoK5Ay3KT8fzAbuO_lFUCRU/edit

## Publish from your phone

1. Extract this ZIP using your phone's Files app.
2. In your GitHub repository, upload `index.html`, `styles.css`, `config.js`, `data.js`, `app.js`, `README.md`, and `FONT-LICENSES.txt` directly to the repository root. Do not upload the ZIP itself or an enclosing folder.
3. Create the root `images` folder and upload all three included images (`trash-pandas.jpg`, `raccoon-batter.png`, and `raccoon-dj.png`) inside it. If GitHub's mobile upload screen cannot make a folder, use **Add file → Create new file**, type `images/README.txt`, enter `Team images`, and commit. Open that folder and upload the images. The small README placeholder can then be deleted.
4. In the repository's **Settings → Pages**, select **Deploy from a branch**, choose **main**, and choose **/(root)**. Save. The GitHub website may require your browser's Desktop site mode for these controls.
5. Open the Pages address GitHub provides after deployment finishes. No API key, Firebase, npm, Actions workflow, or build command is needed.

Every site file stays at the root. Images are the only nested assets, in `images/`. Fonts are embedded inside `styles.css` so they do not need separate uploads or outside font servers.

## Updating an existing site

Replace all included root files and upload the two new PNG images into `images`. The Google Sheet has already been upgraded for this version.

## First five minutes in the sheet

- **Teams:** 8U and 10U are ready. Paste each team’s GameChanger URL into its row. Add another published row to add a team. Use Display name to change its public name without changing existing assignments.
- **Schedule:** Add a row, choose the team/type, enter the date, time, opponent or event title, and location, then check **Publish**. Blank Team means the event is shared across all teams.
- **Roster:** Enter the public display name and jersey number, choose Player or Coach, and check Publish. Nickname, walk-up song, artist, Song URL, positions, photos and sort order are optional. Song links open when tapped; nothing autoplays.
- **Announcements:** Add a title and message, then check Publish. Optional start/end dates schedule when it appears. Choose Pinned or Urgent for important updates.
- **Settings:** Edit Value cells. Use the Yes/No dropdowns to show or hide roster, record, and photos.

Dates: `4/17/2027`, using normal date cells. Enter `6:30` and choose PM in the separate AM / PM dropdown (PM is the default). You can also type `6:30 PM` directly. Times use America/Chicago, including daylight-saving changes. Blank time shows **Time TBD**.

Keep the tab names and column headers unchanged. Header edits trigger a warning. Team dropdowns use the Teams list automatically; named rows belonging to unpublished teams are hidden. Blank Team makes an event shared across teams. Players with no Team appear only under All teams. Use column B to assign the existing game and Reid to the correct team; their age group was not guessed.

500 rows per content tab have controls and formatting. Copy an existing blank row when you need more; the site reads through row 5000.

## Scores, schedules and calendars

- To post a result, set **Status = Final** and enter **both scores**, including zero. Only Game rows count toward the win/loss/tie record.
- Record includes all published Final games. Uncheck Publish on previous-season games to reset it, or keep them as an archive and turn Show record to No. The Season setting is a label; it does not filter records.
- Today’s events stay in Upcoming through the end of the Central-time day unless marked Final. Older events move out automatically; Live events remain until their status changes. End time controls calendar duration, with a two-hour default for timed events. Include AM or PM in an optional End time.
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

Keyboard navigation, skip link, visible focus indicators, reduced-motion support, optional motion pause, responsive layouts and readable contrast are included. The original raccoon logo is retained. Two additional raccoon illustrations decorate the schedule, roster and footer. Tap the batter for a brief baseball toss. Animated dots run the diamond behind the logo. All motion respects reduced-motion settings and the pause control.

To change code later, replace the relevant root file in GitHub. To change content, edit the sheet. If you duplicate the sheet, update only its ID in `config.js` and preserve the tab/column names.

Third-party fonts and their licenses are in `FONT-LICENSES.txt`. Website version: 1.1.0.
