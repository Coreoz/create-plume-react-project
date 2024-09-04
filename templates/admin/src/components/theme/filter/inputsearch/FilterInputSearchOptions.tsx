import { Paper } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import scss from './filter-input-search.module.scss';

function FilterInputSearchOptions({ children }: PropsWithChildren<{}>) {
  return (
    <Paper className={scss.filterInputSearchOptions}>
      {children}
    </Paper>
  );
}

export default FilterInputSearchOptions;
