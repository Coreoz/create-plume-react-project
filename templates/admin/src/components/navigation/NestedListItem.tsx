import React from 'react';
import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import useToggle from '../../lib/react-hook-toggle/ReactHookToggle';
import { IconType } from '../theme/IconType';

type NestedItemProps = {
  icon?: IconType,
  opened?: boolean,
  label: string,
  drawerOpen: boolean,
  children?: React.ReactNode,
};

function NestedListItem(
  {
    icon, label, opened, children, drawerOpen,
  }: NestedItemProps,
) {
  const [isItemOpened, toggleItemOpening] = useToggle(opened ?? true);

  return (
    <>
      <ListItem
        button
        component="a"
        onClick={toggleItemOpening}
      >
        {
          icon
          && (
            <ListItemIcon>
              <Icon fontSize="large">{icon}</Icon>
            </ListItemIcon>
          )
        }
        {
          drawerOpen
          && (
            <>
              <ListItemText primary={label} />
              {
                isItemOpened
                  ? (
                    <Icon>expand_less</Icon>
                  ) : (
                    <Icon>expand_more</Icon>
                  )
              }
            </>
          )
        }
      </ListItem>
      <Collapse in={drawerOpen && isItemOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="nested-items">
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default (NestedListItem);
