import React, { forwardRef } from 'react'

import type { ForwardedRef } from 'react'
import type { LoadingBarRef } from 'react-top-loading-bar'

import LoadingBar from 'react-top-loading-bar'

import { theme } from '@reon-island/ui-theme'

const colorGradiant = `linear-gradient(90deg,
    ${theme.color.blue400} 0%,
    ${theme.color.blue600} 25%,
    ${theme.color.purple400} 50%,
    ${theme.color.roseTinted400} 75%,
    ${theme.color.red400} 100%
  )`

export const PageLoader = forwardRef(
  (_props, ref: ForwardedRef<LoadingBarRef>) => {
    return <LoadingBar color={colorGradiant} ref={ref} />
  },
)
