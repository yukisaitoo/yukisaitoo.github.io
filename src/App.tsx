import { Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import Providers from "./components/Providers.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Providers>
  );
}
