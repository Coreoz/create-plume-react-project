import PlumeMessageResolver from '@lib/plume-messages/MessageResolver';
import PlumeMessageResolverService from '@lib/plume-messages/MessageResolverService';
import useMessagesResolver from '@lib/plume-messages/messagesResolveHook';
import React from 'react';
import { FilterContainerProps } from '@lib/plume-search/filters/FilterTypes';
import { Icon, Tooltip } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';

import scss from './filter-menu.module.scss';

export default function Filter({
  messageKey,
  info,
  children,
}: Readonly<FilterContainerProps>,
) {
  const messages: PlumeMessageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));
  return (
    <div className={scss.filter}>
      <span className={scss.filterTitle}>
        {messages.t(`filters.${messageKey}.title`)}
        {
          info && (
            <Tooltip title={info} placement="top">
              <Icon>info</Icon>
            </Tooltip>
          )
        }
      </span>
      {children}
    </div>
  );
}
