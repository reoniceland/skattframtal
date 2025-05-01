import React from 'react';

import type { theme } from '@reon-island/ui-theme';
import type { TestSupport } from '@reon-island/ui-utils';
import type { AllHTMLAttributes, FC, ReactNode } from 'react';
import type { UseBoxStylesProps } from '../Box/useBoxStyles';
import type { TextProps } from '../Text/Text';

import cn from 'classnames';

import { useBoxStyles } from '../Box/useBoxStyles';
import { getTextStyles } from '../Text/Text';
import * as styles from './Table.css';

interface DataField {
  children?: ReactNode;
  text?: Pick<
    TextProps,
    'variant' | 'color' | 'truncate' | 'fontWeight' | 'lineHeight'
  >;
  box?: Omit<UseBoxStylesProps, 'component'>;
  borderColor?: keyof typeof theme.color;
  align?: 'left' | 'right' | 'center';
  disabled?: boolean;
}

interface Table {
  children?: ReactNode;
  box?: Omit<UseBoxStylesProps, 'component'>;
}

export const Table = ({
  children,
  box,
  ...props
}: Table & Omit<AllHTMLAttributes<HTMLTableElement>, 'className'>) => (
  <div className={useBoxStyles({ component: 'div', overflow: 'auto', ...box })}>
    <table
      className={cn(
        useBoxStyles({
          component: 'table',
          width: 'full',
        }),
        styles.table,
      )}
      {...props}
    >
      {children}
    </table>
  </div>
);

interface HeadProps {
  sticky?: boolean;
}

export const Head: FC<React.PropsWithChildren<HeadProps>> = ({
  children,
  sticky,
}) => (
  <thead
    {...(sticky && {
      className: styles.stickyHead,
    })}
  >
    {children}
  </thead>
);

export const Body: FC<React.PropsWithChildren> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const Foot: FC<React.PropsWithChildren> = ({ children }) => (
  <tfoot>{children}</tfoot>
);

export const Row: FC<React.PropsWithChildren<TestSupport>> = ({
  children,
  dataTestId,
}) => <tr data-testid={dataTestId}>{children}</tr>;

export const Data = ({
  children,
  text = {},
  box = {},
  borderColor = 'blue200',
  align,
  disabled,
  ...props
}: DataField &
  Omit<AllHTMLAttributes<HTMLTableDataCellElement>, 'className'>) => {
  const classNames = cn(
    styles.cell,
    getTextStyles({
      variant: 'small',
      disabled,
      ...text,
    }),
    useBoxStyles({
      component: 'td',
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 'p5',
      paddingBottom: 'p5',
      borderBottomWidth: 'standard',
      borderColor,
      textAlign: align,
      ...box,
    }),
  );
  return (
    <td className={classNames} {...props}>
      {children}
    </td>
  );
};
export const HeadData = ({
  children,
  text = {},
  box = {},
  align = 'left',
  disabled,
  ...props
}: DataField &
  Omit<AllHTMLAttributes<HTMLTableHeaderCellElement>, 'className'>) => {
  const classNames = cn(
    styles.cell,
    getTextStyles({
      variant: 'h5',
      disabled,
      ...text,
    }),
    useBoxStyles({
      component: 'th',
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 'p2',
      paddingBottom: 'p2',
      borderBottomWidth: 'standard',
      borderColor: 'blue200',
      background: 'blue100',
      textAlign: align,
      ...box,
    }),
  );
  return (
    <th className={classNames} {...props}>
      {children}
    </th>
  );
};
