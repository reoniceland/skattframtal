import type { ReactNode } from 'react'
import type { LinkColor } from '../Link'

import { Box } from '../../Box/Box'
import { Icon } from '../../Icon/Icon'
import { Text } from '../../Text/Text'
import { Link } from '../Link'
import * as styles from './ArrowLink.css'

interface ArrowLinkProps {
  href?: string
  as?: string
  children?: ReactNode
  color?: LinkColor
  arrowHeight?: number
  onClick?: () => void
}

// ArrowLink has the "arrow" icon and a permanent custom underline.
// If there's not 'href' provided it will render a Box. Useful for when the ArrowLink is inside a clickable card.

export const ArrowLink: React.FC<React.PropsWithChildren<ArrowLinkProps>> = ({
  href,
  as,
  children,
  color = 'blue400',
  arrowHeight = 12,
  onClick,
}: ArrowLinkProps) => (
  <Box
    component={href ? Link : 'div'}
    href={href}
    as={as}
    color={color}
    className={styles.root}
    onClick={onClick}
  >
    <Text variant="eyebrow" color={color}>
      {children}
      <span className={styles.iconWrap}>
        <Icon type="arrowRight" height={arrowHeight} color="currentColor" />
      </span>
    </Text>
  </Box>
)
