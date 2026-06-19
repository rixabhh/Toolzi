export type ToolCategory = "PDF" | "Image" | "Text" | "Calculate" | "Create" | "Productivity" | "Developer" | "Privacy";

export type Tool = {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  longDescription: string;
  howItWorks: string[];
  faqs: { question: string; answer: string }[];
  route: string;
  legacyRoute: string;
  privacy: "local";
  popular?: boolean;
  keywords: string[];
  aliases: string[];
  intents: string[];
  icon: string;
  related: string[];
};

const t = (
  id: string,
  name: string,
  category: ToolCategory,
  description: string,
  icon: string,
  popular: boolean,
  keywords: string[],
  aliases: string[],
  intents: string[],
  related: string[]
): Tool => {
  const slug = canonicalToolSlug(id);
  const route = `/${categorySlug(category)}/${slug}`;
  const content = createToolContent(name, category, description, keywords, aliases);

  return {
    id,
    slug,
    name,
    category,
    description,
    ...content,
    route,
    legacyRoute: `/tools/${id}`,
    privacy: "local",
    popular,
    keywords,
    aliases,
    intents,
    icon,
    related
  };
};

export function categorySlug(category: ToolCategory) {
  return category.toLowerCase();
}

const canonicalSlugOverrides: Record<string, string> = {
  "merge-pdf": "merge",
  "split-pdf": "split",
  "image-compressor": "compress",
  "image-resizer": "resize",
  "image-converter": "convert",
  "word-counter": "word-counter",
  "qr-code-generator": "qr-code-generator",
  "gst-calculator": "gst-calculator"
};

export function canonicalToolSlug(id: string) {
  return canonicalSlugOverrides[id] ?? id;
}

function createToolContent(
  name: string,
  category: ToolCategory,
  description: string,
  keywords: string[],
  aliases: string[]
) {
  const categoryName = category === "Calculate" ? "calculator" : `${category.toLowerCase()} tool`;
  const primaryKeyword = keywords[0] ?? name.toLowerCase();
  const secondaryKeywords = [...keywords.slice(1, 4), ...aliases.slice(0, 2)].slice(0, 4);
  const keywordSentence =
    secondaryKeywords.length > 0
      ? `It is built for searches like ${primaryKeyword}, ${secondaryKeywords.join(", ")}, and similar everyday needs.`
      : `It is built for ${primaryKeyword} and similar everyday needs.`;
  const privacyAnswer =
    category === "PDF" || category === "Image" || category === "Privacy"
      ? `No. ${name} runs in your browser, so your files and sensitive data never leave your device.`
      : `No. ${name} works locally in your browser, so the text or values you enter stay on your device.`;

  return {
    longDescription: `${name} is a free browser-based ${categoryName} for people who want quick results without uploading files or creating an account. ${description} ${keywordSentence} Everything runs locally in your browser, which keeps the workflow fast and private.`,
    howItWorks: [
      `Open ${name} and add the file, text, link, or values you want to work with.`,
      `Use the ${primaryKeyword} options to prepare the result and preview changes directly in the browser.`,
      "Download, copy, or use the finished result without sending your data to a server."
    ],
    faqs: [
      {
        question: `Does ${name} upload my files or data?`,
        answer: privacyAnswer
      },
      {
        question: `Is ${name} free to use?`,
        answer: `Yes. ${name} is free and does not require sign-up.`
      },
      {
        question: `Is there a limit for ${name}?`,
        answer:
          "There is no server-side limit. The practical limit depends on your browser, device memory, and the size of the files or text you use."
      }
    ]
  };
}

