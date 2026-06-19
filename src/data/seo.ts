import {
  categories,
  categoryCopy,
  categoryLongCopy,
  categorySlug,
  tools,
  type Tool,
  type ToolCategory
} from "../tools/registry";

export const SITE_URL = "https://YOUR_CUSTOM_DOMAIN";
export const SITE_NAME = "Toolzi";
export const DEFAULT_OG_IMAGE = "/og/privacy.png";

export type FAQEntry = {
  question: string;
  answer: string;
};

export type RouteSEO = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  schema: object[];
  faqs?: FAQEntry[];
};

const topFaqToolIds = new Set([
  "merge-pdf",
  "image-to-pdf",
  "image-compressor",
  "word-counter",
  "gst-calculator",
  "qr-code-generator",
  "json-formatter",
  "password-generator",
  "password-strength",
  "file-hash-generator"
]);

const toolTitleActions: Record<string, string> = {
  "markdown-to-pdf": "Convert Markdown to PDF in Your Browser",
  "merge-pdf": "Combine PDF Files in Your Browser",
  "split-pdf": "Extract PDF Pages Online",
  "image-to-pdf": "Convert Images to PDF Free",
  "image-compressor": "Reduce Image File Size Free",
  "image-resizer": "Resize Images Online Free",
  "image-converter": "Convert JPG, PNG and WebP",
  "background-remover": "Remove Simple Backgrounds Locally",
  "word-counter": "Count Words, Characters and Reading Time",
  "case-converter": "Change Text Case Online",
  "text-cleaner": "Clean Messy Text Fast",
  "percentage-calculator": "Calculate Percentages Online",
  "gst-calculator": "Add or Remove GST Online",
  "age-calculator": "Calculate Age from Date of Birth",
  "date-difference": "Count Days Between Dates",
  "qr-code-generator": "Create QR Codes Free",
  "invoice-generator": "Create Invoices in Your Browser",
  "signature-maker": "Draw and Download a Signature",
  "brat-generator": "Create Brat Style Text Images",
  "notes-pad": "Write Local Browser Notes",
  "todo-list": "Track Tasks Locally",
  "json-formatter": "Format and Validate JSON Locally",
  "base64-codec": "Encode and Decode Base64",
  "url-codec": "Encode and Decode URLs",
  "uuid-generator": "Generate Random UUIDs",
  "regex-tester": "Test Regular Expressions Online",
  "color-tools": "Pick Colors and Check Contrast",
  "css-gradient-generator": "Create CSS Gradients Visually",
  "markdown-to-html": "Convert Markdown to HTML",
  "json-csv": "Convert JSON and CSV Locally",
  "diff-checker": "Compare Text Differences",
  "password-generator": "Create Strong Passwords Locally",
  "password-strength": "Check Password Strength Privately",
  "file-hash-generator": "Generate SHA-256 File Hashes",
  "unit-converter": "Convert Units Online",
  "bmi-calculator": "Calculate Body Mass Index",
  "emi-calculator": "Estimate Monthly Loan Payments",
  "pomodoro-timer": "Run Focus and Break Sessions",
  "stopwatch-countdown": "Track Time in Your Browser",
  "favicon-generator": "Create Simple Favicons"
};

