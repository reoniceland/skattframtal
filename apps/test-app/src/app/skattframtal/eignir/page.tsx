'use client'

import { useRouter } from 'next/navigation'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Assets() {
  const router = useRouter()
  return (
    <StepWrapper buttonLink="/skattframtal/skuldir">
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Skuldir
        </Text>
        <Text>Hér geturðu slegið inn upplýsingar um eignir.</Text>
      </Box>
      <ActionCard
        eyebrow="Fasteignir"
        heading="Bláfjallagata 12, 105 Reykjavík"
        text="Fasteignamat er 52.000.000 kr. og fastanúmer 210-9876"
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/eignir/fasteignir')
          },
        }}
      ></ActionCard>
      <ActionCard
        eyebrow="Bifreiðir"
        heading="3.530.000 kr."
        text="Toyota Corolla (KB-521), Skoda 120 (JU-329)"
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/eignir/bifreidir')
          },
        }}
      ></ActionCard>
    </StepWrapper>
  )
}
