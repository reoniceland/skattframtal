'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box, CategoryCard, Icon, Input, Text } from '@reon-island/ui-core'

import { FormWrapper } from '@/app/components/FormWrapper/FormWrapper'

import { StepWrapper } from '../components/StepWrapper'

const ContactFormSchema = z.object({
  userInfo: z.object({
    phoneNumber: z.string().min(1, 'Símanúmer er nauðsynlegt'),
    email: z.string().email('Ógilt netfang').optional().or(z.literal('')),
    accountNumber: z.string().min(1, 'Bankareikningur er nauðsynlegur'),
  }),
})

type FormData = z.infer<typeof ContactFormSchema>

export default function Income() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      userInfo: {
        phoneNumber: '',
        email: '',
        accountNumber: '',
      },
    },
  })

  const onSubmit = (data: FormData) => {
    // TODO: send to your API…
    router.push('/mottekid')
  }

  return (
    <StepWrapper>
      <Box>
        <Text variant="h2" paddingBottom={2}>
          Förum yfir þetta saman
        </Text>
        <Text>Hér er einhver texti</Text>
      </Box>
      <CategoryCard
        heading="Jökull"
        text="120389-4569
        Bláfjallagata 12, 105 Reykjavík"
      />
      <CategoryCard
        icon={
          <Icon
            icon="wallet"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Tekjur"
        text="Heildartekjur þínar árið 2024 voru 10.585.000 kr., þar af 10.260.000 kr. í laun."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
      <CategoryCard
        icon={
          <Icon
            icon="home"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Eignir"
        text="Heildareignir þínar í lok árs 2024 voru 55.530.000 kr., þar af 1 fasteign og 2 bifreiðar."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
      <CategoryCard
        icon={
          <Icon
            icon="hammer"
            size="large"
            type="outline"
            color="backgroundBrand"
          />
        }
        heading="Skuldir"
        text="Heildarskuldir þínar í lok árs 2024 voru 29.801.594 kr."
        background="blue100"
        tags={[{ label: 'Yfirfarið' }]}
      />
      <FormWrapper
        title="Hvernig náum við í þig?"
        description="Svo við getum sent þér afrit af framtalinu, látið þig vita þegar
          útreikningar eru tilbúnir, eða ef einhverjar upplýsingar vanta."
        onSubmit={handleSubmit(onSubmit)}
        buttonText="Skila framtali"
      >
        <Input
          label="Símanúmer"
          placeholder="t.d. 555-1234"
          {...register('userInfo.phoneNumber')}
          hasError={!!errors.userInfo?.phoneNumber}
          errorMessage={errors.userInfo?.phoneNumber?.message}
          size="md"
        />

        <Box marginTop={4}>
          <Input
            label="Netfang (valfrjálst)"
            placeholder="notandi@example.com"
            {...register('userInfo.email')}
            hasError={!!errors.userInfo?.email}
            errorMessage={errors.userInfo?.email?.message}
            size="md"
          />
        </Box>

        <Box marginTop={4}>
          <Text variant="h3">Bankaupplýsingar</Text>
          <Text marginTop={1}>
            Inneignir og endurgreiðslur eru lagðar inn á þennan reikning. Aðeins
            er leyfilegt að skrá bankareikning sem er í þinni eigu.
          </Text>
        </Box>

        <Box marginTop={4}>
          <Input
            label="Bankareikningur"
            placeholder="t.d. 0123-26-123456"
            {...register('userInfo.accountNumber')}
            hasError={!!errors.userInfo?.accountNumber}
            errorMessage={errors.userInfo?.accountNumber?.message}
            size="md"
          />
        </Box>
      </FormWrapper>
    </StepWrapper>
  )
}
