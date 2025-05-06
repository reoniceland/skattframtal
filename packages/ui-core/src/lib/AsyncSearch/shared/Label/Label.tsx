import { forwardRef } from 'react'

import type { LabelHTMLAttributes } from 'react'

import cn from 'classnames'

import * as styles from './Label.css'

export interface LableProps extends LabelHTMLAttributes<HTMLLabelElement> {
  hasError?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LableProps>(
  ({ hasError, color, children, ...props }, ref) => {
    return (
      <label
        {...props}
        ref={ref}
        className={cn(styles.label, {
          [styles.hasError]: hasError,
        })}
      >
        {children}
      </label>
    )
  },
)
