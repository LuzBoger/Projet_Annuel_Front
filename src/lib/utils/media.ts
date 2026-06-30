import { API_URL } from "@/constants/global";

export const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.includes("/")) {
    const baseHost = API_URL.endsWith("/api/v1") ? API_URL.slice(0, -7) : API_URL;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseHost}${cleanPath}`;
  }
  return `${API_URL}/lessons/media/images/${path}`;
};

export const getAudioUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.includes("/")) {
    const baseHost = API_URL.endsWith("/api/v1") ? API_URL.slice(0, -7) : API_URL;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseHost}${cleanPath}`;
  }
  return `${API_URL}/lessons/media/audios/${path}`;
};
