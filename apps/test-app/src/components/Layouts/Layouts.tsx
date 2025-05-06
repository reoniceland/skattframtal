import React from 'react'

import type { ResponsiveSpace } from '@reon-island/ui-core'
import type { ReactNode } from 'react'

import { Box, GridContainer } from '@reon-island/ui-core'

interface SubpageProps {
  main: ReactNode
  details?: ReactNode
  paddingTop?: ResponsiveSpace
  mainPaddingBottom?: ResponsiveSpace
}

export const SubpageLayout = ({
  main,
  details,
  paddingTop,
  mainPaddingBottom,
}: SubpageProps) => {
  return (
    <Box width="full" paddingTop={paddingTop} id="main-content">
      <Box paddingBottom={mainPaddingBottom}>
        <GridContainer>{main}</GridContainer>
      </Box>
      {details && (
        <Box background="blue100" paddingTop={[3, 3, 5]}>
          <GridContainer>{details}</GridContainer>
        </Box>
      )}
    </Box>
  )
}

export default SubpageLayout
