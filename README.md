# Zain Jamil — Dark Ecommerce Portfolio

A complete, static multi-page portfolio for a Europe-based Shopify, Squarespace and SEO specialist.

## Included

- Dark premium visual system with champagne and ice-blue accents
- Cursor-following ambient light and click pulse on desktop
- Responsive navigation and layouts
- Homepage featuring all 11 selected projects
- Services, Work, About, Contact and 11 project pages
- Project filters, reveal animation and interactive card lighting
- Upwork and LinkedIn links
- WhatsApp and Fiverr placeholders in `site-config.js`
- Custom favicon, social sharing image and 404 page
- GitHub Pages ready — no build step or framework

## Add WhatsApp and Fiverr

Open `site-config.js` and replace the empty values:

```js
window.SITE_CONFIG = {
  whatsapp: "https://wa.me/COUNTRYCODEPHONENUMBER",
  fiverr: "https://www.fiverr.com/USERNAME"
};
```

For WhatsApp, use digits only after `wa.me/`, including the country code.

## Publish on GitHub Pages

Upload everything in this folder to the root of the repository. `index.html` must remain at the repository root. Publish from the `main` branch and `/(root)` folder.
