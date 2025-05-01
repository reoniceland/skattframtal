import React from 'react';

import { withFigma } from '../../utils/withFigma';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { toast, ToastContainer } from './Toast';

export default {
  title: 'Alerts/Toast',
  component: ToastContainer,
  parameters: withFigma('Toast'),
};

const Template = (args) => (
  <div>
    <Box margin={2}>
      <Button onClick={() => toast.success('Success message')} variant="text">
        Trigger success
      </Button>
    </Box>
    <Box margin={2}>
      <Button onClick={() => toast.error('Error message')} variant="text">
        Trigger error
      </Button>
    </Box>
    <Box margin={2}>
      <Button onClick={() => toast.info('Info message')} variant="text">
        Trigger info
      </Button>
    </Box>
    <Box margin={2}>
      <Button onClick={() => toast.warning('Warning message')} variant="text">
        Trigger warning
      </Button>
    </Box>
    <ToastContainer {...args} />
  </div>
);

export const Default = Template.bind({});
