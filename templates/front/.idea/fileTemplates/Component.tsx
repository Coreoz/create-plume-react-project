#set($kebabCase = $NAME.replaceAll("([A-Z])", "-$1").toLowerCase().substring(1))
#set($camelCase = $NAME.substring(0, 1).toLowerCase() + $NAME.substring(1))
#set($NAME_LOWERCASE = $NAME.substring(0,1).toLowerCase() + $NAME.substring(1))
import React from 'react';
import scss from './${kebabCase}.module.scss';

type ${NAME}Props = {
};

export default function ${NAME}(
  {}: ${NAME}Props
) {
  return (
    <div className={scss.${camelCase}}>
    </div>
  );
}
