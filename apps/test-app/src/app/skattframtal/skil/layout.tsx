import type { ReactNode } from 'react'

import { Box, GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

import { TaxFormStepper } from './components/TaxformStepper'
import * as styles from './layout.css'

export default function TaxFormLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      paddingY={[0, 0, 3, 6]}
      paddingX={[0, 0, 4]}
      background="purple100"
      className={styles.processContainer}
    >
      <GridContainer className={styles.formStepperContainer}>
        <Box marginLeft={[0, 0, 2]}>
          <GridRow align="spaceBetween">
            <GridColumn
              span={['12/12', '12/12', '8/12', '8/12']}
              paddingTop={4}
              order={[1, 1, 0]}
            >
              <Box
                background="white"
                borderColor="white"
                paddingTop={[3, 3, 10, 10]}
                className={styles.processContent}
              >
                <Box paddingX={[3, 3, 3, 6, 14]}>{children}</Box>
              </Box>
            </GridColumn>
            <GridColumn
              span={['12/12', '12/12', '3/12', '3/12']}
              order={[0, 0, 1]}
            >
              <TaxFormStepper />
            </GridColumn>
          </GridRow>
        </Box>
      </GridContainer>
    </Box>
  )
}
