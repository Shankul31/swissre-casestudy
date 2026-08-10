import { PERMISSIONS, type Permission, type Role } from '../features/auth/authorization';

export const APP_COPY = {
  dashboardTitle: 'Dashboard',
  unexpectedErrorTitle: 'Something went wrong',
  unexpectedErrorDescription:
    'Please try again. If the problem continues, contact support.',
  tryAgainLabel: 'Try again',
  serverErrorMessage: 'We could not complete your request. Please try again.',
  navigationLabel: 'Main navigation',
  dashboardHeading: 'Dashboard overview',
} as const;

export type SidebarIconName =
  | '3d-square'
  | 'discount-shape'
  | 'key-square'
  | 'message-question'
  | 'user-square'
  | 'wallet-money';

export interface SidebarItem {
  id: string;
  icon: SidebarIconName;
  label: string;
  permission: Permission;
  options: readonly string[];
}

export const SIDEBAR_ITEMS: readonly SidebarItem[] = [
  {
    id: 'dashboard',
    icon: 'key-square',
    label: 'Dashboard',
    options: ['Overview', 'Analytics'],
    permission: PERMISSIONS.viewDashboard,
  },
  {
    id: 'product',
    icon: '3d-square',
    label: 'Product',
    options: ['All Products', 'Categories'],
    permission: PERMISSIONS.viewProducts,
  },
  {
    id: 'customers',
    icon: 'user-square',
    label: 'Customers',
    options: ['All Customers', 'Segments'],
    permission: PERMISSIONS.viewCustomers,
  },
  {
    id: 'income',
    icon: 'wallet-money',
    label: 'Income',
    options: ['Overview', 'Transactions'],
    permission: PERMISSIONS.viewIncome,
  },
  {
    id: 'promote',
    icon: 'discount-shape',
    label: 'Promote',
    options: ['Campaigns', 'Discounts'],
    permission: PERMISSIONS.viewPromotions,
  },
  {
    id: 'help',
    icon: 'message-question',
    label: 'Help',
    options: ['Support', 'Documentation'],
    permission: PERMISSIONS.viewHelp,
  },
];

export type SidebarItemId = string;

export const DASHBOARD_METRICS = [
  { id: 'total-customers', label: 'Total Customers', value: 0 },
  { id: 'members', label: 'Members', value: 0 },
  { id: 'active-now', label: 'Active Now', value: 0 },
] as const;

export const CUSTOMER_TABLE_COPY = {
  title: 'All Customers',
  subtitle: 'Active Members',
  searchLabel: 'Search customers',
  sortLabel: 'Sort by',
  noResults: 'No customers found',
  loading: 'Loading customers',
  addCustomerLabel: 'Add customer',
  editCustomerLabel: 'Edit',
  deleteCustomerLabel: 'Delete',
  assignCustomerLabel: 'Assign',
  actionsColumn: 'Actions',
  virtualizedResultsLabel: 'Virtualized results',
  columns: {
    customerName: 'Customer Name',
    company: 'Company',
    phoneNumber: 'Phone Number',
    email: 'Email',
    country: 'Country',
    status: 'Status',
  },
  sortOptions: {
    newest: 'Newest',
    oldest: 'Oldest',
    name: 'Name A–Z',
  },
} as const;

export type CustomerSortOption = keyof typeof CUSTOMER_TABLE_COPY.sortOptions;

export interface Customer {
  id: number;
  customerName: string;
  company: string;
  phoneNumber: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive';
  visibleTo: Role[];
}

export const STORAGE_KEYS = {
  accessToken: 'accessToken',
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
} as const;
