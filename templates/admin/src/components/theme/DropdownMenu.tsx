import React from 'react';
import { Button, Icon, Menu } from '@mui/material';
import { IconType } from './IconType';

export type DropdownMenuType = {
  icon?: IconType,
  label: string,
  id: string,
  subscribeOnClick?: (onClick: () => void) => void,
  children?: React.ReactNode,
};

/**
 * a hook-ish function used for the {@link DropdownMenu} so that the DropdownMenu knows when an item is clicked.
 * The subscribeOnClick function should be passed to the DropdownMenu
 * whereas wrapOnClick should be used to wrapped the onClick function passed to MenuItem.
 * The click function can be used to tell directly that a click has been performed.
 */
export function useOnClickSubscriber() {
  let onClickSubscriber: () => void;

  return {
    subscribeOnClick: (onClick: () => void) => {
      onClickSubscriber = onClick;
    },
    click: () => { onClickSubscriber(); },
    wrapOnClick: (onClick: () => void) => () => {
      onClickSubscriber();
      onClick();
    },
  };
}

/**
 * A drop down menu.
 * @param id The html ID of the menu (not sure why this is required)
 * @param icon The icon name of the dropdown
 * @param label The text label of the dropdown
 * @param subscribeOnClick Should be provided using {@link useOnClickSubscriber}
if the dropdown menu should collapse when an item is clicked
 * @param children The MenuItem children
 */
export default function DropdownMenu({
  id, icon, label, subscribeOnClick, children,
}: DropdownMenuType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (subscribeOnClick) {
    subscribeOnClick(handleClose);
  }

  return (
    <>
      <Button
        aria-controls={id}
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<Icon>expand_more</Icon>}
      >
        {
          icon
          && (
            <Icon>
              {icon}
            </Icon>
          )
        }
        {label}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
}
