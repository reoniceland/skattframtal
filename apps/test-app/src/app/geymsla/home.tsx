'use client';

import React from 'react';

import {
  Box,
  Breadcrumbs,
  Button,
  GridColumn,
  GridContainer,
  GridRow,
  Stack,
  Text,
} from '@reon-island/ui-core';

export function Home() {
  return (
    <GridContainer>
      <GridRow>
        <GridColumn
          span={['12/12', '12/12', '7/12', '8/12', '9/12']}
          paddingBottom={[2, 2, 4]}
          order={2}
        >
          <Box display={['none', 'none', 'block']} printHidden>
            <Breadcrumbs
              items={[
                {
                  title: 'Ísland.is',
                  typename: 'homepage',
                  href: 'https://www.island.is',
                },
                {
                  title: 'Fjármál og Skattar',
                  href: 'https://island.is/flokkur/fjarmal-og-skattar',
                },
                {
                  title: 'Skattframtal',
                  href: '/skattframtal',
                  isCurrentPage: true,
                  isTag: true,
                },
              ]}
            />
          </Box>
          <Box
            paddingBottom={[2, 2, 4]}
            display={['flex', 'flex', 'none']}
            justifyContent="spaceBetween"
            alignItems="center"
            printHidden
          >
            <Box flexGrow={1} marginRight={6} overflow={'hidden'}>
              <Text truncate>
                <a href="https://island.is/flokkur/fjarmal-og-skattar">
                  <Button
                    preTextIcon="arrowBack"
                    preTextIconType="filled"
                    size="small"
                    type="button"
                    variant="text"
                  >
                    Fjármál og Skattar
                  </Button>
                </a>
              </Text>
            </Box>
          </Box>
          <Text variant="h1" as="h1" paddingBottom={[2, 2, 4]}>
            Skattframtal
          </Text>
          <Text>
            Skattframtal er skjal sem einstaklingar og fyrirtæki senda til
            skattyfirvalda til að skrá tekjur sínar og gjöld. Það er mikilvægt
            skref í skattgreiðslum og hjálpar til við að ákvarða hversu mikið
            fólk þarf að greiða í skatta.
          </Text>
        </GridColumn>
        <Box display={['none', 'none', 'none', 'block']} printHidden>
          <GridColumn
            span={['12/12', '12/12', '5/12', '4/12', '3/12']}
            order={1}
          >
            <Stack space={3}>
              <Box>Sidebar</Box>
            </Stack>
          </GridColumn>
        </Box>
      </GridRow>
    </GridContainer>
  );
}
