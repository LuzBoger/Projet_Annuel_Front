import { TargetStatus } from "@/types/components/manageUsers";

export type Variant = 'pill-green' | 'pill-yellow' | 'pill-red';

export const STATUS_CONFIG: { value: TargetStatus; labelKey: string; variant: Variant }[] = [
    { value: 'ACTIVE', labelKey: 'active', variant: 'pill-green' },
    { value: 'LOCKED', labelKey: 'locked', variant: 'pill-yellow' },
    { value: 'SUSPENDED', labelKey: 'suspended', variant: 'pill-red' },
];