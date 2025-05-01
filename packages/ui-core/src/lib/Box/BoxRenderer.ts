import type { ReactElement } from 'react';
import type { UseBoxStylesProps } from './useBoxStyles';

import { renderBackgroundProvider } from '../context';
import { useBoxStyles } from './useBoxStyles';

export interface BoxRendererProps extends UseBoxStylesProps {
  children: (className: string) => ReactElement | null;
}

export const BoxRenderer = ({ children, ...props }: BoxRendererProps) => {
  const boxStyles = useBoxStyles(props);
  const element = children(boxStyles);

  return renderBackgroundProvider(props.background, element);
};
