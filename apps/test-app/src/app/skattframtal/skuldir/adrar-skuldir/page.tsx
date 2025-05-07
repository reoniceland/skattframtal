'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '../../../components/FormWrapper/FormWrapper'

const OtherDebtSchema = z.object({
  title: z.string().min(1, 'Titill er nauðsynlegur'),
  interest: z.string().min(1, 'Vextir eru nauðsynlegir'),
  outstanding: z.string().min(1, 'Eftirstöðvar eru nauðsynlegar'),
})

const FormSchema = z.object({
  otherDebts: z
    .array(OtherDebtSchema)
    .min(1, 'Þú verður að skrá a.m.k. eina skuld'),
})

type FormData = z.infer<typeof FormSchema>

export default function OtherDebtsPage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otherDebts: [
        {
          title: 'Eftirstöðvar á korti númer: 4469 88XX XXXX 4567',
          interest: '39.200 kr.',
          outstanding: '217.000 kr.',
        },
        {
          title: 'Aukalán',
          interest: '86.000 kr.',
          outstanding: '980.000 kr.',
        },
        {
          title: '0142-26-732645 Varðan',
          interest: '14.500 kr.',
          outstanding: '62.000 kr.',
        },
        {
          title: 'Kílómetragjald, Skatturinn',
          interest: '0 kr.',
          outstanding: '2.370 kr.',
        },
        {
          title: 'Þing- og sveitarsjóðsgjöld, Skatturinn',
          interest: '224 kr.',
          outstanding: '0 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'otherDebts',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/skuldir')
  }

  return (
    <FormWrapper
      title="Aðrar skuldir"
      description="Hér geturðu breytt eða bætt við upplýsingum um aðrar skuldir."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          title: '',
          interest: '',
          outstanding: '',
        })
      }}
      addItemText="Skrá skuld"
      addItemHeading="Vantar einhverjar skuldir hingað inn?"
    >
      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{field.title || `Skuld ${idx + 1}`}</Text>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                remove(idx)
              }}
            >
              Eyða
            </Button>
          </Box>

          <Input
            label="Titill skuldar"
            placeholder="t.d. Yfirdráttur"
            defaultValue={field.title}
            {...register(`otherDebts.${idx}.title` as const)}
            hasError={!!errors.otherDebts?.[idx]?.title}
            errorMessage={errors.otherDebts?.[idx]?.title?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Vextir"
              placeholder="t.d. 12%"
              defaultValue={field.interest}
              {...register(`otherDebts.${idx}.interest` as const)}
              hasError={!!errors.otherDebts?.[idx]?.interest}
              errorMessage={errors.otherDebts?.[idx]?.interest?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Eftirstöðvar"
              placeholder="t.d. 450.000 kr."
              defaultValue={field.outstanding}
              {...register(`otherDebts.${idx}.outstanding` as const)}
              hasError={!!errors.otherDebts?.[idx]?.outstanding}
              errorMessage={errors.otherDebts?.[idx]?.outstanding?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
