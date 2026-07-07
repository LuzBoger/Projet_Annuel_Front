import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SITE_URL } from '@/constants/home';
import { FAQItem } from '@/types/components/home';
export function SchemaOrg() {
    const { t } = useTranslation()

    const organization = {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Skaldly",
        "url": SITE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/skaldly.svg`,
            "width": 200,
            "height": 60
        }
    }

    const website = {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "Skaldly",
        "description": t('home.page_description'),
        "inLanguage": ["fr-FR", "en-US"],
        "publisher": { "@id": `${SITE_URL}/#organization` }
    }

    const softwareApplication = {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        "name": "Skaldly",
        "url": SITE_URL,
        "description": t('home.page_description'),
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "publisher": { "@id": `${SITE_URL}/#organization` }
    }

    const faqItems = (t('home.faq.items', { returnObjects: true }) as FAQItem[])
    const faqPage = {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    }

    const schema = {
        "@context": "https://schema.org",
        "@graph": [organization, website, softwareApplication, faqPage]
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    )
}
