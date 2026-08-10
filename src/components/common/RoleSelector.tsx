import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  RBAC_COPY,
  ROLE_OPTIONS,
  ROLE_PERMISSIONS,
  type Role,
} from '../../features/auth/authorization';
import { setAuthenticatedUser } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function RoleSelector() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  const updateRole = (event: SelectChangeEvent<Role>) => {
    const role = event.target.value as Role;

    dispatch(
      setAuthenticatedUser({
        ...user,
        role,
        permissions: [...ROLE_PERMISSIONS[role]],
      }),
    );
  };

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="role-selector-label">{RBAC_COPY.roleSelectorLabel}</InputLabel>
      <Select
        label={RBAC_COPY.roleSelectorLabel}
        labelId="role-selector-label"
        onChange={updateRole}
        value={user.role}
      >
        {ROLE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
