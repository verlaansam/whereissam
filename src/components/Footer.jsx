import { useTranslation } from "react-i18next";

function Footer( {title} ) {
  const { t } = useTranslation();

    return (
      <div className="font-roboto-slab text-gray-200 border-b border-gray-700 flex justify-center  flex-col items-center mb-4 bg-slate-950">
        <h1 >{t("FooterText")}</h1>
        <a href="https://www.samverlaan.com" className="pl-1">{t("FooterAuthor")}</a>
      </div>
      
    )
  }
  
  export default Footer