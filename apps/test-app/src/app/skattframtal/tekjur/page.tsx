'use client'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Income() {
  return (
    <StepWrapper buttonLink="/skattframtal/eignir">
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Tekjur
        </Text>
        <Text>Hér geturðu slegið inn upplýsingar um tekjur.</Text>
      </Box>
      <ActionCard
        eyebrow="Laun"
        heading="10.260.000 kr."
        text="Þar af 9.360.000 kr. frá Norðurljós Software ehf. og 900.000 kr. frá Mús & Merki ehf."
      ></ActionCard>
      <ActionCard
        eyebrow="Styrkir, dagpeningar & hlunnindi"
        heading="120.000 kr."
        text="Í formi dagpeninga"
      ></ActionCard>
      <ActionCard
        eyebrow="Lífeyrisgreiðslur og aðrar bætur"
        heading="205.000 kr."
        text="Þar af 75.000 kr. í formi Íþróttastyrks frá Norðurljós Software ehf. og 130.000 kr. í Starfsmenntastyrk frá VR."
      ></ActionCard>
    </StepWrapper>
  )
}
