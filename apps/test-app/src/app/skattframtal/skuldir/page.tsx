'use client'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Income() {
  return (
    <StepWrapper buttonLink="/skattframtal/yfirferd">
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Skuldir
        </Text>
        <Text>Hér geturðu slegið inn upplýsingar um skuldir.</Text>
      </Box>
      <ActionCard
        eyebrow="Húsnæðislán"
        heading="Bláfjallagata 12, 105 Reykjavík"
        text="Heildargreiðslur árið 2024 til Íslandsbanki hf. upp á 2.280.000 kr., eftirstöðvar í lok árs voru 28.540.000 kr."
      ></ActionCard>
      <ActionCard
        eyebrow="Aðrar skuldir"
        heading="Aukalán"
        text="Greidd vaxtagjöld árið 2024 voru 39.200 kr., eftirstöðvar í lok árs voru 217.000 kr."
      ></ActionCard>
      <ActionCard
        eyebrow="Aðrar skuldir"
        heading="Varðan, 0142-26-732645"
        text="Greidd vaxtagjöld árið 2024 voru 14.500 kr., eftirstöðvar í lok árs voru 62.000 kr."
      ></ActionCard>
      <ActionCard
        eyebrow="Aðrar skuldir"
        heading="Kílómetragjald, Skatturinn"
        text="Greidd vaxtagjöld árið 2024 voru 0 kr., eftirstöðvar í lok árs voru 2.370 kr."
      ></ActionCard>
      <ActionCard
        eyebrow="Aðrar skuldir"
        heading="Þing- og sveitarsjóðsgjöld, Skatturinn"
        text="Greidd vaxtagjöld árið 2024 voru 224 kr., eftirstöðvar í lok árs voru 0 kr."
      ></ActionCard>
    </StepWrapper>
  )
}
