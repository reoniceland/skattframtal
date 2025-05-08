'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Checkbox,
  GridColumn,
  GridRow,
  Input,
  Link,
  Logo,
  Stack,
  Text,
} from '@reon-island/ui-core'

import { useUser } from '@/hooks/use-user'

import { AuthFrame } from './components/AuthFrame/AuthFrame'

interface SignInFormProps {
  redirectTo: string
}

export const SignInForm = ({ redirectTo }: SignInFormProps) => {
  const router = useRouter()

  const { loginWithKennitala, loading, error, clearError } = useUser()
  const [kennitala, setKennitala] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    const result = await loginWithKennitala(kennitala)

    if (result.success) {
      if (remember) {
        localStorage.setItem('kennitala', kennitala)
      }

      router.push('/skattframtal')
      window.location.href = redirectTo
    }
  }

  const handleKennitalaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setKennitala(e.target.value)
    if (error) clearError()
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit}>
        <AuthFrame>
          <Stack align="center" space={4}>
            <Logo />
            <Stack align="center" space={1}>
              <Text color="blue400" variant="eyebrow">
                Rafræn skilríki í síma
              </Text>

              <Text
                as="h1"
                variant="h2"
                fontWeight="semiBold"
                textAlign="center"
              >
                Skráðu þig inn
              </Text>

              <Text as="p" variant="default" textAlign="center">
                Ísland.is - Mínar síður
              </Text>
            </Stack>

            <Stack space={4}>
              <Input
                label="Kennitala"
                placeholder="000000-0000"
                value={kennitala}
                onChange={handleKennitalaChange}
                required
                name="kennitala"
              />
              <Checkbox
                label="Muna kennitölu"
                checked={remember}
                onChange={(event) => {
                  setRemember(event.target.checked)
                }}
              />
            </Stack>

            <Button type="submit" fluid disabled={loading}>
              {loading ? 'Innskráning…' : 'Auðkenna'}
            </Button>
            {error && (
              <Text color="red600" variant="small">
                {error}
              </Text>
            )}

            <Text variant="small">Eða skráðu þig inn með</Text>

            <Box width="full">
              <Stack space={2}>
                <Button variant="ghost" size="small" fluid>
                  Auðkennisappinu
                </Button>
                <Button variant="ghost" size="small" fluid>
                  Skilríki á korti
                </Button>
              </Stack>
            </Box>
          </Stack>
        </AuthFrame>
        <GridRow align="spaceBetween" marginTop={2}>
          <GridColumn>
            <Link href="https://island.is/skilmalar-island-is">
              <Button variant="text">Skilmálar</Button>
            </Link>
          </GridColumn>
          <GridColumn>
            <Box display="flex" flexDirection="row">
              <Box paddingRight={2}>
                <Link href="https://innskra.island.is/app/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3D@island.is%252Fweb%26redirect_uri%3Dhttps%253A%252F%252Fisland.is%252Fbff%252Fcallbacks%252Flogin%26response_type%3Dcode%26response_mode%3Dquery%26scope%3Dopenid%2520profile%2520offline_access%2520api_resource.scope%2520@island.is%252Fapplications%253Aread%2520@island.is%252Fapplications%253Awrite%2520@island.is%252Fuser-profile%253Aread%2520@island.is%252Fuser-profile%253Awrite%2520@island.is%252Fauth%252Factor-delegations%2520@island.is%252Fauth%252Fdelegations%253Awrite%2520@island.is%252Fauth%252Fconsents%2520@skra.is%252Findividuals%2520@island.is%252Fdocuments%2520@island.is%252Fendorsements%2520@admin.island.is%252Fpetitions%2520@island.is%252Fassets%252Fip%2520@island.is%252Fassets%2520@island.is%252Feducation%2520@island.is%252Feducation-license%2520@island.is%252Ffinance%253Aoverview%2520@island.is%252Ffinance%252Fsalary%2520@island.is%252Ffinance%252Fschedule%253Aread%2520@island.is%252Ffinance%252Floans%2520@island.is%252Finternal%2520@island.is%252Finternal%253Aprocuring%2520@island.is%252Fme%253Adetails%2520@island.is%252Flaw-and-order%2520@island.is%252Flicenses%2520@island.is%252Flicenses%253Averify%2520@island.is%252Fcompany%2520@island.is%252Fvehicles%2520@island.is%252Fwork-machines%2520@island.is%252Fhealth%252Fpayments%2520@island.is%252Fhealth%252Fmedicines%2520@island.is%252Fhealth%252Fassistive-devices-and-nutrition%2520@island.is%252Fhealth%252Ftherapies%2520@island.is%252Fhealth%252Fhealthcare%2520@island.is%252Fhealth%252Frights-status%2520@island.is%252Fhealth%252Fdentists%2520@island.is%252Fhealth%252Forgan-donation%2520@island.is%252Fhealth%252Fvaccinations%2520@island.is%252Fsignature-collection%2520@island.is%252Fapplications%252Furvinnslusjodur%2520@island.is%252Fapplications%252Forkusjodur%2520@island.is%252Ffishing-license%2520@island.is%252Fapplications%252Fsamgongustofa-vehicles%2520@island.is%252Fapplications%252Fver%2520@island.is%252Fapplications%252Fver%253Aaccidents%2520@island.is%252Fapplications%252Fmms%2520@samband.is%252Ffinancial-aid%252Fapplicant%2520@samband.is%252Ffinancial-aid%253Aread%2520@samband.is%252Ffinancial-aid%253Awrite%26state%3D7cea0ea7-4e11-4815-b082-a8583a70c169%26code_challenge%3D1M3hBdeOpKwClcqUyML3XCQFYGLsfOWhdGU7dHISixI%26code_challenge_method%3DS256#:~:text=Skilm%C3%A1lar-,English,-A%C3%B0sto%C3%B0">
                  <Button variant="text">English</Button>
                </Link>
              </Box>
              <Link href="https://island.is/minar-sidur-adgangsstyring">
                <Button variant="text">Aðstoð</Button>
              </Link>
            </Box>
          </GridColumn>
        </GridRow>
      </form>
    </Box>
  )
}