export const tools: Tool[] = [
  t("markdown-to-pdf", "Markdown to PDF", "PDF", "Paste Markdown or ChatGPT output and turn it into a clean printable PDF.", "markdown", false, ["markdown to pdf", "md to pdf", "chatgpt to pdf", "claude to pdf", "notes to pdf", "report pdf"], ["paste2pdf", "markdown pdf maker", "chatgpt pdf"], ["make pdf", "convert markdown", "paste to pdf", "save notes as pdf"], ["word-counter", "text-cleaner", "image-to-pdf", "merge-pdf"]),
  t("merge-pdf", "Merge PDF", "PDF", "Combine multiple PDF files into one local download.", "merge", true, ["merge pdf", "combine pdf", "join pdf", "merge documents"], ["pdf joiner", "combine documents"], ["combine PDFs", "put pdfs together", "join documents"], ["split-pdf", "image-to-pdf", "markdown-to-pdf"]),
  t("split-pdf", "Split PDF", "PDF", "Extract selected pages from a PDF with simple page ranges.", "split", false, ["split pdf", "extract pages", "pdf pages", "page range"], ["pdf splitter"], ["take pages out", "save selected pages", "extract pdf pages"], ["merge-pdf", "image-to-pdf", "markdown-to-pdf"]),
  t("image-to-pdf", "Image to PDF", "PDF", "Turn one or more images into a tidy PDF.", "imagePdf", true, ["image to pdf", "photo to pdf", "jpg to pdf", "png to pdf"], ["pictures to pdf"], ["make pdf from images", "convert photos to pdf"], ["image-compressor", "image-resizer", "merge-pdf"]),
  t("image-compressor", "Image Compressor", "Image", "Reduce image file size while keeping a useful preview.", "compress", true, ["compress image", "compress photo", "reduce image size", "make image smaller"], ["photo compressor", "image shrinker"], ["shrink photo", "smaller image", "compress picture"], ["image-resizer", "image-converter", "image-to-pdf"]),
  t("image-resizer", "Image Resizer", "Image", "Resize an image by width and height with aspect ratio lock.", "resize", false, ["resize image", "resize photo", "change image size", "image dimensions"], ["photo resizer"], ["make image 1000px", "change photo width"], ["image-compressor", "image-converter", "image-to-pdf"]),
  t("image-converter", "Image Converter", "Image", "Convert images between JPG, PNG, and WebP.", "convert", false, ["convert image", "jpg png webp", "image format"], ["photo converter"], ["convert png to jpg", "make webp", "change image format"], ["image-compressor", "image-resizer", "image-to-pdf"]),
  t("background-remover", "Background Remover", "Image", "Remove simple solid image backgrounds and download a transparent PNG.", "background", false, ["background remover", "remove background", "transparent png", "cut out image"], ["bg remover", "image background remover"], ["remove photo background", "make background transparent", "cutout image"], ["image-compressor", "image-resizer", "image-converter"]),
  t("word-counter", "Word Counter", "Text", "Count words, characters, sentences, paragraphs, and reading time.", "word", true, ["word counter", "count words", "characters", "reading time"], ["text counter"], ["how many words", "count characters", "essay word count"], ["case-converter", "text-cleaner", "markdown-to-pdf"]),
  t("case-converter", "Case Converter", "Text", "Convert text to uppercase, lowercase, title case, snake_case, and more.", "case", false, ["case converter", "uppercase", "lowercase", "title case", "snake case", "kebab case"], ["text case"], ["change text case", "make uppercase", "make lowercase"], ["word-counter", "text-cleaner"]),
  t("text-cleaner", "Text Cleaner", "Text", "Clean messy copied text, blank lines, spacing, duplicates, and symbols.", "clean", false, ["text cleaner", "clean text", "remove spaces", "duplicate lines", "blank lines"], ["messy text cleaner"], ["clean copied text", "fix spacing", "remove duplicate lines"], ["word-counter", "case-converter", "markdown-to-pdf"]),
  t("percentage-calculator", "Percentage Calculator", "Calculate", "Calculate percentages, discounts, increases, decreases, and marks.", "percent", false, ["percentage calculator", "discount", "increase", "decrease", "marks percentage"], ["percent calculator"], ["calculate percentage", "what percent", "discount calculation"], ["gst-calculator", "age-calculator", "date-difference"]),
  t("gst-calculator", "GST Calculator", "Calculate", "Add or remove GST and see base amount, tax, and total.", "gst", true, ["gst calculator", "calculate gst", "add gst", "remove gst", "tax calculator"], ["gst"], ["add tax", "remove tax", "calculate 18 gst"], ["percentage-calculator", "invoice-generator"]),
  t("age-calculator", "Age Calculator", "Calculate", "Calculate age in years, months, days, and next birthday countdown.", "age", false, ["age calculator", "date of birth", "birthday countdown"], ["dob calculator"], ["how old am i", "calculate age", "next birthday"], ["date-difference", "percentage-calculator"]),
  t("date-difference", "Date Difference Calculator", "Calculate", "Find the difference between two dates with include-end-date control.", "date", false, ["date difference", "days between dates", "date calculator"], ["date diff"], ["calculate days", "deadline days", "between two dates"], ["age-calculator", "percentage-calculator"]),
  t("qr-code-generator", "QR Code Generator", "Create", "Create QR codes for URLs, text, email, phone, Wi-Fi, and contacts.", "qr", true, ["qr code generator", "make qr", "url qr", "wifi qr", "vcard qr"], ["qr maker"], ["make qr code", "create qr", "qr for link"], ["invoice-generator", "signature-maker"]),
  t("invoice-generator", "Invoice Generator", "Create", "Create a clean invoice locally and print or save it as PDF.", "invoice", false, ["invoice generator", "make invoice", "bill maker", "tax invoice"], ["invoice maker"], ["create invoice", "client bill", "freelance invoice"], ["gst-calculator", "signature-maker", "qr-code-generator"]),
  t("signature-maker", "Signature Maker", "Create", "Draw a signature on canvas and download it as PNG.", "signature", false, ["signature maker", "draw signature", "signature png", "sign document"], ["signature generator"], ["make signature", "download signature", "transparent signature"], ["invoice-generator", "qr-code-generator"]),
  t("brat-generator", "Brat Generator", "Create", "Make a brat-style text meme with custom colors or transparent background.", "brat", false, ["brat generator", "brat meme", "brat text", "green meme", "charli meme"], ["brat maker", "brat album meme"], ["make brat meme", "transparent brat text", "gen z meme"], ["qr-code-generator", "signature-maker", "image-converter"]),
  t("notes-pad", "Notes Pad", "Productivity", "Write searchable notes saved only in this browser.", "notes", false, ["notes pad", "notepad", "local notes", "quick notes"], ["notes"], ["write notes", "save note", "quick note"], ["todo-list", "markdown-to-pdf"]),
  t("todo-list", "To-Do List", "Productivity", "Track local tasks with all, active, and completed filters.", "todo", false, ["todo list", "tasks", "checklist", "to do"], ["task list"], ["add tasks", "track todos", "make checklist"], ["notes-pad", "date-difference"])
  ,t("json-formatter", "JSON Formatter", "Developer", "Pretty-print, minify, and validate JSON locally.", "json", false, ["json formatter", "json validator", "pretty json", "minify json"], ["json beautifier"], ["format json", "validate json"], ["base64-codec", "url-codec", "json-csv"])
  ,t("base64-codec", "Base64 Encode/Decode", "Developer", "Encode and decode Base64 text in your browser.", "base64", false, ["base64", "base64 encode", "base64 decode"], ["base64 encoder"], ["encode base64", "decode base64"], ["url-codec", "json-formatter"])
  ,t("url-codec", "URL Encode/Decode", "Developer", "Escape and unescape URLs or query strings.", "url", false, ["url encode", "url decode", "uri encode", "uri decode"], ["url encoder"], ["escape url", "unescape url"], ["base64-codec", "json-formatter"])
  ,t("uuid-generator", "UUID Generator", "Developer", "Generate random UUIDs locally.", "uuid", false, ["uuid generator", "guid generator", "random uuid"], ["uuid"], ["create uuid", "generate guid"], ["password-generator", "file-hash-generator"])
  ,t("regex-tester", "Regex Tester", "Developer", "Test regular expressions against sample text.", "regex", false, ["regex tester", "regular expression", "match regex"], ["regexp tester"], ["test regex", "find matches"], ["json-formatter", "diff-checker"])
  ,t("color-tools", "Color Picker & Contrast", "Developer", "Pick colors and check WCAG contrast ratios.", "color", false, ["color picker", "contrast checker", "wcag contrast"], ["color contrast"], ["check contrast", "pick color"], ["css-gradient-generator", "favicon-generator"])
  ,t("css-gradient-generator", "CSS Gradient Generator", "Developer", "Create simple CSS gradients visually.", "gradient", false, ["gradient generator", "css gradient", "background gradient"], ["gradient maker"], ["make gradient", "css background"], ["color-tools"])
  ,t("markdown-to-html", "Markdown to HTML", "Developer", "Convert Markdown into clean HTML.", "html", false, ["markdown to html", "md to html", "convert markdown html"], ["markdown html"], ["make html from markdown"], ["markdown-to-pdf", "json-formatter"])
  ,t("json-csv", "JSON ↔ CSV Converter", "Developer", "Convert simple JSON arrays and CSV data locally.", "table", false, ["json to csv", "csv to json", "convert csv", "convert json"], ["csv converter"], ["make csv", "parse csv"], ["json-formatter"])
  ,t("diff-checker", "Diff Checker", "Developer", "Compare two text blocks side by side.", "diff", false, ["diff checker", "compare text", "text diff"], ["diff tool"], ["find difference", "compare strings"], ["regex-tester", "text-cleaner"])
  ,t("password-generator", "Password Generator", "Privacy", "Generate strong random passwords locally.", "password", false, ["password generator", "strong password", "random password"], ["password maker"], ["generate password"], ["password-strength", "uuid-generator"])
  ,t("password-strength", "Password Strength Checker", "Privacy", "Check password strength without sending it anywhere.", "shield", false, ["password strength", "password checker", "check password"], ["strength checker"], ["is password strong"], ["password-generator"])
  ,t("file-hash-generator", "File Hash Generator", "Privacy", "Generate SHA-256 hashes for files locally.", "hash", false, ["file hash", "sha256", "hash generator", "checksum"], ["checksum generator"], ["hash file", "sha hash"], ["uuid-generator", "password-generator"])
  ,t("unit-converter", "Unit Converter", "Calculate", "Convert length, weight, temperature, and speed.", "unit", false, ["unit converter", "length converter", "weight converter", "temperature converter"], ["convert units"], ["convert kg to lb", "convert celsius"], ["percentage-calculator", "bmi-calculator"])
  ,t("bmi-calculator", "BMI Calculator", "Calculate", "Calculate body mass index from height and weight.", "bmi", false, ["bmi calculator", "body mass index", "health calculator"], ["bmi"], ["calculate bmi"], ["unit-converter", "percentage-calculator"])
  ,t("emi-calculator", "Loan / EMI Calculator", "Calculate", "Estimate monthly loan payments.", "loan", false, ["emi calculator", "loan calculator", "monthly payment"], ["loan emi"], ["calculate emi", "loan payment"], ["percentage-calculator", "gst-calculator"])
  ,t("pomodoro-timer", "Pomodoro Timer", "Productivity", "Run simple focus and break sessions.", "timer", false, ["pomodoro timer", "focus timer", "25 5 timer"], ["pomodoro"], ["start focus timer"], ["stopwatch-countdown", "todo-list"])
  ,t("stopwatch-countdown", "Stopwatch & Countdown", "Productivity", "Track elapsed time or count down locally.", "stopwatch", false, ["stopwatch", "countdown", "timer"], ["countdown timer"], ["track time", "start stopwatch"], ["pomodoro-timer"])
  ,t("favicon-generator", "Favicon Generator", "Create", "Generate simple favicon PNGs from text and colors.", "favicon", false, ["favicon generator", "site icon", "app icon"], ["favicon maker"], ["make favicon", "generate icon"], ["color-tools", "brat-generator"])
];

