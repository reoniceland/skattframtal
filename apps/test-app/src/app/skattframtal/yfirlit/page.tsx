'use client'

import Link from 'next/link'

import { Button, CategoryCard, Stack } from '@reon-island/ui-core'

export default function Yfirlit() {
  return (
    <Stack space={4}>
      <h1>Hæ Jökull</h1>
      <p>Hér er einhver texti sem útskýrir yfirlitið...</p>

      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />
      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />
      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />
      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />
      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />
      <CategoryCard
        heading="Jökull"
        text="120389-4569Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      />

      <Button>
        <Link href="/tax-form/income">Hefja yfirferð →</Link>
      </Button>
    </Stack>
  )
}
