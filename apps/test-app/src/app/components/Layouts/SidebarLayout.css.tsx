import { theme, themeUtils } from '@reon-island/ui-theme'

import {
  STICKY_NAV_HEIGHT,
  STICKY_NAV_MAX_WIDTH_DEFAULT,
  STICKY_NAV_MAX_WIDTH_LG,
} from '@/utils/constants'

import { style } from '@vanilla-extract/css'

const top = (STICKY_NAV_HEIGHT as number) + (theme.spacing[1] as number)

export const sidebarWrapper = style({
  top,
  maxWidth: `${String(STICKY_NAV_MAX_WIDTH_DEFAULT)}px`,
  minWidth: `${String(STICKY_NAV_MAX_WIDTH_DEFAULT)}px`,
  ...themeUtils.responsiveStyle({
    lg: {
      minWidth: `${String(STICKY_NAV_MAX_WIDTH_LG)}px`,
      maxWidth: `${String(STICKY_NAV_MAX_WIDTH_LG)}px`,
    },
  }),
})

export const contentWrapper = style({
  ...themeUtils.responsiveStyle({
    md: {
      maxWidth: `calc(100% - ${String(STICKY_NAV_MAX_WIDTH_DEFAULT)}px)`,
    },
    lg: {
      maxWidth: `calc(100% - ${String(STICKY_NAV_MAX_WIDTH_LG)}px)`,
    },
  }),
})

export const sticky = style({
  position: 'sticky',
  alignSelf: 'flex-start',
})
