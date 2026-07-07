import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { UserProfileResponse } from "@/types/profile/profile";
import { ProfileFormData, profileSchema } from "@/validations/settings/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { COUNTRY_OPTIONS, TIMEZONE_OPTIONS } from "@/constants/profile";

interface UpdateProfileFormProps {
    data: UserProfileResponse;
    onSuccess: () => void;
}

export function UpdateProfileForm({ data, onSuccess }: UpdateProfileFormProps) {
    const {t} = useTranslation();
    const { fetchUser } = useAuth();

    const {register, handleSubmit, reset, setValue, control, formState: { errors, isSubmitting}} = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema(t)),
    });

    const countryCode = useWatch({ control, name: "countryCode" });
    const timezone = useWatch({ control, name: "timezone" });

    useEffect(() => {
        reset({
          username: data.username ?? '',
          bio: data.bio ?? '',
          countryCode: data.countryCode ?? '',
          timezone: data.timezone ?? '',
          isPublic: data.isPublic,
        });
    }, [data, reset]);

  const onSubmit = async (formData: ProfileFormData) => {
      await profileService.updateProfile(formData);
      await fetchUser();
      onSuccess();
  };



  return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            id="username"
            label={t('profile.username')}
            type="text"
            placeholder={t('profile.username_placeholder')}
            disabled={isSubmitting}
            error={errors.username?.message}
            {...register('username')}
            required
          />

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('profile.bio')}
            </label>
            <TextArea
              id="bio"
              {...register('bio')}
              rows={4}
              disabled={isSubmitting}
              placeholder={t('profile.bio_placeholder')}
              error={errors.bio?.message}
            />
          </div>

          <Select
            id="countryCode"
            label={t('profile.countryCode')}
            placeholder={t('profile.countryCode_placeholder')}
            disabled={isSubmitting}
            value={countryCode}
            options={COUNTRY_OPTIONS}
            onChange={(val) => setValue('countryCode', val)}
            error={errors.countryCode?.message}
            required
          />

          <Select
            id="timezone"
            label={t('profile.timezone')}
            placeholder={t('profile.timezone_placeholder')}
            disabled={isSubmitting}
            value={timezone}
            options={TIMEZONE_OPTIONS}
            onChange={(val) => setValue('timezone', val)}
            error={errors.timezone?.message}
            required
          />

          <div className="flex items-center gap-3">
            <input
              id="isPublic"
              type="checkbox"
              {...register('isPublic')}
              disabled={isSubmitting}
              className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
            />
            <label htmlFor="isPublic" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('profile.isPublic')}
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant="primary"
            size="lg"
          >
            {t('profile.updateButton')}
          </Button>
        </form>
  );

}
