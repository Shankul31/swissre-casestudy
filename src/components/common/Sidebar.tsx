import {
  Box,
  Collapse,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';

import { useState, type ElementType } from 'react';
import type {
  SidebarIconName,
  SidebarItem,
  SidebarItemId,
} from '../../constants/app.constants';

const sidebarIconMap: Record<SidebarIconName, ElementType> = {
  '3d-square': ViewInArOutlinedIcon,
  'discount-shape': SellOutlinedIcon,
  'key-square': KeyOutlinedIcon,
  'message-question': ContactSupportOutlinedIcon,
  'user-square': AccountBoxOutlinedIcon,
  'wallet-money': AccountBalanceWalletOutlinedIcon,
};

interface SidebarProps {
  ariaLabel: string;
  items: readonly SidebarItem[];
  onSelect: (itemId: SidebarItemId) => void;
  selectedItem: SidebarItemId;
}

export function Sidebar({
  ariaLabel,
  items,
  onSelect,
  selectedItem,
}: SidebarProps) {
  const [expandedItemId, setExpandedItemId] = useState<SidebarItemId | null>(
    null
  );

  const toggleMenuItem = (itemId: SidebarItemId) => {
    setExpandedItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId
    );
    onSelect(itemId);
  };

  return (
    <Box
      component="aside"
      sx={{
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        flexShrink: 0,
        width: { xs: '100%', md: 260 },
      }}>
      <Typography
        component="div"
        sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center' }}
        variant="h6">
        <HexagonOutlinedIcon sx={{ mr: 1 }} />
        {items[0]?.label}
      </Typography>
      <List aria-label={ariaLabel} disablePadding>
        {items.map((item) => (
          <Box key={item.id}>
            <ListItemButton
              onClick={() => toggleMenuItem(item.id)}
              selected={selectedItem === item.id}
              sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 38 }}>
                {(() => {
                  const Icon = sidebarIconMap[item.icon];
                  return <Icon fontSize="small" />;
                })()}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {expandedItemId === item.id ? (
                <ExpandMoreIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </ListItemButton>
            <Collapse
              in={expandedItemId === item.id}
              timeout="auto"
              unmountOnExit>
              <List component="div" disablePadding>
                {item.options.map((option) => (
                  <ListItemButton key={option} sx={{ pl: 7 }}>
                    <ListItemText
                      primary={option}
                      slotProps={{ primary: { variant: 'body2' } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
}
