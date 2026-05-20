import { lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToolById } from "../tools/registry";
import { ToolShell } from "../components/tools/ToolShell";

const MarkdownToPDF = lazy(() => import("../tools/pdf/MarkdownToPDF").then((m) => ({ default: m.MarkdownToPDF })));
const MergePDF = lazy(() => import("../tools/pdf/MergePDF").then((m) => ({ default: m.MergePDF })));
const SplitPDF = lazy(() => import("../tools/pdf/SplitPDF").then((m) => ({ default: m.SplitPDF })));
const ImageToPDF = lazy(() => import("../tools/pdf/ImageToPDF").then((m) => ({ default: m.ImageToPDF })));
const ImageCompressor = lazy(() => import("../tools/image/ImageCompressor").then((m) => ({ default: m.ImageCompressor })));
const ImageResizer = lazy(() => import("../tools/image/ImageResizer").then((m) => ({ default: m.ImageResizer })));
const ImageConverter = lazy(() => import("../tools/image/ImageConverter").then((m) => ({ default: m.ImageConverter })));
const BackgroundRemover = lazy(() => import("../tools/image/BackgroundRemover").then((m) => ({ default: m.BackgroundRemover })));
const WordCounter = lazy(() => import("../tools/text/WordCounter").then((m) => ({ default: m.WordCounter })));
const CaseConverter = lazy(() => import("../tools/text/CaseConverter").then((m) => ({ default: m.CaseConverter })));
const TextCleaner = lazy(() => import("../tools/text/TextCleaner").then((m) => ({ default: m.TextCleaner })));
const PercentageCalculator = lazy(() => import("../tools/calculate/PercentageCalculator").then((m) => ({ default: m.PercentageCalculator })));
const GSTCalculator = lazy(() => import("../tools/calculate/GSTCalculator").then((m) => ({ default: m.GSTCalculator })));
const AgeCalculator = lazy(() => import("../tools/calculate/AgeCalculator").then((m) => ({ default: m.AgeCalculator })));
const DateDifference = lazy(() => import("../tools/calculate/DateDifference").then((m) => ({ default: m.DateDifference })));
const QRGenerator = lazy(() => import("../tools/create/QRGenerator").then((m) => ({ default: m.QRGenerator })));
const InvoiceGenerator = lazy(() => import("../tools/create/InvoiceGenerator").then((m) => ({ default: m.InvoiceGenerator })));
const SignatureMaker = lazy(() => import("../tools/create/SignatureMaker").then((m) => ({ default: m.SignatureMaker })));
const BratGenerator = lazy(() => import("../tools/create/BratGenerator").then((m) => ({ default: m.BratGenerator })));
const NotesPad = lazy(() => import("../tools/productivity/NotesPad").then((m) => ({ default: m.NotesPad })));
const TodoList = lazy(() => import("../tools/productivity/TodoList").then((m) => ({ default: m.TodoList })));
const JsonFormatter = lazy(() => import("../tools/developer/JsonFormatter").then((m) => ({ default: m.JsonFormatter })));
const Base64Codec = lazy(() => import("../tools/developer/Base64Codec").then((m) => ({ default: m.Base64Codec })));
const UrlCodec = lazy(() => import("../tools/developer/UrlCodec").then((m) => ({ default: m.UrlCodec })));
const UuidGenerator = lazy(() => import("../tools/developer/UuidGenerator").then((m) => ({ default: m.UuidGenerator })));
const RegexTester = lazy(() => import("../tools/developer/RegexTester").then((m) => ({ default: m.RegexTester })));
const ColorTools = lazy(() => import("../tools/developer/ColorTools").then((m) => ({ default: m.ColorTools })));
const CssGradientGenerator = lazy(() => import("../tools/developer/CssGradientGenerator").then((m) => ({ default: m.CssGradientGenerator })));
const MarkdownToHTML = lazy(() => import("../tools/developer/MarkdownToHTML").then((m) => ({ default: m.MarkdownToHTML })));
const JsonCsv = lazy(() => import("../tools/developer/JsonCsv").then((m) => ({ default: m.JsonCsv })));
const DiffChecker = lazy(() => import("../tools/developer/DiffChecker").then((m) => ({ default: m.DiffChecker })));
const PasswordGenerator = lazy(() => import("../tools/privacy/PasswordGenerator").then((m) => ({ default: m.PasswordGenerator })));
const PasswordStrength = lazy(() => import("../tools/privacy/PasswordStrength").then((m) => ({ default: m.PasswordStrength })));
const FileHashGenerator = lazy(() => import("../tools/privacy/FileHashGenerator").then((m) => ({ default: m.FileHashGenerator })));
const UnitConverter = lazy(() => import("../tools/calculate/UnitConverter").then((m) => ({ default: m.UnitConverter })));
const BMICalculator = lazy(() => import("../tools/calculate/BMICalculator").then((m) => ({ default: m.BMICalculator })));
const EMICalculator = lazy(() => import("../tools/calculate/EMICalculator").then((m) => ({ default: m.EMICalculator })));
const PomodoroTimer = lazy(() => import("../tools/productivity/PomodoroTimer").then((m) => ({ default: m.PomodoroTimer })));
const StopwatchCountdown = lazy(() => import("../tools/productivity/StopwatchCountdown").then((m) => ({ default: m.StopwatchCountdown })));
const FaviconGenerator = lazy(() => import("../tools/create/FaviconGenerator").then((m) => ({ default: m.FaviconGenerator })));

const toolViews: Record<string, React.ComponentType> = {
  "markdown-to-pdf": MarkdownToPDF,
  "merge-pdf": MergePDF,
  "split-pdf": SplitPDF,
  "image-to-pdf": ImageToPDF,
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "image-converter": ImageConverter,
  "background-remover": BackgroundRemover,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "text-cleaner": TextCleaner,
  "percentage-calculator": PercentageCalculator,
  "gst-calculator": GSTCalculator,
  "age-calculator": AgeCalculator,
  "date-difference": DateDifference,
  "qr-code-generator": QRGenerator,
  "invoice-generator": InvoiceGenerator,
  "signature-maker": SignatureMaker,
  "brat-generator": BratGenerator,
  "notes-pad": NotesPad,
  "todo-list": TodoList,
  "json-formatter": JsonFormatter,
  "base64-codec": Base64Codec,
  "url-codec": UrlCodec,
  "uuid-generator": UuidGenerator,
  "regex-tester": RegexTester,
  "color-tools": ColorTools,
  "css-gradient-generator": CssGradientGenerator,
  "markdown-to-html": MarkdownToHTML,
  "json-csv": JsonCsv,
  "diff-checker": DiffChecker,
  "password-generator": PasswordGenerator,
  "password-strength": PasswordStrength,
  "file-hash-generator": FileHashGenerator,
  "unit-converter": UnitConverter,
  "bmi-calculator": BMICalculator,
  "emi-calculator": EMICalculator,
  "pomodoro-timer": PomodoroTimer,
  "stopwatch-countdown": StopwatchCountdown,
  "favicon-generator": FaviconGenerator
};

export function ToolRoute() {
  const { toolId = "" } = useParams();
  const tool = getToolById(toolId);
  const Component = toolViews[toolId];

  useEffect(() => {
    if (tool) document.title = `${tool.name} - Toolzi`;
    return () => {
      document.title = "Toolzi - Tiny browser tools for everyday stuff";
    };
  }, [tool]);

  if (!tool || !Component) {
    return <div className="neu-card empty-state">Couldn&apos;t find that tool yet. Try the search on the homepage.</div>;
  }

  return (
    <ToolShell tool={tool}>
      <Component />
    </ToolShell>
  );
}
