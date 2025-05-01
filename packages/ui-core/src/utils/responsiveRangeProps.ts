import { theme } from '@reon-island/ui-theme';

type Breakpoint = keyof (typeof theme)['breakpoints'];

const breakpoints = Object.keys(theme.breakpoints);

export interface ResponsiveRangeProps {
  above?: Exclude<Breakpoint, 'xl'>;
  below?: Exclude<Breakpoint, 'xs'>;
}

export const resolveResponsiveRangeProps = (
  props: ResponsiveRangeProps,
): [boolean, boolean, boolean, boolean, boolean] => {
  const { above, below } = props;

  if (!above && !below) {
    return [false, false, false, false, false];
  }

  const startIndex = above ? breakpoints.indexOf(above) + 1 : 0;
  const endIndex = below
    ? breakpoints.indexOf(below) - 1
    : breakpoints.length - 1;
  const range = breakpoints.slice(startIndex, endIndex + 1);

  const includeXs = range.includes('xs');
  const includeSm = range.includes('sm');
  const includeMd = range.includes('md');
  const includeLg = range.includes('lg');
  const includeXl = range.includes('xl');

  return [includeXs, includeSm, includeMd, includeLg, includeXl];
};
