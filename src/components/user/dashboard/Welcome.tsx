import { getMessages } from "@/constants/messages";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const randomIndex = Math.floor(Math.random() * 6);

interface WelcomeProps {
     username: string;
}

export function Welcome({ username }: WelcomeProps) {
    const { t } = useTranslation();

    const message = useMemo(() => {
        const messages = getMessages(t);
        const currentHour = new Date().getHours();
        const time = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
        return messages[time][randomIndex % messages[time].length];
    }, [t]);

    return (
        <div className="mb-6">

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {t("dashboard.welcome.greeting")}{" "}
                <span className="italic">{username}.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{message}</p>
        </div>
    )
}