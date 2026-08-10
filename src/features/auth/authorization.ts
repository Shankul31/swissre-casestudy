export const PERMISSIONS = {
  viewDashboard: 'dashboard:view',
  viewProducts: 'products:view',
  viewCustomers: 'customers:view',
  viewCustomerContact: 'customers:view-contact',
  manageCustomers: 'customers:manage',
  editCustomers: 'customers:edit',
  deleteCustomers: 'customers:delete',
  assignCustomers: 'customers:assign',
  viewIncome: 'income:view',
  viewPromotions: 'promotions:view',
  viewHelp: 'help:view',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLES = {
  admin: 'admin',
  manager: 'manager',
  viewer: 'viewer',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_OPTIONS: readonly { label: string; value: Role }[] = [
  { label: 'Admin', value: ROLES.admin },
  { label: 'Manager', value: ROLES.manager },
  { label: 'Viewer', value: ROLES.viewer },
];

export const RBAC_COPY = {
  roleSelectorLabel: 'View as role',
} as const;

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  admin: Object.values(PERMISSIONS),
  manager: [
    PERMISSIONS.viewDashboard,
    PERMISSIONS.viewProducts,
    PERMISSIONS.viewCustomers,
    PERMISSIONS.viewCustomerContact,
    PERMISSIONS.manageCustomers,
    PERMISSIONS.editCustomers,
    PERMISSIONS.assignCustomers,
    PERMISSIONS.viewIncome,
    PERMISSIONS.viewPromotions,
    PERMISSIONS.viewHelp,
  ],
  viewer: [
    PERMISSIONS.viewDashboard,
    PERMISSIONS.viewCustomers,
    PERMISSIONS.viewHelp,
  ],
};

export interface AuthenticatedUser {
  id: string;
  role: Role;
  permissions: Permission[];
}

// Temporary client-only identity. Replace this with the authenticated /me response.
export const DEMO_USER: AuthenticatedUser = {
  id: 'demo-viewer',
  role: ROLES.viewer,
  permissions: [...ROLE_PERMISSIONS.viewer],
};
