import type { Permission } from '../features/auth/authorization';
import { useAppSelector } from '../store/hooks';

export function usePermission(permission: Permission) {
  return useAppSelector((state) => state.auth.user?.permissions.includes(permission) ?? false);
}
