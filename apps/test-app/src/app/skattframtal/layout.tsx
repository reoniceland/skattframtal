import type { ReactNode } from 'react'

import { GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

import { TaxFormStepper } from './components/taxform-layout'

export default function TaxFormLayout({ children }: { children: ReactNode }) {
  return (
    <GridContainer>
      <GridRow align="spaceBetween">
        <GridColumn>
          <TaxFormStepper />
        </GridColumn>
        <GridColumn paddingTop={4}>{children}</GridColumn>
      </GridRow>
    </GridContainer>
  )
}
