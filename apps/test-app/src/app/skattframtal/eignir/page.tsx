'use client'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Assets() {
  return (
    <StepWrapper buttonLink="/skattframtal/yfirferd">
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Skuldir
        </Text>
        <Text>Hér geturðu slegið inn upplýsingar um eignir.</Text>
      </Box>
      <ActionCard
        eyebrow="Fasteign"
        heading="Bláfjallagata 12, 105 Reykjavík"
        text="Fasteignamat er 52.000.000 kr. og fastanúmer 210-9876"
      ></ActionCard>
      <ActionCard
        eyebrow="Bifreið"
        heading="Toyota Corolla, KB-521"
        text="Keyptur fyrir 3.100.000 kr. árið 2021"
      ></ActionCard>
      <ActionCard
        eyebrow="Bifreið"
        heading="Skoda 120, JU-329"
        text="Keyptur fyrir 430.000 kr. árið 2012"
      ></ActionCard>
    </StepWrapper>
  )
}
