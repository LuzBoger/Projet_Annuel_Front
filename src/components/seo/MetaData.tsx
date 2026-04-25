import { Helmet } from 'react-helmet-async'

interface MetaDataProps {
  title: string
  description?: string
  keywords?: string
  url?: string
  robots: string
}

export const MetaData = ({ title, description, keywords, url, robots = 'index, follow' }: MetaDataProps) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="robots" content={robots} />
    <meta property="og:title" content={`${title} | Skaldly`} />
    <meta name="twitter:title" content={`${title} | Skaldly`} />
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
  </Helmet>
)
