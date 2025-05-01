import { theme } from '@reon-island/ui-theme';

import { style } from '@vanilla-extract/css';

export const label = style({
  position: 'absolute',
  color: theme.color.blue400,
  top: 8,
  left: 8,
  fontWeight: theme.typography.semiBold,
  fontSize: 14,
  lineHeight: 1.142857,
});

export const hasError = style({
  color: `${theme.color.red600} !important`,
});
