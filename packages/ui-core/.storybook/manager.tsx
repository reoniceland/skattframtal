import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  colorSecondary: '#0061ff',

  fontBase: '"IBM Plex Sans", sans-serif',

  brandTitle: 'Ísland.is UI library',
});

addons.setConfig({ theme });
