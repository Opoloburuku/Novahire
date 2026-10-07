# Novahire website

The Novahire recruitment agency website. It is a static site (plain HTML, CSS and JavaScript), so there is no build step.

## Files

```
index.html        The homepage
404.html          Shown when someone visits a page that doesn't exist
css/styles.css    All styling (colors are set at the top of the file)
js/main.js        Example shortlist, job filter and contact form
img/              Photos
favicon.svg       Browser tab icon
vercel.json       Vercel settings (clean URLs, caching, security headers)
robots.txt        Lets search engines index the site
```

## Put it on GitHub

1. Sign in at github.com and click **New repository**. Name it `novahire-website` and click **Create repository**.
2. On the new repository page, click **uploading an existing file**.
3. Drag in everything inside this folder (not the folder itself), including the `css`, `js` and `img` folders, then click **Commit changes**.

On a Mac, files starting with a dot (`.gitignore`) are hidden. Press Cmd + Shift + . in Finder to show them. The site works without it.

## Put it live on Vercel

1. Sign in at vercel.com with your GitHub account.
2. Click **Add New → Project**, then **Import** next to `novahire-website`.
3. Leave Framework Preset as **Other** and the build settings empty. Click **Deploy**.
4. Your site is live at an address like `novahire-website.vercel.app`. Every change you commit to GitHub redeploys it automatically.

### Use your own domain

In Vercel, open the project, go to **Settings → Domains**, add your domain (for example `novahire.ca`), and follow the DNS instructions it shows.

## Before you launch

Search `index.html` for these and replace them:

- `hello@novahire.com` and `(000) 000-0000` with your real email and phone number
- `Address coming soon` with your office address
- The four jobs in the **Open jobs** section. They are examples, not real vacancies.
- The promises "5 days", "90 days replacement guarantee" and "$0 until you hire". Keep them only if they match your terms.

## Connect the contact form

The form needs a service to deliver messages to your inbox. Formspree is free for up to 50 messages a month:

1. Sign up at formspree.io and create a form. Copy its endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, find `data-endpoint=""` and paste the endpoint between the quotes.
3. Commit the change. Messages will now arrive by email.

Until you do this, the form tells visitors to email you directly.

## Change the colors

Open `css/styles.css`. The colors are at the top, for example `--cobalt:#3a7ff6;` is the main blue. There is a second set for dark mode a few lines below.
