'use client'

import { useRouter } from 'next/navigation'

import { ActionCard, Box, Stack, Text } from '@reon-island/ui-core'

import { useTaxReturns } from '@/hooks/use-tax-returns'

import { PageLayout } from '../../components/Layouts/PageLayout'

export default function Received() {
  const { taxReturn } = useTaxReturns()
  const router = useRouter()
  return (
    <PageLayout>
      <Stack space={4}>
        <Box>
          <Text variant="h2" paddingBottom={2}>
            Staða framtals
          </Text>
        </Box>
        <ActionCard
          date="14/03/2025"
          heading={`Skattframtal ${taxReturn?.year}`}
          tag={{
            label: taxReturn?.status === 'draft' ? 'Óklárað' : 'Ekki byrjað',
          }}
          backgroundColor="blue"
          cta={{
            label: 'Opna',
            onClick: () => {
              router.push('/skattframtal/skil')
            },
          }}
        ></ActionCard>
      </Stack>
    </PageLayout>
  )
}
