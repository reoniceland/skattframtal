import { theme } from '@reon-island/ui-theme';

import { mapToStyleProperty } from '../../utils/mapToStyleProperty';

import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({ margin: '0 auto' });

export const width = styleVariants(
  mapToStyleProperty(theme.contentWidth, 'maxWidth'),
);
