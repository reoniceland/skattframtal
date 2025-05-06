'use client'

import React, { createContext } from 'react'

import type { ReactElement } from 'react'
import type { CollapsibleAlignmentProps } from '../../utils/collapsibleAlignmentProps'
import type { ResponsiveSpace, Space } from '../Box/useBoxStyles'
import type { ColumnProps } from '../Column/Column'

import { useNegativeMarginLeft } from '../../hooks/useNegativeMargin/useNegativeMargin'
import { resolveCollapsibleAlignmentProps } from '../../utils/collapsibleAlignmentProps'
import { normaliseResponsiveProp } from '../../utils/responsiveProp'
import { Box } from '../Box/Box'

type CollapsibleAlignmentChildProps = ReturnType<
  typeof resolveCollapsibleAlignmentProps
>['collapsibleAlignmentChildProps']

type As = 'div' | 'span'

interface ColumnsContextValue {
  collapseXs: boolean
  collapseSm: boolean
  collapseMd: boolean
  collapseLg: boolean
  xsSpace: Space
  smSpace: Space
  mdSpace: Space
  lgSpace: Space
  xlSpace: Space
  collapsibleAlignmentChildProps: CollapsibleAlignmentChildProps | {}
  as: As
}

export const ColumnsContext = createContext<ColumnsContextValue>({
  collapseXs: false,
  collapseSm: false,
  collapseMd: false,
  collapseLg: false,
  xsSpace: 'none',
  smSpace: 'none',
  mdSpace: 'none',
  lgSpace: 'none',
  xlSpace: 'none',
  collapsibleAlignmentChildProps: {},
  as: 'div',
})

export interface ColumnsProps extends CollapsibleAlignmentProps {
  as?: As
  space?: ResponsiveSpace
  children:
    | (ReactElement<ColumnProps> | null)[]
    | ReactElement<ColumnProps>
    | null
}

/** Provides spacing between *Column*s */
export const Columns = ({
  children,
  as = 'div',
  collapseBelow,
  reverse = false,
  space = 'none',
  align,
  alignY,
}: ColumnsProps) => {
  const [xsSpace, smSpace, mdSpace, lgSpace, xlSpace] =
    normaliseResponsiveProp(space)

  const {
    collapsibleAlignmentProps,
    collapsibleAlignmentChildProps,
    collapseXs,
    collapseSm,
    collapseMd,
    collapseLg,
    orderChildren,
  } = resolveCollapsibleAlignmentProps({
    collapseBelow,
    align,
    alignY,
    reverse,
  })

  const negativeMarginLeft = useNegativeMarginLeft([
    collapseXs ? 'none' : xsSpace,
    collapseSm ? 'none' : smSpace,
    collapseMd ? 'none' : mdSpace,
    collapseLg ? 'none' : lgSpace,
    xlSpace,
  ])

  return (
    <Box
      component={as}
      {...collapsibleAlignmentProps}
      className={negativeMarginLeft}
    >
      <ColumnsContext.Provider
        value={{
          collapseXs,
          collapseSm,
          collapseMd,
          collapseLg,
          xsSpace,
          smSpace,
          mdSpace,
          lgSpace,
          xlSpace,
          collapsibleAlignmentChildProps,
          as,
        }}
      >
        {orderChildren(children)}
      </ColumnsContext.Provider>
    </Box>
  )
}
