import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  path?: string;
}

const SITE_NAME = "Walter Zannoni — Web & AI Developer";
const BASE_URL = "https://walterzannoni.dev";
const DEFAULT_DESC = "Sviluppatore web e specialista AI. Trasformo idee in prodotti digitali: siti, web app, database e soluzioni basate sull'intelligenza artificiale.";

export function SEO({ title, description = DEFAULT_DESC, ogImage = "/projects/logo.png", ogType = "website", path = "" }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />
    </Helmet>
  );
}
