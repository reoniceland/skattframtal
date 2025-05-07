import Image from 'next/image'

import type { FC, ReactNode } from 'react'

import { Box, GridColumn, GridContainer, GridRow } from '@reon-island/ui-core'

import * as styles from './AuthFrame.css'

interface AuthFrameProps {
  children: ReactNode
}

export const AuthFrame: FC<React.PropsWithChildren<AuthFrameProps>> = ({
  children,
}) => (
  <div className={styles.authFrame}>
    <Box paddingY={[3, 3, 6, 6]} paddingX={[3, 3, 4, 4]}>
      <Box>{children}</Box>
    </Box>
  </div>
)
