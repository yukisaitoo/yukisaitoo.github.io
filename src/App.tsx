import { ThemeProvider } from "next-themes";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
