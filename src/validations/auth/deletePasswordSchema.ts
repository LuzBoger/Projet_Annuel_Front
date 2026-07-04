import * as yup from 'yup';


export const deleteAccountSchema = (t: (key: string) => string) =>
    yup.object({
        password: yup.string().required(t('data.delete.password_required')),
    });

export type DeleteAccountFormData = yup.InferType<ReturnType<typeof deleteAccountSchema>>;

