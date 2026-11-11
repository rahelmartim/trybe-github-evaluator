import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ErrorPage } from "./pages/ErrorPage";
import { EvaluationPage } from "./pages/EvaluationPage";
import { HomePage } from "./pages/HomePage";
import { TeaPage } from "./pages/TeaPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="evaluation/:username" element={<EvaluationPage />} />
        <Route path="aval/:username" element={<EvaluationPage />} />
        <Route path="aval" element={<Navigate to="/" replace />} />
        <Route path="tea" element={<TeaPage />} />
        <Route path="418" element={<TeaPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
