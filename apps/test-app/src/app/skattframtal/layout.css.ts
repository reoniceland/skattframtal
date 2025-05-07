import { theme } from '@reon-island/ui-theme'

import { style } from '@vanilla-extract/css'

export const processContainer = style({
  minHeight: 'calc(100vh - 112px)',
})

export const formStepperContainer = style({
  position: 'sticky',
  top: theme.spacing[4],
})

export const processContent = style({
  minHeight: '644px',
  paddingBottom: theme.spacing[5],

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderRadius: theme.border.radius.large,
    },
  },
})
