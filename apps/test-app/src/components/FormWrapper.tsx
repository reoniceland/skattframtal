import type { ReactNode } from 'react'

import { ActionCard, Box, Button, Text } from '@reon-island/ui-core'

interface FormWrapperProps {
  title: string
  description: string
  children: ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onAddItem?: () => void
  addItemText?: string
  addItemHeading?: string
}

export function FormWrapper({
  title,
  description,
  children,
  onSubmit,
  onAddItem,
  addItemText = 'Bæta við',
  addItemHeading = 'Vantar eitthvað hingað inn?',
}: FormWrapperProps) {
  return (
    <form onSubmit={onSubmit}>
      <Box paddingY={4}>
        <Text variant="h2" paddingBottom={2}>
          {title}
        </Text>
        <Text>{description}</Text>
      </Box>

      {children}

      {onAddItem && (
        <ActionCard
          heading={addItemHeading}
          backgroundColor="blue"
          cta={{
            label: addItemText,
            variant: 'ghost',
            icon: 'add',
            onClick: onAddItem,
          }}
        />
      )}

      <Box display="flex" justifyContent="flexEnd" paddingY={6}>
        <Button type="submit" icon="checkmark">
          Vista
        </Button>
      </Box>
    </form>
  )
}
