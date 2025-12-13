import { useState } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(() => {
    // Lazy initializer: runs only on initial render
    return !localStorage.getItem("seraph_cookie_consent");
  });

  const accept = () => {
    localStorage.setItem("seraph_cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-[#131316] border border-white/10 rounded-xl p-5 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
      <p className="text-sm text-gray-400 max-w-xl">
        Seraph uses cookies to improve security, analytics, and ads. By
        continuing, you agree to our Privacy Policy.
      </p>
      <button
        onClick={accept}
        className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieBanner;