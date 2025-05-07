'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '../../../components/FormWrapper/FormWrapper'

const AllowanceSchema = z.object({
  amount: z.string().min(1, 'Fjárhæð er nauðsynleg'),
})

const FormSchema = z.object({
  allowance: z
    .array(AllowanceSchema)
    .min(1, 'Þú verður að skrá a.m.k. einn styrk'),
})

type FormData = z.infer<typeof FormSchema>

export default function AllowancePage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      allowance: [
        {
          amount: '120.000 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'allowance',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/tekjur')
  }

  return (
    <FormWrapper
      title="Styrkir, dagpeningar og hlunnindi"
      description="Hér geturðu breytt eða bætt við styrkjum, dagpeningum og hlunnindum."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({ amount: '' })
      }}
      addItemText="Skrá laun"
      addItemHeading="Vantar einhver laun hingað inn?"
    >
      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{`Styrkur ${idx + 1}`}</Text>
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

          <Box marginTop={4}>
            <Input
              label="Fjárhæð"
              placeholder="t.d. 250.000 kr."
              defaultValue={field.amount}
              {...register(`allowance.${idx}.amount` as const)}
              hasError={!!errors.allowance?.[idx]?.amount}
              errorMessage={errors.allowance?.[idx]?.amount?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
