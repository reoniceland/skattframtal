// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore make web strict

import type { GroupBase, Props } from 'react-select';
import type { Option as OptionType } from '../Select/Select.types';

type PropsFromSelectProps<Value> = Pick<
  Props<OptionType<Value>, false, GroupBase<OptionType<Value>>>,
  | 'name'
  | 'options'
  | 'id'
  | 'isDisabled'
  | 'onChange'
  | 'value'
  | 'placeholder'
  | 'defaultValue'
  | 'isSearchable'
  | 'isClearable'
> & {
  size?: string;
  isCreatable?: boolean;
  backgroundColor?: string;
  ariaError?: string;
  dataTestId?: string;
};

export type CountryCodeSelectProps = PropsFromSelectProps<string> & {
  inputHasFocus?: boolean;
  inputHasLabel?: boolean;
  onFocus?(): void;
  onBlur?(): void;
  onMenuOpen?(): void;
  onMenuClose?(): void;
};
