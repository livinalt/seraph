import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./components/pages/home/HomePage";
import ScanContent from "./components/pages/home/ScanPage";
import ScamDirectory from "./components/pages/scamDirectory/ScamDirectory";
import ProjectDetails from "./components/pages/scamDirectory/ProjectDetails";

import Terms from "./components/pages/legal/Terms";
import Privacy from "./components/pages/legal/Privacy";
import Disclaimer from "./components/pages/legal/Disclaimer";
import Contact from "./components/pages/legal/Contact";
import CookieBanner from "./components/cookies/CookieBanner.tsx";
import BlogDetails from "./components/pages/blog/BlogDetails.tsx";
import BlogPage from "./components/pages/blog/BlogPage.tsx";

function App() {
  // const handleOpenReport = () => {
  //   console.log("Open report modal");
  // };

  return (
    <>
      <CookieBanner />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        <Route
          path="/scan"
          element={
            <Layout>
              <ScanContent />
            </Layout>
          }
        />

        <Route
          path="/directory"
          element={
            <Layout>
              <ScamDirectory />
            </Layout>
          }
        />

        <Route
          path="/project/:id"
          element={
            <Layout>
              <ProjectDetails />
            </Layout>
          }
        />

        {/* LEGAL */}
        <Route
          path="/terms"
          element={
            <Layout>
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <Privacy />
            </Layout>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <Layout>
              <Disclaimer />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <BlogPage />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout>
              <BlogDetails />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
