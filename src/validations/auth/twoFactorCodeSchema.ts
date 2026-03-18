import { TWO_FACTOR_CODE_PATTERN } from '@/constants/global';
import * as yup from 'yup';

export const twoFactorCodeSchema = (t: (key:string) => string) =>   
    yup.object({
        code: yup.string().required(t('validation.code.required')).length(6, t('validation.code.length')).matches(TWO_FACTOR_CODE_PATTERN, t('validation.code.digits')),
    });

export type TwoFactorCodeFormData = yup.InferType<ReturnType<typeof twoFactorCodeSchema>>;