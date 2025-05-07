'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '../../../../components/FormWrapper'

const RealEstateSchema = z.object({
  identifier: z.string().min(1, 'Fasteignarnúmer er nauðsynlegt'),
  address: z.string().min(1, 'Heimilisfang er nauðsynlegt'),
  appraisal: z.string().min(1, 'Fasteignamat er nauðsynlegt'),
})

const FormSchema = z.object({
  realEstates: z
    .array(RealEstateSchema)
    .min(1, 'Þú verður að skrá a.m.k. eina fasteign'),
})

type FormData = z.infer<typeof FormSchema>

export default function RealEstatePage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      realEstates: [
        {
          identifier: 'F2104529',
          address: 'Háaleitisbraut 123, 108 Reykjavík',
          appraisal: '58.450.000 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'realEstates',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/eignir')
  }

  return (
    <FormWrapper
      title="Fasteignir"
      description="Hér geturðu breytt eða bætt við upplýsingum um fasteignir."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          identifier: '',
          address: '',
          appraisal: '',
        })
      }}
      addItemText="Skrá fasteign"
      addItemHeading="Vantar einhverjar fasteignir hingað inn?"
    >
      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{field.address || `Fasteign ${idx + 1}`}</Text>
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
            label="Fasteignarnúmer"
            placeholder="t.d. F2104529"
            defaultValue={field.identifier}
            {...register(`realEstates.${idx}.identifier` as const)}
            hasError={!!errors.realEstates?.[idx]?.identifier}
            errorMessage={errors.realEstates?.[idx]?.identifier?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Heimilisfang"
              placeholder="Gata 123, Póstnúmer Bær"
              defaultValue={field.address}
              {...register(`realEstates.${idx}.address` as const)}
              hasError={!!errors.realEstates?.[idx]?.address}
              errorMessage={errors.realEstates?.[idx]?.address?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Fasteignamat"
              placeholder="t.d. 58.450.000 kr."
              defaultValue={field.appraisal}
              {...register(`realEstates.${idx}.appraisal` as const)}
              hasError={!!errors.realEstates?.[idx]?.appraisal}
              errorMessage={errors.realEstates?.[idx]?.appraisal?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
