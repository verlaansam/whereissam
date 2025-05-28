import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 flex flex-col items-center inset-x-0 bg-slate-800 text-white text-sm p-4 z-50 shadow-md md:flex md:items-center md:justify-between">
      <p className="mb-2 md:mb-0">
        {t("CookieConsent")}
      </p>
      <button
        onClick={acceptCookies}
        className="text-sm text-white font-roboto-slab border p-2 ml-4 w-3/4 hover:bg-white hover:text-black"
      >
        {t("CookieConsentAccept")}
      </button>
    </div>
  );
}

export default CookieBanner;