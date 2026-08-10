import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MetricCard } from '../components/common/MetricCard';
import { CustomersTable } from '../components/common/CustomersTable';
import { Sidebar } from '../components/common/Sidebar';
import { PermissionGate } from '../components/common/PermissionGate';
import { RoleSelector } from '../components/common/RoleSelector';
import {
  APP_COPY,
  DASHBOARD_METRICS,
  SIDEBAR_ITEMS,
  type SidebarItemId,
} from '../constants/app.constants';
import { PERMISSIONS } from '../features/auth/authorization';
import {
  fetchCustomers,
  selectCustomers,
  selectCustomersError,
  selectCustomersStatus,
} from '../features/customers/customersSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function DashboardContainer() {
  const [selectedItem, setSelectedItem] = useState<SidebarItemId>(
    SIDEBAR_ITEMS[0].id
  );
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const customersError = useAppSelector(selectCustomersError);
  const customersStatus = useAppSelector(selectCustomersStatus);
  const visibleSidebarItems = useAppSelector((state) => {
    const permissions = state.auth.user?.permissions ?? [];
    return SIDEBAR_ITEMS.filter((item) =>
      permissions.includes(item.permission)
    );
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
      }}>
      <Sidebar
        ariaLabel={APP_COPY.navigationLabel}
        items={visibleSidebarItems}
        onSelect={setSelectedItem}
        selectedItem={selectedItem}
      />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
          }}>
          <Typography component="h1" variant="h4">
            {APP_COPY.dashboardHeading}
          </Typography>
          <RoleSelector />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
          {DASHBOARD_METRICS.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </Box>
        <PermissionGate permission={PERMISSIONS.viewCustomers}>
          <CustomersTable
            customers={customers}
            error={customersError}
            isLoading={customersStatus === 'loading'}
          />
        </PermissionGate>
      </Box>
    </Box>
  );
}
