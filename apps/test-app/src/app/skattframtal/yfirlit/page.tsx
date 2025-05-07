'use client'

import Link from 'next/link'

import type { IconMapIcon } from '@reon-island/ui-core'

import {
  Box,
  Button,
  CategoryCard,
  Icon,
  Stack,
  Text,
} from '@reon-island/ui-core'

export default function Yfirlit() {
  const handleIcon = (icon: IconMapIcon) => {
    return (
      <Icon icon={icon} size="large" type="outline" color="backgroundBrand" />
    )
  }
  return (
    <Box paddingBottom={4}>
      <Stack space={4}>
        <Text variant="h2">Hæ Jökull</Text>
        <Text variant="default">
          Hér er einhver texti sem útskýrir að þetta sé yfirlitið yfir
          skattamálin þín 2024 sem við ætlum að fara yfir í þessu framtali..
        </Text>

        <CategoryCard
          heading="Jökull"
          text="120389-4569
        Bláfjallagata 12, 105 Reykjavík"
        />
        <CategoryCard
          icon={handleIcon('wallet')}
          heading="Tekjur"
          text="Heildartekjur þínar árið 2024 voru 10.585.000 kr., þar af 10.260.000 kr. í laun."
        />
        <CategoryCard
          icon={handleIcon('home')}
          heading="Eignir"
          text="Heildareignir þínar í lok árs 2024 voru 55.530.000 kr., þar af 1 fasteign og 2 bifreiðar."
        />
        <CategoryCard
          icon={handleIcon('hammer')}
          heading="Skuldir"
          text="Heildarskuldir þínar í lok árs 2024 voru 29.801.594 kr."
        />
        <Box justifyContent="flexEnd" display="flex">
          <Button icon="arrowForward" variant="primary">
            <Link href="/skattframtal/tekjur">Hefja yfirferð</Link>
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
