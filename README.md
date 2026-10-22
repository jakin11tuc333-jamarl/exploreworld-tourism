# ExploreWorld Tourism Website

A responsive five-page tourism website starter built with HTML5, CSS3, and JavaScript.

## Pages
- `index.html` — home, search, featured destinations
- `destinations.html` — searchable/filterable destination catalogue
- `tours.html` — sample tour cards
- `plan.html` — trip brief form with local summary
- `contact.html` — about section and demo enquiry form

## Run locally
1. Extract the ZIP.
2. Open the project folder in VS Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` and select **Open with Live Server**.

You can also open `index.html` directly, though a local server is more reliable.

## Publish the front end with GitHub Pages
1. Create a GitHub repository, for example `exploreworld-tourism`.
2. Upload the project files and folders, keeping `index.html` at the repository root.
3. Open the repository **Settings → Pages**.
4. Choose the `main` branch and `/ (root)` folder, then save.
5. Wait for deployment and open the published URL.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

**Hosting note:** GitHub Pages serves static files. It does not execute PHP or Python backend code. For an actual booking platform, host the backend separately and configure it securely.

## Languages included
- HTML, CSS, JavaScript: working front end
- JSON: example destination data in `data/destinations.json`
- SQL: starter schema in `database/schema.sql`
- PHP: illustrative API endpoint in `backend/php/contact.php`
- Python: small Flask API example in `backend/python/app.py`

The PHP and Python files are separate backend learning examples and are not connected to the static website yet. They require a suitable server/runtime and configuration.

## Important demo limitations
- Sample tour prices are illustrative, not live prices.
- Forms display local demo responses; they do not send or store personal information.
- Destination images load from Unsplash URLs and require an internet connection.
- This is a learning starter, not a production booking system. Before accepting real bookings, add server-side validation, database storage, secure authentication if needed, HTTPS, privacy and refund policies, and a trusted payment provider. Never store card details yourself.
