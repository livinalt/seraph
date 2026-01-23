import Header from "../../Header";
import Hero from "./Hero";
// import TrustBadges from "./TrustBadges";
import TrendingScams from "./TrendingScams";
import BlogSection from "./BlogSection";
// import HowItWorks from "./HowItWorks";
import CTA from "./CTA";
import AdBanner from "../../ads/AdBanner";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero />

        {/* ================= AD ================= */}
        <div className="max-w-7xl mx-auto px-6 my-10">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-400 mb-2">Sponsored</p>
            <AdBanner />
          </div>
        </div>

        {/* <TrustBadges /> */}
        <TrendingScams />
        <BlogSection />
        {/* <HowItWorks /> */}

        {/* Second ad */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                Sponsored
              </p>
              <AdBanner />
            </div>
          </div>
        </section>

        <CTA />
      </main>

    </div>
  );
};

export default HomePage;
