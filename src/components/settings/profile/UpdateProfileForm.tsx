import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { UserProfileResponse } from "@/types/profile/profile";
import { ProfileFormData, profileSchema } from "@/validations/settings/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateProfileFormProps {
    data: UserProfileResponse;
    onSuccess: () => void;
}

export function UpdateProfileForm({ data, onSuccess }: UpdateProfileFormProps) {
    const {t} = useTranslation();
    const { fetchUser } = useAuth();

    const {register, handleSubmit, reset, formState: { errors, isSubmitting}} = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema(t)),
    })

    useEffect(() => {

        reset({
          username: data.username ?? '',
          bio: data.bio ?? '',
          countryCode: data.countryCode ?? '',
          timezone: data.timezone ?? '',
          isPublic: data.isPublic,
        });
   
    }, [data, reset]);

  const onSubmit = async (data: ProfileFormData) => {
      await profileService.updateProfile(data);
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

          <FormField
            id="countryCode"
            label={t('profile.countryCode')}
            type="text"
            placeholder={t('profile.countryCode_placeholder')}
            disabled={isSubmitting}
            error={errors.countryCode?.message}
            {...register('countryCode')}
          />

          <FormField
            id="timezone"
            label={t('profile.timezone')}
            type="text"
            placeholder={t('profile.timezone_placeholder')}
            disabled={isSubmitting}
            error={errors.timezone?.message}
            {...register('timezone')}
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
