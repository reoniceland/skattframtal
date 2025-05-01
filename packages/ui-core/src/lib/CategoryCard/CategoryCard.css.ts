import { themeUtils } from '@reon-island/ui-theme';

import { globalStyle, style } from '@vanilla-extract/css';

export const imageContainerHidden = style({
  display: 'none',
  ...themeUtils.responsiveStyle({
    sm: {
      display: 'flex',
    },
  }),
});

export const image = style({
  width: 60,
  height: 60,
});

export const icon = style({
  minWidth: 30,
  width: 40,
  height: 40,
  ...themeUtils.responsiveStyle({
    md: {
      minWidth: 40,
    },
  }),
});

globalStyle(`${icon} svg`, {
  height: '100%',
});
