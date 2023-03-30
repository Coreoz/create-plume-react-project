import { Toolbar } from '@mui/material';
import React from 'react';
import { ActionButton, ActionsContainer } from '../../../components/theme/action/Actions';
import useMessages from '../../../i18n/hooks/messagesHook';
import { RowSelection } from '../../plume-admin-theme/list/TableProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolverService from '../../plume-messages/MessageResolverService';
import useMessagesResolver from '../../plume-messages/messagesResolveHook';

type Props = {
  rowSelection: RowSelection,
  showUpdateUserPopin: () => void
};

export default class UsersSelectionActions {
  constructor(
    private readonly messageService: PlumeMessageResolverService,
  ) {}

  render = ({ rowSelection, showUpdateUserPopin }: Props) => {
    const messages = useMessagesResolver(this.messageService);

    return (<>
      {Object.values(rowSelection).length > 0
        && <Toolbar>
          <div>
            {
              `
              ${Object.values(rowSelection).length} 
              ${messages.t('selected', (Object.values(rowSelection).length).toString())}
              `
            }
          </div>
          <ActionsContainer>
            {Object.values(rowSelection).length === 1 && (
              <ActionButton variant="text" onClick={showUpdateUserPopin}>
                {messages.t('action.update')}
              </ActionButton>
            )}
          </ActionsContainer>
        </Toolbar>
      }
    </>
    );
  };
}
