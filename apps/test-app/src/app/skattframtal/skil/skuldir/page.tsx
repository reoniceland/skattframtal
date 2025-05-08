'use client'

import { useRouter } from 'next/navigation'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { StepWrapper } from '../components/StepWrapper'

export default function Income() {
  const router = useRouter()
  return (
    <StepWrapper buttonLink="/skattframtal/skil/yfirferd">
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
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/skil/skuldir/husnaedislan')
          },
        }}
      ></ActionCard>
      <ActionCard
        eyebrow="Aðrar skuldir"
        heading="1.536.000 kr."
        text="Aukalán, Varðan 0142-26-732645, Kílómetragjald, Þing- og sveitarsjóðsgjöld"
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/skil/skuldir/adrar-skuldir')
          },
        }}
      ></ActionCard>
    </StepWrapper>
  )
}
