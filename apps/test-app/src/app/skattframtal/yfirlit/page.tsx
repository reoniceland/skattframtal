'use client'

import { useEffect } from 'react'

import { CategoryCard, Icon, Text } from '@reon-island/ui-core'

import { useGrants } from '@/hooks/use-grants'
import { useSalaries } from '@/hooks/use-salaries'
import { useTaxReturns } from '@/hooks/use-tax-returns'
import { useUser } from '@/hooks/use-user'

import { StepWrapper } from '../components/StepWrapper'

export default function Overview() {
  const { user } = useUser()
  const { taxReturns } = useTaxReturns()
  const { salaries } = useSalaries()
  const { grants } = useGrants()

  return (
    <StepWrapper buttonLink="/skattframtal/tekjur" buttonText="Hefja yfirferð">
      <Text variant="h2">Hæ {user?.fullName.split(' ')[0]}</Text>
      <Text variant="default">
        Hér er einhver texti sem útskýrir að þetta sé yfirlitið yfir skattamálin
        þín 2024 sem við ætlum að fara yfir í þessu framtali.
      </Text>
      <CategoryCard
        heading={user?.fullName ?? ''}
        text={`${user?.kennitala ?? ''} ${user?.address ?? ''}`}
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
        colorScheme="blue"
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
        colorScheme="blue"
      />
    </StepWrapper>
  )
}
