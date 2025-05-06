import { Box, Link, Stack, Text } from '@reon-island/ui-core'

const relatedLinks = [
  {
    title: 'Skattur of vöxtum og arði',
    url: 'https://island.is/skattur-af-voxtum-og-ardi',
  },
  {
    title: 'Skattþrep tekjuskatts',
    url: 'https://island.is/skattthrep',
  },
  {
    title: 'Persónuafsláttur',
    url: 'https://island.is/personuafslattur',
  },
  {
    title: 'Ofnýttur persónuafsláttur',
    url: 'https://island.is/ofnyttur-personuafslattur',
  },
]

export const RelatedContent = ({ title }) => {
  return (
    <Box background="purple100" borderRadius="large" padding={[3, 3, 4]}>
      <Stack space={[1, 1, 2]}>
        <Text variant="eyebrow" as="h2">
          {title}
        </Text>
        {relatedLinks.map((link) => (
          <Link key={link.url} href={link.url} underline="normal">
            <Text as="span">{link.title}</Text>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}
