import { ArrayPath, Control, FieldArray, FieldValues, Path, useFieldArray, UseFormRegister } from "react-hook-form";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AddInputProps<T extends FieldValues, Name extends ArrayPath<T>> {
    control: Control<T>;
    register: UseFormRegister<T>;
    name: Name;
    isLoading?: boolean;
    label: string;
    placeholder?: string;
    addLabel: string;
    removeLabel: string;
}

export function AddInput<T extends FieldValues, Name extends ArrayPath<T>>({
    control,
    register,
    name,
    isLoading = false,
    label,
    placeholder,
    addLabel,
    removeLabel,
}: AddInputProps<T, Name>) {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <Input
                            {...register(`${name}.${index}.label` as Path<T>)}
                            placeholder={placeholder}
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button
                            variant="none"
                            type="button"
                            onClick={() => remove(index)}
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-700 p-1"
                            aria-label={removeLabel}
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                variant="none"
                type="button"
                onClick={() => append({ label: "", orderIndex: fields.length } as FieldArray<T, Name>)}
                disabled={isLoading}
                className="mt-2 text-sm text-brand-600 dark:text-brand-400 hover:underline"
            >
                + {addLabel}
            </Button>
        </div>
    );
}
