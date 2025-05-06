import { theme, themeUtils } from '@reon-island/ui-theme'
import { responsiveStyleMap } from '@reon-island/vanilla-extract-utils'

import { style } from '@vanilla-extract/css'

export const container = responsiveStyleMap({
  height: { xs: 80, md: 112 },
})

export const infoContainer = style({
  ...themeUtils.responsiveStyle({
    md: {
      borderLeftWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.color.dark100,
    },
  }),
})

export const infoDescription = style({
  fontWeight: 300,
  lineHeight: 1.5,
  fontSize: 14,
  maxHeight: 40,
  position: 'relative',
  overflow: 'auto',

  ...themeUtils.responsiveStyle({
    md: {
      fontSize: 18,
      maxHeight: 66,
    },
  }),
})

export const userNameContainer = style({
  flex: 1,
  minWidth: 0,
})
