'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '@/app/components/FormWrapper/FormWrapper'

const mortgageschema = z.object({
  purchaseYear: z.string().min(1, 'Kaupár er nauðsynlegt'),
  propertyLocation: z.string().min(1, 'Staðsetning er nauðsynleg'),
  lender: z.string().min(1, 'Nafn lánveitanda er nauðsynlegt'),
  lenderSsn: z
    .string()
    .regex(/^\d{6}-\d{4}$/, 'Kennitala verður að vera á formi 000000-0000'),
  loanNumber: z.string().min(1, 'Lánsnúmer er nauðsynlegt'),
  loanDate: z.string().min(1, 'Lántökudagur er nauðsynlegur'),
  loanTermYears: z.string().min(1, 'Lánstími er nauðsynlegur'),
  totalAnnualPayments: z.string().min(1, 'Heildargreiðslur er nauðsynlegt'),
  principalPayment: z.string().min(1, 'Afborgun er nauðsynleg'),
  interestPayment: z.string().min(1, 'Vaxtagjöld er nauðsynleg'),
  remainingDebt: z.string().min(1, 'Eftirstöðvar er nauðsynlegt'),
})

const FormSchema = z.object({
  mortgages: z
    .array(mortgageschema)
    .min(1, 'Þú verður að skrá a.m.k. eina fasteign'),
})

type FormData = z.infer<typeof FormSchema>

export default function MortgagePage() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mortgages: [
        {
          purchaseYear: '2021',
          propertyLocation: 'Bláfjallagata 12',
          lender: 'Íslandsbanki hf.',
          lenderSsn: '491008-0160',
          loanNumber: '56783900123',
          loanDate: '15.06.2021',
          loanTermYears: '30',
          totalAnnualPayments: '2.280.000 kr.',
          principalPayment: '1.360.000 kr.',
          interestPayment: '920.000 kr.',
          remainingDebt: '28.540.000 kr.',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'mortgages',
    control,
  })

  const onSubmit = (data: FormData) => {
    console.log('✔️ submitting', data)
    // TODO: send to your API…
    router.push('/skattframtal/skil/skuldir')
  }

  return (
    <FormWrapper
      title="Fasteignir"
      description="Hér geturðu breytt eða bætt við upplýsingum um fasteignir og fasteignalán."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          purchaseYear: '',
          propertyLocation: '',
          lender: '',
          lenderSsn: '',
          loanNumber: '',
          loanDate: '',
          loanTermYears: '',
          totalAnnualPayments: '',
          principalPayment: '',
          interestPayment: '',
          remainingDebt: '',
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
            <Text variant="h3">
              {field.propertyLocation || `Fasteign ${idx + 1}`}
            </Text>
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
            label="Kaupár"
            placeholder="t.d. 2018"
            defaultValue={field.purchaseYear}
            {...register(`mortgages.${idx}.purchaseYear` as const)}
            hasError={!!errors.mortgages?.[idx]?.purchaseYear}
            errorMessage={errors.mortgages?.[idx]?.purchaseYear?.message}
            size="md"
          />

          <Box marginTop={4}>
            <Input
              label="Staðsetning íbúðarhúsnæðis"
              placeholder="Gata 123, Póstnúmer Bær"
              defaultValue={field.propertyLocation}
              {...register(`mortgages.${idx}.propertyLocation` as const)}
              hasError={!!errors.mortgages?.[idx]?.propertyLocation}
              errorMessage={errors.mortgages?.[idx]?.propertyLocation?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Lánveitandi"
              placeholder="Nafn banka eða lánastofnunar"
              defaultValue={field.lender}
              {...register(`mortgages.${idx}.lender` as const)}
              hasError={!!errors.mortgages?.[idx]?.lender}
              errorMessage={errors.mortgages?.[idx]?.lender?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Kennitala lánveitanda"
              placeholder="000000-0000"
              defaultValue={field.lenderSsn}
              {...register(`mortgages.${idx}.lenderSsn` as const)}
              hasError={!!errors.mortgages?.[idx]?.lenderSsn}
              errorMessage={errors.mortgages?.[idx]?.lenderSsn?.message}
              size="md"
              type="tel"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Lánsnúmer"
              placeholder="t.d. L-12345678"
              defaultValue={field.loanNumber}
              {...register(`mortgages.${idx}.loanNumber` as const)}
              hasError={!!errors.mortgages?.[idx]?.loanNumber}
              errorMessage={errors.mortgages?.[idx]?.loanNumber?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Lántökudagur"
              placeholder="dd.mm.áááá"
              defaultValue={field.loanDate}
              {...register(`mortgages.${idx}.loanDate` as const)}
              hasError={!!errors.mortgages?.[idx]?.loanDate}
              errorMessage={errors.mortgages?.[idx]?.loanDate?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Lánstími í árum"
              placeholder="t.d. 25"
              defaultValue={field.loanTermYears}
              {...register(`mortgages.${idx}.loanTermYears` as const)}
              hasError={!!errors.mortgages?.[idx]?.loanTermYears}
              errorMessage={errors.mortgages?.[idx]?.loanTermYears?.message}
              size="md"
              type="number"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Heildargreiðslur ársins"
              placeholder="t.d. 1.520.000 kr."
              defaultValue={field.totalAnnualPayments}
              {...register(`mortgages.${idx}.totalAnnualPayments` as const)}
              hasError={!!errors.mortgages?.[idx]?.totalAnnualPayments}
              errorMessage={
                errors.mortgages?.[idx]?.totalAnnualPayments?.message
              }
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Afborgun á nafnverði"
              placeholder="t.d. 980.000 kr."
              defaultValue={field.principalPayment}
              {...register(`mortgages.${idx}.principalPayment` as const)}
              hasError={!!errors.mortgages?.[idx]?.principalPayment}
              errorMessage={errors.mortgages?.[idx]?.principalPayment?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Vaxtagjöld"
              placeholder="t.d. 540.000 kr."
              defaultValue={field.interestPayment}
              {...register(`mortgages.${idx}.interestPayment` as const)}
              hasError={!!errors.mortgages?.[idx]?.interestPayment}
              errorMessage={errors.mortgages?.[idx]?.interestPayment?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Eftirstöðvar skulda"
              placeholder="t.d. 34.500.000 kr."
              defaultValue={field.remainingDebt}
              {...register(`mortgages.${idx}.remainingDebt` as const)}
              hasError={!!errors.mortgages?.[idx]?.remainingDebt}
              errorMessage={errors.mortgages?.[idx]?.remainingDebt?.message}
              size="md"
            />
          </Box>
        </Box>
      ))}
    </FormWrapper>
  )
}
