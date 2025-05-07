import type { ReactNode } from 'react'

import { GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

export default function HeheLayout({ children }: { children: ReactNode }) {
  return (
    <GridContainer>
      <GridRow align="center">
        <GridColumn paddingTop={4}>{children}</GridColumn>
      </GridRow>
    </GridContainer>
  )
}
