import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useContact } from "@/hooks/useContact";
import type { ContactFormRequest } from "@/types/contact/contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/validations/contact/contactSchema";
import { SUBJECTS } from "@/constants/contact";

export function ContactForm() {
  const { t } = useTranslation();
  const { sendContactMessage, loading } = useContact();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormRequest>({
    resolver: yupResolver(contactSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormRequest) => {
    sendContactMessage(data).then(() => {
      setSuccess(true);
      reset();
    }).catch(() => {});
  };

  return (
    <>
      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {t('contact.form.success')}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="name"
          label={t('contact.form.name')}
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="email"
          label={t('contact.form.email')}
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('contact.form.subject')}
          </label>
          <select
            id="subject"
            {...register("subject")}
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {t(`contact.form.subjects.${s}`)}
              </option>
            ))}
          </select>
          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('contact.form.message')}
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            placeholder={t('contact.form.messagePlaceholder')}
            className="block w-full px-3 py-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={loading}
          isLoading={loading}
        >
          {loading ? t('contact.form.sending') : t('contact.form.send')}
        </Button>
      </form>
    </>
  );
}
