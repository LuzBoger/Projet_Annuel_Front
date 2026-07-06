import { USERNAME_PATTERN } from '@/constants/global';
import * as yup from 'yup';

export const profileSchema =(t: (key:string) => string) => yup.object({
  username: yup
    .string()
    .trim()
    .required(t('settings.profile.usernameRequired'))
    .min(3, t('settings.profile.usernameTooShort'))
    .max(50, t('settings.profile.usernameTooLong'))
    .matches(USERNAME_PATTERN, t('settings.profile.usernameInvalid'))
    .defined(),
  bio: yup
    .string()
    .max(500, t('settings.profile.bioTooLong'))
    .optional()
    .defined(),
  countryCode: yup
    .string()
    .required(t('settings.profile.countryCodeRequired'))
    .defined(),
  timezone: yup
    .string()
    .required(t('settings.profile.timezoneRequired'))
    .defined(),
  isPublic: yup.boolean().optional().defined(),
});
export type ProfileFormData = yup.InferType<ReturnType<typeof profileSchema>>;
