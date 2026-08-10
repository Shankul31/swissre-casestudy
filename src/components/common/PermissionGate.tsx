import type { ReactNode } from 'react';
import type { Permission } from '../../features/auth/authorization';
import { usePermission } from '../../hooks/usePermission';

interface PermissionGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  permission: Permission;
}

export function PermissionGate({ children, fallback = null, permission }: PermissionGateProps) {
  return usePermission(permission) ? children : fallback;
}
