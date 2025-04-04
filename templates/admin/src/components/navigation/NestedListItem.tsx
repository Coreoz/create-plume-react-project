import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import useToggle from '@lib/react-hook-toggle/ReactHookToggle';
import { ReactNode } from 'react';
import { IconType } from '../theme/IconType';

import scss from './navigation.module.scss';

type NestedItemProps = {
  icon?: IconType,
  opened?: boolean,
  label: string,
  drawerOpen: boolean,
  children?: ReactNode,
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
        component="a"
        onClick={toggleItemOpening}
      >
        {
          icon
          && (
            <ListItemIcon className={scss.icon}>
              <Icon fontSize="large">{icon}</Icon>
            </ListItemIcon>
          )
        }
        {
          drawerOpen
          && (
            <>
              <ListItemText className={scss.text} primary={label} />
              {
                isItemOpened
                  ? (
                    <Icon>expand_less</Icon>
                  )
                  : (
                    <Icon>expand_more</Icon>
                  )
              }
            </>
          )
        }
      </ListItem>
      <Collapse in={drawerOpen && isItemOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={scss.nestedItems}>
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default (NestedListItem);
