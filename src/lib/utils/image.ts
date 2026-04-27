import { API_URL } from "@/constants/global";

export const getProfileImageUrl = (photoUrl: string): string => {
    if (!photoUrl){
        return '';
    }

    if (photoUrl.startsWith('http') || photoUrl.startsWith('/api/')) {
      return photoUrl;
    }

    return `${API_URL}/profile/files/${photoUrl}`;
}
