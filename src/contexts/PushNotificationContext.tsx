import { PushNotificationContextType } from "@/types/components/notification";
import { createContext } from "react";

export const PushNotificationContext = createContext<PushNotificationContextType | null>(null); 
