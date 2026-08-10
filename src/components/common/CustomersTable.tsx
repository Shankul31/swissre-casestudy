import {
  Box,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Pagination,
} from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { forwardRef, useMemo, useState } from 'react';
import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import {
  CUSTOMER_TABLE_COPY,
  type Customer,
  type CustomerSortOption,
} from '../../constants/app.constants';
import { PERMISSIONS } from '../../features/auth/authorization';
import { usePermission } from '../../hooks/usePermission';
import { useAppSelector } from '../../store/hooks';

interface CustomersTableProps {
  customers: readonly Customer[];
  error: string | null;
  isLoading: boolean;
}

const virtuosoComponents: TableComponents<Customer, unknown> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', minWidth: 1060, tableLayout: 'fixed' }}
    />
  ),
  TableHead,
  TableRow: ({ item, ...props }) => {
    void item;
    return <TableRow hover {...props} />;
  },
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const fixedHeaderCellSx = {
  backgroundColor: 'background.paper',
  fontWeight: 600,
};

const columnCellSx = (width: number) => ({
  maxWidth: width,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width,
});

const columnWidths = {
  actions: 132,
  company: 160,
  country: 140,
  customerName: 180,
  email: 240,
  phoneNumber: 160,
  status: 110,
} as const;

const PAGE_SIZE = 10;

