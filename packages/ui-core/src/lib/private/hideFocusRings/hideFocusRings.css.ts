import { hideFocusRingsDataAttribute } from './hideFocusRingsDataAttribute'

import { style } from '@vanilla-extract/css'

export const hideFocusRingsClassName = style({
  selectors: {
    [`[${hideFocusRingsDataAttribute}] &`]: {
      opacity: '0 !important',
    },
  },
})
