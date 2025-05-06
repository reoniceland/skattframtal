import type { AllHTMLAttributes, ReactNode } from 'react'
import type { As } from 'reakit-utils/types'
import type { Icon as IconType, Type } from '../IconRC/iconMap'
import type * as styles from './Button.css'

// TODO: refine types, ex. if circle is true there should be no children. and filter variants with conditional types

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>

interface PrimaryButtonType {
  variant?: 'primary'
  colorScheme?: keyof typeof styles.colors.primary
  circle?: boolean
}

interface GhostButtonType {
  variant?: 'ghost'
  colorScheme?: keyof typeof styles.colors.ghost
  circle?: boolean
}

interface TextButtonType {
  variant?: 'text'
  colorScheme?: keyof typeof styles.colors.text
  circle?: never
}

interface UtilityButtonType {
  variant?: 'utility'
  colorScheme?: keyof typeof styles.colors.utility
  circle?: never
}

export type ButtonSizes = Exclude<
  keyof typeof styles.size,
  'utility' | 'textSmall' | 'text'
>

export type ButtonTypes =
  | PrimaryButtonType
  | GhostButtonType
  | TextButtonType
  | UtilityButtonType

export interface ButtonProps {
  id?: NativeButtonProps['id']
  onClick?: NativeButtonProps['onClick']
  onFocus?: NativeButtonProps['onFocus']
  onBlur?: NativeButtonProps['onBlur']
  children?: ReactNode
  size?: ButtonSizes
  disabled?: boolean
  unfocusable?: boolean
  fluid?: boolean
  icon?: IconType
  iconType?: Type
  preTextIcon?: IconType
  preTextIconType?: Type
  type?: NativeButtonProps['type']
  lang?: string
  loading?: boolean
  nowrap?: boolean
  title?: string
  inline?: boolean
  name?: string
  value?: string
  as?: As
  truncate?: boolean
}
