import { ReactNode } from 'react'

import '@reon-island/ui-core/src/styles/global.css'

import { GridContainer, Header, Page } from '@reon-island/ui-core';

export const metadata = {
  title: 'My App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Page>
          <GridContainer>
            <Header
              info={{
                title: 'Institution name',
                description: 'Application name',
              }}
            />
            <main>{children}</main>
          </GridContainer>
        </Page>
      </body>
    </html>
  )
}
