'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Checkbox,
  Divider,
  GridColumn,
  GridContainer,
  GridRow,
  Link,
  Logo,
  PhoneInput,
  Stack,
  Text,
} from '@reon-island/ui-core'

export const SignInForm = () => {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (remember) {
      localStorage.setItem('phone', phone)
    }
    router.push('/skattframtal')
  }
  const handlePhoneChange = (values) => {
    setPhone(values.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <GridContainer>
        <Box>
          <GridRow align="center">
            <GridColumn span="1/1">
              <Stack align="center" space={4}>
                <Logo />

                <Text
                  as="p"
                  color="blue300"
                  variant="default"
                  fontWeight="medium"
                >
                  Rafræn skilríki í síma
                </Text>

                <Text
                  as="h1"
                  variant="h1"
                  fontWeight="semiBold"
                  textAlign="center"
                >
                  Skráðu þig inn
                </Text>

                <Text
                  as="p"
                  color="blue300"
                  variant="default"
                  textAlign="center"
                >
                  Ísland.is - Mínar síður
                </Text>

                <Stack space={4}>
                  <PhoneInput
                    label="Símanúmer"
                    placeholder="000-0000"
                    value={phone}
                    onValueChange={handlePhoneChange}
                    required
                    format="###-####"
                    name="phone"
                  />

                  <Checkbox
                    label="Muna símanúmer"
                    checked={remember}
                    onChange={(event) => {
                      setRemember(event.target.checked)
                    }}
                  />
                </Stack>

                <Button type="submit">Auðkenna</Button>

                <Divider />

                <GridRow>
                  <GridColumn span="1/1">
                    <Button variant="ghost">Auðkennisappinu</Button>
                    <Button variant="ghost">Skilríki á korti</Button>
                  </GridColumn>
                </GridRow>

                <Divider />
              </Stack>
            </GridColumn>
          </GridRow>
        </Box>
        <GridRow align="spaceBetween" marginTop={6}>
          <GridColumn>
            <Link href="/terms">Skilmálar</Link>
          </GridColumn>
          <GridColumn>
            <Link href="/en">English</Link>
            <Link href="/help">Aðstoð</Link>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </form>
  )
}
