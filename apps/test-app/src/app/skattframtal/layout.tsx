import type { ReactNode } from 'react'

import { GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

import { TaxFormStepper } from './components/taxform-layout'

export default function TaxFormLayout({ children }: { children: ReactNode }) {
  return (
    <GridContainer>
      <GridRow>
        <GridColumn>
          <TaxFormStepper />
        </GridColumn>
        <GridColumn>{children}</GridColumn>
      </GridRow>
    </GridContainer>
  )
}
