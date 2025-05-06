import omit from 'lodash/omit'

import { theme, themeUtils } from '@reon-island/ui-theme'

import { mapToStyleProperty } from '../../utils/mapToStyleProperty'

import { styleVariants } from '@vanilla-extract/css'

// Omitted because 'auto' negative margin doesn't make sense
const spacing = omit(theme.spacing, 'auto')

const negativeMarginLeft = (grid: number, rows: number) => ({
  marginLeft: -(grid * rows),
})

export const xs = styleVariants({
  ...mapToStyleProperty(spacing, 'marginLeft', (rows) =>
    negativeMarginLeft(1, rows),
  ),
})
export const sm = styleVariants(
  mapToStyleProperty({ ...spacing }, 'marginLeft', (rows) =>
    themeUtils.responsiveStyle({ sm: negativeMarginLeft(1, rows) }),
  ),
)
export const md = styleVariants(
  mapToStyleProperty({ ...spacing }, 'marginLeft', (rows) =>
    themeUtils.responsiveStyle({ md: negativeMarginLeft(1, rows) }),
  ),
)
export const lg = styleVariants(
  mapToStyleProperty({ ...spacing }, 'marginLeft', (rows) =>
    themeUtils.responsiveStyle({ lg: negativeMarginLeft(1, rows) }),
  ),
)
export const xl = styleVariants(
  mapToStyleProperty({ ...spacing }, 'marginLeft', (rows) =>
    themeUtils.responsiveStyle({ xl: negativeMarginLeft(1, rows) }),
  ),
)
