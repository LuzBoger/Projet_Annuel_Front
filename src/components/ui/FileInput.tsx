
interface FileInputProps {
    accept?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileInput({ accept = 'image/jpeg,image/png,image/webp', onChange, ref }: FileInputProps & { ref?: React.Ref<HTMLInputElement> }) {
    return (
        <input
            ref={ref}
            type="file"
            accept={accept}
            onChange={onChange}
            className="hidden"
        />
    );
}
