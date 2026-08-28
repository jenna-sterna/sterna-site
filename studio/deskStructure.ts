import type { StructureBuilder, StructureResolver } from "sanity/structure";

/**
 * Groups content into three sidebar sections:
 *   Content — Experiences, Founders, FAQs, Reviews  (editors add/remove/edit)
 *   Pages   — Homepage, About, FAQ intro, Contact, Experiences index, Experience detail,
 *             Site meta, Nav labels, Footer         (each is a singleton — one document only)
 *   Site    — Contact info, Trust badges           (singletons for global settings)
 *
 * Singleton document types are hidden from the default document list so editors
 * always see the same, single item.
 */
const SINGLETONS = [
  "company",
  "trust",
  "homePage",
  "aboutPage",
  "faqPage",
  "contactPage",
  "experiencesIndexPage",
  "experienceDetailPage",
  "siteMeta",
  "nav",
  "footer",
];

function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .child(
      S.editor()
        .id(type)
        .schemaType(type)
        .documentId(type)
    );
}

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Sterna Aveiro")
    .items([
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("experience").title("Experiences"),
              S.documentTypeListItem("founder").title("Founders"),
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("review").title("Reviews"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Homepage"),
              singleton(S, "aboutPage", "About page"),
              singleton(S, "experiencesIndexPage", "Experiences page (intro copy)"),
              singleton(S, "experienceDetailPage", "Experience detail (shared labels)"),
              singleton(S, "faqPage", "FAQ page (intro copy)"),
              singleton(S, "contactPage", "Contact page"),
              S.divider(),
              singleton(S, "nav", "Navigation labels"),
              singleton(S, "footer", "Footer"),
              singleton(S, "siteMeta", "Site meta (title, description)"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items([
              singleton(S, "company", "Contact info"),
              singleton(S, "trust", "Trust badges"),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? "")
        && !["experience", "founder", "faq", "review"].includes(item.getId() ?? "")
      ),
    ]);
