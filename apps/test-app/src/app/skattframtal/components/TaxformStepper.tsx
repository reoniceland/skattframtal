'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Box,
  FormStepperThemes,
  FormStepperV2,
  Section,
} from '@reon-island/ui-core'

import Sticky from '@/app/components/Sticky/Sticky'

const steps = [
  {
    label: 'Yfirlit',
    href: '/skattframtal/yfirlit',
    theme: FormStepperThemes.PURPLE,
  },
  {
    label: 'Tekjur',
    href: '/skattframtal/tekjur',
    theme: FormStepperThemes.PURPLE,
  },
  {
    label: 'Skuldir',
    href: '/skattframtal/skuldir',
    theme: FormStepperThemes.PURPLE,
  },
  {
    label: 'Eignir',
    href: '/skattframtal/eignir',
    theme: FormStepperThemes.PURPLE,
  },
  {
    label: 'Yfirferð',
    href: '/skattframtal/yfirferd',
    theme: FormStepperThemes.PURPLE,
  },
]
export const TaxFormStepper = () => {
  const pathname = usePathname()
  const currentIndex = steps.findIndex((step) => step.href === pathname)

  return (
    <Sticky constantSticky={true}>
      <Box paddingTop={[0, 0, 10]} paddingX={[4, 4, 0]}>
        <FormStepperV2
          sections={steps.map((step, index) => {
            const isActive = index === currentIndex
            const isComplete = index < currentIndex

            return (
              <Link href={step.href} key={step.href}>
                <Section
                  sectionIndex={index}
                  section={step.label}
                  isActive={isActive}
                  isComplete={isComplete}
                  theme={step.theme}
                />
              </Link>
            )
          })}
        />
      </Box>
    </Sticky>
  )
}
