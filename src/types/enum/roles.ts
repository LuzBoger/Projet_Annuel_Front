export const RoleEnum = {
    USER: 'USER',
    ADMIN: 'ADMIN',
} as const;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];
