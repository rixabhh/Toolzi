import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { HomePage } from "../components/home/HomePage";
import { ToolsIndex } from "../components/home/ToolsIndex";
import { ToolRoute } from "./routes";

export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<div className="page-loader neu-card"><span className="loader-dot" />Opening the tool...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/:toolId" element={<ToolRoute />} />
          <Route path="/category/:category" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
