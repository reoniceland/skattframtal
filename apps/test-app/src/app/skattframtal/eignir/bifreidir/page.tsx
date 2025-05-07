'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '../../../components/FormWrapper/FormWrapper'

const CarSchema = z.object({
  number: z.string().min(1, 'Bílnúmer er nauðsynlegt'),
  purchaseYear: z.string().min(1, 'Kaupár er nauðsynlegt'),
  price: z.string().min(1, 'Kaupverð er nauðsynlegt'),
})

const FormSchema = z.object({
  cars: z.array(CarSchema).min(1, 'Þú verður að skrá a.m.k. einn bíl'),
})

type FormData = z.infer<typeof FormSchema>

export default function CarsPage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cars: [
        {
          number: 'AB-123',
          purchaseYear: '2020',
          price: '4.500.000 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'cars',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/eignir')
  }

  return (
    <FormWrapper
      title="Bifreiðir"
      description="Hér geturðu breytt eða bætt við upplýsingum um bifreiðar."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          number: '',
          purchaseYear: '',
          price: '',
        })
      }}
      addItemText="Skrá bifreið"
      addItemHeading="Vantar einhverjar bifreiðar hingað inn?"
    >
      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{field.number || `Bifreið ${idx + 1}`}</Text>
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
            label="Bílnúmer"
            placeholder="t.d. AB-123"
            defaultValue={field.number}
            {...register(`cars.${idx}.number` as const)}
            hasError={!!errors.cars?.[idx]?.number}
            errorMessage={errors.cars?.[idx]?.number?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Kaupár"
              placeholder="t.d. 2020"
              defaultValue={field.purchaseYear}
              {...register(`cars.${idx}.purchaseYear` as const)}
              hasError={!!errors.cars?.[idx]?.purchaseYear}
              errorMessage={errors.cars?.[idx]?.purchaseYear?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Kaupverð"
              placeholder="t.d. 4.500.000 kr."
              defaultValue={field.price}
              {...register(`cars.${idx}.price` as const)}
              hasError={!!errors.cars?.[idx]?.price}
              errorMessage={errors.cars?.[idx]?.price?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
