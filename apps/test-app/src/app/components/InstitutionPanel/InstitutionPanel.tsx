'use client'

import React from 'react'

import type { BoxProps, HyphenProps, LinkProps } from '@reon-island/ui-core'

import { Box, Hyphen, LinkV2 as Link, Text } from '@reon-island/ui-core'

interface InstitutionPanelProps {
  img?: string
  institutionTitle: string
  institution: string
  locale: HyphenProps['locale']
  linkProps?: LinkProps
  imgContainerDisplay?: BoxProps['display']
}

export const InstitutionPanel = ({
  img,
  institutionTitle,
  institution,
  locale,
  linkProps,
  imgContainerDisplay,
}: InstitutionPanelProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore make web strict
    <Link {...linkProps}>
      <Box
        background="purple100"
        borderRadius="large"
        padding={[3, 3, 4]}
        display="flex"
        alignItems="center"
      >
        <Box
          display={imgContainerDisplay}
          style={{ flex: '0 0 64px' }}
          marginRight={3}
        >
          <img
            width={64}
            src={img ? img : '/assets/skjaldarmerki.svg'}
            alt=""
          />
        </Box>
        <Box>
          <Text variant="eyebrow" color="purple600">
            {institutionTitle}
          </Text>
          <Text variant="h4" as="h3" color="purple600" lineHeight="sm">
            <Hyphen minRight={5} locale={locale}>
              {institution}
            </Hyphen>
          </Text>
        </Box>
      </Box>
    </Link>
  )
}

export default InstitutionPanel
