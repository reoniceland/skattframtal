import type { ReactNode } from 'react'

import '@reon-island/ui-core/src/styles/global.css'

import { Box, Footer, GridContainer, Header, Page } from '@reon-island/ui-core'

import { ibmPlexSans } from './fonts/fonts'

export const metadata = {
  title: 'My App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={ibmPlexSans.className}>
      <body className={ibmPlexSans.className}>
        <Page>
          <GridContainer>
            <Box paddingX={[2, 4, 6]}>
              <Header
                info={{
                  title: 'Skatturinn',
                  description: 'Skattframtal',
                }}
              />
            </Box>
            <main>{children}</main>
          </GridContainer>
        </Page>
      </body>
    </html>
  )
}
