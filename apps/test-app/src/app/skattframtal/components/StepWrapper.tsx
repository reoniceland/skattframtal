import type { ReactNode } from 'react'

import { Box, Button, Link, Stack } from '@reon-island/ui-core'

interface StepWrapperProps {
  buttonLink: string
  buttonText?: string
  children: ReactNode
}

export const StepWrapper = ({
  buttonLink,
  buttonText = 'Halda áfram',
  children,
}: StepWrapperProps) => {
  return (
    <Box paddingBottom={4}>
      <Box>
        <Stack space={4}>
          {children}
          <Box display="flex" justifyContent="flexEnd">
            <Link href={buttonLink}>
              <Button icon="arrowForward" variant="primary">
                {buttonText}
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
