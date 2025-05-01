import React from 'react';

import type { FC } from 'react';
import type { ResponsiveProp } from '../../../utils/responsiveProp';
import type { BoxProps } from '../../Box/types';
import type { flexDirection, justifyContent } from '../../Box/useBoxStyles.css';

import cn from 'classnames';

import { Box } from '../../Box/Box';
import * as styles from './GridRow.css';

interface Props {
  className?: string;
  direction?: ResponsiveProp<keyof typeof flexDirection>;
  align?: ResponsiveProp<keyof typeof justifyContent>;
  alignItems?: BoxProps['alignItems'];
  marginTop?: BoxProps['marginTop'];
  marginBottom?: BoxProps['marginBottom'];
  rowGap?: BoxProps['rowGap'];
}

export const GridRow: FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  direction = 'row',
  align,
  alignItems,
  ...props
}) => {
  return (
    <Box
      flexDirection={direction}
      justifyContent={align}
      alignItems={alignItems}
      className={cn(className, styles.gridRow)}
      {...props}
    >
      {children}
    </Box>
  );
};
