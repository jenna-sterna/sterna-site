// Content types (editors add/edit/remove multiple)
import experience from "./experience";
import founder from "./founder";
import faq from "./faq";
import review from "./review";

// Singletons — one document each
import company from "./company";
import trust from "./trust";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import faqPage from "./faqPage";
import contactPage from "./contactPage";
import experiencesIndexPage from "./experiencesIndexPage";
import experienceDetailPage from "./experienceDetailPage";
import siteMeta from "./siteMeta";
import nav from "./nav";
import footer from "./footer";

export const schemaTypes = [
  // Content
  experience,
  founder,
  faq,
  review,
  // Site
  company,
  trust,
  // Pages
  homePage,
  aboutPage,
  faqPage,
  contactPage,
  experiencesIndexPage,
  experienceDetailPage,
  siteMeta,
  nav,
  footer,
];