export const categories: ToolCategory[] = ["PDF", "Image", "Text", "Calculate", "Create", "Productivity", "Developer", "Privacy"];

export const categoryCopy: Record<ToolCategory, string> = {
  PDF: "Fix, combine, and create PDFs without the upload drama.",
  Image: "Shrink, resize, and convert images right on your device.",
  Text: "Clean, count, and reshape messy text fast.",
  Calculate: "Quick math for money, dates, age, and percentages.",
  Create: "Make useful things you can download, print, or share.",
  Productivity: "Small local helpers for notes and tasks.",
  Developer: "Format, convert, inspect, and debug without leaving the browser.",
  Privacy: "Generate and inspect sensitive data locally."
};

export const categoryLongCopy: Record<ToolCategory, string> = {
  PDF:
    "Use Toolzi PDF tools to merge, split, create, and convert PDF files directly in your browser. Local processing means your documents stay on your device instead of being uploaded to a third-party server.",
  Image:
    "Compress, resize, convert, and clean up images with browser-based image tools. Toolzi keeps your images local, which is useful for private photos, work assets, and fast one-off edits.",
  Text:
    "Toolzi text tools help you count, clean, and reshape copied text without extra software. Because everything runs in the browser, drafts, notes, and pasted content stay on your device.",
  Calculate:
    "Use quick calculators for GST, percentages, age, dates, BMI, units, and loan payments. These tools run instantly in your browser and do not require accounts or server-side processing.",
  Create:
    "Create QR codes, invoices, signatures, favicons, and simple graphics from your browser. Toolzi keeps the generation process local where possible so your inputs remain private.",
  Productivity:
    "Toolzi productivity tools cover notes, tasks, focus sessions, and timers for everyday work. Your notes and task lists are saved locally in this browser rather than in a cloud account.",
  Developer:
    "Format, convert, encode, inspect, and compare developer data without leaving the browser. Toolzi developer tools are built for quick local checks with no pasted data sent to a server.",
  Privacy:
    "Generate passwords, check password strength, and calculate file hashes with privacy-first browser tools. Sensitive inputs stay local, which is the whole point of this category."
};

