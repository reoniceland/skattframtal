import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { FC, ReactNode } from 'react'

import { theme } from '@reon-island/ui-theme'

import { STICKY_NAV_HEIGHT } from '@/utils/constants'

interface Props {
  children: ReactNode
  top?: number
  constantSticky?: boolean
}

export const Sticky: FC<React.PropsWithChildren<Props>> = ({
  children,
  constantSticky = false,
  top = STICKY_NAV_HEIGHT + (theme.spacing[1] as number),
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [usesSticky, setUsesSticky] = useState<boolean>(constantSticky)

  const onResize = useCallback(() => {
    if (ref.current && !constantSticky) {
      setUsesSticky(
        Boolean(
          ref.current.offsetHeight < window.innerHeight - STICKY_NAV_HEIGHT,
        ),
      )
    }
  }, [ref])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return (
    <aside
      ref={ref}
      style={{
        top,
        zIndex: 1,
        ...(usesSticky && { position: 'sticky' }),
      }}
    >
      {children}
    </aside>
  )
}

export default Sticky
