'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { useGrants } from '@/hooks/use-grants'

import { FormWrapper } from '../../../components/FormWrapper/FormWrapper'

const GrantSchema = z.object({
  company: z.string().min(1, 'Nafn er nauðsynlegt'),
  amount: z.string().min(1, 'Fjárhæð er nauðsynleg'),
})

const FormSchema = z.object({
  sportsGrants: z
    .array(GrantSchema)
    .min(1, 'Þú verður að skrá a.m.k. eina greiðslu'),
})

type FormData = z.infer<typeof FormSchema>

export default function PensionAndBenefitsPage() {
  const router = useRouter()
  const { grants } = useGrants()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sportsGrants: grants,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'sportsGrants',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/tekjur')
  }

  return (
    <FormWrapper
      title="Lífeyrisgreiðslur og aðrar bætur"
      description="Hér geturðu breytt eða bætt við lífeyrisgreiðslum og öðrum bótum."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          company: '',
          amount: '',
        })
      }}
      addItemText="Skrá greiðslu"
      addItemHeading="Vantar einhverjar greiðslur hingað inn?"
    >
      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{field.company || `Greiðsla ${idx + 1}`}</Text>
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
            label="Nafn greiðanda"
            placeholder="Sláðu inn nafn"
            defaultValue={field.company}
            {...register(`sportsGrants.${idx}.company` as const)}
            hasError={!!errors.sportsGrants?.[idx]?.company}
            errorMessage={errors.sportsGrants?.[idx]?.company?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Fjárhæð"
              placeholder="t.d. 50.000 kr."
              defaultValue={field.amount}
              {...register(`sportsGrants.${idx}.amount` as const)}
              hasError={!!errors.sportsGrants?.[idx]?.amount}
              errorMessage={errors.sportsGrants?.[idx]?.amount?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
