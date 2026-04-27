import { USERNAME_PATTERN } from '@/constants/global';
import * as yup from 'yup';

export const profileSchema =(t: (key:string) => string) => yup.object({
  username: yup.string().optional().min(3, t('settings.profile.usernameTooShort')).max(50, t('settings.profile.usernameTooLong')).matches(USERNAME_PATTERN, t('settings.profile.usernameInvalid')).defined(),
  bio: yup.string().optional().max(500, t('settings.profile.bioTooLong')).defined(),
  countryCode: yup.string().optional().defined(),
  timezone: yup.string().optional().defined(),
  isPublic: yup.boolean().optional().defined(),
});
export type ProfileFormData = yup.InferType<ReturnType<typeof profileSchema>>;
