// Navigation data shared by the desktop mega-menu (Header) and the MobileMenu.
// Labels and hrefs are transcribed verbatim from
// download-version/home-ai-chatbot-tool.html so the rendered DOM matches the
// original template exactly — including its inconsistencies (see notes below).

export type MenuLink = { href: string; label: string };

/** Home submenu in the mobile drawer (home-ai-chatbot-tool.html:106-116). */
export const homeLinks: MenuLink[] = [
  { href: "home-ai-startup.html", label: "Home Ai Startup" },
  { href: "home-ai-chatbot.html", label: "Home Ai Chatbot" },
  { href: "home-ai-image-generate.html", label: "Home Ai Image Generate" },
  { href: "home-ai-writer-tool.html", label: "Home AI Writer Tool" },
  { href: "home-business-intelligence.html", label: "Home Business Intelligence" },
  // Verbatim: the template really does label this one with its filename.
  { href: "home-ai-agent.html", label: "home-ai-agent" },
  { href: "home-productivity-tools.html", label: "Home productivity tools" },
  { href: "home-ai-chatbot-tool.html", label: "Home AI chatbot tool" },
  { href: "home-cloud-based-saas.html", label: "Home cloud Based Saas" },
  { href: "home-saas-product-showcase.html", label: "Home Saas product Showcase" },
  { href: "home-finance-crypto-service.html", label: "Home finance crypto service" },
];

export type MegaMenuCard = {
  slug: string;
  img: string;
  alt: string;
  title: string;
};

/** Desktop mega-menu cards (home-ai-chatbot-tool.html:179-331).
 *  Note: cards 10 and 11 have no period after the number, and every card from
 *  the third onward reuses alt="Home Three". Both are kept as-is. */
export const megaMenuCards: MegaMenuCard[] = [
  { slug: "home-ai-startup", img: "home-ai-startup.jpg", alt: "Home One", title: "01. Home Ai Startup" },
  { slug: "home-ai-chatbot", img: "home-ai-chatbot.jpg", alt: "Home Two", title: "02. Home Ai Chatbot" },
  { slug: "home-ai-image-generate", img: "home-ai-image-generate.jpg", alt: "Home Three", title: "03. Home Ai Image Generate" },
  { slug: "home-ai-writer-tool", img: "home-ai-writer-tool.jpg", alt: "Home Three", title: "04. Home AI Writer Tool" },
  { slug: "home-business-intelligence", img: "home-business-intelligence.jpg", alt: "Home Three", title: "05. Home Business Intelligence" },
  { slug: "home-ai-agent", img: "home-ai-agent.jpg", alt: "Home Three", title: "06. Home Ai Agent" },
  { slug: "home-productivity-tools", img: "home-productivity-tools.jpg", alt: "Home Three", title: "07. Home productivity tools" },
  { slug: "home-ai-chatbot-tool", img: "home-ai-chatbot-tool.jpg", alt: "Home Three", title: "08. Home AI chatbot tool" },
  { slug: "home-cloud-based-saas", img: "home-cloud-based-saas.jpg", alt: "Home Three", title: "09. Home cloud Based Saas" },
  { slug: "home-saas-product-showcase", img: "home-saas-product-showcase.jpg", alt: "Home Three", title: "10 Home Saas product Showcase" },
  { slug: "home-finance-crypto-service", img: "home-finance-crypto-service.jpg", alt: "Home Three", title: "11 Home finance crypto service" },
];

export const caseStudiesLinks: MenuLink[] = [
  { href: "case-studies.html", label: "Case Studies" },
  { href: "case-studies-2.html", label: "Case Studies style 2" },
  { href: "case-studies-details.html", label: "Case Studies Details" },
];

export const pagesLinks: MenuLink[] = [
  { href: "cases.html", label: "cases" },
  { href: "integrations.html", label: "Integrations" },
  { href: "team.html", label: "Team" },
  { href: "team-details.html", label: "Team Details" },
  { href: "faq.html", label: "FAQ" },
  { href: "testimonial.html", label: "Testimonial" },
  { href: "pricing.html", label: "Price Table" },
  { href: "/contact", label: "Contact Us" },
  { href: "error.html", label: "Error Page" },
];

export const blogLinks: MenuLink[] = [
  { href: "blog.html", label: "Blog" },
  { href: "blog-details.html", label: "Blog Details" },
];
