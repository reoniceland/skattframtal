import { CategoryCard, Text } from '@reon-island/ui-core'

export default function Tekjur() {
  return (
    <div>
      <Text variant="h2" paddingBottom={2}>
        Tekjur
      </Text>
      <Text paddingBottom={2}>
        Hér geturðu slegið inn upplýsingar um tekjur.
      </Text>
      <CategoryCard
        heading="Jökull"
        text="120389-4569B Bláfjallagata 12, 105 Reykjavíkjokull. thordarson@email. is772-8391"
      ></CategoryCard>
    </div>
  )
}
