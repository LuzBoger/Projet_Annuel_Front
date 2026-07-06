import { CODE_REGEX } from '@/constants/global';
import * as yup from 'yup';

export const deleteAccountSchema = (t: (key: string) => string) =>
    yup.object({
        code: yup
            .string()
            .required(t('data.delete.code_required'))
            .length(6, t('data.delete.code_length'))
            .matches(CODE_REGEX, t('data.delete.code_digits')),
    });

export type DeleteAccountFormData = yup.InferType<ReturnType<typeof deleteAccountSchema>>;