export function CustomersTable({
  customers,
  error,
  isLoading,
}: CustomersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<CustomerSortOption>('newest');

  const canAssignCustomers = usePermission(PERMISSIONS.assignCustomers);
  const canDeleteCustomers = usePermission(PERMISSIONS.deleteCustomers);
  const canEditCustomers = usePermission(PERMISSIONS.editCustomers);
  const canViewCustomerContact = usePermission(PERMISSIONS.viewCustomerContact);
  const currentRole = useAppSelector((state) => state.auth.user?.role);

  const visibleCustomers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredCustomers = customers
      .filter(
        (customer) => currentRole && customer.visibleTo.includes(currentRole)
      )
      .filter((customer) => {
        const searchableValues = [
          customer.customerName,
          customer.company,
          customer.country,
          customer.status,
        ];

        if (canViewCustomerContact) {
          searchableValues.push(customer.phoneNumber, customer.email);
        }

        return searchableValues.some((value) =>
          value.toLowerCase().includes(normalizedSearch)
        );
      });

    return [...filteredCustomers].sort((firstCustomer, secondCustomer) => {
      if (sortOption === 'name') {
        return firstCustomer.customerName.localeCompare(
          secondCustomer.customerName
        );
      }

      return sortOption === 'newest'
        ? secondCustomer.id - firstCustomer.id
        : firstCustomer.id - secondCustomer.id;
    });
  }, [canViewCustomerContact, currentRole, customers, searchTerm, sortOption]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return visibleCustomers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [visibleCustomers, currentPage]);

  const totalPages = Math.ceil(visibleCustomers.length / PAGE_SIZE);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const renderTableHeader = () => (
    <TableRow>
      <TableCell
        sx={{
          ...fixedHeaderCellSx,
          ...columnCellSx(columnWidths.customerName),
        }}>
        {CUSTOMER_TABLE_COPY.columns.customerName}
      </TableCell>
      <TableCell
        sx={{ ...fixedHeaderCellSx, ...columnCellSx(columnWidths.company) }}>
        {CUSTOMER_TABLE_COPY.columns.company}
      </TableCell>
      {canViewCustomerContact && (
        <TableCell
          sx={{
            ...fixedHeaderCellSx,
            ...columnCellSx(columnWidths.phoneNumber),
          }}>
          {CUSTOMER_TABLE_COPY.columns.phoneNumber}
        </TableCell>
      )}
      {canViewCustomerContact && (
        <TableCell
          sx={{ ...fixedHeaderCellSx, ...columnCellSx(columnWidths.email) }}>
          {CUSTOMER_TABLE_COPY.columns.email}
        </TableCell>
      )}
      <TableCell
        sx={{ ...fixedHeaderCellSx, ...columnCellSx(columnWidths.country) }}>
        {CUSTOMER_TABLE_COPY.columns.country}
      </TableCell>
      <TableCell
        sx={{ ...fixedHeaderCellSx, ...columnCellSx(columnWidths.status) }}>
        {CUSTOMER_TABLE_COPY.columns.status}
      </TableCell>
      <TableCell
        sx={{ ...fixedHeaderCellSx, ...columnCellSx(columnWidths.actions) }}>
        {CUSTOMER_TABLE_COPY.actionsColumn}
      </TableCell>
    </TableRow>
  );

  const renderCustomerRow = (_index: number, customer: Customer) => (
    <>
      <TableCell sx={columnCellSx(columnWidths.customerName)}>
        {customer.customerName}
      </TableCell>
      <TableCell sx={columnCellSx(columnWidths.company)}>
        {customer.company}
      </TableCell>
      {canViewCustomerContact && (
        <TableCell sx={columnCellSx(columnWidths.phoneNumber)}>
          {customer.phoneNumber}
        </TableCell>
      )}
      {canViewCustomerContact && (
        <TableCell sx={columnCellSx(columnWidths.email)}>
          {customer.email}
        </TableCell>
      )}
      <TableCell sx={columnCellSx(columnWidths.country)}>
        {customer.country}
      </TableCell>
      <TableCell sx={columnCellSx(columnWidths.status)}>
        <Chip
          color={customer.status === 'Active' ? 'success' : 'default'}
          label={customer.status}
          size="small"
        />
      </TableCell>
      <TableCell sx={columnCellSx(columnWidths.actions)}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={CUSTOMER_TABLE_COPY.editCustomerLabel}>
            <span>
              <IconButton
                aria-label={CUSTOMER_TABLE_COPY.editCustomerLabel}
                disabled={!canEditCustomers}
                size="small">
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={CUSTOMER_TABLE_COPY.deleteCustomerLabel}>
            <span>
              <IconButton
                aria-label={CUSTOMER_TABLE_COPY.deleteCustomerLabel}
                color="error"
                disabled={!canDeleteCustomers}
                size="small">
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={CUSTOMER_TABLE_COPY.assignCustomerLabel}>
            <span>
              <IconButton
                aria-label={CUSTOMER_TABLE_COPY.assignCustomerLabel}
                disabled={!canAssignCustomers}
                size="small">
                <AssignmentIndOutlinedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </TableCell>
    </>
  );

  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', mt: 4 }}>
      <Box
        sx={{
          alignItems: { sm: 'center' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
          p: 3,
        }}>
        <Box>
          <Typography component="h2" variant="h6">
            {CUSTOMER_TABLE_COPY.title}
          </Typography>
          <Typography color="#0000" variant="body2">
            {CUSTOMER_TABLE_COPY.subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}>
          <TextField
            label={CUSTOMER_TABLE_COPY.searchLabel}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            value={searchTerm}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="customer-sort-label">
              {CUSTOMER_TABLE_COPY.sortLabel}
            </InputLabel>
            <Select
              label={CUSTOMER_TABLE_COPY.sortLabel}
              labelId="customer-sort-label"
              onChange={(event) =>
                setSortOption(event.target.value as CustomerSortOption)
              }
              value={sortOption}>
              {Object.entries(CUSTOMER_TABLE_COPY.sortOptions).map(
                ([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'grid', minHeight: 560, placeItems: 'center' }}>
          <CircularProgress aria-label={CUSTOMER_TABLE_COPY.loading} />
        </Box>
      ) : error ? (
        <Box sx={{ p: 3 }}>
          <Typography align="center" color="error">
            {error}
          </Typography>
        </Box>
      ) : visibleCustomers.length > 0 ? (
        <>
          <TableVirtuoso
            components={virtuosoComponents}
            data={paginatedCustomers}
            fixedHeaderContent={renderTableHeader}
            itemContent={renderCustomerRow}
            style={{ height: 560 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              m: 2,
            }}>
            {/* Showing data text */}
            <Typography variant="body2" color="textSecondary">
              Showing{' '}
              {Math.min(
                (currentPage - 1) * PAGE_SIZE + 1,
                visibleCustomers.length
              )}{' '}
              to {Math.min(currentPage * PAGE_SIZE, visibleCustomers.length)} of{' '}
              {visibleCustomers.length} entries
            </Typography>

            {/* Pagination component */}
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography align="center">
            {CUSTOMER_TABLE_COPY.noResults}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
