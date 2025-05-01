import { theme } from '@reon-island/ui-theme';

import { style } from '@vanilla-extract/css';

export const tag = style({
  marginLeft: 'auto',
});

export const container = style({
  borderWidth: 1,
  borderColor: theme.color.transparent,
  transition: 'border-color 150ms ease',
  ':hover': {
    borderColor: theme.color.blue400,
  },
});

export const focused = style({
  ':hover': {
    borderColor: theme.color.transparent,
  },
});
