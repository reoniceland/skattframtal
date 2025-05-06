/** @deprecated LinkCard has been deprecated in favor of TopicCard */

import React, { ComponentPropsWithRef, forwardRef } from 'react'

import cn from 'classnames'

import { Box } from '../Box/Box'
import { BoxProps } from '../Box/types'
import { useDeprecatedComponent } from '../private/useDeprecatedComponent'
import { Tag } from '../Tag/Tag'
import { TagProps, TagVariant } from '../Tag/types'
import { Text } from '../Text/Text'
import * as styles from './LinkCard.css'

export interface LinkCardProps extends ComponentPropsWithRef<'div'> {
  onClick?: () => void
  background?: BoxProps['background']
  tag?: string
  tagVariant?: TagVariant
  tagProps?: Omit<TagProps, 'children'>
  isFocused?: boolean
}

export const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  (
    {
      onClick,
      children,
      background = 'blue100',
      tag,
      tagVariant = 'darkerBlue',
      tagProps = {
        disabled: true,
        outlined: true,
      },
      isFocused,
    }: LinkCardProps,
    ref,
  ) => {
    useDeprecatedComponent('LinkCard', 'TopicCard')

    return (
      <Box
        background={background}
        borderRadius="large"
        position="relative"
        display="flex"
        onClick={onClick}
        padding={[2, 2, 3]}
        ref={ref}
        width="full"
        className={cn(styles.container, { [styles.focused]: isFocused })}
      >
        <Text variant="h4" as="span" color="blue400">
          {children}
        </Text>
        {tag && (
          <Box className={styles.tag} paddingLeft={2}>
            <Tag variant={tagVariant} {...tagProps}>
              {tag}
            </Tag>
          </Box>
        )}
      </Box>
    )
  },
)
