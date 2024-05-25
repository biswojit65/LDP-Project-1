//array of all possible permissions.
export const ALL_PERMISSION_LIST= [
    "user:role:write",
    "user:role:remove",
    "roles:write",
    "post:write",
    "post:read"
] as const;

//object that maps each permission string to itself
export const PERMISSIONS = ALL_PERMISSION_LIST.reduce((total, permission) => {
    total[permission] = permission;
    return total;
  }, {} as Record<(typeof ALL_PERMISSION_LIST)[number], (typeof ALL_PERMISSION_LIST)[number]>);
  
//array of permissions assigned to a user role
export const USER_ROLE_PERMISSIONS = [
    PERMISSIONS["post:write"],
    PERMISSIONS["post:read"],
];

//defining system roles
export const SYSTEM_ROLES = {
    MAIN_ADMIN: "MAIN_ADMIN",
    APP_USER: "APP_USER",
};