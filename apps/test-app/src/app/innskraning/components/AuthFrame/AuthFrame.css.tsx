import { theme } from '@reon-island/ui-theme'

import { style } from '@vanilla-extract/css'

export const authFrame = style({
  maxWidth: '460px',
  border: 'none',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderWidth: theme.border.width.standard,
      borderStyle: theme.border.style.solid,
      borderColor: theme.color.blue200,
      borderRadius: theme.border.radius.large,
    },
  },
})
