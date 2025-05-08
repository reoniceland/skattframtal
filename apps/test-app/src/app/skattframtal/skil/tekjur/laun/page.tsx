'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, Button, Input, Text } from '@reon-island/ui-core'

import { useSalaries } from '@/hooks/use-salaries'

import { FormWrapper } from '../../../../components/FormWrapper/FormWrapper'

const SalarySchema = z.object({
  id: z.string().optional(),
  employerName: z.string().min(1, 'Nafn er nauðsynlegt'),
  employerKennitala: z
    .string()
    .min(1, 'Kennitala er nauðsynleg')
    .length(10, 'Kennitala verður að vera 10 stafir'),
  amount: z.number().min(0, 'Fjárhæð er nauðsynleg'),
})

const FormSchema = z.object({
  incomes: z.array(SalarySchema).min(1, 'Þú verður að skrá a.m.k. eitt laun'),
})

type FormData = z.infer<typeof FormSchema>

export default function SalaryPage() {
  const router = useRouter()
  const { salaries, addSalary, updateSalary, error } = useSalaries()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      incomes:
        salaries?.map((salary) => ({
          ...salary,
          amount: salary.amount,
        })) ?? [],
    },
  })

  // Update form when salaries data changes
  useEffect(() => {
    if (salaries && salaries.length > 0) {
      reset({
        incomes: salaries.map((salary) => ({
          ...salary,
          amount: salary.amount,
        })),
      })
    }
  }, [salaries, reset])

  const { fields, append, remove } = useFieldArray({
    name: 'incomes',
    control,
  })

  const onSubmit = async (data: FormData) => {
    // Skip processing if no changes were made to the form
    if (!isDirty) {
      router.push('/skattframtal/skil/tekjur')
      return
    }

    try {
      // Separate new and existing items
      const newSalaries = data.incomes.filter((income) => !income.id)
      const existingSalaries = data.incomes.filter((income) => income.id)

      // Process new salaries
      if (newSalaries.length > 0) {
        try {
          // Wait for all new salaries to be added
          await Promise.all(newSalaries.map((salary) => addSalary(salary)))
        } catch (error) {
          console.error('Error adding new salaries:', error)
          throw error // Re-throw to be caught by the outer try-catch
        }
      }

      if (existingSalaries.length > 0) {
        try {
          // Wait for all new salaries to be added
          await Promise.all(
            existingSalaries.map((salary) => updateSalary(salary)),
          )
        } catch (error) {
          console.error('Error updating salaries:', error)
          throw error // Re-throw to be caught by the outer try-catch
        }
      }

      router.push('/skattframtal/skil/tekjur')
    } catch (error) {
      console.error('Error saving salaries:', error)
      // Handle error
    }
  }

  return (
    <FormWrapper
      title="Laun"
      description="Hér geturðu breytt eða bætt við launum frá hverjum launagreiðanda."
      onSubmit={handleSubmit(onSubmit)}
      onAddItem={() => {
        append({
          id: undefined,
          employerName: '',
          employerKennitala: '',
          amount: 0,
        })
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
            <Text variant="h3">{field.employerName || `Laun ${idx + 1}`}</Text>
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
              placeholder="Sláðu inn kennitölu"
              defaultValue={field.employerKennitala}
              {...register(`incomes.${idx}.employerKennitala` as const)}
              hasError={!!errors.incomes?.[idx]?.employerKennitala}
              errorMessage={errors.incomes?.[idx]?.employerKennitala?.message}
              size="md"
            />
          </Box>

          <Box marginTop={4}>
            <Input
              label="Launafjárhæð"
              placeholder="t.d. 9360000"
              type="number"
              defaultValue={field.amount}
              {...register(`incomes.${idx}.amount` as const, {
                valueAsNumber: true,
              })}
              hasError={!!errors.incomes?.[idx]?.amount}
              errorMessage={errors.incomes?.[idx]?.amount?.message}
              size="md"
            />
          </Box>

          {error && (
            <Text color="red600" variant="small">
              {error}
            </Text>
          )}
        </Box>
      ))}
    </FormWrapper>
  )
}
