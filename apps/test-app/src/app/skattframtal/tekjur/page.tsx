'use client'

import { useRouter } from 'next/navigation'

import { ActionCard, Box, Text } from '@reon-island/ui-core'

import { useSalaries } from '@/hooks/use-salaries'
import { formatNumber } from '@/utils/number'

import { StepWrapper } from '../components/StepWrapper'

export default function Income() {
  const router = useRouter()
  const { sumOfSalaries, employerNames } = useSalaries()

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
        heading={`${formatNumber(sumOfSalaries ?? 0)} kr.`}
        text={employerNames}
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/tekjur/laun')
          },
        }}
      ></ActionCard>
      <ActionCard
        eyebrow="Styrkir, dagpeningar & hlunnindi"
        heading="120.000 kr."
        text="Í formi dagpeninga"
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push('/skattframtal/tekjur/styrkir-dagpeningar-hlunnindi')
          },
        }}
      ></ActionCard>
      <ActionCard
        eyebrow="Lífeyrisgreiðslur og aðrar bætur"
        heading="205.000 kr."
        text="Þar af 75.000 kr. í formi Íþróttastyrks frá Norðurljós Software ehf. og 130.000 kr. í Starfsmenntastyrk frá VR."
        cta={{
          label: 'Breyta',
          variant: 'text',
          icon: 'pencil',
          onClick: () => {
            router.push(
              '/skattframtal/tekjur/lifeyrisgreidslur-og-adrar-baetur',
            )
          },
        }}
      ></ActionCard>
    </StepWrapper>
  )
}
