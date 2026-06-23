import { CookieRow, PurposeRow } from "@/types/legal/legal";

export const PURPOSE_ROWS = (t: (key: string) => string): PurposeRow[] => [
  {
    purpose: t("legal.privacy.purposes.account_mgmt"),
    legalBasis: t("legal.privacy.purposes.basis_contract"),
  },
  {
    purpose: t("legal.privacy.purposes.payment"),
    legalBasis: t("legal.privacy.purposes.basis_contract"),
  },
  {
    purpose: t("legal.privacy.purposes.social"),
    legalBasis: t("legal.privacy.purposes.basis_contract"),
  },
  {
    purpose: t("legal.privacy.purposes.security"),
    legalBasis: t("legal.privacy.purposes.basis_legitimate"),
  },
  {
    purpose: t("legal.privacy.purposes.contact"),
    legalBasis: t("legal.privacy.purposes.basis_legitimate"),
  },
  {
    purpose: t("legal.privacy.purposes.legal_obligations"),
    legalBasis: t("legal.privacy.purposes.basis_legal"),
  },
];

export const COOKIE_ROWS = (t: (key: string) => string): CookieRow[] => [
  {
    name: "access_token",
    purpose: t("legal.cookies.used.access_token_purpose"),
    duration: t("legal.cookies.used.access_token_duration"),
  },
  {
    name: "refresh_token",
    purpose: t("legal.cookies.used.refresh_token_purpose"),
    duration: t("legal.cookies.used.refresh_token_duration"),
  },
    {
      name: "myAppLocaleCookie",
      purpose: t("legal.cookies.used.locale_purpose"),
      duration: t("legal.cookies.used.locale_duration"),
    },
  ];