'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Breadcrumbs, Button, Text } from '@reon-island/ui-core';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <Box marginBottom={2}>
        <Button
          variant="text"
          size="small"
          preTextIcon="arrowBack"
          onClick={() =>
            router.push('https://island.is/flokkur/fjarmal-og-skattar')
          }
        >
          Fjármál og Skattar
        </Button>
      </Box>
      <Text variant="h1" as="h1">
        Skil á skattframtali
      </Text>
      <Text>
        Skattframtal er skjal sem einstaklingar og fyrirtæki skila til
        skattyfirvalda til að skrá tekjur, gjöld og aðrar fjárhagslegar
        upplýsingar. Skattframtal er mikilvægt til að ákvarða skattaábyrgð og
        tryggja að réttur skattur sé greiddur.
      </Text>
    </>
  );
}
