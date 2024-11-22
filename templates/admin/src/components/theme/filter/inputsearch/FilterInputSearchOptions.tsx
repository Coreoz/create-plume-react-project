import { Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

import scss from './filter-input-search.module.scss';

function FilterInputSearchOptions({ children }: PropsWithChildren<{}>) {
  return (
    <Paper className={scss.filterInputSearchOptions}>
      {children}
    </Paper>
  );
}

export default FilterInputSearchOptions;
