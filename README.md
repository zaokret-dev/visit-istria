# Visit Istria – static site (EN, DE, IT, FR, HU, CS, PL, HR)

Pure HTML, CSS and JavaScript. Upload this folder to any static host. 144 pages: 18 pages x 8 languages.

    /            English (home)         /de/   Deutsch
    /it/         Italiano               /fr/   Français   /hu/ Magyar   /cs/ Čeština   /pl/ Polski   /hr/ Hrvatski

## 1. Set the domain
Replace the placeholder with your domain (canonical, hreflang, Open Graph, JSON-LD, sitemap, robots, e-mail address):

    grep -rl "zaokret-dev.github.io" . | xargs sed -i 's#zaokret-dev.github.io#your-domain.com#g'

## 2. Placeholders to replace before launch
- Phones (+385 91 555 0142, +44 7700 900142) and the e-mail are placeholders. Search and replace them in all files, or edit `core.mjs` and rebuild with `node build.mjs`.
- Photos: put your own photos in `assets/img/` using the file names listed in `PHOTOS.txt` (it says where each photo is used and what it should show). For speed and SEO keep each photo about 1600 px wide, compressed to under 200 KB (for example with squoosh.app), and keep the file names – they are descriptive on purpose.
- German, Italian, French, Hungarian, Czech, Polish and Croatian texts were machine-assisted. Have a native speaker read them once.

## 3. Hosting
Links are folder-style (`/de/kontakt/`), so serve via a web server (Netlify, Cloudflare Pages, Apache, nginx). Local preview: `npx serve .`. `.htaccess` (Apache) and `_headers` (Netlify/Cloudflare) add caching, compression and https redirect. `404.html` is the error page.

## 4. After launch (SEO)
Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools, create a Google Business Profile with the same name, address and phone, and collect real reviews and links.

## Built-in on-page SEO
Unique title and description per page and language, canonical, hreflang (7 languages + x-default), Open Graph/Twitter, JSON-LD (TravelAgency, WebSite, WebPage/AboutPage/ContactPage, BreadcrumbList, TouristTrip with offers, Service, FAQPage), XML sitemap with language alternates and images, self-hosted fonts (no Google Fonts requests), preloaded hero image and fonts, width/height on images, WCAG AA contrast. The guest book is noindex (thin page) and not in the sitemap.

## Forms
The enquiry form opens WhatsApp or the e-mail app; the guest-book form opens e-mail. No server needed.
