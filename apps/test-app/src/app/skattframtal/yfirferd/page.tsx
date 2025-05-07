'use client'

import { Box, CategoryCard, Icon, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Income() {
  return (
    <StepWrapper buttonLink="/mottekid" buttonText="Senda framtal">
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Förum yfir þetta saman
        </Text>
        <Text>Hér er einhver texti</Text>
      </Box>
      <CategoryCard
        heading="Jökull"
        text="120389-4569
        Bláfjallagata 12, 105 Reykjavík"
      />
      <CategoryCard
        icon={
          <Icon
            icon="wallet"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Tekjur"
        text="Heildartekjur þínar árið 2024 voru 10.585.000 kr., þar af 10.260.000 kr. í laun."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
      <CategoryCard
        icon={
          <Icon
            icon="home"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Eignir"
        text="Heildareignir þínar í lok árs 2024 voru 55.530.000 kr., þar af 1 fasteign og 2 bifreiðar."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
      <CategoryCard
        icon={
          <Icon
            icon="hammer"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Skuldir"
        text="Heildarskuldir þínar í lok árs 2024 voru 29.801.594 kr."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
    </StepWrapper>
  )
}
