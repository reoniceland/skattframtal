'use client'

import { ActionCard, Box, Stack, Text } from '@reon-island/ui-core'

import { PageLayout } from '../components/PageLayout/PageLayout'

export default function Received() {
  return (
    <PageLayout>
      <Stack space={4}>
        <Box>
          <Text variant="h2" paddingBottom={2}>
            Framtal móttekið!
          </Text>
          <Text>Takk fyrir texti.</Text>
        </Box>
        <ActionCard
          date="14/03/2025"
          heading="Skattframtal 2025"
          text="Við sendum þér póst þegar framtalið þitt hefur lokið yfirferð og loka útreikningar tilbúnir"
          tag={{ label: 'Skilað' }}
          backgroundColor="blue"
        ></ActionCard>
      </Stack>
    </PageLayout>
  )
}
