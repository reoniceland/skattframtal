'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

const EmployerSchema = z.object({
  employerName: z.string().min(1, 'Nafn er nauðsynlegt'),
  employerSsn: z
    .string()
    .regex(/^\d{6}-\d{4}$/, 'Kennitala verður að vera á formi 000000-0000'),
  employerAmount: z.string().min(1, 'Fjárhæð er nauðsynleg'),
})

const FormSchema = z.object({
  incomes: z.array(EmployerSchema).min(1, 'Þú verður að skrá a.m.k. eitt laun'),
})

type FormData = z.infer<typeof FormSchema>

export default function LaunPage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      incomes: [
        {
          employerName: 'Norðurljós Software ehf.',
          employerSsn: '000000-0000',
          employerAmount: '9.360.000 kr.',
        },
        {
          employerName: 'Mús & Merki ehf.',
          employerSsn: '000000-0000',
          employerAmount: '900.000 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'incomes',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/tekjur')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box paddingY={4}>
        <Text variant="h2" paddingBottom={2}>
          Laun
        </Text>
        <Text>
          Hér geturðu breytt eða bætt við launum frá hverjum launagreiðanda.
        </Text>
      </Box>

      {fields.map((field, idx) => (
        <Box key={field.id} marginBottom={6} padding={4} borderRadius="md">
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            marginBottom={4}
          >
            <Text variant="h3">{field.employerName || `Laun ${idx + 1}`}</Text>
            <Button variant="ghost" type="button" onClick={() => remove(idx)}>
              Eyða
            </Button>
          </Box>

          <Input
            label="Nafn launagreiðanda"
            placeholder="Sláðu inn nafn"
            defaultValue={field.employerName}
            {...register(`incomes.${idx}.employerName` as const)}
            hasError={!!errors.incomes?.[idx]?.employerName}
            errorMessage={errors.incomes?.[idx]?.employerName?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Kennitala launagreiðanda"
              placeholder="000000-0000"
              defaultValue={field.employerSsn}
              {...register(`incomes.${idx}.employerSsn` as const)}
              hasError={!!errors.incomes?.[idx]?.employerSsn}
              errorMessage={errors.incomes?.[idx]?.employerSsn?.message}
              size="md"
              type="tel"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Launafjárhæð"
              placeholder="t.d. 9.360.000 kr."
              defaultValue={field.employerAmount}
              {...register(`incomes.${idx}.employerAmount` as const)}
              hasError={!!errors.incomes?.[idx]?.employerAmount}
              errorMessage={errors.incomes?.[idx]?.employerAmount?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}

      <Box
        background="blue300"
        padding={4}
        borderRadius="md"
        display="flex"
        justifyContent="spaceBetween"
        alignItems="center"
        marginBottom={6}
      >
        <Text>Vantar einhver laun hingað inn?</Text>
        <Button
          type="button"
          onClick={() =>
            append({
              employerName: '',
              employerSsn: '',
              employerAmount: '',
            })
          }
        >
          Skrá laun
        </Button>
      </Box>

      <Box textAlign="right">
        <Button type="submit">Vista og halda áfram</Button>
      </Box>
    </form>
  )
}
