// schema.org JSON-LD for the site's identity: one Organization, one WebSite and one MobileApplication, linked by @id.
// The names are fixed (the official English and Arabic names), whatever the page language.
import { langTag, locales, SITE_URL } from "@/i18n/config";
import { CONTACT_EMAIL, STORES } from "./stores";

export const BRAND = "Rafiq Al Muslim";
export const BRAND_AR = "رفيق المسلم";
export const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

/** Reference to the Organization, for `publisher` / `author` fields. */
export const orgRef = { "@type": "Organization", "@id": ORG_ID, name: BRAND };

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: BRAND,
  alternateName: BRAND_AR,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-512.png`, width: 512, height: 512 },
  email: CONTACT_EMAIL,
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  name: BRAND,
  alternateName: BRAND_AR,
  url: `${SITE_URL}/`,
  inLanguage: locales.map(langTag),
  publisher: { "@id": ORG_ID },
};

// Category and price as listed on the App Store (Lifestyle, free). No ratings: none are marked up here.
const app = {
  "@type": "MobileApplication",
  "@id": APP_ID,
  name: BRAND,
  alternateName: BRAND_AR,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/logo-512.png`,
  operatingSystem: "iOS, Android",
  applicationCategory: "LifestyleApplication",
  inLanguage: locales.map(langTag),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: [STORES.appStore, STORES.googlePlay, STORES.appGallery],
  publisher: { "@id": ORG_ID },
};

/** Every page: the Organization and the WebSite. */
export const siteJsonLd = { "@context": "https://schema.org", "@graph": [organization, website] };

/** Home pages add the app (the layout already has the Organization and the WebSite it points to). */
export const appJsonLd = { "@context": "https://schema.org", ...app };
