import { AvatarIcon } from "@/assets/icons";

interface AvatarProps {
    imageUrl?: string;
    uploading?: boolean;
    size?: string;
}

export function Avatar({ imageUrl, uploading, size = 'w-32 h-32' }: AvatarProps) {
     return (
    <div className="relative">
      <div
        className={`${size} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
            <AvatarIcon />
        )}
      </div>

      {uploading && (
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

