import { DEFAULT_OG_IMAGE, SITE_URL } from '@/constants/home'
import { Locale } from '@/types/components/home'
import { Helmet } from 'react-helmet-async'



interface MetaDataProps {
  title: string
  description?: string
  keywords?: string
  url?: string
  image?: string
  locale?: Locale
  robots: string
}

export const MetaData = ({ title, description, keywords, url, image, locale = 'fr_FR', robots = 'index, follow' }: MetaDataProps) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="robots" content={robots} />

    {url && <link rel="canonical" href={url} />}

    <link rel="alternate" hrefLang="fr" href={SITE_URL} />
    <link rel="alternate" hrefLang="en" href={SITE_URL} />
    <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

    <meta property="og:site_name" content="Skaldly" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={locale} />
    <meta property="og:locale:alternate" content={locale === 'fr_FR' ? 'en_US' : 'fr_FR'} />
    <meta property="og:title" content={`${title} | Skaldly`} />
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
    <meta property="og:image" content={image ?? DEFAULT_OG_IMAGE} />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={title} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | Skaldly`} />
    {description && <meta name="twitter:description" content={description} />}
    <meta name="twitter:image" content={image ?? DEFAULT_OG_IMAGE} />
  </Helmet>
)