export const categoryReasons: Record<ToolCategory, string[]> = {
  PDF: ["Documents stay on your device.", "No account is required for quick PDF fixes.", "Common PDF workflows are grouped in one place."],
  Image: ["Private images are processed locally.", "Common formats and size changes are quick to preview.", "Downloads are ready immediately after processing."],
  Text: ["Pasted text stays in your browser.", "Clean-up tools are fast for repeated writing tasks.", "Counts and conversions update without upload delays."],
  Calculate: ["Calculations run instantly in the browser.", "Everyday formulas are available without spreadsheets.", "Inputs are not stored on a server."],
  Create: ["Generated assets are ready to download.", "Useful formats are built for sharing and printing.", "Most inputs stay local to your browser."],
  Productivity: ["Notes and tasks stay in this browser.", "Timers and lists work without sign-up.", "Small workflows stay focused and lightweight."],
  Developer: ["Pasted code and data stay local.", "Formatting and conversion tools are available together.", "Quick checks do not need a backend service."],
  Privacy: ["Sensitive values stay on your device.", "Password and hash tools run locally.", "No account or upload is required."]
};

export function getToolById(id: string) {
  return tools.find((tool) => tool.id === id);
}

export function getToolByCategoryAndSlug(category: string, slug: string) {
  return tools.find(
    (tool) => categorySlug(tool.category) === category.toLowerCase() && tool.slug === slug
  );
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => categorySlug(category) === slug.toLowerCase());
}

export function getRelatedTools(ids: string[]) {
  return ids.map(getToolById).filter(Boolean) as Tool[];
}
