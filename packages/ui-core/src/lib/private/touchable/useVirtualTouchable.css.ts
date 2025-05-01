import { debugTouchable } from './debugTouchable';
import { virtualTouchableRules } from './virtualTouchableRules';

import { style } from '@vanilla-extract/css';

export const virtualTouchable = style({
  position: 'relative',
  ':after': {
    content: '""',
    position: 'absolute',
    left: -10,
    right: -10,
    ...virtualTouchableRules,
  },
  selectors: {
    ...debugTouchable({ after: true }),
  },
});
