import apiClient from "@/services/axios";
import { ContactFormRequest } from "@/types/contact/contact";

export const contactService = {
  
    async sendContactMessage(data: ContactFormRequest): Promise<void> {
        await apiClient.post('/contact', data);
    }
};
