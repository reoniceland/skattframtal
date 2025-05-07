import type { FC, ReactNode } from 'react'

import { Box, GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

interface PageProps {
  children: ReactNode
}

export const PageLayout: FC<React.PropsWithChildren<PageProps>> = ({
  children,
}) => (
  <Box>
    <Box paddingY={[3, 3, 10, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '10/12']}
            offset={['0', '0', '1/12', '1/12']}
          >
            <Box paddingBottom={10}>{children}</Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  </Box>
)
