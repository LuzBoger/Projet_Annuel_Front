import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FAQItem } from '@/types/components/home'

export function FAQ() {
    const { t } = useTranslation()
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const items = t('home.faq.items', { returnObjects: true }) as FAQItem[]

    return (
        <section id="faq" className="bg-gray-50 dark:bg-gray-950 py-20 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
                    {t('home.faq.title')}
                </h2>
                <div className="space-y-3">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                            <Button
                                variant='none'
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                                />
                            </Button>
                            {openIndex === i && (
                                <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