const toolMetaDescriptions: Record<string, string> = {
  "markdown-to-pdf":
    "Convert Markdown to PDF in your browser. Paste notes, docs or AI output and export a clean PDF with no uploads, account or server processing.",
  "merge-pdf":
    "Merge PDF files online free in your browser. Combine multiple PDFs into one download without uploads, sign-up or sending documents away.",
  "split-pdf":
    "Split PDF pages online in your browser. Extract page ranges from a PDF without uploads, accounts or server-side file processing.",
  "image-to-pdf":
    "Convert images to PDF online free. Turn JPG, PNG or WebP images into a PDF in your browser with no uploads, sign-up or server processing.",
  "image-compressor":
    "Compress images online free in your browser. Reduce JPG, PNG or WebP file size with preview controls and no uploads or sign-up.",
  "image-resizer":
    "Resize images online by width and height. Change photo dimensions in your browser with aspect ratio lock and no uploads or account.",
  "image-converter":
    "Convert images between JPG, PNG and WebP in your browser. Change image format locally with no uploads, sign-up or server processing.",
  "background-remover":
    "Remove simple image backgrounds in your browser. Create transparent PNG downloads locally with no uploads, account or server processing.",
  "word-counter":
    "Count words, characters and reading time online. Paste text into a private browser word counter with no uploads or account required.",
  "case-converter":
    "Convert text case online. Change text to uppercase, lowercase, title case, snake_case and more in your browser with no upload.",
  "text-cleaner":
    "Clean copied text online. Remove extra spaces, blank lines, duplicates and messy symbols in your browser without uploading content.",
  "percentage-calculator":
    "Calculate percentages online for discounts, increases, decreases and marks. Fast browser calculator with no sign-up or data upload.",
  "gst-calculator":
    "Use a GST calculator online to add or remove GST. See base amount, tax and total instantly in your browser with no sign-up.",
  "age-calculator":
    "Calculate age from date of birth online. Get years, months, days and next birthday countdown instantly in your browser.",
  "date-difference":
    "Calculate days between dates online. Find date differences, deadlines and durations in your browser with an include-end-date option.",
  "qr-code-generator":
    "Create QR codes online free for links, text, Wi-Fi, email, phone and contacts. Generate and download QR codes in your browser.",
  "invoice-generator":
    "Create invoices online free in your browser. Make a clean invoice, print it or save as PDF without account setup or uploads.",
  "signature-maker":
    "Draw a signature online and download it as PNG. Make a transparent browser signature without uploading anything or signing up.",
  "brat-generator":
    "Make brat-style text images online. Create a custom brat meme with colors or transparent background directly in your browser.",
  "notes-pad":
    "Write quick local notes in your browser. Search and save notes on this device without an account, upload or cloud sync.",
  "todo-list":
    "Create a local to-do list in your browser. Track active and completed tasks on this device with no account or upload.",
  "json-formatter":
    "Format, minify and validate JSON online. Pretty-print JSON locally in your browser without sending pasted data to a server.",
  "base64-codec":
    "Encode and decode Base64 online in your browser. Convert Base64 text locally with no upload, account or server processing.",
  "url-codec":
    "URL encode and decode text online. Escape or unescape query strings and URLs locally in your browser with no upload.",
  "uuid-generator":
    "Generate random UUIDs online. Create browser-based UUID and GUID values quickly without sign-up, tracking or server requests.",
  "regex-tester":
    "Test regular expressions online against sample text. Check matches in your browser without uploading code or pasted content.",
  "color-tools":
    "Pick colors and check WCAG contrast online. Test accessible color pairs in your browser with no account or upload.",
  "css-gradient-generator":
    "Create CSS gradients online with a visual browser generator. Build background gradients and copy CSS without sign-up.",
  "markdown-to-html":
    "Convert Markdown to HTML online. Turn Markdown into clean HTML locally in your browser without uploading your text.",
  "json-csv":
    "Convert JSON to CSV and CSV to JSON online. Transform simple data locally in your browser without uploading files.",
  "diff-checker":
    "Compare text online with a browser diff checker. Find changes between two text blocks without uploading your content.",
  "password-generator":
    "Generate strong passwords locally in your browser. Create random secure passwords without sending anything to a server.",
  "password-strength":
    "Check password strength privately in your browser. Test password quality locally without uploading or storing your password.",
  "file-hash-generator":
    "Generate SHA-256 file hashes in your browser. Calculate checksums locally without uploading files or sharing sensitive data.",
  "unit-converter":
    "Convert units online for length, weight, temperature and speed. Use a quick browser unit converter with no sign-up.",
  "bmi-calculator":
    "Calculate BMI online from height and weight. Get body mass index instantly in your browser with no account required.",
  "emi-calculator":
    "Calculate loan EMI online. Estimate monthly payments from loan amount, interest rate and term in your browser.",
  "pomodoro-timer":
    "Use a Pomodoro timer online for focus and breaks. Run local browser sessions without sign-up, tracking or install.",
  "stopwatch-countdown":
    "Use an online stopwatch and countdown timer in your browser. Track elapsed time or count down locally with no account.",
  "favicon-generator":
    "Generate favicon PNGs online from text and colors. Create simple site icons in your browser without design software."
};

