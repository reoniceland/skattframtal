import { theme } from '@reon-island/ui-theme'

import { style } from '@vanilla-extract/css'

export const withDecorator = style({
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderRight: `1px solid ${theme.color.blue200}`,
    },
  },
})

export const iconPaddingTop = style({
  paddingTop: '3px',
})
