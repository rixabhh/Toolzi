import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { HomePage } from "../components/home/HomePage";
import { ToolsIndex } from "../components/home/ToolsIndex";
import { CategoryLandingPage } from "../components/home/CategoryLandingPage";
import { NotFound } from "../components/home/NotFound";
import { ToolRoute } from "./routes";

const categoryRoutes = [
  "pdf",
  "image",
  "text",
  "calculate",
  "create",
  "productivity",
  "developer",
  "privacy"
];

export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<div className="page-loader neu-card"><span className="loader-dot" />Opening the tool...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/:toolId" element={<ToolRoute />} />
          {categoryRoutes.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<CategoryLandingPage slug={slug} />} />
          ))}
          <Route path="/:categorySlug/:toolSlug" element={<ToolRoute />} />
          <Route path="/category/:category" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
