import { Link } from "react-router-dom";
import {  Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LogoSkaldly } from "@/assets/icons";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 text-white hover:text-gray-300 transition-colors">
              <LogoSkaldly className="h-8 w-auto shrink-0" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(to bottom, #4f46e5, #4338ca)" }}
            >
              <Sparkles className="w-4 h-4" />
              {t("footer.cta")}
            </Link>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {t("footer.product")}
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/plans" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.links.plans")}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.links.login")}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.links.register")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {t("footer.support")}
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/contact" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/legal/mentions-legales" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.legalLinks.mentions")}
                </Link>
              </li>
              <li>
                <Link to="/legal/cgu" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.legalLinks.cgu")}
                </Link>
              </li>
              <li>
                <Link to="/legal/cgv" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.legalLinks.cgv")}
                </Link>
              </li>
              <li>
                <Link to="/legal/politique-de-confidentialite" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.legalLinks.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/legal/politique-de-cookies" className="text-sm hover:text-indigo-400 transition-colors">
                  {t("footer.legalLinks.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