function absoluteUrl(path = "/") {
  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function ogImageForCategory(category: ToolCategory) {
  return `/og/${categorySlug(category)}.png`;
}

function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Privacy-first browser tools. Compress images, merge PDFs, generate QR codes and more - no uploads, no sign-up.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

function toolSoftwareSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: absoluteUrl(tool.route),
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

function breadcrumbSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${tool.category} Tools`,
        item: absoluteUrl(`/${categorySlug(tool.category)}`)
      },
      { "@type": "ListItem", position: 3, name: tool.name, item: absoluteUrl(tool.route) }
    ]
  };
}

function faqSchema(faqs: FAQEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

function toolDescription(tool: Tool) {
  return (
    toolMetaDescriptions[tool.id] ??
    `${tool.description} Use ${tool.name} in your browser with no uploads or sign-up, so your files and data stay on your device.`
  );
}

function routeSEOForTool(tool: Tool): RouteSEO {
  const faqs = topFaqToolIds.has(tool.id) ? tool.faqs : undefined;
  const schema: object[] = [siteSchema(), toolSoftwareSchema(tool), breadcrumbSchema(tool)];

  if (faqs) {
    schema.push(faqSchema(faqs));
  }

  return {
    title: `${tool.name} - ${toolTitleActions[tool.id] ?? "Free Browser Tool"} | Toolzi`,
    description: toolDescription(tool),
    canonical: absoluteUrl(tool.route),
    ogImage: ogImageForCategory(tool.category),
    schema,
    faqs
  };
}

function routeSEOForCategory(category: ToolCategory): RouteSEO {
  const path = `/${categorySlug(category)}`;

  return {
    title: `${category} Tools - Free and Browser-Based | Toolzi`,
    description: `${categoryCopy[category]} ${categoryLongCopy[category]}`,
    canonical: absoluteUrl(path),
    ogImage: ogImageForCategory(category),
    schema: [siteSchema()]
  };
}

const homeSEO: RouteSEO = {
  title: "Toolzi - Privacy-first browser tools for PDFs, images, text, and more",
  description:
    "Use free browser tools for PDFs, images, text, calculators, QR codes, developer workflows and privacy tasks with no uploads or sign-up.",
  canonical: SITE_URL,
  ogImage: DEFAULT_OG_IMAGE,
  schema: [siteSchema()]
};

const toolsIndexSEO: RouteSEO = {
  title: "All Tools - Free Browser Utilities | Toolzi",
  description:
    "Browse every Toolzi browser tool for PDFs, images, text, calculations, creation, productivity, developer work and privacy-first tasks.",
  canonical: absoluteUrl("/tools"),
  ogImage: DEFAULT_OG_IMAGE,
  schema: [siteSchema()]
};

const notFoundSEO: RouteSEO = {
  title: "Page not found | Toolzi",
  description: "This Toolzi page could not be found. Return home to browse free privacy-first browser tools.",
  canonical: absoluteUrl("/404"),
  ogImage: DEFAULT_OG_IMAGE,
  schema: [siteSchema()]
};

export const routeSEO: Record<string, RouteSEO> = {
  "/": homeSEO,
  "/tools": toolsIndexSEO,
  "/404": notFoundSEO,
  ...Object.fromEntries(categories.map((category) => [`/${categorySlug(category)}`, routeSEOForCategory(category)])),
  ...Object.fromEntries(tools.map((tool) => [tool.route, routeSEOForTool(tool)])),
  ...Object.fromEntries(tools.map((tool) => [tool.legacyRoute, { ...routeSEOForTool(tool), canonical: absoluteUrl(tool.route) }]))
};

export const routesToPrerender = [
  "/",
  "/tools",
  ...categories.map((category) => `/${categorySlug(category)}`),
  ...tools.map((tool) => tool.route),
  "/404"
];

export const sitemapRoutes = [
  { path: "/", priority: "1.0" },
  ...categories.map((category) => ({ path: `/${categorySlug(category)}`, priority: "0.8" })),
  ...tools.map((tool) => ({ path: tool.route, priority: "0.7" }))
];

export function getSEOForPath(pathname: string) {
  return routeSEO[pathname] ?? notFoundSEO;
}
